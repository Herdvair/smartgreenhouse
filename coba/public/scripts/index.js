const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const fanElement = document.getElementById("fan");
const heatElement = document.getElementById("heat");
const mistElement = document.getElementById("mist");
const lampElement = document.getElementById("lamp");

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathFan = 'UsersData/' + uid + 'sensors/fan';
    var dbPathHeat = 'UsersData/' + uid + 'sensors/heater';
    var dbPathMist = 'UsersData/' + uid + 'sensors/mist';
    var dbPathLamp = 'UsersData/' + uid + 'sensors/lamp';

    // Database references
    var dbRefFan = firebase.database().ref().child(dbPathFan);
    var dbRefHeat = firebase.database().ref().child(dbPathHeat);
    var dbRefMist = firebase.database().ref().child(dbPathMist);
    var dbRefLamp = firebase.database().ref().child(dbPathLamp);

    // Update page with new readings
    dbRefFan.on('value', snap => {
      fanElement.innerText = snap.val().toFixed(2);
    });

    dbRefHeat.on('value', snap => {
      heatElement.innerText = snap.val().toFixed(2);
    });

    dbRefMist.on('value', snap => {
      mistElement.innerText = snap.val().toFixed(2);
    });

    dbRefLamp.on('value', snap => {
      mistElement.innerText = snap.val().toFixed(2);
    });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}