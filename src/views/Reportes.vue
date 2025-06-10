<template>
  <v-container class="content-wrapper">
    <h2 class="mb-4">Reportes</h2>

    <!-- Filtros -->
    <v-row class="mb-4" dense>
      <v-col cols="12" sm="2" v-for="(label, key) in filtroLabels" :key="key">
        <v-select v-model="filtros[key]" :items="filtroItems[key]" :label="label" dense outlined class="filtro-input" />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn color="primary" block @click="filtrarDatos">Filtrar</v-btn>
      </v-col>
    </v-row>

    <!-- Métricas clave -->
    <v-row class="mb-4" dense>
      <v-col cols="12" md="3" v-for="(valor, etiqueta) in metricas" :key="etiqueta">
        <v-card class="pa-4 text-center">
          <h3 class="text-h4 font-weight-bold" :class="etiqueta === 'Cierre Satisfactorio' ? 'amber--text' : ''">{{ valor }}</h3>
          <p>{{ etiqueta }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gráficas -->
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Casos por Ciudad</v-card-title>
          <v-card-text>
            <BarChart :chart-data="chartData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Distribución de Cierre</v-card-title>
          <v-card-text>
            <PieChart :chart-data="pieData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title>Visualización de Casos por Mes</v-card-title>
          <v-card-text>
            <LineChart :chart-data="lineData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botones de Exportación -->
    <v-row justify="end" class="mb-4">
      <v-btn color="success" class="mr-2" @click="exportarExcel">
        <v-icon left>mdi-file-excel</v-icon>
        Exportar Excel
      </v-btn>
      <v-btn color="blue darken-1" class="mr-2" @click="imprimir">
        <v-icon left>mdi-printer</v-icon>
        Imprimir
      </v-btn>
    </v-row>

    <!-- Tabla de Reporte -->
    <v-data-table :headers="headers" :items="datosFiltrados" class="elevation-1" />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import BarChart from '@/components/Reportes/BarChart.vue'
import PieChart from '@/components/Reportes/PieChart.vue'
import LineChart from '@/components/Reportes/LineChart.vue'

const filtros = ref({ fecha: '', nombre: '', ciudad: '', sexo: '', anio: '' })

const filtroLabels = {
  fecha: 'Fecha',
  nombre: 'Nombre',
  ciudad: 'Ciudad',
  sexo: 'Sexo',
  anio: 'Año'
}

const filtroItems = {
  fecha: ['Enero', 'Febrero', 'Marzo'],
  nombre: ['María', 'José', 'Ana'],
  ciudad: ['Santo Domingo', 'Santiago', 'Puerto Plata'],
  sexo: ['Femenino', 'Masculino'],
  anio: ['2024', '2025']
}

const metricas = {
  'Casos Cerrados': 450,
  'Cierre Satisfactorio': 32,
  'En Proceso': 50,
  'Cierre Incompleto': 10
}

const datosFiltrados = ref([
  { nombre: 'María López', ciudad: 'Santo Domingo', sexo: 'Femenino', año: '2025', estado: 'Cerrado' },
  { nombre: 'Juan Pérez', ciudad: 'Santiago', sexo: 'Masculino', año: '2025', estado: 'Proceso' }
])

const headers = [
  { text: 'Nombre', value: 'nombre' },
  { text: 'Ciudad', value: 'ciudad' },
  { text: 'Sexo', value: 'sexo' },
  { text: 'Año', value: 'año' },
  { text: 'Estado', value: 'estado' }
]

const chartData = ref({
  labels: ['Santo Domingo', 'Santiago', 'Puerto Plata'],
  datasets: [
    {
      label: 'Casos por Ciudad',
      backgroundColor: '#F2B705',
      data: [25, 15, 5]
    }
  ]
})

const pieData = ref({
  labels: ['Satisfactorio', 'Incompleto', 'Proceso'],
  datasets: [
    {
      label: 'Distribución de Cierre',
      backgroundColor: ['#F2B705', '#8884d8', '#00BCD4'],
      data: [32, 10, 50]
    }
  ]
})

const lineData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Casos Registrados',
      backgroundColor: 'transparent',
      borderColor: '#F2B705',
      data: [5, 10, 20, 20, 25, 35, 28],
      tension: 0.4,
      fill: false
    }
  ]
})

const filtrarDatos = () => {
  console.log('Filtrando...')
}

const exportarExcel = () => {
  console.log('Exportar Excel')
}

const imprimir = () => {
  window.print()
}
</script>

<style scoped>
.content-wrapper {
  padding-top: 24px;
}
.filtro-input {
  max-width: 160px;
}
</style>
