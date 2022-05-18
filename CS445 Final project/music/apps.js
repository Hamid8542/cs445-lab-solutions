const SERVER_ROOT = 'http://localhost:3000';
window.onload = function () {

    if (localStorage.getItem('accessToken')) {
        Loggedin();
    } else {
        Loggedout();
    }
    document.getElementById("searchbtn").onclick = searchsong;
    // document.getElementById('addsongbtn').onclick = addsong;

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
    document.getElementById("playlist").style.display = 'block';

    fetchMusic();
    fetchPlayList();
}

function notLogin() {
    document.getElementById("search").style.display = 'none';
    document.getElementById("login-div").style.display = 'block';
    document.getElementById('logout-div').style.display = 'none';
    document.getElementById("musiclist").style.display = 'none';
    document.getElementById("playlist").style.display = 'none';
    document.getElementById('footer-div').style.display = 'block';
}

function Loggedout() {
    document.getElementById('login-div').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('logout-div').style.display = 'none';
    document.getElementById('footer-div').style.display = 'none';
    document.getElementById('musiclist').style.display = 'none';
    document.getElementById('playlist').style.display = 'none';
}


function fetchMusic() {
    const myMusic = document.getElementById('musiclistTable');
    myMusic.innerHTML = "";

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
            <tbody id="musiclistTable">
  
        `;
            let count = 1;
            music.map(song => {
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
            document.getElementById('musiclistTable').innerHTML = html;
        });
    fetchPlayList()
}

function fetchPlayList() {
    const myPlaytlist = document.getElementById('playlistTable');
    myPlaytlist.innerHTML = "";

    fetch(`${SERVER_ROOT}/api/playlist`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(response => response.json())
        .then(music => {
            console.log(music);
            document.getElementById('playlist').style.display = 'intial';

            if (!music.length == 0) {
                document.getElementsByClassName("myplayer")[0].style.display = "block";
                document.getElementById("playlistTable").innerHTML = "none";
                document.getElementsByClassName("container2")[0].style.display = "block";
                document.getElementById("nonplaylist").style.display = "none";

                music.forEach(element => {
                    displayplaylist(element);    // remove
                    displayaddplaylist(element); // add

                });
            } else {
                document.getElementsByClassName("container2")[0].style.display = "none";
                document.getElementById("nonplaylist").style.display = "block";
                document.getElementsByClassName("myplayer")[0].style.display = "none";
            }
        });
}

function displayplaylist(element) {
    let count = 1;
    let trr = `<tr>
      <td>${count++}</td>
      <td>${element.title}</td>
      <td><button type ="button" class="btn" id="deletbtn" data-remove="${element.songId}" onclick="deletplaylist(this)"> x </button></td>
      <td><button onclick='PlaySong(this)'> > </button></td>
      </tr>` ;

    document.getElementById('playlistTable').innerHTML += trr;

}

function displayaddplaylist(element) {
    let count = 1;
    let trr = `<tr>
      <td>${count++}</td>
      <td>${element.title}</td>

      <td><button type ="button" class="btn" id="deletbtn" data-add="${element.title}" onclick="displayaddplaylist(this)"> x </button></td>
      <td><button onclick='PlaySong(this)'> > </button></td>
      </tr>` ;

    document.getElementById('playlistTable').innerHTML += trr;

}

function deletplaylist(deletbtn) {  // passing id = deletbtn
    let id = deletbtn.getAttribute("data-remove");
    let playlistTable = document.getElementById("playlistTable");
    playlistTable.innerHTML = "";

    fetch(`${SERVER_ROOT}/api/playlist/remove`, {
        method: 'POST',
        body: JSON.stringify({
            songId: id,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem('keyaccess')}`
        }
    }).then(resolve => resolve.json())
        .then(music => {
            console.log(music);
            music.forEach(element => {
                let result = `<tr>
                    <td>${element.songId}</td>
                    <td>${element.title}</td>
                    
                    <td><button type="button" class="btn btn-dark text-center " data-remove="${element.songId}" onclick="deletplaylist(this)"></button>
                        <button type="button" class=" clickplaybtn btn btn-dark text-center" data-playSong="${element.urlPath}" onclick="playSong(this)"></button>
                    </td>
                </tr>`;
                // displayplaylist(element)
                playlistTable.innerHTML += result;
            })

        })
}


function searchsong() {

    console.log('abc');
    let search = document.getElementById('search-song');
    fetch(`${SERVER_ROOT}/api/music?search=${search.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bear ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json())
        .then(music => {
            let count = 1;
            let musiclistTable = document.getElementById("musiclistTable");
            musiclistTable.innerHTML = " ";
            music.forEach(element => {

                let searchResult = `<tr>
                     <td>${count}</td>
                     <td>${element.title}</td>
                     <td>${element.releaseDate}</td>
                     <td><button type="button" class="btn btn-dark text-center addSong" data-add="${element.id}" >+</button>
                </tr>`
                ++count;
                musiclistTable.innerHTML += searchResult;
                console.log(musiclistTable);

            });
            search.value = "";
        })
}

function addsong(obj) {

    let playlistTable = document.getElementById("playlistTable");
    playlistTable.innerHTML = " ";
    let id = obj.getAttribute("data-add");
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

            //         music.forEach(song => {
            //             let count = 1;
            //             let adsong = `<tr>
            //         <td>${count++}</td>
            //         <td>${song.title}</td>
            //         <td><button type="button" class="btn btn-dark text-center" data-delete ="${song.songId}">x</button>
            //         <td><button onclick='playsong(this)' data-play = "${song.title}" > > </button></td>
            //    </tr>`

            //             playlistTable.innerHTML += adsong;

            //         });
            //     })
            music.displayaddplaylist(element);
        })

}
