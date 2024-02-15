song1 = "";
song2 = "";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
songstatus1= "";
songstatus2= "";

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotpose);
}

function modelloaded(){
    console.log("posenet is initiazied");
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;

        console.log("LeftWristX = "+ leftWristx +" LeftWristy = "+ leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;

        console.log("RightWristx = "+ rightWristx +" RightWristy = "+ rightWristy);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+ scoreRightWrist)
    }
}

function draw(){
   image(video, 0, 0, 600, 500);
  
   fill("red");
   stroke("red");
   
   songstatus1 = song1.isPlaying();
   songstatus2 = song2.isPlaying();

   if( scoreLeftWrist > 0.2){
    circle(leftWristx, leftWristy, 20);
    song2.stop();
    if( songstatus1 == false ){ 
        song1.play();
        document.getElementById("song_name").innerHTML = "playing harry potter them song"
    }
   }

   if( scoreRightWrist > 0.2){
    circle(rightWristx, rightWristy, 20);
    song1.stop();
    if( songstatus2 == false ){ 
        song2.play();
        document.getElementById("song_name").innerHTML = "playing peter pan them song"
    }
   }


}



function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

