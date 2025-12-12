document.addEventListener('DOMContentLoaded', function() {
    const contactButton = document.querySelector('.btn_contact');
    const contactOverlay = document.getElementById('contact-overlay');
    const closeContactButton = document.getElementById('close-contact');

    if (contactButton && contactOverlay && closeContactButton) {
        // Otwieranie okna kontaktu: po kliknięciu przycisku dodaje klasę 'show' do nakładki
        contactButton.addEventListener('click', function() {
            contactOverlay.classList.add('show');
        });

        // Zamykanie okna kontaktu: po kliknięciu przycisku zamknij usuwa klasę 'show'
        closeContactButton.addEventListener('click', function() {
            contactOverlay.classList.remove('show');
        });

        // Zamykanie okna kontaktu: ukrywa nakładkę po kliknięciu w tło (poza oknem modalnym)
        contactOverlay.addEventListener('click', function(event) {
            if (event.target === contactOverlay) {
                contactOverlay.classList.remove('show');
            }
        });
    }
});
