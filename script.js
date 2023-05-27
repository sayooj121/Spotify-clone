const music = new Audio("vande.mp3");
// creating array
const songs = [
  {
    id: "1",
    songname: " On My Way <br>",
    poster: "img/1.jpg",
  },
  {
    id: "2",
    songname: " On My Way <br>",
    poster: "img/2.jpg",
  },
  {
    id: "3",
    songname: " On My Way <br>",
    poster: "img/3.jpg",
  },
  {
    id: "4",
    songname: " On My Way <br>",
    poster: "img/4.jpg",
  },
  {
    id: "5",
    songname: " On My Way <br>",
    poster: "img/5.jpg",
  },
  {
    id: "6",
    songname: " On My Way <br>",
    poster: "img/6.jpg",
  },

  {
    id: "7",
    songname: " On My Way <br>",
    poster: "img/7.jpg",
  },
  {
    id: "8",
    songname: " On My Way <br>",
    poster: "img/8.jpg",
  },
  {
    id: "9",
    songname: " On My Way <br>",
    poster: "img/9.jpg",
  },
  {
    id: "10",
    songname: " On My Way <br>",
    poster: "img/10.jpg",
  },
];
// Array.from(document.getElementsByClassName("songitem")).forEach(
//   (Element, i) => {
//     Element.getElementsByTagName("img")[0].src = songs[i].poster;
//     Element.getElementsByTagName("h5")[0].innerHTML = songs[i].songname;
//   }
// );
let masterplay = document.getElementById("masterplay");
let wave = document.getElementsByClassName("wave")[0];
masterplay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterplay.classList.remove("bi-play-fill");
    masterplay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterplay.classList.add("bi-play-fill");
    masterplay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
});

const makeallplays = () => {
  Array.from(document.getElementsByClassName("playlistplay")).forEach(
    (Element) => {
      Element.classList.add("bi-play-circle-fill");
      Element.classList.remove("bi-pause-circle-fill");
    }
  );
};
const makeallbackgrounds = () => {
  Array.from(document.getElementsByClassName("songitem")).forEach((Element) => {
    Element.style.background = "rgb(105,105,170,0)";
  });
};

let index = 0;
let postermasterplay = document.getElementById("poster-master-play");
let title = document.getElementById("tite");

Array.from(document.getElementsByClassName("playlistplay")).forEach(
  (Element) => {
    Element.addEventListener("click", (e) => {
      index = e.target.id;
      makeallplays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `audio/${index}.mp3`;
      postermasterplay.src = `img/${index}.jpg`;
      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });
      song_title.forEach((ele) => {
        let { songname } = ele;
        // title.innerHTML = songname;
      });
      masterplay.classList.remove("bi-play-fill");
      masterplay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      music.addEventListener("ended", () => {
        masterplay.classList.add("bi-play-fill");
        masterplay.classList.remove("bi-pause-fill");
        wave.classList.remove("active2");
      });
      makeallbackgrounds();
      Array.from(document.getElementsByClassName("songitem"))[
        `${index - 1}`
      ].style.background = "rgb(105,105,170,.1";
    });
  }
);

let currentstart = document.getElementById("currentstart");
let currentend = document.getElementById("currentend");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }

  currentend.innerText = ` ${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60);
  let sec1 = Math.floor(music_curr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }

  currentstart.innerText = ` ${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterplay.classList.add("bi-play-fill");
  masterplay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});
let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol-dot");
let vol_bar = document.getElementsByClassName("vol-bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }

  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }

  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }
  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});
let back = document.getElementById("back");
let next = document.getElementById("next");
back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songitem")).length;
  }
  music.src = `audio/${index}.mp3`;
  postermasterplay.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songname } = ele;
    // title.innerHTML = songname;
  });
  makeallplays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeallbackgrounds();
  Array.from(document.getElementsByClassName("songitem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,170,.1";
});

next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName("songitem")).length) {
    index = 1;
  }
  music.src = `audio/${index}.mp3`;
  postermasterplay.src = `img/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songname } = ele;
    // title.innerHTML = songname;
  });
  makeallplays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeallbackgrounds();
  Array.from(document.getElementsByClassName("songitem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,170,.1";
});

let left_scroll = document.getElementById("left-scroll");
let right_scroll = document.getElementById("right-scroll");
let pop_song = document.getElementsByClassName("pop-song")[0];

left_scroll.addEventListener("click", () => {
  pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener("click", () => {
  pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left-scrolls");
let right_scrolls = document.getElementById("right-scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 330;
});
