<script setup>
import Recorrido from '../components/MapSanJuanDios.vue'
import { computed } from 'vue';

// Obtenemos la hora actual y calculamos el texto a mostrar
const texto = computed(() => {
  const horaActual = new Date().getHours(); // Obtiene la hora actual (0-23)
  if (horaActual >= 13 && horaActual < 14) {
    return 'Recorrido procesional en tiempo real'; // Texto para el rango de tiempo
  } else {
    return 'Recorrido procesional'; // Texto para otros horarios
  }
});
</script>

<template>
    <div class="textoTitulo">
        <h1>RECORRIDO PROCESIONAL SAN JUAN DE DIOS</h1>
        <h2>Hermandad de jesus nazareno del templo San juan de Dios</h2>
    </div>
    <div class="textoInformacion">
        <p>Hora de salida: 6:45am</p>
        <p>Hora de entrada: 2:00pm</p>
    </div>
    <div class="texto-recorrido">
        <p>{{ texto }}</p>
        <p class="advertencia">* Esta estimacion esta basada en los datos proporcionados por la hermandad de jesus nazareno del templo San Juan de Dios, puede sufrir retrasos</p>
    </div>
    <div class="cuadro">
        <Recorrido />
    </div>
</template>



<style scoped>
/* Fondo blanco */
body {
  background-color: #f2e5c4 ; /* Fondo de la página */
  margin: 0;
  padding: 0;
  font-family: 'serif'; /* Cambia el tipo de letra a serif */
}

.textoTitulo {
  text-align: center; /* Centra el texto horizontalmente */
  font-family: 'serif'; /* Cambia el tipo de letra */
  margin-top: 40px; /* Baja el texto desde la parte superior */
}

.textoTitulo h1 {
  font-weight: bold; /* Hace que el h1 sea negrita */
  color: purple; /* Cambia el color a morado */
}

.textoTitulo h2 {
  font-weight: bold; /* Hace que el h2 sea negrita */
  color: purple; /* Cambia el color a morado */
}

.textoInformacion {
  text-align: center; /* Centra el texto horizontalmente */
  font-family: 'serif'; /* Cambia el tipo de letra */
  font-size: 18px; /* Cambia el tamaño de la fuente */
  color: goldenrod; /* Cambia el color a dorado */
}

.texto-recorrido {
  text-align: center; /* Centra el texto horizontalmente */
  font-family: 'serif'; /* Cambia el tipo de letra */
  margin-top: 85px; /* Baja el texto desde la parte superior */
  font-size: 20px; /* Cambia el tamaño de la fuente */
  font-weight: bold; /* Hace que el texto sea negrita */
  color: purple; /* Cambia el color a morado */
}

.advertencia {
  font-size: 10px; /* Cambia el tamaño de la fuente */
  font-style: italic; /* Aplica cursiva */
  color: goldenrod; /* Cambia el color a dorado */
}

.cuadro {
  width: 800px;
  height: 350px;
  border: 2px solid purple; /* Cambia el borde a morado */
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  bottom: 20px; /* Lo posiciona en la parte inferior */
  left: 50%; /* Lo centra horizontalmente */
  transform: translateX(-50%); /* Ajusta el centro horizontal */
  background: white; /* Fondo blanco */
}
@media (max-width: 768px) {
  .textoTitulo h1 {
    font-size: 18px;
  }

  .textoTitulo h2 {
    font-size: 16px;
  }

  .cuadro {
    width: 90%;
  }
}
</style>