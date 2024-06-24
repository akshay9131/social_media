document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('name', document.getElementById('username').value);
    formData.append('mobile', document.getElementById('mobile').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('profile_picture', document.getElementById('profile_picture').files[0]);


    try {
        const response = await fetch('/sign-up', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/loginscreen';
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        alert('An unexpected error occurred.');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const profilePictureInput = document.getElementById('profile_picture');
    const profilePicturePreview = document.getElementById('profile-picture-preview');

    profilePicturePreview.addEventListener('click', function() {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicturePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});