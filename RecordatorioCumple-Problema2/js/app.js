$(document).ready(function () {
    const birthdayList = JSON.parse(localStorage.getItem('birthdays')) || [];
    
    const updateBirthdayList = () => {
        $('#birthdayList').empty();
        birthdayList.sort((a, b) => new Date(a.date) - new Date(b.date));

        birthdayList.forEach(birthday => {
            const age = calculateAge(birthday.date);
            const li = `<li class="list-group-item d-flex justify-content-between align-items-center">
                ${birthday.name} - ${birthday.date} (${age} años) - ${birthday.relationship}
                <img src="${birthday.photo}" alt="Foto" class="friend-photo ml-2">
                <button class="btn btn-danger btn-sm deleteBtn" data-name="${birthday.name}">Eliminar</button>
            </li>`;
            $('#birthdayList').append(li);
        });
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    $('#birthdayForm').on('submit', function (event) {
        event.preventDefault();
        const name = $('#friendName').val();
        const date = $('#birthdayDate').val();
        const relationship = $('#relationship').val();
        const photoFile = $('#friendPhoto')[0].files[0];
        const photoPromise = photoFile ? readImage(photoFile) : Promise.resolve('');

        photoPromise.then(photo => {
            birthdayList.push({ name, date, relationship, photo });
            localStorage.setItem('birthdays', JSON.stringify(birthdayList));
            $('#friendName').val('');
            $('#birthdayDate').val('');
            $('#relationship').val('');
            $('#friendPhoto').val('');
            updateBirthdayList();
        });
    });

    $('#clearAll').on('click', function () {
        localStorage.removeItem('birthdays');
        birthdayList.length = 0;
        updateBirthdayList();
    });

    $('#birthdayList').on('click', '.deleteBtn', function () {
        const name = $(this).data('name');
        const index = birthdayList.findIndex(b => b.name === name);
        if (index !== -1) {
            birthdayList.splice(index, 1);
            localStorage.setItem('birthdays', JSON.stringify(birthdayList));
            updateBirthdayList();
        }
    });

    const readImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    };

    updateBirthdayList();
});
