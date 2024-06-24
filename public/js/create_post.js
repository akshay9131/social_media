document.addEventListener("DOMContentLoaded", function() {
    const profilePictureInput = document.getElementById('image');
    const profilePicturePreview = document.getElementById('image-preview');

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


document.getElementById('submit').addEventListener('click', async function(event) {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('image', document.getElementById('image').files[0]);


    try {
        const response = await fetch('/create-post', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            window.location.href = '/all-post';
        } else {
            alert('Error: ' + result.error);
        }

    } catch (error) {
        alert('An unexpected error occurred.');
    }
});