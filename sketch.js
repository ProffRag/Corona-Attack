var bgImg;
var boyImg, boyAnimation;
var boy;
var coronaSoldierImg1, coronaSoldierImg2;
var covidGroup;
var gameState = 'START';
var bulletImg;
var b, covidSoldier;
var bulletGroup;
var score = 0;
  

function preload(){
  bgImg = loadImage('./Images/bg.jpg');
  boyImg = loadAnimation('./Images/boyStanding.png')
  boyAnimation = loadAnimation('./Images/boy1.png', './Images/boy2.png', './Images/boy3.png', './Images/boy4.png');
  coronaSoldierImg1 = loadImage('./Images/covidSoldier1.png');
  coronaSoldierImg2 = loadImage('./Images/covidSoldier2.png');
  bulletImg = loadImage('./Images/vaccine.png');
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  boy = createSprite(90, height-150);
  boy.addAnimation('Standing', boyImg);
  boy.addAnimation('Running', boyAnimation);
  
  covidGroup = new Group();
  bulletGroup = new Group();
  
}

function draw(){
  background('white');
  image(bgImg, 0, 0, width, height);
  textSize(50);
  fill('white');
  text('Score: '+score, 90, 50)
  if(gameState === 'START'){
    boy.changeAnimation('Standing');
    textSize(50);
    fill('white');
    text('Press Space Key to Start the Game', width/2-300, height/2);
    if(keyDown('SPACE')){
      gameState = 'PLAY';
    }
  }
  if(gameState === 'PLAY'){
    boy.changeAnimation('Running');
    coronaSoldier();
    if(keyDown('RIGHT_ARROW') && frameCount%10 === 0 ){
      bullet();
    }
    for(var i = 0; i <bulletGroup.length; i++){
      bulletGroup[i].overlap(covidGroup, function(collector, collected){
        collector.remove();
        for(var i = 0; i<covidGroup.length; i++){
          if(collected === covidGroup[i]){
            covidGroup[i].changeAnimation('Sad');
          }
        }

        setTimeout(()=> {
          collected.remove()

        }, 300);
        



        score+=1;
      })
    }
    if(covidGroup.collide(boy)){
      gameState = 'END';
    }
    
  }

  if(gameState === 'END'){
    for(var i = 0; i<covidGroup.length; i++){
      covidGroup[i].remove();
    }

    swal({
      title: `Game Over`,
      text: 'You Lost',
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: '100x100',
      confirmButtonText: 'Ok'
    })

    function reload (isConfirm){
      if(isConfirm){
        location.reload();
      }
    } 
    
    
    
  }
  
  drawSprites();
  
}

function coronaSoldier(){
  var r = Math.round(random(1,3))
  switch(r){
    case 1:
      if(frameCount%140 === 0){
        covidSoldier = createSprite(width, height-150);
        covidSoldier.velocity.x = -2;
        covidSoldier.addImage('Happy', coronaSoldierImg1);
        covidSoldier.addImage('Sad', coronaSoldierImg2);
        covidSoldier.changeImage('Happy');
        covidSoldier.scale = 0.5;
        covidGroup.add(covidSoldier);
      
      } 
    break;
    case 2:
      if(frameCount%120 === 0){
        var covidSoldier = createSprite(width, height-150);
        covidSoldier.velocity.x = -2;
        covidSoldier.addImage('Happy', coronaSoldierImg1);
        covidSoldier.addImage('Sad', coronaSoldierImg2);
        covidSoldier.changeImage('Happy');
        covidSoldier.scale = 0.5;
        covidGroup.add(covidSoldier);
      }
    break;
    case 3:
      if(frameCount%160 === 0){
        var covidSoldier = createSprite(width, height-150);
        covidSoldier.velocity.x = -2;
        covidSoldier.addImage('Happy', coronaSoldierImg1);
        covidSoldier.addImage('Sad', coronaSoldierImg2);
        covidSoldier.changeImage('Happy');
        covidSoldier.scale = 0.5;
        covidGroup.add(covidSoldier);
      }
    break;

  }
  
}

function bullet(){
  b = createSprite(120, height-150);
  b.addImage(bulletImg);
  b.velocity.x = 5;
  b.scale = 0.2;
  b.lifetime = width/5;
  bulletGroup.add(b);
}

function reset(){
  gameState = 'START';
  score = 0;
}

function mouseClicked(){
  if(gameState === 'END'){
    reset();
  }
}