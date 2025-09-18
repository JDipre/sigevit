<template>
    <v-app>
        <!-- BARRA SUPERIOR -->
        <v-app-bar app color="#024059" dark flat>
            <v-icon class="ml-4" @click="showMenu = !showMenu">mdi-menu</v-icon>
            <div class="d-flex flex-column pa-4">
                <span class="text-h6 font-weight-bold">SIGEVIT</span>
                <span class="">Sistema de Gestión de Víctimas de Trata</span>
            </div>

            <v-spacer></v-spacer>

            <!--   BUSCADOR CENTRAL  -->
            <v-text-field v-model="busqueda" hide-details flat dense append-inner-icon="mdi-magnify"
                placeholder="Búsqueda" style="max-width: 300px" class="mr-4" color="white" />

            <!-- PERFIL USUARIO -->
            <list text>
                <v-list-item>
                    <v-list-item-title> Joan Dipré</v-list-item-title>
                    <v-list-item-subtitle> Administrador </v-list-item-subtitle>
                </v-list-item>
            </list>


            <template v-slot:append>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn icon color="white" v-bind="props">
                            <v-avatar image="@/assets/perfil.png" border></v-avatar>
                        </v-btn>
                    </template>
                    <v-list border="lg" bg-color="primary">
                        <template v-for="(opcion, index) in opciones" :key="index">
                            <v-divider v-if="index"></v-divider>
                            <v-list-item :class="opcion.clase" @click="opcion.fn" :prepend-icon="opcion.icon">

                                <v-list-item-title :class="opcion.clase">{{ opcion.title }}</v-list-item-title>
                                <template v-slot:append v-if="opcion.isBadge">
                                    <v-badge color="error" content="6" inline></v-badge>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>

        <!-- BARRA LATERAL COMO COMPONENTE -->
        <Sidebar v-model="showMenu" />

        <!-- CONTENIDO PRINCIPAL -->
        <v-main class="pa-5">
            <router-view />
        </v-main>


        <v-footer :app="false" class="d-flex px-2 py-2 pa-0 ga-2 justify-center text-caption " color="primary"
            border="t" style="max-height: 37px;">
            <p class="text-blue-grey-lighten-2"><strong>Versión:</strong> 2.51 <span>(Sin
                    programar)</span>
            </p>

            <p class="text-blue-grey-lighten-2"><strong>Última actualización:</strong>
                12/03/2024
            </p>
        </v-footer>
    </v-app>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
const router = useRouter();
const showMenu = ref(false);
const opciones = ref([
    { title: "Mi Perfil", icon: "mdi-account" },
    { title: "Notificaciones", isBadge: true, icon: "mdi-bell-ring" },
    {
        title: "Cerrar Sesión", clase: "text-secondary font-weight-bold", icon: "mdi-logout", fn: () => {
            localStorage.removeItem('token');
            router.push({ name: 'Login' });
        }
    },
])

const busqueda = ref('')
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