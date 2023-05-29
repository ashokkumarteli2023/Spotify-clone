console.log("Welcome to spotify ");

//variables
let masterPlay=document.getElementById('masterPlay');
// console.log(masterPlay);
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let audioElement = new Audio('songs/Lift Karadey.mp3'); // new
// audioElement.play();
let songs=[
    {songName: "Lift Karadey", filePath:"songs/Lift Karadey.mp3" , coverPath:"covers/Lift Karadey.jpg",time:"4.20" },
    {songName: "Rote Rote", filePath:"songs/Rote Rote Hansna Seekho.mp3" , coverPath:"covers/Rote Rote Hansna Seekho.jpg",time:"3.59" },
    {songName: "Shape of You", filePath: "songs/Shape of You.mp3", coverPath:"covers/Shape of You.jpg",time:"4.23" },
    {songName: "New Rules", filePath:"songs/New Rules.mp3" , coverPath:"covers/New Rules.jpg", time:"3.44" },
    {songName: "Baby", filePath: "songs/Baby.mp3", coverPath:"covers/Baby.jpg", time:"3.39" }
    ]

let songItem=Array.from(document.getElementsByClassName('songItem'));
// console.log(songItem);
let songIndex=0;

let currentTimeOfMusic=0;
let prev=0;

let masterPlayName=document.getElementById("masterPlayName");
masterPlayName.innerHTML=songs[0].songName;
 
//functions
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;

        document.getElementById(songIndex).classList.remove('fa-play');
        document.getElementById(songIndex).classList.add('fa-pause');
        prev=songIndex;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0; 

        document.getElementById(songIndex).classList.remove('fa-pause');
        document.getElementById(songIndex).classList.add('fa-play');
        prev=songIndex;
    }
})

audioElement.addEventListener('timeupdate',()=>{
    // console.log('time is updating');
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(audioElement.currentTime);
    // console.log(2);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    // console.log(typeof audioElement);
})


songItem.forEach((item,index)=>{
    // console.log(item,index);
    item.getElementsByTagName("img")[0].src=songs[index].coverPath;
    item.getElementsByClassName("songName")[0].innerHTML=songs[index].songName;

    //manual method for duration
    document.getElementsByClassName("songDuration")[index].innerHTML=songs[index].time;
    
})

function makeAllPlay(){
   Array.from(document.getElementsByClassName("songItemPlay")).forEach((item)=>{
    item.classList.remove('fa-pause');
    item.classList.add('fa-play');
   })
    
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((item)=>{
    // console.log(item);
    item.addEventListener('click',()=>{
    // item.addEventListener('click',(e)=>{ then e.target 
        if(item.classList.contains('fa-pause'))
        {
            item.classList.remove('fa-pause');
            item.classList.add('fa-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity=0;
            currentTimeOfMusic=audioElement.currentTime;
            prev=songIndex;
        }
        else{
        makeAllPlay();
        item.classList.remove('fa-play');
        item.classList.add('fa-pause');
        // console.log("parent Node",item.parentNode.parentNode);

        // console.log(item.id);
        songIndex=parseInt(item.id);
        audioElement.src=songs[songIndex].filePath;
        audioElement.play();
        if(currentTimeOfMusic!=0 && parseInt(item.id)===parseInt(prev))
            audioElement.currentTime=currentTimeOfMusic;
        else audioElement.currentTime=0;
        // console.log(parseInt(item.id)===songIndex);
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

        masterPlayName.innerHTML=songs[songIndex].songName;
        gif.style.opacity=1;
    prev=songIndex;}
    })
})

document.getElementById('previous').addEventListener('click',()=>{

    document.getElementById(songIndex).classList.remove('fa-pause');
    document.getElementById(songIndex).classList.add('fa-play');

    if(songIndex<=0)
    {
        songIndex=songs.length-1;
    }
    else songIndex-=1;

    audioElement.src=songs[songIndex].filePath;
    audioElement.play();
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    // console.log(document.getElementById(songIndex));

    // document.getElementById(toString(songIndex)).classList.remove('fa-play');
    // document.getElementById(toString(songIndex)).classList.add('fa-pause');

    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');

    masterPlayName.innerHTML=songs[songIndex].songName;
})

document.getElementById('next').addEventListener('click',()=>{

    document.getElementById(songIndex).classList.remove('fa-pause');
    document.getElementById(songIndex).classList.add('fa-play');

    if(songIndex>=songs.length-1)
    {
        songIndex=0;
    }
    else songIndex+=1;

    audioElement.src=songs[songIndex].filePath;
    audioElement.play();
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');

    masterPlayName.innerHTML=songs[songIndex].songName;
})

// console.log(document.getElementById("gif")); //giving img tag
// .innerHTML=songs[songIndex].songName;

// masterPlayName.innerHTML=songs[songIndex].songName; //working