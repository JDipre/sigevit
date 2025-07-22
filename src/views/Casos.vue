<template>
  <v-card flat class="table-card elevation-1">
    <v-data-table
      :headers="headers"
      :items="casosFiltrados"
      :loading="cargando"
      loading-text="Cargando casos..."
      dense
      class="casos-table"
      no-data-text="No se han registrado casos"
      :items-per-page="10"
      disable-sort
      hide-default-footer
    >
      <template #top>
        <v-toolbar flat dense class="table-toolbar">
          <v-text-field
            v-model="filtro"
            dense
            clearable
            hide-details
            placeholder="Buscar caso..."
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template #item.acciones="{ item }">
        <v-btn icon small color="info" @click="verCaso(item)">
          <v-icon small>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon small color="warning" @click="editarCaso(item)">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon small color="error" @click="eliminarCaso(item)">
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>

      <template #footer>
        <v-row justify="end" class="px-4">
          <v-col cols="auto">
            <v-pagination
              v-model="pagina"
              :length="pageCount"
              total-visible="7"
              size="small"
            ></v-pagination>
          </v-col>
          <v-col cols="auto">
            <v-select
              v-model="itemsPorPagina"
              :items="[5, 10, 20, 50]"
              dense
              hide-details
              style="width:70px"
            ></v-select>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const casos = ref([])
const cargando = ref(false)
const filtro = ref('')
const pagina = ref(1)
const itemsPorPagina = ref(10)

const obtenerCasos = async () => {
  cargando.value = true
  try {
    const { data } = await axios.get('http://localhost:3001/api/casos')
    casos.value = data.map((c, i) => ({ ...c, numeroCaso: i + 1 }))
  } finally {
    cargando.value = false
  }
}

onMounted(obtenerCasos)

// Headers sin columna de selección
const headers = [
  { text: 'Nº Caso', value: 'numeroCaso', width: '80px' },
  { text: 'Nombre', value: 'nombre', width: '140px' },
  { text: 'Apellido', value: 'apellido', width: '140px' },
  { text: 'Sexo', value: 'sexo', width: '100px' },
  { text: 'Provincia', value: 'provincia', width: '140px' },
  { text: 'Acciones', value: 'acciones', sortable: false, align: 'center', width: '120px' }
]

// Filtro combinado con paginación
const casosFiltrados = computed(() => {
  const arr = casos.value.filter(c => {
    const t = filtro.value.toLowerCase()
    return (
      String(c.numeroCaso).includes(t) ||
      c.nombre.toLowerCase().includes(t) ||
      c.apellido.toLowerCase().includes(t) ||
      c.sexo.toLowerCase().includes(t) ||
      c.provincia.toLowerCase().includes(t)
    )
  })
  // Paginación
  const start = (pagina.value - 1) * itemsPorPagina.value
  return arr.slice(start, start + itemsPorPagina.value)
})

const pageCount = computed(() =>
  Math.ceil(
    casos.value.filter(c => {
      const t = filtro.value.toLowerCase()
      return (
        String(c.numeroCaso).includes(t) ||
        c.nombre.toLowerCase().includes(t) ||
        c.apellido.toLowerCase().includes(t) ||
        c.sexo.toLowerCase().includes(t) ||
        c.provincia.toLowerCase().includes(t)
      )
    }).length / itemsPorPagina.value
  )
)

const verCaso = item => router.push(`/casos/${item.CasoID}`)
const editarCaso = item => router.push(`/editar-caso/${item.CasoID}`)
const eliminarCaso = async item => {
  if (!confirm(`¿Eliminar caso #${item.numeroCaso}?`)) return
  await axios.delete(`http://localhost:3001/api/casos/${item.CasoID}`)
  obtenerCasos()
}

// Si cambian itemsPorPagina o filtro, reajustar página
watch([itemsPorPagina, filtro], () => (pagina.value = 1))
</script>

<style scoped>
/* Eleva tabla debajo del app-bar (64px) y margina a la derecha por el drawer (256px) */
.table-card {
  margin: calc(64px + 16px) 16px 16px 272px;
  overflow-x: auto;
}

/* Toolbar compacto sobre la tabla */
.table-toolbar {
  min-height: 44px !important;
  padding: 4px 16px;
}

/* Espaciado compacto y fuente reducida en celdas y encabezados */
:deep(.v-data-table__wrapper td),
:deep(.v-data-table__wrapper th) {
  padding: 6px 10px !important;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* Encabezados ligeramente sombreados */
:deep(.v-data-table-header) {
  background-color: #f5f5f5;
}

/* Hover ligero para filas */
:deep(.v-data-table__wrapper tr:hover) {
  background-color: rgba(0, 0, 0, 0.04);
}

/* Ajuste del ancho máximo para no salirse del viewport */
.casos-table {
  max-width: calc(100vw - 272px - 32px);
}

/* Ocultar checkboxes y cualquier control de selección por defecto */
:deep(.v-simple-checkbox),
:deep(.v-data-table__checkbox) {
  display: none !important;
}
</style>
