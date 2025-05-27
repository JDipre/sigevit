<template>
  <v-container class="content-wrapper">
    <v-row>
      <v-col cols="12">
        <v-alert type="info" border="left" elevation="2">
          Bienvenido a la gestión de casos. Aquí puedes registrar, editar y consultar casos de víctimas.
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="d-flex align-center justify-space-between">
        <h3>Lista de Casos</h3>
        <v-btn color="primary" @click="registrarCaso">
          <v-icon left>mdi-plus</v-icon>
          Registrar nuevo caso
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title>Filtros</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  v-model="filtro.estado"
                  :items="estados"
                  label="Estado"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="filtro.asistencia"
                  :items="asistencias"
                  label="Tipo de Asistencia"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="filtro.institucion"
                  :items="instituciones"
                  label="Institución"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="filtro.busqueda"
                  label="Buscar por nombre o ID"
                  outlined
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Tabla -->
        <v-data-table
          :headers="headers"
          :items="casos"
          :search="filtro.busqueda"
          class="elevation-1 mt-4"
        >
          <template v-slot:item.acciones="{ item }">
            <v-btn text color="primary" @click="verDetalles(item)">
              Ver caso
            </v-btn>
          </template>
        </v-data-table>

        <!-- Exportar -->
        <div class="text-right mt-4">
          <v-btn color="secondary" @click="exportar">
            <v-icon left>mdi-file-export</v-icon>
            Exportar
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const filtro = ref({
  estado: '',
  asistencia: '',
  institucion: '',
  busqueda: ''
})

const estados = ['Abierto', 'En proceso', 'Cerrado', 'Derivado']
const asistencias = ['Legal', 'Psicológica', 'Médica', 'Social']
const instituciones = ['CONANI', 'Defensoría del Pueblo', 'Progresando con Solidaridad']

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nombre de la Víctima', value: 'nombre' },
  { text: 'Estado', value: 'estado' },
  { text: 'Fecha de Registro', value: 'fecha' },
  { text: 'Responsable', value: 'responsable' },
  { text: 'Acciones', value: 'acciones', sortable: false }
]

const casos = ref([
  {
    id: 101,
    nombre: 'Ana Rodríguez',
    estado: 'Abierto',
    fecha: '2024-01-20',
    responsable: 'Lic. Pérez'
  },
  {
    id: 102,
    nombre: 'Luis Gómez',
    estado: 'En proceso',
    fecha: '2024-02-15',
    responsable: 'Lic. Martínez'
  }
])

const verDetalles = (caso) => {
  router.push(`/casos/${caso.id}`)
}

const registrarCaso = () => {
  router.push('/registrar-caso')
}

const exportar = () => {
  console.log('Exportar a PDF o Excel')
}
</script>

<style scoped>
.v-data-table {
  font-size: 14px;
}
</style>
