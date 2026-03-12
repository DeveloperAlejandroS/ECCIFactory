/**
 * Radio ECCI — script.js
 * Liquid Glass · Tema claro/oscuro · Radio Browser API
 */

document.addEventListener('DOMContentLoaded', function () {

    /* =============================================
       1. AÑO EN FOOTER
    ============================================= */
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();


    /* =============================================
       2. TEMA CLARO / OSCURO
    ============================================= */
    var html = document.documentElement;
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');

    // Leer preferencia guardada o del sistema
    var saved = localStorage.getItem('reccitheme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var currentTheme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
        try { localStorage.setItem('reccitheme', theme); } catch (e) { }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('reccitheme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });


    /* =============================================
       3. MENÚ HAMBURGUESA
    ============================================= */
    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            var open = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!open));
            navMenu.classList.toggle('open', !open);
            document.body.style.overflow = !open ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
                menuToggle.focus();
            }
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }


    /* =============================================
       4. HEADER — sombra al scroll
    ============================================= */
    var siteHeader = document.getElementById('siteHeader');
    if (siteHeader) {
        window.addEventListener('scroll', function () {
            siteHeader.style.boxShadow = window.scrollY > 12
                ? '0 4px 30px rgba(0,0,0,0.25)'
                : 'none';
        }, { passive: true });
    }


    /* =============================================
       5. NAV ACTIVO con IntersectionObserver
    ============================================= */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('#nav-menu a');

    if ('IntersectionObserver' in window && navLinks.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = '#' + entry.target.id;
                    navLinks.forEach(function (link) {
                        var active = link.getAttribute('href') === id;
                        link.setAttribute('aria-current', active ? 'true' : 'false');
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        sections.forEach(function (s) { io.observe(s); });
    }


    /* =============================================
       6. REPRODUCTOR — Salsa Radio (streams hardcodeados)
       Sin API key · Sin dependencias externas
       Lista de fallbacks HTTPS: si uno falla, prueba el siguiente
    ============================================= */

    // Streams HTTPS de salsa conocidos y confiables
    var STATIONS = [
        { name: 'Salsa Total', tags: 'Salsa · Cumbia · Latino', url: 'https://stream.zeno.fm/yn65m6v4g8zuv' },
        { name: 'Radio Latina', tags: 'Salsa · Merengue · Bachata', url: 'https://stream.zeno.fm/fg8yjmxrp0zuv' },
        { name: 'Tropicana CO', tags: 'Salsa · Tropical · Colombia', url: 'https://playerservices.streamtheworld.com/api/livestream-redirect/TROPICANA_SC' },
        { name: 'La Salsa+', tags: 'Salsa dura · Clásica', url: 'https://stream.zeno.fm/3mhzxq6nv8zuv' }
    ];

    var stIdx = 0;   // índice del stream actual
    var playing = false;

    var audio = document.getElementById('radioAudio');
    var btnPlay = document.getElementById('btnPlay');
    var volRange = document.getElementById('volumeRange');
    var stName = document.getElementById('stationName');
    var stTags = document.getElementById('stationTags');
    var stStatus = document.getElementById('playerStatus');
    var liveTag = document.getElementById('liveTag');
    var waveEl = document.getElementById('waveContainer');
    var iconPlay = document.getElementById('iconPlay');
    var iconPause = document.getElementById('iconPause');

    if (!audio || !btnPlay) return;

    audio.volume = parseFloat(volRange ? volRange.value : 0.8);

    /* Cargar un stream por índice */
    function loadStream(idx) {
        stIdx = idx % STATIONS.length;
        var s = STATIONS[stIdx];
        audio.src = s.url;
        if (stName) stName.textContent = s.name;
        if (stTags) stTags.textContent = s.tags;
        if (stStatus) stStatus.textContent = 'Cargando…';
    }

    /* Intentar reproducir; si falla probar el siguiente fallback */
    function tryPlay() {
        if (stIdx >= STATIONS.length) {
            if (stStatus) stStatus.textContent = 'Sin streams disponibles ahora';
            setPlaying(false);
            return;
        }
        if (stStatus) stStatus.textContent = 'Conectando…';
        var p = audio.play();
        if (p) {
            p.catch(function (e) {
                console.warn('Stream', STATIONS[stIdx].name, 'fallo:', e.name);
                if (e.name === 'NotAllowedError') {
                    // Autoplay bloqueado por el navegador — es OK, esperar clic
                    if (stStatus) stStatus.textContent = 'Presiona ▶ para reproducir';
                    setPlaying(false);
                } else {
                    // Stream no funciona → siguiente fallback
                    loadStream(stIdx + 1);
                    tryPlay();
                }
            });
        }
    }

    /* Estado visual */
    function setPlaying(on) {
        playing = on;
        if (iconPlay) iconPlay.style.display = on ? 'none' : 'block';
        if (iconPause) iconPause.style.display = on ? 'block' : 'none';
        btnPlay.setAttribute('aria-label', on ? 'Pausar' : 'Reproducir');
        btnPlay.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (waveEl) waveEl.classList.toggle('playing', on);
        if (liveTag) liveTag.style.display = on ? 'flex' : 'none';
    }

    /* Eventos del audio */
    audio.addEventListener('playing', function () {
        setPlaying(true);
        if (stStatus) stStatus.textContent = 'En vivo';
    });
    audio.addEventListener('waiting', function () {
        if (stStatus) stStatus.textContent = 'Buffering…';
    });
    audio.addEventListener('pause', function () {
        setPlaying(false);
        if (stStatus) stStatus.textContent = 'En pausa';
    });
    audio.addEventListener('error', function () {
        if (playing) {
            // Error de red en mitad de la reproducción → siguiente fallback
            if (stStatus) stStatus.textContent = 'Error — buscando alternativa…';
            loadStream(stIdx + 1);
            tryPlay();
        } else {
            if (stStatus) stStatus.textContent = 'Error de stream';
        }
    });

    /* Botón Play / Pause */
    btnPlay.addEventListener('click', function () {
        if (!audio.paused && !audio.ended) {
            audio.pause();
        } else {
            if (!audio.src) loadStream(0);
            tryPlay();
        }
    });

    /* Volumen */
    if (volRange) {
        volRange.addEventListener('input', function () {
            audio.volume = parseFloat(this.value);
        });
    }

    /* Cargar el primer stream al iniciar (sin reproducir — esperar clic del usuario) */
    loadStream(0);
    if (stStatus) stStatus.textContent = 'Listo — presiona ▶';


});