<template>
  <v-app>
    <!-- BARRA SUPERIOR -->
    <v-app-bar app color="#024059" dark flat>
      <v-toolbar-title>SIGEVIT</v-toolbar-title>

      <v-spacer />

      <!-- BUSCADOR CENTRAL -->
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

      <!-- PERFIL USUARIO -->
      <v-avatar size="32" class="mr-2">
        <img src="@/assets/image1.png" alt="avatar" />
      </v-avatar>
      <span class="white--text font-weight-bold">Joan Dipré</span>
      <v-chip color="#F2B705" class="ml-2" label small>Administrador</v-chip>
    </v-app-bar>

    <!-- BARRA LATERAL -->
    <v-navigation-drawer app color="#012D3A" dark>
      <v-list nav dense density="compact">
        <!-- Menú superior -->
        <v-list-item to="/" prepend-icon="mdi-home" :active="route.name === 'Inicio'" active-class="active-link">
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>

        <v-list-item to="/casos" prepend-icon="mdi-folder" :active="route.name === 'Casos'" active-class="active-link">
          <v-list-item-title>Gestión de Casos</v-list-item-title>
        </v-list-item>

        <v-list-item to="/victimas" prepend-icon="mdi-account-group" :active="route.name === 'Victimas'" active-class="active-link">
          <v-list-item-title>Gestión de Víctimas</v-list-item-title>
        </v-list-item>

        <v-list-item to="/reportes" prepend-icon="mdi-file-chart" :active="route.name === 'Reportes'" active-class="active-link">
          <v-list-item-title>Reportes</v-list-item-title>
        </v-list-item>
      </v-list>

      <!-- Separador visual -->
      <v-divider class="my-4" color="white" />

      <!-- Menú inferior -->
      <v-list nav dense density="compact">
        <v-list-item to="/notificaciones" prepend-icon="mdi-bell" :active="route.name === 'Notificaciones'" active-class="active-link">
          <v-list-item-title>Notificaciones</v-list-item-title>
        </v-list-item>

        <v-list-item to="/configuracion" prepend-icon="mdi-cog" :active="route.name === 'Configuracion'" active-class="active-link">
          <v-list-item-title>Configuración</v-list-item-title>
        </v-list-item>

        <v-list-item to="/logout" prepend-icon="mdi-logout" active-class="active-link">
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>

        <v-list-item to="/ayuda" prepend-icon="mdi-help-circle" :active="route.name === 'Ayuda'" active-class="active-link">
          <v-list-item-title>Ayuda y Soporte</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- CONTENIDO PRINCIPAL -->
    <v-main class="pa-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const busqueda = ref('')
const route = useRoute()
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
