scorerightwrist = 0;
scoreleftwrist = 0;

leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

song1="";
song2="";
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("believer.mp3");
    song2=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}

function modelloaded() {
    console.log("posenet is initialized");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("score leftwrist= "+scoreleftwrist+" score rightwrist= "+scorerightwrist);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftwristx + " left wrist y = " + leftwristy);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightwristx + " right wrist y = " + rightwristy);
    }
}

function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("red");
    stroke("white");
    if (scoreleftwrist>0.01){
        circle(leftwristx,leftwristy,20);
        song1.stop();
        if (song2_status==false){
            song2.play();
            
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}