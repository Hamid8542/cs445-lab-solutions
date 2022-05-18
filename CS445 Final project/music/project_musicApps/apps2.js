const SERVER_ROOT = 'http://localhost:3000';
window.onload = function () {

    if (localStorage.getItem('accessToken')) {
        Loggedin();
    } else {
        Loggedout();
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

// function afterLogin() {
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

            music.map(song => {
                html += `
                <tr id="tr${song.id}">
                  
                    <th scope="row">${song.id}</th>
                    <td>${song.title}</td>
                    <td>${song.releaseDate}</td>
                    <td><button onclick='addToPlayList(this)'>+</button></td>
                                     
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
                     displayplaylist(element);
                    // addToPlayList(element);
                });
            } else {
                document.getElementsByClassName("container2")[0].style.display = "none";
                document.getElementById("nonplaylist").style.display = "block";
                document.getElementsByClassName("myplayer")[0].style.display = "none";
            }
        });
}
         
function displayplaylist(element) {
  
    let trr = `<tr>
      <td>${element.id}</td>
      <td>${element.title}</td>
      <td><button type ="button" class="btn" id="deletbtn" data-remove="${element.songId}" onclick="deletplaylist(this)">x</button></td>
      <td><button onclick='addToPlayList(this)'>></button></td>
      </tr>` ;  
        
    document.getElementById('playlistTable').innerHTML += trr;
  

}

function deletplaylist(deletbtn) {
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
                    let resolve = `<tr>
                    <td>${element.orderId}</td>
                    <td>${element.title}</td>
                    
                    <td><button type="button" class="btn btn-dark text-center " data-remove="${element.songId}" onclick="deletplaylist(this)" ></button>
                        <button type="button" class=" clickplaybtn btn btn-dark text-center" data-playSong="${element.urlPath}" onclick="playBtn(this)"></button>
                    </td>
                </tr>`;
                    playList.innerHTML += resolve;
                })

            })
}



//*******************************END DELETE BUTTON******************************* */

// function playBtn(obj){
//     let titleSong = obj.getAttribute("data-playSong");
//             let playAudio = document.getElementById("audioPlay");
//             playAudio.innerHTML="";
//             playAudio.style.display ="block"
//             let res =` <audio controls autoplay>
//             <source src="http://localhost:3000/${titleSong}" type="audio/mpeg">
//             </audio>`;
//             playAudio.innerHTML +=res;
// }

// document.getElementsByClassName("btn")[0].onclick = search;
// document.getElementById('searchId').onclick = function () {
//     searchSong();
// };

function searchsong() {
    let searchinput = document.getElementById("search-input");
    fetch(`http://localhost:3000/api/music?search=${search-input.value}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bear ${sessionStorage.getItem('keyaccess')}`
        }
    }).then(res => res.json())
        .then(music => {
            let id = 1;
            let musiclistTable = document.getElementById("musiclistTable");
            musiclistTable.innerHTML = " ";
            music.forEach(element => {
                let count = 1;
                // displayMusicTable(element);
                let searchResult = `<tr>
                     <td>${count}</td>
                     <td>${element.title}</td>
                     <td>${element.releaseDate}</td>
                
                </tr>`

                ++count;
                musiclistTable.innerHTML += searchResult;

            });
            searchinput.value = "";
        })
}

//  function searchSong() {

//     let searchResults = document.getElementById(search-input);
    
//     fetch(`${SERVER_ROOT}/api/music?search=${searchResults.value}`, {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//         }
//     })
//         .then(response => response.json())
//         // .then(songs => console.log(music)
//         .then(music => {
//             // console.log(music);
//             console.log('song is found');
//                 let id = 1;
//                     let tbody = document.getElementById("musiclistTable");
//                     tbody.innerHTML = " ";
//                     music.forEach(element => {
                
//                      displayMusicElemet(element)
            
//                 ++id;
//             });
//             searchResults.value = "";
//         })
//     }
// function displayMusicElemet(element) {
//     let id = 1;
//     let tr = `<tr>
//                 <td>${id}</td>
//                 <td>${element.title}</td>
//                 <td>${element.releaseDate}</td>

//                 <td>
//                  <div class  = "addbtn" data-music = "${element.id}" onclick = "addfun(this)">
                
//                 </td>
                
//                 </tr>`
//     tbody.innerHTML += tr;
//     ++id;
// }
         
        //    let html =
        //     <table class="table" id="music-table">
        //     <thead>
        //         <tr>
        //             <th scope="col">ID</th>
        //             <th scope="col">Title</th>
        //             <th scope="col">Release Date:</th>
        //             <th scope="col">Action</th>
        //         </tr>
        //     </thead>
        //     <tbody id="table-body">
  
        // `;
            
//             music.map(song => {
//                 if (searchResults == song.title)
                    
//                 html += `
//                 <tr id="tr${song.id}">
//                     <th scope="row">${song.id}</th>
//                     <td>${song.title}</td>
//                     <td>${song.releaseDate}</td>
//                     <td></td>
                  
//                 </tr>
//            `;
//             });
//             html += `
//         </tbody>
//     </table>
//     `;
//             document.getElementById('music').innerHTML = html;
//         });

// }

// function playPlayList() {
    
// }

// function deletePlayList() {
    
// }


// function fetchPlayList() {

//     fetch('http://localhost:3000/api/playlist', {
//         headers: {
//             'Authorization': `Bear ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             document.getElementById("playlist").style.display = "intial";
//             if (!data.length == 0) {

//                 document.getElementById("tbody2").innerHTML = " ";
//                 document.getElementsByClassName("playlistTable")[0].style.display = "block";
//                 document.getElementById("noplaylist").style.display = "none";
//                 data.forEach(element => {

//                     displayplaylistTable(element);

//                 });

//             } else {
//                 document.getElementsByClassName("playlistTable")[0].style.display = "none";
//                 document.getElementById("noplaylist").style.display = "block";
//             }

//         });
// }


// function searchsong() {
//     let searchinput = document.getElementById("searchField");
//     fetch(`http://localhost:3000/api/music?search=${searchinput.value}`, {
//         headers: {
//             'Authorization': `Bear ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             let id = 1;
//             let tbody = document.getElementById("tbody");
//             tbody.innerHTML = " ";
//             data.forEach(element => {

//                 displayMusicTable(element);

//                 ++id;
//             });
//             searchinput.value = "";
//         })
// }



// window.onload = function () {

//     if (sessionStorage.getItem('tokenLogin')) {
//         loggedin();
//         fetchMusic();
//         fetchPlayList();
//     } else {
//         logout();
//     }
//     let loginBtn = document.getElementById("loginbtn");

//     loginBtn.onclick = function () {
//         let usernameField = document.getElementById("username").value;
//         let passwordField = document.getElementById("password").value;

//         fetch('http://localhost:3000/api/auth/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 username: usernameField,
//                 password: passwordField
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         }).then(res => res.json())
//             .then(data => {
//                 if (data.status === "error") {
//                     invalidLogin(data);
//                 } else {
//                     sessionStorage.setItem('tokenLogin', data.accessToken);
//                     loggedin();
//                     fetchMusic();
//                     fetchPlayList();
//                 }
//             })


//     };

//     document.getElementById("logout").onclick = logout;
//     document.getElementsByClassName("searchBtn")[0].onclick = searchsong;

// }


// function invalidLogin(msg) {

//     let warning = document.getElementById("msg");
//     warning.innerHTML = msg.message;
//     // document.getElementById("username").value = "";
//     // document.getElementById("password").value= "";
// }
// function loggedin() {

//     document.getElementById("loginwrapper").style.display = "none";
//     document.getElementById("logout").style.display = "block";
//     document.getElementById("search").style.display = "block";
//     document.getElementsByClassName("welcome")[0].style.display = "none";
//     document.getElementsByClassName("tableContent")[0].style.display = "block";
//     document.getElementById("playlist").style.display = "inline-table";

// }
// function logout() {
//     sessionStorage.removeItem('tokenLogin');
//     document.getElementById("loginwrapper").style.display = "";
//     document.getElementById("logout").style.display = "none";
//     document.getElementById("search").style.display = "none";
//     document.getElementsByClassName("welcome")[0].style.display = "block";
//     document.getElementsByClassName("tableContent")[0].style.display = "none";

// }

// function fetchMusic() {

//     fetch('http://localhost:3000/api/music', {
//         headers: {
//             'Authorization': `Bear ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             let id = 1;
//             let tbody = document.getElementById("tbody");
//             tbody.innerHTML = " ";
//             data.forEach(element => {
//                 let tr = `<tr>
//                         <td>${id}</td>
//                         <td>${element.title}</td>
//                         <td>${element.releaseDate}</td>
//                         <td>
//                             <div class="plusbtn" data-music="${element.id}" onclick="addfunc(this)">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//                                     fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
//                                     <path
//                                         d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                                     <path
//                                         d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
//                                 </svg>
//                             </div>
                            
//                         </td>
//                         </tr>`;
//                 tbody.innerHTML += tr;
//                 ++id;

//             });

           
//         })
// }


// function fetchPlayList() {

//     fetch('http://localhost:3000/api/playlist', {
//         headers: {
//             'Authorization': `Bear ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             document.getElementById("playlist").style.display = "intial";
//             if (!data.length == 0) {

//                 document.getElementById("tbody2").innerHTML = " ";
//                 document.getElementsByClassName("playlistTable")[0].style.display = "block";
//                 document.getElementById("noplaylist").style.display = "none";
//                 data.forEach(element => {

//                     displayplaylistTable(element);

//                 });

//             } else {
//                 document.getElementsByClassName("playlistTable")[0].style.display = "none";
//                 document.getElementById("noplaylist").style.display = "block";
//             }

//         });
// }


// function searchsong() {
//     let searchinput = document.getElementById("searchField");
//     fetch(`http://localhost:3000/api/music?search=${searchinput.value}`, {
//         headers: {
//             'Authorization': `Bear ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             let id = 1;
//             let tbody = document.getElementById("tbody");
//             tbody.innerHTML = " ";
//             data.forEach(element => {

//                 displayMusicTable(element);

//                 ++id;
//             });
//             searchinput.value = "";
//         })
// }

// function addfunc(obj) {
//     document.getElementById("playlist").style.display = " ";
//     let tbody2 = document.getElementById("tbody2");
//     tbody2.innerHTML = "";
//     let id = obj.getAttribute("data-music");
//     tbody2.innerHTML = "";
//     fetch('http://localhost:3000/api/playlist/add', {
//         method: 'POST',
//         body: JSON.stringify({
//             songId: id,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': `Bearer ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             console.log(data);
//             data.forEach(function (element) {
//                 displayplaylistTable(element);
//             });
//         })
// }



// function deletefunc(obj) {
//     let tbody2 = document.getElementById("tbody2");
//     let id = obj.getAttribute("data-playlist");
//     tbody2.innerHTML = "";
//     fetch('http://localhost:3000/api/playlist/remove', {
//         method: 'POST',
//         body: JSON.stringify({
//             songId: id,
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             'Authorization': `Bearer ${sessionStorage.getItem('tokenLogin')}`
//         }
//     }).then(res => res.json())
//         .then(data => {
//             data.forEach(function (element) {
//                 displayplaylistTable(element);
//             });
//         })

// }

// function displayMusicTable(element) {
//     let id = 1;
//     let tr = `<tr>
//         <td>${id}</td>
//         <td>${element.title}</td>
//         <td>${element.releaseDate}</td>
//         <td>
        
//                             <div class="plusbtn" data-music="${element.id}" onclick="addfunc(this)">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//                                     fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
//                                     <path
//                                         d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                                     <path
//                                         d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
//                                 </svg>
//                             </div>
                            
                        
//         </td>
//         </tr>`;
//     tbody.innerHTML += tr;
//     ++id;
// }

// function displayplaylistTable(element) {
//     let tr2 = `<tr>
//         <td>${element.orderId}</td>
//         <td>${element.title}</td>
        
//         <td>
//             <span class="deletebtn" data-playlist="${element.songId}" onclick="deletefunc(this)">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//                                 fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
//                                 <path
//                                     d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                                 <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
//                             </svg>
//             </span>&ensp;
//             <span class="playbtn" data-play="${element.songId}">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//                                 fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
//                                 <path
//                                     d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
//                             </svg></span>
//                     </td>
//         </tr>`;
//     document.getElementById("tbody2").innerHTML += tr2;
// }
