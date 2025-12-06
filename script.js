document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    //  PROFIL MODAL
    // ============================================

    const profileButton = document.querySelector('.btn_profile');
    const profileOverlay = document.getElementById('profile-overlay');
    const closeProfileButton = document.getElementById('close-profile');

    if (profileButton && profileOverlay && closeProfileButton) {
        profileButton.addEventListener('click', function() {
            profileOverlay.classList.add('show');
        });

        closeProfileButton.addEventListener('click', function() {
            profileOverlay.classList.remove('show');
        });

        profileOverlay.addEventListener('click', function(event) {
            if (event.target === profileOverlay) {
                profileOverlay.classList.remove('show');
            }
        });
    }

    // ============================================
    //  KONTAKT MODAL
    // ============================================

    const contactButton = document.querySelector('.btn_contact');
    const contactOverlay = document.getElementById('contact-overlay');
    const closeContactButton = document.getElementById('close-contact');
    const contactContent = document.getElementById('contact-content');

    function generateRandomContact() {
        const phones = ["+48 600 234 555", "+48 502 992 110", "+48 789 229 331", "+48 513 882 552", "+48 690 551 100"];
        const streets = ["ul. Lipowa 12", "ul. Miodowa 44", "ul. Kwiatowa 8", "ul. Słoneczna 19", "ul. Jesionowa 2"];
        const cities = ["Warszawa", "Kraków", "Gdańsk", "Poznań", "Wrocław"];
        const emails = ["kontakt@coinbuy.pl", "support@coinbuy.pl", "biuro@coinbuy.pl", "helpdesk@coinbuy.pl"];

        return {
            phone: phones[Math.floor(Math.random() * phones.length)],
            street: streets[Math.floor(Math.random() * streets.length)],
            city: cities[Math.floor(Math.random() * cities.length)],
            email: emails[Math.floor(Math.random() * emails.length)]
        };
    }

    if (contactButton && contactOverlay && closeContactButton) {

        contactButton.addEventListener('click', function() {
            const info = generateRandomContact();

            contactContent.innerHTML = `
                <p><strong>Telefon:</strong> ${info.phone}</p>
                <p><strong>Email:</strong> ${info.email}</p>
                <p><strong>Ulica:</strong> ${info.street}</p>
                <p><strong>Miasto:</strong> ${info.city}</p>
                <p><strong>Kraj:</strong> Polska</p>
            `;

            contactOverlay.classList.add('show');
        });

        closeContactButton.addEventListener('click', function() {
            contactOverlay.classList.remove('show');
        });

        contactOverlay.addEventListener('click', function(event) {
            if (event.target === contactOverlay) {
                contactOverlay.classList.remove('show');
            }
        });
    }

    // ============================================
    // ZEGAR W LEWYM GÓRNYM ROGU
    // ============================================

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const clock = document.getElementById('clock');
        if (clock) {
             clock.textContent = `Aktualna godzina: ${hours}:${minutes}:${seconds}`;
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

});
