<template>
  <v-container class="content-wrapper">
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="bg-primary text-white">
            <v-icon left class="mr-2">mdi-help-circle</v-icon>
            Ayuda y Soporte
          </v-card-title>
          <v-card-text>
            <v-alert type="info" border="left" elevation="2" class="mb-4">
              Si necesitas asistencia o tienes dudas sobre el uso del sistema SIGEVIT, aquí encontrarás información útil y formas de contactarnos.
            </v-alert>

            <!-- Sección de preguntas frecuentes -->
            <v-expansion-panels>
              <v-expansion-panel v-for="(faq, i) in faqs" :key="i">
                <v-expansion-panel-title>{{ faq.pregunta }}</v-expansion-panel-title>
                <v-expansion-panel-text>{{ faq.respuesta }}</v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <!-- Contacto directo -->
            <v-card class="mt-6">
              <v-card-title>¿Necesitas más ayuda?</v-card-title>
              <v-card-text>
                Puedes comunicarte con el equipo de soporte a través de los siguientes medios:
                <ul>
                  <li><strong>Correo electrónico:</strong> soporte@sigevit.org</li>
                  <li><strong>Teléfono:</strong> +1 (829) 504-2701</li>
                  <li><strong>Horario de atención:</strong> Lunes a Viernes, 8:00 a.m. - 5:00 p.m.</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const faqs = [
  {
    pregunta: '¿Cómo puedo registrar un nuevo caso?',
    respuesta: 'Desde el menú lateral, haz clic en "Gestión de Casos" y luego en el botón "Registrar nuevo caso".'
  },
  {
    pregunta: '¿Dónde puedo ver el historial de un caso?',
    respuesta: 'Accede a la lista de casos, haz clic en "Ver caso" para acceder al resumen con todos los detalles y seguimientos.'
  },
  {
    pregunta: '¿Cómo puedo editar información de un caso?',
    respuesta: 'En la vista de resumen del caso encontrarás el botón "Editar caso".'
  },
  {
    pregunta: '¿Quién puede eliminar un seguimiento?',
    respuesta: 'Solo los usuarios administradores tienen permisos para eliminar seguimientos.'
  },
]
</script>

<style scoped>
ul {
  padding-left: 1.2rem;
}
li {
  margin-bottom: 6px;
}
</style>
