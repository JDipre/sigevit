<template>
  <v-navigation-drawer app color="#012D3A" dark v-model="showMenu">
    <v-list nav dense density="compact">
      <!-- Menú superior -->
      <v-list-item to="/app/home" prepend-icon="mdi-home" :active="router.name === 'Home'" active-class="active-link">
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>

      <v-list-item to="/app/casos" prepend-icon="mdi-folder" :active="router.name === 'Casos'"
        active-class="active-link">
        <v-list-item-title>Gestión de Casos</v-list-item-title>
      </v-list-item>

      <v-list-item to="/app/reportes" prepend-icon="mdi-file-chart" :active="router.name === 'Reportes'"
        active-class="active-link">
        <v-list-item-title>Reportes</v-list-item-title>
      </v-list-item>

      <v-list-item to="/app/recursos" prepend-icon="mdi-cloud-upload" :active="router.name === 'Recursos'"
        active-class="active-link">
        <v-list-item-title>Recursos</v-list-item-title>
      </v-list-item>


      <v-list-item to="/app/home" prepend-icon="mdi-bell" :active="router.name === 'Notificaciones'"
        active-class="active-link">
        <v-list-item-title>Notificaciones</v-list-item-title>
      </v-list-item>
    </v-list>

    <!-- Separador visual -->
    <v-divider color="white" />

    <!-- Menú inferior -->
    <v-list nav dense density="compact">
      <v-list-subheader class="text-white">Opciones de Sistema</v-list-subheader>
      <v-list-item to="/app/configuracion" prepend-icon="mdi-cog" :active="router.name === 'Configuracion'"
        active-class="active-link">
        <v-list-item-title>Configuración</v-list-item-title>
      </v-list-item>
      <v-list-item to="/app/ayuda" prepend-icon="mdi-help-circle" :active="router.name === 'Ayuda'"
        active-class="active-link">
        <v-list-item-title>Ayuda y Soporte</v-list-item-title>
      </v-list-item>
      <v-list-item to="/app/acerca" prepend-icon="mdi-information-outline" :active="router.name === 'Acerca'"
        active-class="active-link">
        <v-list-item-title>Acerca de</v-list-item-title>
      </v-list-item>
    </v-list>
    <template #append>
      <v-divider color="white" />
      <v-list-item @click="logOut" prepend-icon="mdi-logout" active-class="active-link">
        <v-list-item-title>Cerrar Sesión</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useRoute } from 'vue-router'
const router = useRoute()
const showMenu = ref(false)
const props = defineProps({
  valueModel: {
    type: Boolean,
    required: true
  }
});


const logOut = () => {
  localStorage.removeItem('token');
  router.push({ name: 'Login' });
}

watch(showMenu, (newX) => {
  console.log(newX)
  emit('update:valueModel', newX);
})

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
