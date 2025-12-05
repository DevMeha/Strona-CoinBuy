document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.querySelector('.btn_profile');
    const profileOverlay = document.getElementById('profile-overlay');
    const closeProfileButton = document.getElementById('close-profile');

    if (profileButton && profileOverlay && closeProfileButton) {
        // Show the profile overlay
        profileButton.addEventListener('click', function() {
            profileOverlay.classList.add('show');
        });

        // Hide the profile overlay when the close button is clicked
        closeProfileButton.addEventListener('click', function() {
            profileOverlay.classList.remove('show');
        });

        // Hide the profile overlay when clicking outside the modal
        profileOverlay.addEventListener('click', function(event) {
            if (event.target === profileOverlay) {
                profileOverlay.classList.remove('show');
            }
        });
    }
});