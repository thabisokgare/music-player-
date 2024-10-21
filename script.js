const playListSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        id: 3,
        title: "Cruising for a Musing",
        artist: "Quincy Larson",
        duration: "3:34",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
      },
      {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
      },
      {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
      },
      {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
      },
      {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
      },
      {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
      },
      {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
      },


];

const audio = new Audio();
let userData = { 
    songs:[...allSongs],
    currentSong:null,
    songCurrentTime:0,
};

const playSong = (id) =>{
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if(userData?.currentSong === null || userData?.currentSong.id !== song.id){
    Audio.currentTime = 0;
 } else {
     Audio.currentTime = userData?.currentTime;
 }
 userData.currentSong = song;

 // Add the "playing" class to the playButton
 playButton.classList.add("playing");
 Audio.play();
}

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
  playButton.classList.remove("playing");
}
// ... existing code ...  
/*


The `renderSongs` function takes an array of song objects and generates HTML for each song in the playlist. Here's what it does:

1. It maps over the input array, creating an HTML string for each song.
2. Each song is represented as a list item (`<li>`) with buttons for the song title, artist, duration, and a delete option.
3. The function uses template literals to insert song data (title, artist, duration) into the HTML.
4. It joins all the generated HTML strings into a single string.
5. Finally, it sets the `innerHTML` of the `playListSongs` element (likely a container for the playlist) to the generated HTML string, effectively rendering the entire playlist.

This function is responsible for displaying the list of songs in the user interface, making it easy to update the playlist whenever the song data changes.
*/ 
const renderSongs = (array) => {
  const songsHTML = array.map((song) => {
    return `
      <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
        </button>
        <button class="playlist-song-artist">
          <span class="playlist-song-artist">${song.artist}</span>
        </button>
        <button class="playlist-song-duration">
          <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/>
          </svg>
        </button>
      </li>
    `;
  }).join("");
  playListSongs.innerHTML = songsHTML;
}

renderSongs(userData?.songs);
// ... existing code ...

/*


The `sortSongs` function alphabetically sorts the songs in `userData.songs` by their titles. It uses JavaScript's `sort` method with a custom comparison function. This function compares song titles:

- Returns -1 if the first song's title comes before the second alphabetically
- Returns 1 if the first song's title comes after the second alphabetically
- Returns 0 if the titles are identical

This results in the songs being arranged in ascending alphabetical order (A to Z) based on their titles.
*/
const sortSongs = () =>{
  userData?.songs.sort((a,b) =>{
    if(a.title < b.title){  //if a is less than b, then a should come first
      return -1;
    }
    if(a.title > b.title){  //if a is greater than b, then b should come first
      return 1;
    }
    return 0; //if a is equal to b, then they should stay in the same order
  });
return userData?.songs;

}
renderSongs(sortSongs());  


playButton.addEventListener("click", () => {
 if(userData?.currentSong === null){
  playSong(userData?.songs[0].id);
 } else {
  playSong(userData?.currentSong.id);
 }
});

pauseButton.addEventListener("click", pauseSong);


const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);


}


const playNextSong = () => {
    if(userData?.currentSong === null){
      playSong(userData?.songs[0].id);
    } else {
      const currentSongIndex = getCurrentSongIndex();
      const nextSong = userData?.songs[currentSongIndex + 1] ;
      playSong(nextSong.id);
    }
}

nextButton.addEventListener("click", playNextSong);

const playPreviousSong = () => {
  if(userData?.currentSong === null){
    return;
  }else{
  const currentSongIndex = getCurrentSongIndex();
   const previousSong = userData?.songs[currentSongIndex - 1];
   playSong(previousSong.id);
  }
}
  previousButton.addEventListener("click", playPreviousSong);


  const highlightCurrentSong = () => {
    const playlistSongs = document.querySelectorAll(".playlist-song");
  }
