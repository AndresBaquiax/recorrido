<script setup>
import Recorrido from '../components/MapSanJuanDios.vue'
import { computed } from 'vue';

// Obtenemos la hora actual y calculamos el texto a mostrar
const texto = computed(() => {
  const horaActual = new Date().getHours(); // Obtiene la hora actual (0-23)
  const minutosActual = new Date().getMinutes(); // Obtiene los minutos actuales (0-59)
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
.textoTitulo {
  text-align: center; /* Centra el texto horizontalmente */
  font-family: 'Arial', sans-serif; /* Cambia el tipo de letra */
  margin-top: 40px; /* Baja el texto 20px desde la parte superior */
}

.textoTitulo h1 {
  font-weight: bold; /* Hace que el h1 sea negrita */
}

.textoTitulo h2 {
  font-weight: bold; /* Opcional: asegura que el h2 no sea negrita */
}
.textoInformacion {
    text-align: center; /* Centra el texto horizontalmente */
    font-family: 'Arial', sans-serif; /* Cambia el tipo de letra */
    font-size: 18px; /* Cambia el tamaño de la fuente */
}
.texto-recorrido {
    text-align: center; /* Centra el texto horizontalmente */
    font-family: 'Arial', sans-serif; /* Cambia el tipo de letra */
    margin-top: 85px; /* Baja el texto 20px desde la parte superior */
    font-size: 20px; /* Cambia el tamaño de la fuente */
    font-weight: bold; /* Hace que el h1 sea negrita */
}
.advertencia {
    font-size: 10px; /* Cambia el tamaño de la fuente */
    font-style: italic; /* Aplica cursiva */
}
.cuadro {
    width: 800px;
    height: 350px;
    border: 2px solid #000;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    /* Fija el elemento en la pantalla */
    bottom: 20px;
    /* Lo posiciona en la parte inferior */
    left: 50%;
    /* Lo centra horizontalmente */
    transform: translateX(-50%);
    /* Ajusta el centro horizontal */
    background: white;
    /* Opcional: establece un fondo para mayor claridad */
}

</style>