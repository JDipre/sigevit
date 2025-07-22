<template>
  <v-container class="recursos-container mt-12">
    <!-- Encabezado -->
    <v-card class="mb-4 elevation-3">
      <v-card-title class="bg-sigevit-green text-white">
        <v-icon left>mdi-folder-multiple-outline</v-icon>
        Recursos para la Gestión de Casos
      </v-card-title>
      <v-card-text>
        En esta sección encontrarás documentos útiles, plantillas, formularios y guías de apoyo para facilitar el trabajo en la gestión de casos.
      </v-card-text>
    </v-card>

    <!-- Documentos disponibles -->
    <v-card class="elevation-2">
      <v-card-title class="bg-warning d-flex justify-space-between align-center text-black">
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-file-document-multiple-outline</v-icon>
          <span class="font-weight-bold">Documentos Disponibles</span>
        </div>
        <div class="d-flex align-center">
          <v-icon small class="mr-1">mdi-download</v-icon>
          <span class="text-caption font-weight-bold">DESCARGAR</span>
        </div>
      </v-card-title>

      <v-list dense class="pa-2">
        <v-list-item
          v-for="(recurso, index) in recursos"
          :key="index"
          class="px-4"
        >
          <div class="d-flex justify-space-between align-center w-100">
            <span class="text-body-2 font-weight-medium text-uppercase">
              {{ limpiarNombre(recurso.nombre) }}
            </span>
            <v-btn
              :href="recurso.url"
              icon
              target="_blank"
              download
              :title="`Descargar ${recurso.tipo.toUpperCase()}`"
            >
              <v-icon :color="iconColor(recurso.tipo)">
                {{ iconName(recurso.tipo) }}
              </v-icon>
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Recursos',
  data() {
    return {
      recursos: [
        { nombre: 'CONSENTIMIENTO INFORMADO.docx', url: '/archivos/CONSENTIMIENTO%20INFORMADO.docx', tipo: 'docx' },
        { nombre: 'CONSENTIMIENTO INFORMADO.pdf', url: '/archivos/CONSENTIMIENTO%20INFORMADO.pdf', tipo: 'pdf' },
        { nombre: 'EVALUACION DE NECESIDADES.docx', url: '/archivos/EVALUACION%20DE%20NECESIDADES.docx', tipo: 'docx' },
        { nombre: 'EVALUACION DEL SOBREVIVIENTE.docx', url: '/archivos/EVALUACION%20DEL%20SOBREVIVIENTE.docx', tipo: 'docx' },
        { nombre: 'FORMULARIO ENTREVISTA INICIAL.docx', url: '/archivos/FORMULARIO%20ENTREVISTA%20INICIAL.docx', tipo: 'docx' },
        { nombre: 'FORMULARIO ENTREVISTA INICIAL.pdf', url: '/archivos/FORMULARIO%20ENTREVISTA%20INICIAL.pdf', tipo: 'pdf' },
        { nombre: 'FORMULARIO DE ESTUDIO DOMICILIARIO.docx', url: '/archivos/FORMULARIO%20DE%20ESTUDIO%20DOMICILIARIO.docx', tipo: 'docx' },
        { nombre: 'INFORME DE SEGUIMIENTO.docx', url: '/archivos/INFORME%20DE%20SEGUIMIENTO.docx', tipo: 'docx' },
        { nombre: 'PLAN DE TRATAMIENTO CASOS DE EXPLOTACIÓN SEXUAL COMERCIAL DE NNA.docx', url: '/archivos/PLAN%20DE%20TRATAMIENTO%20CASOS%20DE%20EXPLOTACIÓN%20SEXUAL%20COMERCIAL%20DE%20NNA.docx', tipo: 'docx' }
      ]
    };
  },
  methods: {
    iconColor(tipo) {
      return tipo === 'pdf' ? 'red' : 'blue';
    },
    iconName(tipo) {
      return tipo === 'pdf' ? 'mdi-file-pdf-box' : 'mdi-file-word-box';
    },
    limpiarNombre(nombre) {
      return nombre.replace(/\.(docx|pdf)$/i, '').replace(/%20/g, ' ');
    }
  }
};
</script>

<style scoped>
.recursos-container {
  margin-left: 280px; /* Alineado con el layout del sistema */
  padding: 24px;
}

.bg-sigevit-green {
  background-color: #0f3c4b !important;
}
</style>
