document.addEventListener('DOMContentLoaded', async function () {
    const nameInput = document.getElementById('nameInput');
    const fullNameInput = document.getElementById('fullNameInput');
    const emailInput = document.getElementById('emailInput');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');
    const currentNumber = document.getElementById('currentNumber');
    const newNumber = document.getElementById('newNumber');
    const confirmNewNumber = document.getElementById('confirmNewNumber');

    async function getUserData() {
        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Token ekleyin
                }
            });

            if (response.ok) {
                const user = await response.json();
                nameInput.placeholder = user.name;
                fullNameInput.placeholder = user.fullName;
                emailInput.placeholder = user.email;

                // Formları temizle
                nameInput.value = '';
                fullNameInput.value = '';
                emailInput.value = '';
                currentPassword.value = '';
                newPassword.value = '';
                confirmNewPassword.value = '';
                currentNumber.value = '';
                newNumber.value = '';
                confirmNewNumber.value = '';
            } else {
                console.error('Kullanıcı bilgileri alınamadı.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    saveChangesBtn.addEventListener('click', async function () {
        const name = nameInput.value || nameInput.placeholder;
        const fullName = fullNameInput.value || fullNameInput.placeholder;
        const email = emailInput.value || emailInput.placeholder;
        const currentPasswordVal = currentPassword.value;
        const newPasswordVal = newPassword.value;
        const currentNumberVal = currentNumber.value;
        const newNumberVal = newNumber.value;
        const confirmNewNumberVal = confirmNewNumber.value;

        const updatedUser = {
            name: name,
            fullName: fullName,
            email: email,
            currentPassword: currentPasswordVal,
            newPassword: newPasswordVal,
            currentNumber: currentNumberVal,
            newNumber: newNumberVal,
            confirmNewNumber: confirmNewNumberVal,
            confirmNewPassword: confirmNewPassword.value
        };

        try {
            const response = await fetch('http://localhost:3000/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token') // Token ekleyin
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                alert('Bilgileriniz başarıyla güncellendi.');
                await getUserData(); // Formu yeniden doldur
            } else {
                const result = await response.json();
                alert('Hata: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    getUserData(); // Kullanıcı bilgilerini al ve formu doldur
});
