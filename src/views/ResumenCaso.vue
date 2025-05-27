<template>
  <v-container class="content-wrapper">
    <v-row class="justify-space-between align-center mb-4">
      <v-col cols="6">
        <v-btn text color="primary" @click="volver">
          <v-icon left>mdi-arrow-left</v-icon>
          Volver al listado de casos
        </v-btn>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn color="warning" @click="editarCaso">
          <v-icon left>mdi-pencil</v-icon>
          Editar caso
        </v-btn>
        <v-btn color="success" class="ml-2" @click="dialog = true">
          <v-icon left>mdi-plus</v-icon>
          Agregar seguimiento
        </v-btn>
      </v-col>
    </v-row>

    <!-- Resumen del caso -->
    <v-card class="mb-4">
      <v-card-title class="bg-primary text-white">
        Resumen del Caso - Caso #{{ id }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <strong>Nombre completo:</strong> {{ caso.nombre }} {{ caso.apellido }}<br />
            <strong>Edad:</strong> {{ caso.edad }}<br />
            <strong>Sexo:</strong> {{ caso.sexo }}<br />
            <strong>Nacionalidad:</strong> {{ caso.nacionalidad }}
          </v-col>
          <v-col cols="12" md="6">
            <strong>Tipo de Trata:</strong> {{ caso.tipo }}<br />
            <strong>Estado:</strong> {{ caso.estado }}<br />
            <strong>Institución Responsable:</strong> {{ caso.institucion }}<br />
            <strong>Responsable asignado:</strong> {{ caso.responsable }}
          </v-col>
          <v-col cols="12">
            <strong>Reseña del caso:</strong>
            <div class="mt-2">{{ caso.resumen }}</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Historial de seguimientos -->
    <v-card>
      <v-card-title class="bg-secondary text-white">Historial de Seguimientos</v-card-title>
      <v-data-table :headers="headers" :items="seguimientos" class="elevation-1">
        <template v-slot:item.anexos="{ item }">
          <v-btn text small color="info">Ver anexos</v-btn>
        </template>
        <template v-slot:item.acciones="{ item, index }">
          <v-btn text small color="primary" @click="verSeguimiento(index)">Ver detalles</v-btn>
          <v-btn text small color="warning" @click="editarSeguimiento(index)">Editar</v-btn>
          <v-btn text small color="error" v-if="esAdmin" @click="confirmarEliminar(index)">Eliminar</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal Agregar/Editar Seguimiento -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title class="bg-primary text-white">
          <v-icon left>mdi-plus</v-icon>
          {{ editando ? 'Editar Seguimiento' : 'Nuevo Seguimiento' }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Fecha" v-model="nuevo.fecha" type="date" outlined />
                <v-select
                  v-model="nuevo.servicio"
                  :items="['Legal', 'Médico', 'Psicológico', 'Empoderamiento económico', 'Educación', 'Otro']"
                  label="Tipo de Servicio"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Usuario" v-model="nuevo.usuario" outlined />
                <v-textarea label="Notas del seguimiento" v-model="nuevo.descripcion" outlined rows="3" />
              </v-col>
              <v-col cols="12">
                <v-file-input label="Anexos" v-model="nuevo.anexos" multiple show-size prepend-icon="mdi-paperclip" outlined />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarSeguimiento">
            <v-icon left>mdi-content-save</v-icon>
            Guardar seguimiento
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Ver Detalles Seguimiento -->
    <v-dialog v-model="dialogDetalle" max-width="600">
      <v-card>
        <v-card-title class="bg-info text-white">
          <v-icon left>mdi-information-outline</v-icon>
          Detalles del Seguimiento
        </v-card-title>
        <v-card-text>
          <p><strong>Fecha:</strong> {{ seleccionado.fecha }}</p>
          <p><strong>Tipo de Servicio:</strong> {{ seleccionado.servicio }}</p>
          <p><strong>Usuario:</strong> {{ seleccionado.usuario }}</p>
          <p><strong>Notas:</strong> {{ seleccionado.descripcion }}</p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogDetalle = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Confirmar Eliminación -->
    <v-dialog v-model="dialogConfirmarEliminar" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este seguimiento?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogConfirmarEliminar = false">Cancelar</v-btn>
          <v-btn color="error" @click="eliminarSeguimientoConfirmado">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const dialog = ref(false)
dialog.value = false
const dialogDetalle = ref(false)
const dialogConfirmarEliminar = ref(false)
const editando = ref(false)
const seleccionado = ref({})
const indexAEliminar = ref(null)
const esAdmin = true

const nuevo = ref({
  fecha: new Date().toISOString().substr(0, 10),
  servicio: '',
  usuario: 'Lic. Ana Pérez',
  descripcion: '',
  anexos: []
})

const caso = ref({
  nombre: 'Ana',
  apellido: 'Rodríguez',
  edad: 23,
  sexo: 'Femenino',
  nacionalidad: 'Dominicana',
  tipo: 'Laboral',
  estado: 'En proceso',
  institucion: 'CONANI',
  responsable: 'Lic. Pérez',
  resumen: 'La víctima fue rescatada en un operativo interinstitucional tras ser identificada como víctima de trata con fines laborales. Se encuentra bajo protección y en proceso de reintegración.'
})

const headers = [
  { text: 'Fecha', value: 'fecha' },
  { text: 'Servicio', value: 'servicio' },
  { text: 'Usuario', value: 'usuario' },
  { text: 'Descripción', value: 'descripcion' },
  { text: 'Anexos', value: 'anexos' },
  { text: 'Acciones', value: 'acciones', sortable: false }
]

const seguimientos = ref([
  {
    fecha: '2024-07-01',
    servicio: 'Psicológico',
    usuario: 'Lic. Ana Pérez',
    descripcion: 'Sesión inicial de acompañamiento.',
    anexos: true
  },
  {
    fecha: '2024-07-10',
    servicio: 'Legal',
    usuario: 'Dra. Luisa Gómez',
    descripcion: 'Inicio de proceso judicial.',
    anexos: true
  }
])

const volver = () => {
  router.push('/casos')
}

const editarCaso = () => {
  router.push(`/editar-caso/${id}`)
}

const guardarSeguimiento = () => {
  if (editando.value && seleccionado.value) {
    Object.assign(seleccionado.value, nuevo.value)
  } else {
    seguimientos.value.unshift({ ...nuevo.value })
  }
  dialog.value = false
  editando.value = false
  nuevo.value = {
    fecha: new Date().toISOString().substr(0, 10),
    servicio: '',
    usuario: 'Lic. Ana Pérez',
    descripcion: '',
    anexos: []
  }
}

const verSeguimiento = (index) => {
  seleccionado.value = { ...seguimientos.value[index] }
  dialogDetalle.value = true
}

const editarSeguimiento = (index) => {
  seleccionado.value = seguimientos.value[index]
  Object.assign(nuevo.value, seleccionado.value)
  editando.value = true
  dialog.value = true
}

const confirmarEliminar = (index) => {
  indexAEliminar.value = index
  dialogConfirmarEliminar.value = true
}

const eliminarSeguimientoConfirmado = () => {
  if (indexAEliminar.value !== null) {
    seguimientos.value.splice(indexAEliminar.value, 1)
    indexAEliminar.value = null
  }
  dialogConfirmarEliminar.value = false
}
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}
</style>
