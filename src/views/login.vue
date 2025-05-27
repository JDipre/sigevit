<template>
  <v-container fluid fill-height class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-6">
          <v-card-title class="text-h5 font-weight-bold mb-4 text-center">
            Iniciar sesión en SIGEVIT
          </v-card-title>

          <v-form @submit.prevent="login" ref="form">
            <v-text-field
              label="Correo electrónico"
              v-model="email"
              type="email"
              :rules="[rules.required, rules.email]"
              prepend-inner-icon="mdi-email"
              outlined
              dense
              required
            ></v-text-field>

            <v-text-field
              label="Contraseña"
              v-model="password"
              type="password"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-lock"
              outlined
              dense
              required
            ></v-text-field>

            <v-btn
              color="primary"
              block
              class="mt-4"
              type="submit"
            >
              Iniciar sesión
            </v-btn>
          </v-form>

          <v-alert
            v-if="error"
            type="error"
            class="mt-4"
            dense
            text
          >
            {{ error }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const form = ref(null)

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  email: v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido'
}

const login = () => {
  error.value = ''

  if (email.value === 'admin' && password.value === '123456') {
    // Redirige al Home
    router.push('/')
  } else {
    error.value = 'Credenciales incorrectas. Intente nuevamente.'
  }
}

</script>

<style scoped>
.login-container {
  background-color: #f2f2f2;
}
</style>
