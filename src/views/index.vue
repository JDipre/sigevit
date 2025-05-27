<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="text-h5 font-weight-bold mb-4">Casos activos</h2>
        <v-card class="pa-4">
          <!-- Aquí iría el gráfico de barras -->
          <div class="text-caption text-right">Filtrar por <strong>Provincia</strong></div>
          <v-skeleton-loader type="image" height="250px"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <h2 class="text-h5 font-weight-bold mb-4">Resumen de Casos</h2>
        <v-card class="pa-4 mb-4" color="#E0F7FA">
          <div class="text-h4 font-weight-bold">459</div>
          <div class="text-caption">Casos cerrados<br><small class="text-success">10% más que el año pasado</small></div>
        </v-card>
        <v-card class="pa-4 mb-4" color="#FFE0B2">
          <div class="text-h4 font-weight-bold">15</div>
          <div class="text-caption">Casos Críticos<br><small class="text-error">10% menos que el año pasado</small></div>
        </v-card>
        <v-card class="pa-4" color="#212121" dark>
          <div class="text-h4 font-weight-bold">6.5%</div>
          <div class="text-caption">Total Ratings<br><small class="text-info">Hasta 7% más que el año pasado</small></div>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <h2 class="text-h5 font-weight-bold mb-4">Víctimas registradas</h2>
        <v-card class="pa-4">
          <!-- íconos representando personas -->
          <div class="d-flex align-center">
            <v-icon v-for="n in 7" :key="n" color="blue-grey lighten-1">mdi-account</v-icon>
            <v-icon v-for="n in 3" :key="'m' + n" color="orange">mdi-account</v-icon>
          </div>
          <p class="mt-2 text-caption">Femeninas y Masculinos</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <div class="text-center">
            <!-- Círculo con porcentaje -->
            <v-progress-circular :value="70" size="100" width="10" color="primary">
              70%
            </v-progress-circular>
            <div class="mt-2 text-caption">En promedio, 7 de cada 10 víctimas son <strong>Femeninas</strong></div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.text-caption {
  font-size: 0.8rem;
  line-height: 1.2;
}
</style>
