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