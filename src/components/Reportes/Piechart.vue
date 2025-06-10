<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: Object
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}
</script>

<style scoped>
div {
  max-height: 300px;
}
</style>
// src/components/Reportes/Piechart.vue
// This component renders a pie chart using Chart.js and Vue Chart.js.
// It accepts chart data as a prop and displays the chart with responsive options.
  filtros: {
    fechaInicio: '',
    fechaFin: '',
    ciudad: '',
    tipoCierre: ''
  },
  chartData: {
    labels: ['Cierre Satisfactorio', 'En Proceso', 'Cierre Incompleto'],
    datasets: [
      {
        label: 'Distribución de Cierre',
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        data: [70, 20, 10]
      }
    ]
  }
})      