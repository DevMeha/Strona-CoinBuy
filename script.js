// PRZYCISKI NA STRONIE GŁÓWNEJ


document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.querySelector('.btn_profile');
    const profileOverlay = document.getElementById('profile-overlay');
    const closeProfileButton = document.getElementById('close-profile');

    if (profileButton && profileOverlay && closeProfileButton) {
        // Otwieranie okna profilu: po kliknięciu przycisku dodaje klasę 'show' do nakładki
        profileButton.addEventListener('click', function() {
            profileOverlay.classList.add('show');
        });

        // Zamykanie okna profilu: po kliknięciu przycisku zamknij usuwa klasę 'show'
        closeProfileButton.addEventListener('click', function() {
            profileOverlay.classList.remove('show');
        });

        // Zamykanie okna profilu: ukrywa nakładkę po kliknięciu w tło (poza oknem modalnym)
        profileOverlay.addEventListener('click', function(event) {
            if (event.target === profileOverlay) {
                profileOverlay.classList.remove('show');
            }
        });
    }
});