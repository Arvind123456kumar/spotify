//initialize the variables
let songIndex=0;
let index=0;
let audioElement=new Audio('./songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let gif=document.getElementById('gif');
let MyProgressBar=document.getElementById('MyProgressBar');
let masterSongName=document.getElementById('masterSongName');
let songItem=document.getElementsByClassName('songItem');
let songTime=document.getElementsByClassName('songTime');
let songs=[
    {songName:"Warrlyo - Martals (feat-Laura)",filePath:"./songs/1.mp3",coverPath:"./covers/1.jpg"},
    {songName:"Csela - Aaja Aaja",filePath:"./songs/2.mp3",coverPath:"./covers/2.jpg"},
    {songName:"Salame-e-ishq",filePath:"./songs/3.mp3",coverPath:"./covers/3.jpg"},
    {songName:"Salame-e-ishq",filePath:"./songs/4.mp3",coverPath:"./covers/4.jpg"},
    {songName:"Salame-e-ishq",filePath:"./songs/5.mp3",coverPath:"./covers/5.jpg"},
    {songName:"dil ke pnchhi",filePath:"./songs/6.mp3",coverPath:"./covers/6.jpg"},
    {songName:"dil dari ki dukan",filePath:"./songs/7.mp3",coverPath:"./covers/7.jpg"},
    {songName:"Jamin teri",filePath:"./songs/8.mp3",coverPath:"./covers/8.jpg"},
    {songName:"Asma mera",filePath:"./songs/9.mp3",coverPath:"./covers/9.jpg"},
    {songName:"dil ki dhankan",filePath:"./songs/10.mp3",coverPath:"./covers/10.jpg"}
];
//Listen to event 
const timeUpdate=()=>{
    audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    MyProgressBar.value=progress;
        songTime[index-1].innerHTML=`${((audioElement.currentTime)/60).toFixed(2)}`;
    });
    }
Array.from(songItem).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src=songs[i].coverPath;
    e.getElementsByClassName('songName')[0].innerHTML=songs[i].songName;
})
//handle play /pause
masterPlay.addEventListener('click',()=>{    
if(audioElement.paused||audioElement.currentTime<=0){
    audioElement.play();
    makeAllPlays();
    timeUpdate();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    gif.style.opacity=1;
}
else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle')
    masterPlay.classList.add('fa-play-circle') 
    gif.style.opacity=0;
    makeAllPlays();
    timeUpdate();
}
});
index=0;
MyProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=MyProgressBar.value*audioElement.duration/100
});
function makeAllPlays(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el)=>{ 
        el.classList.add('fa-play-circle');
        el.classList.remove('fa-pause-circle');  
       timeUpdate();
    })}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    // console.log(e);
    makeAllPlays();
    timeUpdate();
    index=parseInt(e.target.id)+1;
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src=`./songs/${index}.mp3`;
    masterSongName.innerText=songs[index-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
});
document.getElementById('next').addEventListener('click',()=>{
next();
})
const next=()=>{
if(index>=10){
    index=1;
}
else{
    index++;
}
audioElement.src=`./songs/${index}.mp3`;
masterSongName.innerText=songs[index-1].songName;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
gif.style.opacity=1;
timeUpdate();
makeAllPlays();
}
document.getElementById('previous').addEventListener('click',()=>{
    if(index<=1){
        index=9;
    }
    else{
        index--;
    }
    audioElement.src=`./songs/${index}.mp3`;
    masterSongName.innerText=songs[index-1].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    timeUpdate();
    makeAllPlays();
    });
