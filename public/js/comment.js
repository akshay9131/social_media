document.getElementById('submit').addEventListener('click', async function (event) {
    event.preventDefault();

    const postId = document.getElementById('submit').getAttribute('data-id');

    const formData = new FormData();
    formData.append('comment', document.getElementById('comment').value);


    try {
        const response = await fetch(`/create-comment/${postId}`, {
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