var game = new Phaser.Game(450, 350, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload(){
    game.stage.backgroundColor='#000066';
    game.load.image('correct','assets/correct.png');
    game.load.image('incorrect','assets/incorrect.png');
    game.load.spritesheet('greenbutton','assets/greenbutton.png',186,43);
    game.load.audio('correct',['assets/correct.mp3','assets/correct.ogg']);
    game.load.audio('incorrect',['assets/incorrect.mp3','assets/incorrect.ogg']);
    game.load.audio('button',['assets/buttonclick.mp3','assets/buttonclick.ogg']);
    game.load.audio('beep',['assets/beep.mp3','assets/beep.ogg']);
    game.load.audio('pop1',['assets/pop1.mp3','assets/pop1.ogg']);
};

var round = [];




var sceneIndex = 0;
var inScene = false;

var inRound = -1;

var titleFontStyle = {font:'26px Arial',fill:'#FFFFFF',align:'center'};
var buttonFontStyle= {font:'20px Arial',fill:'#FFFFFF',align:'center'};
var bodyFontStyle = {font:'15px Arial',fill:'#FFFFFF',align:'center'};
var scoreFontStyle = {font:'18px Arial',fill:'#FFFFFF',align:'right'};

var titleText;
var bodyText;

var goButton;
var goButtonText;

var timerInterval;

var buttonSound;
var beepSound;

var roundTimerText;
var roundTimerValue = 30;
var roundTimerInterval;
var roundTitleText;


var button1;
var button2;
var button3;
var button1Text;
var button2Text;
var button3Text;

var isDisplaying = false;
var displayWordObject;
var displayWordText;

var correctIcon;
var incorrectIcon;
var correctSound;
var incorrectSound;

var roundStarted = false;

var score=0;
var roundScore=0;

var resultTimeLeftText;
var resultScoreText;
var resultTotalText;
var nextRoundButton;
var nextRoundButtonText;
var roundCompleteText;
var ul1;
var ul2;

var questionsRight=0;
var questionsWrong=0;
var secondsUsed=0;
var totalQuestions=0;

var finalTitleText;
var finalQRightText;
var finalQWrongText;
var finalSecondsUsedText;
var finalAccuracyText;
var finalSpeedText;
var finalScoreText
var finalGroup;

var readyForNext = false;
var noGuessesLeft= false;

var numberOfQuestions=0;

var roundsLeft;

var resetButton;
var resetButtonText;

function create(){
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
    buttonSound = game.add.audio('button');
    beepSound = game.add.audio('beep');
    pop1Sound = game.add.audio('pop1');
    correctSound = game.add.audio('correct');
    incorrectSound  = game.add.audio('incorrect');
    
   
    
};



function introduction(){
        titleText = game.add.text(game.world.centerX,((game.world.height/7)*2),'Guess the Category!',titleFontStyle);
        titleText.anchor.setTo(0.5,0.5);
        
        bodyText = game.add.text(game.world.centerX,((game.world.height/7)*3.25),'Instructions: Words and phrases will appear \n on the screen. Guess the category the word\n or phrase belongs to before time runs out!',bodyFontStyle);
        bodyText.anchor.setTo(0.5,0.5);
        
        goButton = game.add.button(game.world.centerX,((game.world.height/7)*5),'greenbutton',nextScene,this,0,1,2);
        goButton.anchor.setTo(0.5,0.5);
        
        goButtonText = game.add.text(goButton.x,goButton.y,'Let\'s Go!',titleFontStyle);
        goButtonText.anchor.setTo(0.5,0.5);
        setQuestions();
       
};

function introductionFadeOut(){
        buttonSound.play();
        var tw1 = game.add.tween(titleText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        tw1.onCompleteCallback(nextScene);
        game.add.tween(bodyText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.add.tween(goButton).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        game.add.tween(goButtonText).to( { alpha: 0 }, 750, Phaser.Easing.Linear.None, true, 0, 0, false);
        
};

function setReady(){
    readyForNext = true;
};


function roundCountdown(roundText){
    readyForNext=false;
    roundTitleText = game.add.text(game.world.centerX,100,roundText,titleFontStyle);
    roundTitleText.anchor.setTo(0.5,0.5);

    
    var timerValue =  3;
    
    var timerText = game.add.text(game.world.centerX,game.world.centerY,timerValue,{font:'50px Arial',fill:'#FFFFFF',align:'center'});
    timerText.anchor.setTo(0.5,0.5);
    this.countdown = function(){
        beepSound.play();
        timerValue--;
        timerText.setText(timerValue);


        if(timerValue<=0){
            
            game.add.tween(roundTitleText).to({x:10,y:20},750,Phaser.Easing.Quadratic.Out,true,0,0,false)
            game.add.tween(timerText).to({alpha:0},750,Phaser.Easing.Linear.None,true,0,0,false);
            roundTitleText.anchor.setTo(0,0.5);
            clearInterval(timerInterval);
            readyForNext=true;
            nextScene();
        };
    };
    timerInterval = setInterval(this.countdown,1000);
    beepSound.play();
    
};

function nextScene(){
    if(!readyForNext){
        return;
    };
    sceneIndex++;
    inScene = false;
};

function startRound(roundData){
    noGuessesLeft=false;
    readyForNext=false;
    roundTimerText = game.add.text(game.world.width-60,20,'Time: '+roundTimerValue,titleFontStyle);
    roundTimerText.alpha = 0;
    roundTimerText.anchor.setTo(0.5,0.5);
    var timerFadeIn = game.add.tween(roundTimerText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
    timerFadeIn.onCompleteCallback(function(){roundTimerInterval = setInterval(countDown,1000)});
  
    var categories = [];
    for(var questions in roundData){
        if(categories.indexOf(roundData[questions].category)==-1){
            categories.push(roundData[questions].category);
        };
    };
    
   
        button1 = game.add.button(105,game.world.height-50,'greenbutton',guess,button1,0,1,2);
        button1.category = categories[0];
        button1.anchor.setTo(0.5,0.5);
        button1Text = game.add.text(button1.x,button1.y,categories[0],buttonFontStyle);
        button1Text.anchor.setTo(0.5,0.5);
        button1.alpha = 0;
        button1Text.alpha = 0;
        game.add.tween(button1).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
        game.add.tween(button1Text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
        
        button2 = game.add.button(game.world.width-110,game.world.height-50,'greenbutton',guess,button2,0,1,2);
        button2.category = categories[1];
        button2.anchor.setTo(0.5,0.5);
        button2Text = game.add.text(button2.x,button2.y,categories[1],buttonFontStyle);
        button2Text.anchor.setTo(0.5,0.5);
        button2.alpha = 0;
        button2Text.alpha=0;
        game.add.tween(button2).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
        game.add.tween(button2Text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
   
         if(categories.length===3){
           
           button3 = game.add.button(game.world.centerX,game.world.height-100,'greenbutton',guess,button3,0,1,2);
           button3.category = categories[2];
           button3.anchor.setTo(0.5,0.5);
           button3Text = game.add.text(button3.x,button3.y,categories[2],buttonFontStyle);
           button3Text.anchor.setTo(0.5,0.5);
           button3.alpha=0;
           button3Text.alpha =0;
           game.add.tween(button3).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
           game.add.tween(button3Text).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false);
             
         };
    
    
    
    
};

function guess(button){
    
     if(noGuessesLeft){
        return;
    };
    totalQuestions++;
   
    if(button.category === displayWordObject.category){
        //console.log("Correct!")
        questionsRight++;
        roundScore++;
        correctIcon = game.add.sprite(game.world.centerX,game.world.centerY-100,'correct');
        correctIcon.anchor.setTo(0.5,0.5);
        correctSound.play();
        game.add.tween(correctIcon).to({alpha:0},750,Phaser.Easing.Linear.None,true,0,0,false);
    }else{
        //console.log("Incorrect!")
        questionsWrong++;
        incorrectIcon = game.add.sprite(game.world.centerX,game.world.centerY-100,'incorrect');
        incorrectIcon.anchor.setTo(0.5,0.5);
        incorrectSound.play();
        game.add.tween(incorrectIcon).to({alpha:0},750,Phaser.Easing.Linear.None,true,0,0,false);
    };
   for(var k=0;k<round[inRound].length;k++){
      var obj = round[inRound][k];
      if(obj == displayWordObject){
          round[inRound].splice(k,1);
          break;
      };
   };
    var dt = game.add.tween(displayWordText).to({alpha:0},500,Phaser.Easing.Linear.None,true,0,0,false);
    dt.onCompleteCallback(killWord);
};

function killWord(){
    displayWordText.destroy();
    isDisplaying=false;
};

function displayWord(roundData){
    if(noGuessesLeft){
        return;
    };
    //console.log("inRound="+inRound);
    //console.log(roundData)
    if(roundData.length==0){
        readyForNext=true;
        noGuessesLeft=true;
        nextScene();
        return;
    };
    pop1Sound.play();
    var randomNumber = Math.floor(Math.random()*roundData.length);
    displayWordObject = roundData[randomNumber];
    displayWordText=game.add.text(game.world.centerX,game.world.centerY-25,displayWordObject.text,titleFontStyle);
    displayWordText.anchor.setTo(0.5,0.5);
    displayWordText.scale.x = 0;
    displayWordText.scale.y = 0;
    game.add.tween(displayWordText.scale).to({x:1,y:1},500,Phaser.Easing.Elastic.Out,true,0,0,false);
    
    
    
};

function setQuestions(){
    round = [];
    round.push([{text:"Prosecuted by the state",category:"Crime"},
                  {text:"Punished by the state",category:"Crime"},
                  {text:"Violation of a\n written (codified) law",category:"Crime"},
                  {text:"Violation of social\n norms or expectations",category:"Deviance"},
                  {text:"Punished by social\n exclusion, stigmatization",category:"Deviance"}]);

                  
                  
    round.push([{text:"Bad or evil in itself",category:"Mala in Se"},
                  {text:"Murder, robbery,\n sexual assault",category:"Mala in Se"},
                  {text:"Most societies have\n criminal prohibitions",category:"Mala in Se"},
                  {text:"Widespread agreement\n between cultures and societies",category:"Mala in Se"},
                  {text:"Most people would recognize\n the behaviour as wrong, even \nwithout a law prohibiting it",category:"Mala in Se"},
                  {text:"Bad because it’s prohibited",category:"Mala Prohibita"},
                  {text:"Differs from society to\n society and culture to culture",category:"Mala Prohibita"},
                  {text:"Polygamy",category:"Mala Prohibita"},
                  {text:"Homosexuality",category:"Mala Prohibita"},
                  {text:"May be illegal at some\n times, but not at other times",category:"Mala Prohibita"}]);
                  
                                    

                  
    round.push([{text:"Ordered by judge at\n time of sentencing",category:"Probation"},
                  {text:"Cannot exceed three years",category:"Probation"},
                  {text:"Is a sentence in itself",category:"Probation"},
                  {text:"May be combined with\n community service",category:"Probation"},
                  {text:"Usual eligibility date\n at one-third of sentence",category:"Parole"},
                  {text:"Granted by parole board",category:"Parole"},
                  {text:"Imprisoned offender must\n apply for release",category:"Parole"},
                  {text:"Eligibility date of 10-25\n years for murder",category:"Parole"},
                  {text:"Automatic at two-thirds\n of sentence",category:"Statuatory Release"},
                  {text:"Parole board cannot deny\n without a compelling reason",category:"Statuatory Release"}]);
                  
    roundsLeft  = round.length;
    for(var i=0;i<round.length;i++){
        numberOfQuestions+=round[i].length;
    };
    setReady();
};

function countDown(){
        if(!roundStarted){
            inRound++;
            roundStarted=true;
            isDisplaying=false;
        };
        
      
        
        roundTimerValue--;
        secondsUsed++;
        if(roundTimerValue>5){
            roundTimerText.setText("Time: "+roundTimerValue);
        }else if(roundTimerValue<=5&&roundTimerValue>=0){
            beepSound.play();
            roundTimerText.setText("Time: "+roundTimerValue);
        };
         if(roundTimerValue<0){
            noGuessesLeft=true;
            clearInterval(roundTimerInterval);
            game.add.tween(displayWordText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false);
            readyForNext=true;
            roundTimerValue=0;
            nextScene();
        };
      
    };

function roundResults(){
    readyForNext=false;
    //console.log("Rounds Left: "+roundsLeft);
    roundsLeft--;

   roundCompleteText = game.add.text(game.world.centerX,game.world.centerY,"Round Complete!",titleFontStyle);
   roundCompleteText.anchor.setTo(0.5,0.5);
   roundCompleteText.alpha=0;
   game.add.tween(roundCompleteText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:100},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   
   ul1 = game.add.graphics(25,62);
   ul1.lineStyle(1.5,0xffff00,1);
   ul1.beginFill();
   ul1.moveTo(25,62);
   ul1.lineTo(375,62);
   ul1.endFill();
   ul1.alpha = 0;
  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1750).start();    
  
   resultScoreText = game.add.text(game.world.centerX+160,game.world.centerY-25,"Score: "+roundScore+" answers x 1000 = "+(roundScore*1000)+" points",scoreFontStyle);
   resultScoreText.anchor.setTo(1,0.5);
   resultScoreText.alpha=0;
   game.add.tween(resultScoreText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2000).start();
   
   resultTimeLeftText = game.add.text(game.world.centerX+160,game.world.centerY,"Time Left: "+roundTimerValue+' x 100 = '+(roundTimerValue*100)+' points',scoreFontStyle);
   resultTimeLeftText.anchor.setTo(1,0.5);
   resultTimeLeftText.alpha=0;
   game.add.tween(resultTimeLeftText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   
   ul2 = game.add.graphics(25,100);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(25,100);
   ul2.lineTo(375,100);
   ul2.endFill();
   ul2.alpha=0;
   
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();
  
   var roundTotal = (roundScore*1000)+(roundTimerValue*100);
   score+=roundTotal;
   resultTotalText = game.add.text(game.world.centerX,game.world.centerY+50,"Round Score: "+roundTotal,titleFontStyle);
   resultTotalText.anchor.setTo(0.5,0.5);
   resultTotalText.alpha = 0;
   game.add.tween(resultTotalText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4000).start();
  
   nextRoundButton = game.add.button(game.world.centerX,300,'greenbutton',nextScene,this,0,1,2);
   nextRoundButton.anchor.setTo(0.5,0.5);
   nextRoundButton.alpha = 0;
   
   if(roundsLeft >1){
        nextRoundButtonText = game.add.text(nextRoundButton.x,nextRoundButton.y,"Next Round",titleFontStyle);
   }else if(roundsLeft == 1){
        nextRoundButtonText = game.add.text(nextRoundButton.x,nextRoundButton.y,"Final Round",titleFontStyle);
   }else if(roundsLeft == 0){
        nextRoundButtonText = game.add.text(nextRoundButton.x,nextRoundButton.y,"Get Results",titleFontStyle);
   };
   nextRoundButtonText.anchor.setTo(0.5,0.5);
   nextRoundButtonText.alpha=0;
   game.add.tween(nextRoundButton).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   game.add.tween(nextRoundButtonText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   roundScore=0;
   roundTimerValue=30;
   roundStarted=false;
   setTimeout(setReady,5500);
};

function resultsFadeOut(){
    buttonSound.play();
    game.add.tween(ul1).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(ul2).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultScoreText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTimeLeftText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTotalText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(nextRoundButton).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(roundCompleteText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    var nb = game.add.tween(nextRoundButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    nb.onCompleteCallback(nextScene);
  
};


function roundFadeOut(){
    noGuessesLeft=true;
    clearInterval(roundTimerInterval);
    var t1= game.add.tween(button1).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(button2).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    if(button3!=null || button3!=undefined){
    game.add.tween(button3).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(button3Text).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    };
    game.add.tween(button1Text).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(button2Text).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(roundTimerText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(roundTitleText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    t1.onCompleteCallback(nextScene);
    
};


function finalResults(){
    
   finalGroup = game.add.group();
    
   finalTitleText = game.add.text(game.world.centerX,game.world.centerY,"Your Statistics",titleFontStyle);
   finalTitleText.anchor.setTo(0.5,0.5);
   finalTitleText.alpha=0;
   
   finalGroup.add(finalTitleText);
   
   
   ul1 = game.add.graphics(25,47);
   ul1.lineStyle(1.5,0xffff00,1);
   ul1.beginFill();
   ul1.moveTo(25,47);
   ul1.lineTo(375,47);
   ul1.endFill();
   ul1.alpha = 0;
  
    finalGroup.add(ul1);
   
  
   finalQRightText = game.add.text(game.world.centerX,game.world.centerY-50,"Questions Right: "+questionsRight,scoreFontStyle);
   finalQRightText.anchor.setTo(0.5,0.5);
   finalQRightText.alpha=0;
   
   finalGroup.add(finalQRightText);
   
   finalQWrongText = game.add.text(game.world.centerX,game.world.centerY-25,"Questions Wrong: "+questionsWrong,scoreFontStyle);
   finalQWrongText.anchor.setTo(0.5,0.5);
   finalQWrongText.alpha=0;

   finalGroup.add(finalQWrongText);
   
   var acc = Math.round((questionsRight/totalQuestions)*100);
   finalAccuracyText = game.add.text(game.world.centerX,game.world.centerY,"Accuracy: "+acc+"%",scoreFontStyle);
   finalAccuracyText.anchor.setTo(0.5,0.5);
   finalAccuracyText.alpha=0;
 
  finalGroup.add(finalAccuracyText);
   
   ul2 = game.add.graphics(25,115);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(25,115);
   ul2.lineTo(375,115);
   ul2.endFill();
   ul2.alpha=0;
   
   finalGroup.add(ul2);
   
   finalScoreText = game.add.text(game.world.centerX,game.world.centerY+75,"Final Score: "+score,titleFontStyle);
   finalScoreText.anchor.setTo(0.5,0.5);
   finalScoreText.alpha =0;
   
   finalGroup.add(finalScoreText);
  
   var qps =Math.round((numberOfQuestions/secondsUsed)*100)/100;
   finalSpeedText = game.add.text(game.world.centerX,game.world.centerY+25,"Speed: "+qps+" questions per second",scoreFontStyle);
   finalSpeedText.anchor.setTo(0.5,0.5);
   finalSpeedText.alpha=0;
   
   finalGroup.add(finalSpeedText);
   
   game.add.tween(finalTitleText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:75},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1500).start();    
   game.add.tween(finalQRightText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2000).start();
   game.add.tween(finalQWrongText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   game.add.tween(finalAccuracyText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();   
   game.add.tween(finalSpeedText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3500).start();
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4000).start();
   game.add.tween(finalScoreText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   
   resetButton = game.add.button(game.world.centerX,game.world.centerY+125,'greenbutton',nextScene,this,0,1,2);
   resetButton.anchor.setTo(0.5,0.5);
   resetButton.alpha =0;
   game.add.tween(resetButton).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(5000).start();
   
   finalGroup.add(resetButton);
   
   resetButtonText = game.add.text(resetButton.x,resetButton.y,"Play Again",titleFontStyle);
   resetButtonText.anchor.setTo(0.5,0.5);
   resetButtonText.alpha=0;
   game.add.tween(resetButtonText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(5000).start();
   
   finalGroup.add(resetButtonText);
}

function finalResultsFadeOut(){
    var finalFade = game.add.tween(finalGroup._container).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    finalFade.onCompleteCallback(resetGame);
};

function resetGame(){
    //console.log("RESET THE GAME!")
     sceneIndex = 0;
     inScene = false;

     inRound = -1;

     roundTimerValue = 30;
    
     isDisplaying = false;
    
     roundStarted = false;

     questionsRight=0;
     questionsWrong=0;
     secondsUsed=0;
     totalQuestions=0;

     readyForNext = false;
     noGuessesLeft= false;

     numberOfQuestions=0;

     setQuestions();
     

};

function update(){
    
        if(!inScene){
            
            inScene = true;
            
            switch(sceneIndex){
                case 0: introduction();
                        break;
                case 1: introductionFadeOut();
                        break;
                case 2: roundCountdown("Round 1");
                        break;
                case 3: roundTimerValue=30;
                        startRound(round[0]);
                        break;
                case 4: roundFadeOut();
                        break;
                case 5: roundResults();
                        break;
                case 6: resultsFadeOut();
                        break;
                case 7: roundCountdown("Round 2");
                        break;
                case 8: roundTimerValue=60;
                        startRound(round[1]);
                        break;
                case 9: roundFadeOut();
                        break;
                case 10:roundResults();
                        break;
                case 11:resultsFadeOut();
                        break;
                case 12: roundCountdown("Final Round");
                        break;
                case 13: roundTimerValue=90;
                         startRound(round[2]);
                         break;
                case 14: roundFadeOut();
                        break;
                case 15: roundResults();
                        break;
                case 16: resultsFadeOut();
                        break;
                case 17:finalResults();
                        break;
                case 18:finalResultsFadeOut();
                        break;
                case 19:resetGame();
                        break;
                        
            };
        };
    
        if(inRound>-1){
            if(!isDisplaying){
               isDisplaying=true;
               displayWord(round[inRound]);
            };
            
        };
};

