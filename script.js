const reproductor = document.getElementById('reproductor');
const OnAir = document.getElementById('OnAir');
const Offline = document.getElementById('Offline');

reproductor.addEventListener('play', () => {
    // Cuando el reproductor está sonando (online)
    OnAir.style.display = 'block';
    Offline.style.display = 'none';
});

reproductor.addEventListener('pause', () => {
    // Cuando el reproductor está en pausa (offline)
    OnAir.style.display = 'none';
    Offline.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtén el reproductor de audio
    var audioPlayer = document.getElementById('reproductor');
    
    // Función para detectar si el reproductor de audio es oscuro
    function esReproductorOscuro() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Obtén la tarjeta
    var tarjeta = document.querySelector('.card');

    // Establece un color predeterminado para la tarjeta
    tarjeta.style.backgroundColor = '#f1f3f4'; // Fondo blanco por defecto

    // Si el reproductor de audio es oscuro, cambia el color de fondo de la tarjeta
    if (esReproductorOscuro()) {
        tarjeta.style.backgroundColor = '#1a1a1a'; // Fondo oscuro si el modo oscuro está activado
    }
});

