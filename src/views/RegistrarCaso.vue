<template>
  <v-container class="content-wrapper">
    <v-card>
      <v-card-title class="bg-primary text-white">
        <v-icon left>mdi-folder-plus</v-icon>
        Registrar Nuevo Caso
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="guardarCaso">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.nombre" label="Nombre" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.apellido" label="Apellido" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.pseudonimo" label="Seudónimo (opcional)" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="nuevoCaso.sexo" :items="['Femenino', 'Masculino']" label="Sexo" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.nacionalidad" label="Nacionalidad" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.provincia" label="Provincia" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.fechaRescate" label="Fecha de Rescate" type="date" required />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="nuevoCaso.lugarRescate" label="Lugar de Rescate" />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="nuevoCaso.resumen" label="Breve reseña del caso" rows="3" />
            </v-col>
          </v-row>
          <v-btn color="primary" type="submit">Guardar Caso</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const nuevoCaso = ref({
  nombre: '',
  apellido: '',
  pseudonimo: '',
  sexo: '',
  nacionalidad: '',
  provincia: '',
  fechaRescate: '',
  lugarRescate: '',
  resumen: ''
})

const guardarCaso = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/casos', nuevoCaso.value)
    alert('Caso guardado correctamente.')
  } catch (error) {
    alert('Error al guardar el caso.')
    console.error(error)
  }
}
</script>
