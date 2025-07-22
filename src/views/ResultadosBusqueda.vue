<template>
  <v-container class="pa-4">
    <v-card class="mb-4 elevation-3">
      <v-card-title class="bg-sigevit-green text-white">
        <v-icon left>mdi-magnify</v-icon>
        Resultados de Búsqueda
      </v-card-title>
    </v-card>

    <v-card v-if="resultados.length === 0" class="pa-4 text-center">
      No se encontraron resultados para "{{ query }}".
    </v-card>

    <v-list v-else class="bg-white elevation-1 rounded-lg">
      <v-list-item
        v-for="(item, i) in resultados"
        :key="i"
        class="border-b"
      >
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            {{ item.nombre }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.descripcion || 'Sin descripción' }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-chip color="primary" label small>{{ item.tipo }}</v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const resultados = ref([])
const route = useRoute()
const query = ref(route.query.q || '')

onMounted(async () => {
  if (!query.value) return

  try {
    const res = await fetch(`http://localhost:3001/buscar?q=${encodeURIComponent(query.value)}`)
    resultados.value = await res.json()
  } catch (err) {
    console.error('Error al buscar:', err)
  }
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
</style>
// This is a Vue.js component for displaying search results.
// It fetches results based on a query parameter and displays them in a list format.