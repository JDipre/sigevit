<template>
  <v-app>
<!-- BARRA SUPERIOR -->
<v-app-bar app color="#024059" dark flat>
  <div class="d-flex flex-column">
    <span class="text-h6 font-weight-bold">SIGEVIT</span>
    <span class="text-caption">Sistema de Gestión de Víctimas de Trata</span>
  </div>
  
  <v-spacer></v-spacer>

  <!-- BUSCADOR CENTRAL 
  <v-text-field
    v-model="busqueda"
    hide-details
    flat
    dense
    rounded
    append-inner-icon="mdi-magnify"
    placeholder="Búsqueda"
    style="max-width: 300px"
    class="mr-4"
    color="white"
  />
  -->

  <!-- PERFIL USUARIO -->
  <v-avatar size="32" class="mr-2">
    <img src="@/assets/image1.png" alt="avatar" />
  </v-avatar>
  <span class="white--text font-weight-bold">Joan Dipré</span>
  <v-chip color="#F2B705" class="ml-2" label small>Administrador</v-chip>
</v-app-bar>

    <!-- BARRA LATERAL COMO COMPONENTE -->
    <Sidebar />

    <!-- CONTENIDO PRINCIPAL -->
    <v-main class="pa-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

// const busqueda = ref('')
// const route = useRoute()
</script>

<style scoped>
.v-list-item__prepend {
  margin-right: 6px !important;
}

.v-list-item__content {
  margin-left: -4px;
}

.active-link {
  background-color: #F77F00 !important;
  color: #012D3A !important;
  font-weight: bold;
}
</style>

