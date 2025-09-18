<template>
  <v-container fluid class="fill-height d-flex align-center justify-center" style="background-color: #024059">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-form v-model="valid">
          <v-card elevation="12" class="pa-6 rounded-lg">
            <v-card-title class="justify-center text-h5 font-weight-bold">
              Iniciar Sesión
            </v-card-title>

            <v-card-text>
              <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Correo electrónico"
                prepend-inner-icon="mdi-email" type="email" dense outlined clearable />
              <v-text-field :rules="[rules.required]" v-model="password" label="Contraseña"
                prepend-inner-icon="mdi-lock" type="password" dense outlined clearable />
            </v-card-text>

            <v-card-actions class="flex-column">
              <v-btn :disabled="!valid" color="primary" variant="flat" class="mb-2" block rounded @click="login">
                Ingresar
              </v-btn>
              <v-btn text color="grey darken-1" block rounded @click="forgotPassword">
                ¿Olvidaste tu contraseña?
              </v-btn>
            </v-card-actions>

            <v-divider class="my-4"></v-divider>

            <v-card-actions class="justify-center">
              <span>¿No tienes cuenta?</span>
              <v-btn text color="primary" @click="register">
                Registrarse
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="snackbar" :timeout="3000" color="red" top right elevation="6">
    Por favor ingresa correo y contraseña
    <template #actions>
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const router = useRouter();
const email = ref('');
const password = ref('');
const valid = ref(false);
const snackbar = ref(false);

const rules = {
  required: v => !!v || 'Este campo es obligatorio',
  email: v => /.+@.+\..+/.test(v) || 'Debe ser un correo válido'
}

const login = async () => {
  if (!email.value || !password.value) {
    snackbar.value = true;
    return;
  }

  const { data } = await axios.post('http://localhost:3001/api/users/login', {
    correo: email.value,
    password: password.value
  })
  console.log('data', data);
  // // Simulación de login
  // localStorage.setItem('token', 'fake-token');
  // router.push({ name: 'Home' });
};

const forgotPassword = () => {
  alert('Funcionalidad de recuperar contraseña');
};

const register = () => {
  router.push({ name: 'Register' }); // si tienes vista de registro
};
</script>

<style scoped>
.fill-height {
  height: 100vh !important;
}
</style>
