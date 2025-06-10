<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const props = defineProps({
  chartData: Object
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#012D3A'
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#012D3A' },
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: { color: '#012D3A' },
      grid: {
        color: '#e0e0e0',
        borderDash: [4, 4]
      }
    }
  }
}
</script>

<style scoped>
canvas {
  max-height: 300px;
}
</style>
