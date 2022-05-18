const SERVER_ROOT = 'http://localhost:3000';
window.onload = function () {

    if (localStorage.getItem('accessToken')) {
        Loggedin();
    } else {
        Loggedout();
    }
    document.getElementById("searchbtn").onclick = function () {
        searchsong();
    }    
    document.getElementById('loginBtn').onclick = function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;


        fetch(`${SERVER_ROOT}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => loggedInFeatures(data));
    }

    document.getElementById('logoutBtn').onclick = function () {
        localStorage.removeItem('accessToken');
        Loggedout();
    }
}

function loggedInFeatures(data) {
    if (data.status) {
        document.getElementById('errormessage').innerHTML = data.message;
    } else {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        localStorage.setItem('accessToken', data.accessToken);
        Loggedin();
    }
}

function Loggedin() {

    document.getElementById("search").style.display = 'block';
    document.getElementById("login-div").style.display = 'none';
    document.getElementById('logout-div').style.display = 'block';
    document.getElementById("musiclist").style.display = 'block';
    document.getElementById('playlist').style.display = 'block'; //New add1
   // document.getElementById("playlistTable").innerHTML = "block"; //new add2 

    fetchMusic();
    fetchPlayList();
}


function Loggedout() {
    document.getElementById('login-div').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('logout-div').style.display = 'none';
    document.getElementById('footer-div').style.display = 'none';
    document.getElementById('musiclist').style.display = 'none';
    document.getElementById('playlist').style.display = 'none'; //new add1
    //document.getElementById("playlistTable").innerHTML = "none"; //new add2 
}


function fetchMusic() { //Main music table
    // const myMusic = document.getElementById('musiclistTable');
    // myMusic.innerHTML = "";

    fetch(`${SERVER_ROOT}/api/music`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(response => response.json())
        .then(music => {
            console.log(music);

            let html = `
            <table class="table" id="musicTable">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Release Date:</th>
                    <th scope="col">Action</th>

                </tr>
            </thead>
            <tbody >  
  
        `;
            let count = 1;
            music.forEach(song => {  // map converted into forEach
                html += `
                <tr id="tr${song.id}">
                    <td>${count++}</td>
                    <td>${song.title}</td>
                    <td>${song.releaseDate}</td>
                    <td><button id = "addsongbtn"  data-music="${song.id}" onclick='addsong(this)'>+</button></td>                     
                </tr>
           `;
            });
            html += `
        </tbody>
    </table>
    `;
            document.getElementById('musiclist').innerHTML = html;
        });
   // fetchPlayList()
}

function fetchPlayList() { //Music tobe added to playlist
    
    fetch(`${SERVER_ROOT}/api/playlist`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
    .then(music => {
        console.log(music);

        let html = `
        <table class="table" id="musicTable">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
 

    `;
       
        music.forEach(song => {  // map converted into forEach
            html += `
            <tr>
                <td>${song.orderId}</td>
                <td>${song.title}</td>
                <td>
                        <button id = "addsongbtn"  data-deleteID="${song.songId}" onclick='deleteSong(this)'>x</button>
                         <button onclick='playSong(this)' data-play="${song.title}> > </button>
                </td>

             </tr>
       `;
        });
        html += `
</tbody>
</table>
`;
        document.getElementById('playlist').innerHTML = html;
    });
}



// function displayplaylist(element) {
//     let count = 1;
//     let trr = `<tr>
//       <td>${count++}</td>
//       <td>${element.title}</td>
//       <td><button type ="button" class="btn" id="deletbtn" data-remove="${element.songId}" onclick="deletplaylist(this)"> x </button></td>
//       <td><button onclick='PlaySong(this)'> > </button></td>
//       </tr>` ;

//     document.getElementById('playlistTable').innerHTML += trr;

// }

// function displayaddplaylist(element) {
//     let count = 1;
//     let trr = `<tr>
//       <td>${count++}</td>
//       <td>${element.title}</td>

//       <td><button type ="button" class="btn" id="deletbtn" data-add="${element.title}" onclick="displayaddplaylist(this)"> x </button></td>
//       <td><button onclick='PlaySong(this)'> > </button></td>
//       </tr>` ;

//     document.getElementById('playlistTable').innerHTML += trr;

// }

function deleteSong(obj) {  // passing id = deletbtn
    let id = obj.getAttribute("data-deleteID");
    let playlistTable = document.getElementById("playlist");
    
    fetch(`${SERVER_ROOT}/api/playlist/remove`, {
        method: 'POST',
        body: JSON.stringify({
            songId: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(resolve => resolve.json())
    .then(music => {
        console.log(music);

        let html = `
        <table class="table" id="music_">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>

            </tr>
        </thead>
        <tbody>  

    `;
        
        music.forEach(song => {  
            html += `
            <tr>
                <td>${song.orderId}</td>
                <td>${song.title}</td>
                <td>
                        <button id = "addsongbtn"  data-deleteID="${song.songId}" onclick='deleteSong(this)'>x</button>
                         <button id="playBtn" data-play="${song.title}" onclick="playSong(this);">></button>
                </td>
                </tr>
       `;
        });
        html += `
    </tbody>
</table>
`;
        playlistTable.innerHTML = html;
    });
}


function searchsong() {

    console.log('abc');
    let searchInput = document.getElementById('search-song');
    fetch(`${SERVER_ROOT}/api/music?search=${searchInput.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bear ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json())
    .then(music => {
        console.log(music);

        let html = `
        <table class="table" id="musicTable">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Release Date:</th>
                <th scope="col">Action</th>

            </tr>
        </thead>
        <tbody >  

    `;
        let count = 1;
        music.forEach(song => {  // map converted into forEach
            html += `
            <tr id="tr${song.id}">
                <td>${count++}</td>
                <td>${song.title}</td>
                <td>${song.releaseDate}</td>
                <td><button id = "addsongbtn"  data-music="${song.id}" onclick='addsong(this)'>+</button></td>                     
            </tr>
       `;
        });
        html += `
    </tbody>
</table>
`;
        document.getElementById('musiclist').innerHTML = html;
        searchInput.value = "";
    });
// fetchPlayList()
}

function addsong(obj) {

    let playlistTable = document.getElementById("playlist");
    let id = obj.getAttribute("data-music");
    fetch('http://localhost:3000/api/playlist/add', {
        method: 'POST',
        body: JSON.stringify({
            songId: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json())
    .then(music => {
        console.log(music);

        let html = `
        <table class="table" id="musicTable" style="color: white">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Action</th>

            </tr>
        </thead>
        <tbody >  

    `;
        let count = 1;
        music.forEach(song => {  
            html += `
            <tr>
                <td>${song.orderId}</td>
                <td>${song.title}</td>
                <td>
                      <button id = "addsongbtn"  data-music="${song.songId}" onclick='deleteSong(this)'>x</button>
                      <button id="playBtn" data-play="${song.title}" onclick="playSong(this);" >></button>
                </td>
            </tr>
       `;
        });
        html += `
    </tbody>
</table>
`;
        playlistTable.innerHTML = html;
    });
}


function playSong(obj) {
    let id = obj.getAttribute("data-play");
    fetch(`${SERVER_ROOT}/api/music?search=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bear ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json())
    .then(music => {
        let player = document.getElementById("footer-div");
        let add =
            `
            <audio id ="audioId" controls autoplay>
                <source src ="${SERVER_ROOT}/${music[0].urlPath}" type ="audio/mpeg">
            </audio>

          `
        player.innerHTML = add;
       
    });
    
}