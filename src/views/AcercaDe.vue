<template>
  <v-container class="content-wrapper">
    <v-card class="mb-4">
      <v-card-title class="bg-primary text-white">
        <v-icon left>mdi-information-outline</v-icon>
        Acerca de SIGEVIT
      </v-card-title>
      <v-card-text>
        <p>
          <strong>SIGEVIT</strong> es un Sistema de Gestión de Casos para Víctimas de Trata de Personas, creado con el propósito de facilitar la documentación, seguimiento, coordinación interinstitucional y protección de personas afectadas por esta problemática.
        </p>
        <p>
          Este sistema permite registrar información detallada de cada caso, realizar seguimientos continuos, generar reportes estratégicos y acceder a recursos clave para la intervención.
        </p>

        <v-divider class="my-4" />
        <h4>Módulos del Sistema:</h4>
        <ul>
          <li><strong>Gestión de Casos:</strong> Registro, edición, seguimiento y visualización de casos.</li>
          <li><strong>Reportes:</strong> Análisis y exportación de datos por filtros.</li>
          <li><strong>Recursos:</strong> Plantillas, guías y formularios para la gestión.</li>
          <li><strong>Notificaciones:</strong> Avisos importantes del sistema.</li>
          <li><strong>Configuración:</strong> Ajustes del sistema y gestión de usuarios.</li>
          <li><strong>Ayuda y Soporte:</strong> Información técnica y contacto para asistencia.</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
// Este componente es informativo, no requiere lógica por ahora
</script>

<style scoped>
ul {
  padding-left: 1.2rem;
}
li {
  margin-bottom: 8px;
}
</style>
