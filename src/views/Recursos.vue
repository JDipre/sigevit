<template>
  <v-container class="content-wrapper">
    <v-card class="mb-4">
      <v-card-title class="bg-primary text-white">
        <v-icon left>mdi-archive-outline</v-icon>
        Recursos para la Gestión de Casos
      </v-card-title>
      <v-card-text>
        <p>
          En esta sección encontrarás documentos útiles, plantillas, formularios y guías de apoyo para facilitar
          el trabajo en la gestión de casos.
        </p>
      </v-card-text>
    </v-card>

    <!-- Lista de recursos -->
    <v-card>
      <v-card-title class="bg-secondary text-white">
        Documentos Disponibles
      </v-card-title>
      <v-data-table :headers="headers" :items="recursos" class="elevation-1">
        <template v-slot:item.acciones="{ item }">
          <v-btn color="primary" text small :href="item.url" target="_blank">
            <v-icon left>mdi-download</v-icon>
            Descargar
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const recursos = ref([])

const obtenerRecursos = async () => {
  try {
    const respuesta = await fetch('http://localhost:3001/recursos') // esto requiere endpoint extra si no listamos archivos directamente
    const lista = await respuesta.json()
    recursos.value = lista.map(nombre => ({
      nombre,
      tipo: nombre.split('.').pop(),
      url: `http://localhost:3001/recursos/${nombre}`
    }))
  } catch (error) {
    console.error('Error al obtener los recursos:', error)
  }
}

onMounted(() => {
  obtenerRecursos()
})
</script>


<style scoped>
p {
  font-size: 15px;
}
</style>
