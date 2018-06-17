var music = document.getElementById('music');
music.loop = false; //关闭单曲循环
//监听音乐是否结束
music.addEventListener('ended', function () {
    setInterval(function(){
        if(music.currentTime==music.duration){
            toggleBtn.innerHTML='<img src="img/playIcon.png"/>';
            music.currentTime=0;
        }
    }, 500);
}, false);
//监听播放进度
music.addEventListener('timeupdate',function(){
    if (!isNaN(music.duration)) {
        //进度条所占比例
        var progressValue = music.currentTime/music.duration; //
        /*document.getElementById("demo").innerHTML = music.duration;*/
        if(progressValue == 1){
            progressValue=0;//
        }
        drawCircle(canvas,progressValue);
    }
},false);
//绘制播放进度条
drawCircle = function (canvas, percentage) {
    var canvasWidth=250;
    var innerR = canvasWidth * 0.8 * 0.5;//圆形仅进度条半径
    var ctx;
    //为canvas画布设置长宽
    canvas.setAttribute('width', canvasWidth + 'px');
    canvas.setAttribute('height', canvasWidth + 'px');
    //检查兼容性
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    ///translate() 方法重新映射画布上的 (0,0) 位置
    ctx.translate(canvasWidth / 2, canvasWidth / 2);
    //绘制圆形图案
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#020202";
    ctx.stroke();
    ctx.beginPath();
    //绘制进度条
    ctx.arc(0, 0, innerR, Math.PI * 3 / 2, (Math.PI * 3 / 2 + percentage * Math.PI * 2), false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#f4ea24";
    ctx.stroke();
};

drawCircle(document.getElementById('canvas'),0);

var volume=document.getElementById("volume");
var toggleBtn=document.getElementById("toggle");
//歌名栏
var title=document.getElementById("song-title");

var list=new Array("music/晴天.mp3","music/体面.mp3","music/Try.mp3","music/春娇与志明.mp3");
//歌名列表
var titleList=new Array("晴天","体面","Try","春娇与志明");
//歌曲列表值索引
var i=0;

//播放暂停按钮转化
function toggleMusic(){
    if(music.paused){
        music.play();
        toggleBtn.innerHTML='<img src="img/pauseIcon.png"/>';
    }else{
        music.pause();
        toggleBtn.innerHTML='<img src="img/playIcon.png"/>';
    }
}

//绑定音量
function setVolume(){
    music.volume=volume.value;
}

//下一首歌
function nextMusic(){
    if(i==list.length-1){
        i=0;
    }
    else{
        i++;
    }
    music.pause();
    music.src=list[i];
    title.innerHTML=titleList[i];
    toggleBtn.innerHTML='<img src="img/pauseIcon.png" width="50" height="50"/>';
    music.play();
}

//上一首歌
function lastMusic(){
    if(i==0){
        i=list.length-1;
    }
    else{
        i--;
    }
    music.pause();
    music.src=list[i];
    title.innerHTML=titleList[i];
    toggleBtn.innerHTML='<img src="img/pauseIcon.png" width="50" height="50"/>';
    music.play();
}
