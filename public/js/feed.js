document.addEventListener('DOMContentLoaded', async () => {
    const profileDiv = document.getElementById('pp');

    try {
        const response = await fetch('/get-user-profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.data) {
            const user = result.data;

            profileDiv.innerHTML = `<img src="${user.profile_picture}" alt="">
            `;
        } else {
            profileDiv.innerHTML = `<p>No user data found</p>`;
        }
        
    } catch (error) {
        profileDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});