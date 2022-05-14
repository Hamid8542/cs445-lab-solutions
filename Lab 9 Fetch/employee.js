async function fetchSingleUser() {
    let responseBody = await fetch('https://randomuser.me/api/');
    let json = await responseBody.json();
    return json.results[0];
}

async function fetchUsers() {
    const users = [];
    for (let i = 0; i < 5; i++) {
        users[i] = await fetchSingleUser();
    }
    return users;
}

async function displayUserInHtml() {
    const employeeDiv = document.getElementById('employee-list');
    employeeDiv.innerHTML = '';
    const userArray = await fetchUsers(5);

    userArray.forEach(user => {
        let userInfo = ` <div class="col 4">
                           <img src="${user.picture.medium}" />
                         </div>
                         <div class="col 8">
                            <h4>${user.name.first} ${user.name.last}</h3>
                            <p>Date of Birth: ${user.dob.age} </p>
                            <p>phone: ${user.phone}</p>
                            <p>Email : ${user.email}</p>
                            <p>Street Number : ${user.location.street.number}, City : ${user.location.city}, Country : ${user.location.country}, Post Code : ${user.location.postcode}</p>
                         </div> `;
        
        const div = document.createElement('div');
        div.classList = 'row border-top';
        div.innerHTML = userInfo ;
        employeeDiv.appendChild(div);
    });
}

window.onload = async function () {
    await displayUserInHtml();

    document.getElementById('refeshBtn').onclick = async function () {
        await displayUserInHtml();
    }

}