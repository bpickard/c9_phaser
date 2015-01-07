var game = new Phaser.Game(760,700, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var preloadText;

function preload(){
    game.stage.backgroundColor='#000066';
    var preloadStyle = {font:'24px Arial',fill:'#FFFFFF',align:'center'};
    preloadText = game.add.text(game.world.centerX,game.world.centerY,"Loading Assets...",preloadStyle);
    preloadText.anchor.setTo(0.5,0.5);
    game.load.image('correctImg','assets/correct.png');
    game.load.image('incorrectImg','assets/incorrect.png');
    game.load.spritesheet('greenbutton','assets/greenbutton.png',186,43);
    game.load.audio('correct',['assets/correct.mp3','assets/correct.ogg']);
    game.load.audio('incorrect',['assets/incorrect.mp3','assets/incorrect.ogg']);
    game.load.audio('button',['assets/buttonclick.mp3','assets/buttonclick.ogg']);
    game.load.audio('click',['assets/click.mp3','assets/click.ogg']);
    game.load.image('termBG','assets/term.png');
    game.load.image('defnBG','assets/defn.png');
    game.load.spritesheet('lights','assets/lights.png',24,24);
};



var sceneIndex = 0;
var inScene = false;
var titleFontStyle = {font:'26px Arial',fill:'#FFFFFF',align:'center'};
var bodyFontStyle = {font:'15px Arial',fill:'#FFFFFF',align:'center',wordWrap:true,wordWrapWidth:500};
var termFontStyle = {font:'12px Arial',fill:'#000000',align:'left'};
var defnFontStyle = {font:'12px Arial',fill:'#000000',align:'left',wordWrap:true,wordWrapWidth:290};
var titleText;
var bodyText;
var goButton;
var goButtonText;
var buttonSound;
var clickSound;
var correctSound;
var incorrectSound;
var readyForNext = false;
var correctIcon;
var incorrectIcon;
var dataArray = [];
var isDrawing = false;
var finalGroup;
var ul1;
var ul2;
var finalTitleText;
var finalQRightText;
var finalQWrongText;
var scoreFontStyle = {font:'18px Arial',fill:'#FFFFFF',align:'right'};
var finalAccuracyText;
var finalScoreText;
    var resetButton;
    var resetButtonText;

var bmd;
var lines;
var bg;
var currentNode;

var startClick = {x:0,y:0};

var tLights = [];
var dLights = []; 
var bgLeft = [];
var bgRight = [];
var tText = [];
var dText = [];
var drawLines = [];
var answered = [];
var leftSide = null;
var rightSide = null;

var questionsRight = 0;
var questionsWrong = 0;

function create(){

    Phaser.Canvas.setSmoothingEnabled(game.context, false);
   
    buttonSound = game.add.audio('button');
    clickSound = game.add.audio('click');
    correctSound = game.add.audio('correct');
    incorrectSound  = game.add.audio('incorrect');
    correctIcon = game.add.sprite(300,300,'correctImg');
    correctIcon.anchor.setTo(0.5,0.5);
    correctIcon.alpha = 0;
    incorrectIcon = game.add.sprite(300,300,'incorrectImg');
    incorrectIcon.anchor.setTo(0.5,0.5);
    incorrectIcon.alpha =0;
    preloadText.destroy();
    
   	bmd = game.add.bitmapData(760, 700);
	


    
};



function introduction(){
        titleText = game.add.text(game.world.centerX,((game.world.height/7)*2),'Term/Definition Matching',titleFontStyle);
        titleText.anchor.setTo(0.5,0.5);
        
        bodyText = game.add.text(game.world.centerX,((game.world.height/7)*3.25),'Instructions: Drag from the buttons in the column on the left to the buttons in the column on the right to match the term to the definition.',bodyFontStyle);
        bodyText.anchor.setTo(0.5,0.5);
        
        goButton = game.add.button(game.world.centerX,((game.world.height/7)*5),'greenbutton',nextScene,this,0,1,2);
        goButton.anchor.setTo(0.5,0.5);
        
        goButtonText = game.add.text(goButton.x,goButton.y,'Let\'s Go!',titleFontStyle);
        goButtonText.anchor.setTo(0.5,0.5);
        setReady();
       
};

function introductionFadeOut(){
        buttonSound.play();
        var tw1 = game.add.tween(titleText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        tw1.onCompleteCallback(nextScene);
        game.add.tween(bodyText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.add.tween(goButton).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.add.tween(goButtonText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        setReady();
        nextScene();
};


function displayRound(){
  

  dataArray.push(
      {term:"White-collar crime",definition:"Committed by wealthy, powerful individuals, for their own benefit"},
      {term:"Enterprise crime",definition:"Another term for organized crime/level 4 gangs"},
      {term:"Ponzi scheme",definition:"Early 20th century investment scheme that guaranteed investors huge returns on their investment"},
      {term:"Corporate crime",definition:"Price-fixing, toxic waste dumping, knowingly selling hazardous products "},
      {term:"Green criminology",definition:"Studies environmental crimes committed by corporations"},
      {term:"Regulatory agencies",definition:"The Competition Bureau, the Canada Food Inspection Agency"},
      {term:"The subculture of power abuse",definition:"Select group of corporate executives who give themselves huge salaries and bonuses "},
      {term:"Level 1 gangs",definition:"Loosely formed groups, based on shared cultural identity or neighbourhood"},
      {term:"Gang prevention strategies",definition:"The Philadelphia Model and GREAT"},
      {term:"Weed and Seed",definition:"Gang suppression strategy, based on removing gang leaders and revitalizing the neighbourhood"}
      );

      
      var terms = [];
      var defns = [];
      
      for(var i=0;i<dataArray.length;i++){
          terms.push(dataArray[i].term);
          defns.push(dataArray[i].definition);
      }
      
      var count = 1;
      var spacer = 5;

      for(var t=0;t<terms.length;t++){
          
          var randNum = Math.floor(Math.random()*terms.length);
          var randNum2 = Math.floor(Math.random()*defns.length);
          if(count>1){
              spacer +=65;
          }
          var term_bg = game.add.sprite(15,spacer,'termBG');
          term_bg.alpha = 0;
          bgLeft.push(term_bg);
          
          var defn_bg = game.add.sprite(400,spacer,'defnBG');
          defn_bg.alpha = 0;
          bgRight.push(defn_bg);
          
         
          var randTerm = terms[randNum];
          var randDefn = defns[randNum2];
          var termText = game.add.text(term_bg.x,term_bg.y,randTerm,termFontStyle);
          
          termText.alpha = 0;
          tText.push(termText);
          
          var termLight = game.add.sprite(328,spacer+22,'lights');
          termLight.answer = getAnswer(randTerm);
          termLight.alpha = 0;
          tLights.push(termLight);
          
          var defnLight = game.add.sprite(411,spacer+22,'lights');
          defnLight.inputEnabled = true;
          defnLight.answer = getAnswer(randDefn);
          defnLight.events.onInputOver.add(detectRight,this);
          defnLight.events.onInputOut.add(clearRight,this);
          defnLight.alpha =0;
          dLights.push(defnLight);
    
          
          termLight.inputEnabled = true;
          termLight.input.useHandCursor = true;
          termLight.events.onInputDown.add(toggleDraw,this);
          termLight.events.onInputOver.add(detectLeft,this);
          termLight.events.onInputOut.add(clearLeft,this);
          game.input.onUp.add(toggleDraw,this);

          
          termText.x+=25;
          termText.y+=25;
          var defnText = game.add.text(defn_bg.x,defn_bg.y,randDefn,defnFontStyle);
          defnText.x+=50;
          defnText.y+=12;
          defnText.alpha = 0;
          dText.push(defnText);
        
          defnText.anchor.setTo(0,0);
          terms.splice(randNum,1);
          defns.splice(randNum2,1);
          t--;
          count++;
          
          for(var q=0;q<bgLeft.length;q++){
              game.add.tween(bgLeft[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(500).start();
              game.add.tween(bgRight[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(500).start();
              game.add.tween(tLights[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(750).start();
              game.add.tween(dLights[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(750).start();
              game.add.tween(tText[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1000).start();
              game.add.tween(dText[q]).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1000).start();
              
          }
      }
  
   lines = game.add.sprite(0,0,bmd);
};

function detectRight(e){
    rightSide = e;
    //console.log("a mouse is over me")
}

function clearRight(){
    rightSide = null;
    //console.log("a mouse has left")
}

function detectLeft(e){
    if(isDrawing){
        return;
    }
    leftSide = e;
}

function clearLeft(){
    if(isDrawing){
        return;
    }
    leftSide = null;
}
function getAnswer(answerData){
    for(var i=0;i<dataArray.length;i++){
        if(dataArray[i].term == answerData || dataArray[i].definition == answerData){
            return(dataArray[i]);
        }
    }
}

function checkIfAnswered(){
    for(var i=0;i<answered.length;i++){
        if(answered.indexOf(leftSide)!=-1){
            return true;
        }
    }
    return false;
}

function toggleDraw(e){
    if(leftSide == null || checkIfAnswered() == true){
        return;
    }
    isDrawing = !isDrawing;
    if(isDrawing){
       startClick.x = game.input.mousePointer.x;
       startClick.y = game.input.mousePointer.y;
       for(var y=0;y<dLights.length;y++){
           if(dLights[y].frame ==1){
               dLights[y].frame = 0;
           }
       }
       console.log(e.answer);
    }
    
    if(!isDrawing){
        bmd.clear();
        if(rightSide == null){
            return;
        }
       if(leftSide.answer == rightSide.answer){
           console.log("correct");
           var newLine = game.add.bitmapData(760,700);
           newLine.strokeStyle("#00FF00");
           newLine.context.lineWidth = 3;
           newLine.beginPath();
           newLine.moveTo(leftSide.x+12,leftSide.y+12);
           newLine.lineTo(rightSide.x+12,rightSide.y+12);
           newLine.stroke();
           game.add.sprite(0,0,newLine);
           drawLines.push(newLine);
           leftSide.frame = 2;
           rightSide.frame = 2;
           answered.push(leftSide);
           correctSound.play();
           questionsRight++;
           if(questionsRight === 10){
               setReady();
               nextScene();
           }
       }else{
           console.log("incorrect");
           questionsWrong++;
           incorrectSound.play();
           leftSide.frame = 1;
           rightSide.frame = 1;
       }
       
    }
}

function setReady(){
    readyForNext = true;
};



function nextScene(){
    if(!readyForNext){
        return;
    };
    sceneIndex++;
    inScene = false;
    readyForNext = false;
};


function roundFadeOut(){
    console.log("round finished")
    for(var q=0;q<bgLeft.length;q++){
        game.add.tween(bgLeft[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
        game.add.tween(bgRight[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
        game.add.tween(tLights[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(750).start();
        game.add.tween(dLights[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(750).start();
        game.add.tween(tText[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(1000).start();
        game.add.tween(dText[q]).to({alpha:0},500,Phaser.Easing.Linear.None).delay(1000).start();
        drawLines[q].clear();
    }
    
       setTimeout(finalAdvance,1500);
              
}

function finalAdvance(){
    setReady();
    nextScene();
}


function finalResults(){

    
   finalGroup = game.add.group();
    
   finalTitleText = game.add.text(game.world.centerX,game.world.centerY,"Your Statistics",titleFontStyle);
   finalTitleText.anchor.setTo(0.5,0.5);
   finalTitleText.alpha=0;
   
   finalGroup.add(finalTitleText);
   
   
   ul1 = game.add.graphics(25,47);
   ul1.lineStyle(1.5,0xffff00,1);
   ul1.beginFill();
   ul1.moveTo(250,197);
   ul1.lineTo(475,197);
   ul1.endFill();
   ul1.alpha = 0;
  
    finalGroup.add(ul1);
   

   
   finalQWrongText = game.add.text(game.world.centerX,game.world.centerY-65,"Number of Incorrect Attempts: "+questionsWrong,scoreFontStyle);
   finalQWrongText.anchor.setTo(0.5,0.5);
   finalQWrongText.alpha=0;

   finalGroup.add(finalQWrongText);
   
   var acc = Math.round((10/(questionsWrong+questionsRight))*100);
   finalAccuracyText = game.add.text(game.world.centerX,game.world.centerY-35,"Accuracy: "+acc+"%",scoreFontStyle);
   finalAccuracyText.anchor.setTo(0.5,0.5);
   finalAccuracyText.alpha=0;
 
  finalGroup.add(finalAccuracyText);
  
  
   
   ul2 = game.add.graphics(25,115);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(250,235);
   ul2.lineTo(475,235);
   ul2.endFill();
   ul2.alpha=0;
   
   finalGroup.add(ul2);
   
   
  

   
   game.add.tween(finalTitleText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:225},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1500).start();    

   game.add.tween(finalQWrongText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   game.add.tween(finalAccuracyText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();   
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3500).start();

   
   resetButton = game.add.button(game.world.centerX,game.world.centerY+75,'greenbutton',nextScene,this,0,1,2);
   resetButton.anchor.setTo(0.5,0.5);
   resetButton.alpha =0;
   game.add.tween(resetButton).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   
   finalGroup.add(resetButton);
   
   resetButtonText = game.add.text(resetButton.x,resetButton.y,"Play Again",titleFontStyle);
   resetButtonText.anchor.setTo(0.5,0.5);
   resetButtonText.alpha=0;
   game.add.tween(resetButtonText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(5000).start();
   setReady();
   finalGroup.add(resetButtonText);
};

function resultsFadeOut(){
    var finalFade = game.add.tween(finalGroup._container).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    finalFade.onCompleteCallback(gameOver);
}

function gameOver(){

    bmd.clear();
    var startClick = {x:0,y:0};

    tLights = [];
    dLights = []; 
    bgLeft = [];
    bgRight = [];
    tText = [];
    dText = [];
    drawLines = [];
    answered = [];
    leftSide = null;
    rightSide = null;
    
    questionsRight = 0;
    questionsWrong = 0;
    dataArray = [];
    isDrawing = false;
    sceneIndex = -1;
    inScene = false;
    setReady();
    nextScene();
    
}

function update(){
      
        if(isDrawing){
        
         bmd.clear();
         bmd.strokeStyle("#FFFFFF");
         bmd.context.lineWidth = 3;
         bmd.beginPath();
         bmd.moveTo(startClick.x,startClick.y);
         bmd.lineTo(game.input.mousePointer.x,game.input.mousePointer.y);
         bmd.stroke();
        }
    
        if(!inScene){
            
            inScene = true;
            
            switch(sceneIndex){
                case 0: introduction();
                        break;
                case 1: introductionFadeOut();
                        break;
                case 2: displayRound();
                        break;
                case 3: roundFadeOut();
                        break;
                case 4: finalResults();
                        break;
                case 5: resultsFadeOut();
                        break;
                case 5: gameOver();
                        break;

              
                        
            };
        };
    

};

