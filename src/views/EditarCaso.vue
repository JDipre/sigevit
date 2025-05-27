<template>
  <v-container class="content-wrapper">
    <v-card>
      <v-card-title class="bg-primary text-white">
        Editar Caso
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="guardarCambios">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="caso.nombre" label="Nombre" outlined required />
              <v-text-field v-model="caso.apellido" label="Apellido" outlined required />
              <v-select
                v-model="caso.sexo"
                :items="['Femenino', 'Masculino']"
                label="Sexo"
                outlined
              />
              <v-text-field v-model="caso.edad" label="Edad" type="number" outlined />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="caso.nacionalidad" label="Nacionalidad" outlined />
              <v-text-field v-model="caso.tipo" label="Tipo de Trata" outlined />
              <v-select
                v-model="caso.estado"
                :items="['Abierto', 'En proceso', 'Cerrado']"
                label="Estado del caso"
                outlined
              />
              <v-text-field v-model="caso.institucion" label="Institución Responsable" outlined />
              <v-text-field v-model="caso.responsable" label="Responsable Asignado" outlined />
            </v-col>
          </v-row>

          <v-row justify="end">
            <v-btn color="primary" type="submit" class="mr-2">
              <v-icon left>mdi-content-save</v-icon>
              Guardar cambios
            </v-btn>
            <v-btn text @click="volver">
              Cancelar
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const caso = ref({
  nombre: '',
  apellido: '',
  sexo: '',
  edad: '',
  nacionalidad: '',
  tipo: '',
  estado: '',
  institucion: '',
  responsable: ''
})

onMounted(() => {
  // Simular carga del caso desde la base de datos
  caso.value = {
    nombre: 'Ana',
    apellido: 'Rodríguez',
    sexo: 'Femenino',
    edad: 23,
    nacionalidad: 'Dominicana',
    tipo: 'Laboral',
    estado: 'En proceso',
    institucion: 'CONANI',
    responsable: 'Lic. Pérez'
  }
})

const guardarCambios = () => {
  console.log('✅ Cambios guardados:', caso.value)
  router.push(`/casos/${id}`)
}

const volver = () => {
  router.push(`/casos/${id}`)
}
</script>

<style scoped>
.v-text-field, .v-select {
  margin-bottom: 16px;
}
</style>
