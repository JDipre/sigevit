<template>
  <div>
    <!-- ...otros elementos del módulo Configuración -->

    <!-- Tabla de roles -->
    <v-data-table :items="roles" :headers="headersRoles">
      <template v-slot:item.acciones="{ item }">
        <v-btn icon @click="abrirModalEditarRol(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Modal de edición de rol -->
    <v-dialog v-model="modalEditarRol" max-width="800px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Editar Rol</v-card-title>
        <v-card-text>
          <v-text-field
            label="Nombre del Rol"
            v-model="rolSeleccionado.nombre"
            outlined dense class="mb-4"
          ></v-text-field>

          <div v-for="modulo in modulosDisponibles" :key="modulo.nombre" class="mb-4">
            <h4 class="text-subtitle-1 font-weight-medium mb-2">{{ modulo.nombre }}</h4>
            <v-row>
              <v-col cols="3" v-for="permiso in modulo.permisos" :key="permiso">
                <v-checkbox
                  v-model="rolSeleccionado.permisos[modulo.nombre]"
                  :label="permiso"
                  :value="permiso"
                  hide-details
                  dense
                />
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="modalEditarRol = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarCambiosRol">Actualizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalEditarRol: false,
      rolSeleccionado: {
        nombre: '',
        permisos: {} // Ej: { Casos: ['Ver', 'Editar'], Usuarios: ['Crear'] }
      },
      roles: [
        { id: 1, nombre: 'Administrador', permisos: { Casos: ['Ver', 'Crear', 'Editar', 'Eliminar'], Usuarios: ['Ver', 'Crear'], Reportes: ['Ver', 'Exportar'] } },
        { id: 2, nombre: 'Supervisor', permisos: { Casos: ['Ver'], Usuarios: ['Ver'], Reportes: [] } }
      ],
      headersRoles: [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Acciones', value: 'acciones', sortable: false }
      ],
      modulosDisponibles: [
        {
          nombre: 'Casos',
          permisos: ['Ver', 'Crear', 'Editar', 'Eliminar']
        },
        {
          nombre: 'Usuarios',
          permisos: ['Ver', 'Crear', 'Editar', 'Eliminar']
        },
        {
          nombre: 'Reportes',
          permisos: ['Ver', 'Exportar']
        },
        {
          nombre: 'Configuración',
          permisos: ['Ver', 'Modificar ajustes']
        }
      ]
    }
  },
  methods: {
    abrirModalEditarRol(rol) {
      this.rolSeleccionado = JSON.parse(JSON.stringify(rol)); // copia profunda
      this.modalEditarRol = true;
    },
    guardarCambiosRol() {
      const index = this.roles.findIndex(r => r.id === this.rolSeleccionado.id);
      if (index !== -1) {
        this.roles[index] = JSON.parse(JSON.stringify(this.rolSeleccionado));
      }
      this.modalEditarRol = false;
    }
  }
}
</script>

<style scoped>
h4 {
  margin-top: 16px;
  font-weight: 500;
}
</style>
