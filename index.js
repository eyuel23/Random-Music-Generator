const button = document.querySelector(".starter-button");
const songAPI = "https://api.genius.com/songs/";
const accessToken =
  "?access_token=CXyFeSBw2lAdG41xkuU3LS6a_nwyxwwCz2dCkUohw-rw0C49x2HqP__6_4is5RPx";
let songID = "";
const maxSong = 200000;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

button.addEventListener("click", function (e) {
  e.preventDefault();
  button.classList.add("clicked");
  randomSongs();
});

const randomSongs = async function () {
  try {
    songID = getRandomInt(1, maxSong);
    const song1 = await fetch(songAPI + songID + accessToken);
    const data = await song1.json();
    document.getElementById("songImage").innerHTML =
      '<img src="' +
      data.response.song["song_art_image_url"] +
      '"alt="Some Awesome Album Art" style="width:200px;height:200px;">';
    document.getElementById("song").innerHTML =
      'SONG: <a target="_blank" href=' +
      data.response.song["url"] +
      " >" +
      data.response.song["title"].toUpperCase() +
      "</a>";
    document.getElementById("artist").innerHTML =
      'ARTIST: <a target="_blank"  href=' +
      data.response.song["primary_artist"]["url"] +
      ">" +
      data.response.song["primary_artist"]["name"].toUpperCase() +
      "</a>";
    document.getElementById("releaseDate").innerHTML =
      "RELEASE DATE: " + data.response.song["release_date"];
  } catch (err) {
    console.log(err);
  }
};
