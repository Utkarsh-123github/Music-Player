const music = new Audio('audio/1.mp3.mp3');
// music.play();
const songs = [
    {
        id: 1,
        songName: `Mere Bina<br>
        <div class="subtitle">Pritam</div>`,
        poster: "Image/1.jpg"
    },
    {
        id: 2,
        songName: `Maine Khud Ko<br>
        <div class="subtitle">Pranay</div>`,
        poster: "Image/2.jpg"
    },
    {
        id: 3,
        songName: `Tu Mile Dil Khile<br>
        <div class="subtitle">Kumar Sanu</div>`,
        poster: "Image/3.jpg"
    },
    {
        id: 4,
        songName: `Oonchi Oonchi Deewarein<br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "Image/4.jpg"
    },
    {
        id: 5,
        songName: `Shayad<br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "Image/5.jpg"
    },
    {
        id: 6,
        songName: `Hona Tha Pyaar<br>
        <div class="subtitle">Atif Aslam</div>`,
        poster: "Image/6.jpg"
    },
    {
        id: 7,
        songName: `Ye Tune Kya Kiya<br>
        <div class="subtitle">Javed Bashir</div>`,
        poster: "Image/7.jpg"
    },
    {
        id: 8,
        songName: `Tu Chale<br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "Image/8.jpg"
    },
    {
        id: 9,
        songName: `Darasal<br>
        <div class="subtitle">Atif Aslam</div>`,
        poster: "Image/9.jpg"
    },
    {
        id: 10,
        songName: `Kaun Mera<br>
        <div class="subtitle">Various Artists</div>`,
        poster: "Image/10.jpg"
    },
    {
        id: 11,
        songName: `Dil Beparwah<br>
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "Image/11.jpg"
    },
    {
        id: 12,
        songName: `Tujhse Door Jo Hota Hoon<br>
        <div class="subtitle">Gajendra Verma</div>`,
        poster: "Image/12.jpg"
    },
    {
        id: 13,
        songName: `Agar Tum Saath Ho<br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "Image/13.jpeg"
    },
    {
        id: 14,
        songName: `Love Story<br>
        <div class="subtitle">Taylor Swift</div>`,
        poster: "Image/14.png"
    },
    {
        id: 15,
        songName: `Maiyya Mainu<br>
        <div class="subtitle">Sachet tandon</div>`,
        poster: "Image/15.jpg"
    },
    {
        id: 16,
        songName: `Main Hoon Saath Tere<br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "Image/16.jpg"
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill')
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.remove('bi-pause-fill')
        masterPlay.classList.add('bi-play-fill');
    }
})


const makeAllBackground = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{
        el.style.background = 'rgb(105,105,105,.0';
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
let download_music = document.getElementById('download_music');


Array.from(document.getElementsByClassName('playlistPlay')).forEach((e)=>{
    e.addEventListener('click',(el)=>{
        index = el.target.id;
        music.src = `audio/${index}.mp3.mp3`;
        if(index == 13){
            poster_master_play.src = `Image/${index}.jpeg`;
        }
        else if(index == 14){
            poster_master_play.src = `Image/${index}.png`;
        }
        else{
            poster_master_play.src = `Image/${index}.jpg`;
        }
        
        music.play();
        masterPlay.classList.remove('bi-play-fill')
        masterPlay.classList.add('bi-pause-fill');

        download_music.href = `audio/${index}.mp3.mp3`;

        let songTitles = songs.filter((els) =>{
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download',songName);
        })
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
        wave.classList.add('active1');
        
    })
})

let currentStart = document.getElementById('currentStart');

let currentEnd = document.getElementById('currentEnd');
music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    if(sec1 < 10){
        sec1 = `0${sec1}`;
    }
    currentEnd.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if(sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentStart.innerText = `${min2}:${sec2}`;

    let seek = document.getElementById('seek')
    let bar2 = document.getElementById('bar2')
    let dot = document.getElementsByClassName('dot')[0];

    let progressBar = parseInt((music_curr / music_dur)*100)
    seek.value = progressBar;

    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change',()=>{
    music.currentTime = seek.value * music.duration / 100;
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-off-fill')
    }

    if(vol.value > 0){
        vol_icon.classList.remove('bi-volume-up-fill')
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-off-fill')
    }

    if(vol.value > 50){
        vol_icon.classList.add('bi-volume-up-fill')
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-off-fill')
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`
    vol_dot.style.left = `${vol_a}%`
    music.volume = vol_a / 100;
})

let back = document.getElementById('back')
let next = document.getElementById('next')

back.addEventListener('click',()=>{
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3.mp3`;
    if(index == 13){
        poster_master_play.src = `Image/${index}.jpeg`;
    }
    else if(index == 14){
        poster_master_play.src = `Image/${index}.png`;
    }
    else{
        poster_master_play.src = `Image/${index}.jpg`;
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill')
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    })
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
    wave.classList.add('active1');
})

next.addEventListener('click',()=>{
    index ++;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;
    }
    music.src = `audio/${index}.mp3.mp3`;
    if(index == 13){
        poster_master_play.src = `Image/${index}.jpeg`;
    }
    else if(index == 14){
        poster_master_play.src = `Image/${index}.png`;
    }
    else{
        poster_master_play.src = `Image/${index}.jpg`;
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill')
    masterPlay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    })
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
    wave.classList.add('active1');
})






let pop_song_left = document.getElementById('pop_song_left')
let pop_song_right = document.getElementById('pop_song_right')
let pop_song = document.getElementsByClassName('pop_song')[0];
let pop_art_left = document.getElementById('pop_art_left')
let pop_art_right = document.getElementById('pop_art_right')
let item = document.getElementsByClassName('item')[0]

pop_song_right.addEventListener('click',()=>{
    pop_song.scrollLeft += 330;
})

pop_song_left.addEventListener('click',()=>{
    pop_song.scrollLeft -= 330;
})

pop_art_right.addEventListener('click',()=>{
    item.scrollLeft += 330;
})

pop_art_left.addEventListener('click',()=>{
    item.scrollLeft -= 330;
})

// For shuffling the song

let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click',()=>{
    let a = shuffle.innerHTML;
    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
    
        case "repeat" :
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random" :
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});



const next_music = ()=>{
    if(index == songs.length){
        index = 1;
    }
    else{
        index ++;
    }
    music.src = `audio/${index}.mp3.mp3`;
    if(index == 13){
        poster_master_play.src = `Image/${index}.jpeg`;
    }
    else if(index == 14){
        poster_master_play.src = `Image/${index}.png`;
    }
    else{
        poster_master_play.src = `Image/${index}.jpg`;
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill')
    masterPlay.classList.add('bi-pause-fill');

    download_music.href = `audio/${index}.mp3.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    })
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
    wave.classList.add('active1');
}

const repeat_music = ()=>{
    index;
    music.src = `audio/${index}.mp3.mp3`;
    if(index == 13){
        poster_master_play.src = `Image/${index}.jpeg`;
    }
    else if(index == 14){
        poster_master_play.src = `Image/${index}.png`;
    }
    else{
        poster_master_play.src = `Image/${index}.jpg`;
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill')
    masterPlay.classList.add('bi-pause-fill');

    download_music.href = `audio/${index}.mp3.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    })
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
    wave.classList.add('active1');
}


const random_music = ()=>{
    if(index == songs.length){
        index = 1;
    } else{
        index = Math.floor((Math.random()*songs.length) + 1);
    }

    music.src = `audio/${index}.mp3.mp3`;
    if(index == 13){
        poster_master_play.src = `Image/${index}.jpeg`;
    }
    else if(index == 14){
        poster_master_play.src = `Image/${index}.png`;
    }
    else{
        poster_master_play.src = `Image/${index}.jpg`;
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill')
    masterPlay.classList.add('bi-pause-fill');

    download_music.href = `audio/${index}.mp3.mp3`;

    let songTitles = songs.filter((els) =>{
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download',songName);
    })
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = 'rgb(105,105,105,.1';
    wave.classList.add('active1');
}

music.addEventListener('ended',()=>{
  let b = shuffle.innerHTML;
  switch (b) {
    case 'repeat':
        repeat_music();
        break;
  
    case 'next':
        next_music();
        break;
    
    case 'random':
        random_music();
        break;
  }  
});


