document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = document.querySelector('.btn_about');
    const aboutOverlay = document.getElementById('about-overlay');
    const closeAboutButton = document.getElementById('close-about');

    if (aboutButton && aboutOverlay && closeAboutButton) {
        // Otwieranie okna "O nas": po kliknięciu przycisku dodaje klasę 'show' do nakładki
        aboutButton.addEventListener('click', function() {
            aboutOverlay.classList.add('show');
        });

        // Zamykanie okna "O nas": po kliknięciu przycisku zamknij usuwa klasę 'show'
        closeAboutButton.addEventListener('click', function() {
            aboutOverlay.classList.remove('show');
        });

        // Zamykanie okna "O nas": ukrywa nakładkę po kliknięciu w tło (poza oknem modalnym)
        aboutOverlay.addEventListener('click', function(event) {
            if (event.target === aboutOverlay) {
                aboutOverlay.classList.remove('show');
            }
        });
    }
});
