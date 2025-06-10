<template>
  <v-container class="content-wrapper">
    <h2 class="mb-4">Configuración</h2>

    <!-- Administración de Usuarios -->
    <v-card class="mb-6">
      <v-card-title class="font-weight-bold d-flex justify-space-between align-center">
        Administración de Usuarios
        <v-btn color="success" @click="dialog = true">
          <v-icon left>mdi-account-plus</v-icon>Nuevo Usuario
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="mb-4" dense>
          <v-col cols="12" sm="6">
            <v-text-field v-model="search" label="Buscar por nombre, correo o rol" append-inner-icon="mdi-magnify" dense outlined />
          </v-col>
          <v-col cols="6" sm="2">
            <v-select :items="['Activa', 'Inactiva']" label="Estado" dense outlined />
          </v-col>
          <v-col cols="6" sm="2">
            <v-select :items="['Fecha de creación']" label="Ordenar" dense outlined />
          </v-col>
          <v-col cols="12" sm="2">
            <v-btn color="primary" block>Filtrar</v-btn>
          </v-col>
        </v-row>

        <v-data-table
          :headers="userHeaders"
          :items="usuarios"
          class="elevation-1"
          item-value="nombre"
        >
          <template #item.estado="{ item }">
            <v-chip
              :color="item.estado === 'Activa' ? 'green lighten-2' : 'orange lighten-2'"
              :text-color="item.estado === 'Activa' ? 'green--text' : 'orange--text'"
              small
            >
              {{ item.estado }}
            </v-chip>
          </template>

          <template #item.acciones="{ item }">
            <v-btn color="primary" variant="text" small @click="() => console.log('Editar', item)">
              Editar
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Modal Agregar Usuario -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Agregar nuevo usuario</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Nombre completo" v-model="nuevoUsuario.nombre" outlined dense required />
            <v-text-field label="Correo electrónico" v-model="nuevoUsuario.correo" type="email" outlined dense required />
            <v-text-field label="Contraseña" v-model="nuevoUsuario.contrasena" type="password" outlined dense required />
            <v-select label="Rol" :items="roles.map(r => r.nombre)" v-model="nuevoUsuario.rol" outlined dense required />
            <v-select label="Unidad asignada" :items="unidades" v-model="nuevoUsuario.unidad" outlined dense required />
            <v-select label="Estado" :items="['Activa', 'Inactiva']" v-model="nuevoUsuario.estado" outlined dense required />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarUsuario">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Configuración de Permisos y Roles (componente modularizado) -->
    <v-row>
      <v-col cols="12" md="6">
        <ConfiguracionRolesPermisos />
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6">
          <v-card-title class="font-weight-bold">Actualizaciones del Sistema</v-card-title>
          <v-card-text>
            <p><strong>Versión:</strong> 2.51 <span class="grey--text">(Sin programar)</span></p>
            <p><strong>Última actualización:</strong> 12/03/2024</p>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-title class="font-weight-bold">Historial de Actividades</v-card-title>
          <v-card-text>
            <v-btn color="info" block @click="verHistorial">Ver Historial de Actividades</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal de Historial de Actividades -->
    <v-dialog v-model="dialogHistorial" max-width="900px">
      <v-card>
        <v-card-title class="font-weight-bold">Historial de Actividades</v-card-title>
        <v-card-text>
          <v-text-field v-model="filtroHistorial" label="Buscar por nombre o ID" append-inner-icon="mdi-magnify" outlined dense class="mb-4" />
          <v-data-table :headers="headersHistorial" :items="actividadesFiltradas" item-value="id" class="elevation-1">
            <template #item.acciones="{ item }">
              <v-btn text color="primary" @click="verDetalleActividad(item)">Ver Detalle</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogHistorial = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal Detalle de Actividad -->
    <v-dialog v-model="dialogDetalleActividad" max-width="600px">
      <v-card>
        <v-card-title class="font-weight-bold">Detalle de Actividad</v-card-title>
        <v-card-text>
          <p><strong>Usuario:</strong> {{ actividadSeleccionada.nombre }} ({{ actividadSeleccionada.rol }})</p>
          <p><strong>Correo:</strong> {{ actividadSeleccionada.correo }}</p>
          <p><strong>Fecha:</strong> {{ actividadSeleccionada.fecha }}</p>
          <p><strong>IP:</strong> {{ actividadSeleccionada.ip }}</p>
          <v-divider class="my-3" />
          <h4 class="mb-2">Acciones realizadas:</h4>
          <ul>
            <li v-for="(accion, index) in actividadSeleccionada.acciones" :key="index">
              {{ accion }}
            </li>
          </ul>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialogDetalleActividad = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import ConfiguracionRolesPermisos from './Configuracion/ConfiguracionRolesPermisos.vue'

const search = ref('')
const dialog = ref(false)

const nuevoUsuario = ref({
  nombre: '',
  correo: '',
  contrasena: '',
  rol: '',
  unidad: '',
  estado: 'Activa'
})

const unidades = ['CONANI', 'Ministerio de la Mujer', 'Procuraduría', 'Otro']

const usuarios = [
  { nombre: 'Maria González', correo: 'maria.gonzalez@example.com', rol: 'Coordinador', estado: 'Activa', fecha: '20/02/2024' },
  { nombre: 'Carlos Rodriguez', correo: 'carlos.rodriguez@example.com', rol: 'Psicólogo', estado: 'Inactiva', fecha: '15/01/2024' },
  { nombre: 'Laura Pérez', correo: 'laura.perez@example.com', rol: 'Trabajador social', estado: 'Activa', fecha: '10/12/2023' },
  { nombre: 'Daniel Ramírez', correo: 'daniel.ramirez@example.com', rol: 'Legal', estado: 'Activa', fecha: '05/11/2023' }
]

const userHeaders = [
  { text: 'Nombre', value: 'nombre' },
  { text: 'Correo', value: 'correo' },
  { text: 'Rol', value: 'rol' },
  { text: 'Estado', value: 'estado' },
  { text: 'Fecha de creación', value: 'fecha' },
  { text: 'Acciones', value: 'acciones', sortable: false }
]

const roles = [
  { nombre: 'Administrador' },
  { nombre: 'Coordinador' },
  { nombre: 'Psicólogo' },
  { nombre: 'Legal' },
  { nombre: 'Trabajador social' }
]

const guardarUsuario = () => {
  console.log('Guardar usuario:', nuevoUsuario.value)
  dialog.value = false
}

const dialogHistorial = ref(false)
const dialogDetalleActividad = ref(false)
const filtroHistorial = ref('')

const actividades = ref([
  {
    id: 1,
    nombre: 'Laura Pérez',
    correo: 'laura.perez@example.com',
    rol: 'Psicóloga',
    fecha: '2024-07-01 10:45',
    ip: '192.168.1.25',
    acciones: ['Cerró caso #203', 'Editó perfil de víctima #122']
  },
  {
    id: 2,
    nombre: 'Daniel Ramírez',
    correo: 'daniel.ramirez@example.com',
    rol: 'Legal',
    fecha: '2024-07-02 08:32',
    ip: '192.168.1.48',
    acciones: ['Registró nuevo caso', 'Descargó informe PDF']
  }
])

const headersHistorial = [
  { text: 'Usuario', value: 'nombre' },
  { text: 'Correo', value: 'correo' },
  { text: 'Rol', value: 'rol' },
  { text: 'Fecha', value: 'fecha' },
  { text: 'Acciones', value: 'acciones', sortable: false }
]

const actividadSeleccionada = ref({})

const actividadesFiltradas = computed(() =>
  actividades.value.filter(a =>
    a.nombre.toLowerCase().includes(filtroHistorial.value.toLowerCase()) ||
    a.correo.toLowerCase().includes(filtroHistorial.value.toLowerCase())
  )
)

const verHistorial = () => {
  dialogHistorial.value = true
}

const verDetalleActividad = (item) => {
  actividadSeleccionada.value = item
  dialogDetalleActividad.value = true
}
</script>

<style scoped>
.content-wrapper {
  padding-top: 24px;
}
</style>
