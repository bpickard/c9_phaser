var game = new Phaser.Game(550, 450, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

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
    game.load.audio('tick_soft',['assets/tick_soft.mp3','assets/tick_soft.ogg']);
    game.load.audio('alarm',['assets/alarm.mp3','assets/alarm.ogg']);
    game.load.audio('up',['assets/up.mp3','assets/up.ogg']);
    game.load.image('watch','assets/stop-watch_small.png');


        
};

var round = [];

var currentQuestionBank;
var currentQuestion;

var finalGroup;

var sceneIndex = 0;
var inScene = false;


var titleFontStyle = {font:'26px Arial',fill:'#FFFFFF',align:'center'};

var bodyFontStyle = {font:'15px Arial',fill:'#FFFFFF',align:'center'};

var clockFontStyle = {font:'18px Arial',fill:'#FF0000',align:'center'};

var scoreFontStyle = {font:'18px Arial',fill:'#FFFFFF',align:'right'};


var score =0;

var titleText;
var bodyText;

var goButton;
var goButtonText;

var watchImage;

var buttonSound;

var clickSound;

var trueButton;
var trueButtonText;
var falseButton;
var falseButtonText;
var nextRoundButton;
var nextRoundButtonText;

var aButton;
var bButton;
var cButton;
var dButton;

var aButtonText;
var bButtonText;
var cButtonText;
var dButtonText;

var r2Title;



var r1Total = 0;
var r1Correct = 0;
var r2Total = 0;
var r2Correct = 0;

var correctSound;
var incorrectSound;

var questionTimer;
var readyToGuess = false;

var round = [];

var r1Title;
var r1cd = 3;

var readyForNext = false;

var questionTimerText;
var $cuInterval;
var $qInterval;
var currentRound = 1;

var correctIcon;
var incorrectIcon;

var roundCompleteText;
var ul1;
var ul2;
var resultScoreText;
var resultTimeLeftText;
var resultTotalText;

    var finalTitleText;
    var finalQRightText;
    var finalQWrongText;
    var questionsRight=0;
    var totalQuestions=0;
    var questionsWrong=0;
    var finalAccuracyText;
    var finalScoreText;
    var numberOfQuestions;
    var secondsUsed=0;
    var resetButton;
    var resetButtonText;
    var upSound;
    var tickSoft;
    var alarm;

function create(){

    Phaser.Canvas.setSmoothingEnabled(game.context, false);
   
    buttonSound = game.add.audio('button');
    clickSound = game.add.audio('click');
    correctSound = game.add.audio('correct');
    incorrectSound  = game.add.audio('incorrect');
    upSound = game.add.audio('up');
    tickSoft = game.add.audio('tick_soft');
    alarm = game.add.audio('alarm');
    correctIcon = game.add.sprite(300,300,'correctImg');
    correctIcon.anchor.setTo(0.5,0.5);
    correctIcon.alpha = 0;
    incorrectIcon = game.add.sprite(300,300,'incorrectImg');
    incorrectIcon.anchor.setTo(0.5,0.5);
    incorrectIcon.alpha =0;
    preloadText.destroy();
    
   
    
};



function introduction(){
        titleText = game.add.text(game.world.centerX,((game.world.height/7)*2),'Beat the Clock!',titleFontStyle);
        titleText.anchor.setTo(0.5,0.5);
        
        bodyText = game.add.text(game.world.centerX,((game.world.height/7)*3.25),'Instructions: Answer questions quickly before\ntime runs out! One round of True/False questions\nand one round of multiple choice!',bodyFontStyle);
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


function setQuestions(){
    
    round.push([{questionText:"Intersectional feminist criminology examines the intersection between female offenders, the police and the court system.",answer:"false"},
                {questionText:"Although the term “relative deprivation” has been used extensively by “left realists,” the concept of relative deprivation originated with Robert Merton and his work on anomie-strain theory.",answer:"true"},
                {questionText:"Post-structuralist criminology rejects the Marxist and structural functionalist notion that individuals can stand outside of the social system in order to critique it.",answer:"true"},
                {questionText:"According to MacMillan and Gartner’s article, “When She Brings Home the Bacon,” over 40% of employed women are victims of “patriarchal terrorism.”",answer:"false"},
                {questionText:"According to chapter 9 of the textbook, “peace-making criminology” would be considered a form of “critical criminology.”",answer:"true"}]);
                
    round.push([{questionText:"Critical criminology and feminist criminology both have their intellectual roots in:\n\nA) The “Roaring Twenties” and the “Dirty Thirties”\n\nB) The 10 year period immediately following the end of World War Two (1945-1955)\n\nC) the 1960s and 1970s\n\nD) the 1980s and the 1990s",answer:"c"},
                {questionText:"Exchange/social control theory by Richard Gelles asserts that:\n\nA) social bonds are stronger in traditional, patriarchal families than they are in egalitarian families\n\nB) low self-control theory can be used to explain the violent exchanges in spousal abuse \n\nC) informal social control is exchanged in return for greater freedom during the transition from the patriarchal to the egalitarian family structure  \n\nD) wife and child abuse are governed by the principles of costs and rewards",answer:"d"},
                {questionText:"Sally Simpson’s work on “Caste, Class and Violent Crime” would be considered an example of:\n\nA) peace-making criminology\n\nB) post-structuralist criminology\n\nC) intersectional feminist criminology\n\nD) post-modernist criminology",answer:"c"},
                {questionText:"The more recent work of criminologist Jock Young would be considered an example of:\n\nA) Marxist and radical feminism\n\nB) Foucauldian thinking \n\nC) post-modernist criminology\n\nD) left realism",answer:"d"},
                {questionText:"According to the 1993 Violence Against Women Survey conducted by Statistics Canada:\n\nA) over 50% of the women surveyed suffered systematic abuse at the hands of their male partner\n\nB) over 75% of the women surveyed suffered non-systematic abuse at the hands of their male partner\n\nC) over 80% of the women surveyed reported being victims of interpersonal conflict\n\nD) over 80% of the women surveyed did not report any form of spousal abuse",answer:"d"}]);
                
    setReady();
    nextScene();
    
}


function tfRoundSetup(){
    questionTimer =0;
 
    watchImage = game.add.sprite(game.world.centerX,game.world.centerY,"watch");
    watchImage.anchor.setTo(0.5,0.5);
    watchImage.alpha = 0;
    game.add.tween(watchImage).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None).delay(1250).start();
    questionTimerText = game.add.text(watchImage.x,watchImage.y,'0',clockFontStyle);
    questionTimerText.anchor.setTo(0.5,-0.65);
    questionTimerText.alpha = 0;
    game.add.tween(questionTimerText).to({alpha:1},750,Phaser.Easing.Linear.None).delay(1250).start();
    setTimeout(startCount,3000);
    setTimeout(clickPlay,2600);
}

function mcRoundSetup(){
    questionTimer = 0;
    watchImage.alpha = 0;
    watchImage.x = game.world.centerX;
    watchImage.y = game.world.centerY;
     game.add.tween(watchImage).to( { alpha: 1 }, 750, Phaser.Easing.Linear.None).delay(750).start();
    questionTimerText.x = watchImage.x;
    questionTimerText.y = watchImage.y;
     game.add.tween(questionTimerText).to({alpha:1},750,Phaser.Easing.Linear.None).delay(750).start();
   currentRound=2;
    questionTimerText.setText("0");
    r1cd =3;
   setTimeout(startCount,3000);
    setTimeout(clickPlay,2600);
    
};

function countUp(){
    questionTimer++;

    upSound.play();
    if(currentRound ==1 && questionTimer == 30){
        clearInterval($cuInterval);
        moveClock();
       
    };
    
        if(currentRound ==2 && questionTimer == 60){
        clearInterval($cuInterval);
        moveClock();
       
    };
    
    questionTimerText.setText(questionTimer);
    
};




function moveClock(){
    //console.log("moveClock()")
    game.add.tween(watchImage).to({x:475},1000,Phaser.Easing.Elastic.Out).start();
    game.add.tween(questionTimerText).to({x:475},1000,Phaser.Easing.Elastic.Out).start();
   if(currentRound ==1){
    setTimeout(fadeinUI,1500);
   }else{
       setTimeout(fadeinUI2,1500);
   };
    correctIcon.x = 475;

    correctIcon.y = watchImage.y+15;
    incorrectIcon.x = 475;
    incorrectIcon.y = watchImage.y+15;
};



function fadeinUI(){
    //console.log("fadeinUI")
    trueButton = game.add.button(175,400,'greenbutton',r1guess,trueButton,0,1,2);
    trueButton.alpha=0;
    trueButton.anchor.setTo(0.5,0.5);
    trueButtonText = game.add.text(trueButton.x,trueButton.y,'True',titleFontStyle);
    trueButtonText.anchor.setTo(0.5,0.5);
    trueButton.alpha =0;
    trueButton.answer = 'true';
    game.add.tween(trueButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(trueButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    
    falseButton = game.add.button(375,400,'greenbutton',r1guess,falseButton,0,1,2);
    falseButton.alpha=0;
    falseButton.anchor.setTo(0.5,0.5);
    falseButtonText = game.add.text(falseButton.x,falseButton.y,'False',titleFontStyle);
    falseButtonText.anchor.setTo(0.5,0.5);
    falseButton.alpha =0;
    falseButton.answer = 'false';
    game.add.tween(falseButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(falseButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    r1Title = game.add.text(game.world.centerX,75,"Round 1 starts in "+r1cd+"...",titleFontStyle);
    r1Title.alpha=0;
    r1Title.anchor.setTo(0.5,0.5);
    game.add.tween(r1Title).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    setTimeout(r1Start,1000);
};
function fadeinUI2(){
    //console.log("fadeinUI2")
    aButton = game.add.button(175,365,'greenbutton',r2guess,aButton,0,1,2);
    aButton.alpha=0;
    aButton.anchor.setTo(0.5,0.5)
    aButtonText = game.add.text(aButton.x,aButton.y,'A)',titleFontStyle);
    aButtonText.anchor.setTo(0.5,0.5);
    aButton.alpha =0;
    aButton.answer = 'a';
    game.add.tween(aButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(aButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    
    bButton = game.add.button(375,365,'greenbutton',r2guess,bButton,0,1,2);
    bButton.alpha=0;
    bButton.anchor.setTo(0.5,0.5);
    bButtonText = game.add.text(bButton.x,bButton.y,'B)',titleFontStyle);
    bButtonText.anchor.setTo(0.5,0.5);
    bButton.alpha =0;
    bButton.answer = 'b';
    game.add.tween(bButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(bButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    
    cButton = game.add.button(175,415,'greenbutton',r2guess,cButton,0,1,2);
    cButton.alpha=0;
    cButton.anchor.setTo(0.5,0.5);
    cButtonText = game.add.text(cButton.x,cButton.y,'C)',titleFontStyle);
    cButtonText.anchor.setTo(0.5,0.5);
    cButton.alpha =0;
    cButton.answer = 'c';
    game.add.tween(cButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(cButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    
    dButton = game.add.button(375,415,'greenbutton',r2guess,dButton,0,1,2);
    dButton.alpha=0;
    dButton.anchor.setTo(0.5,0.5);
    dButtonText = game.add.text(dButton.x,dButton.y,'D)',titleFontStyle);
    dButtonText.anchor.setTo(0.5,0.5);
    dButton.alpha =0;
    dButton.answer = 'd';
    game.add.tween(dButton).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    game.add.tween(dButtonText).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    
    r2Title = game.add.text(game.world.centerX,60,"Round 2 starts in "+r1cd+"...",titleFontStyle);
    r2Title.alpha=0;
    r2Title.anchor.setTo(0.5,0.5);
    game.add.tween(r2Title).to({alpha:1},750,Phaser.Easing.Linear.None).start();
    setTimeout(r2Start,1000);
};

function r2Start(){
    r1cd--;
    if(r1cd==0){
        r2Title.setText("Round 2");
        setReady();
        nextScene();
        return;
    };
    r2Title.setText("Round 2 starts in "+r1cd+"...");
    setTimeout(r2Start,1000);
};

function r1Start(){
       r1cd--;
    if(r1cd==0){
        r1Title.setText("Round 1");
        setReady();
        nextScene();
        return;
    };
    r1Title.setText("Round 1 starts in "+r1cd+"...");
    setTimeout(r1Start,1000);
};

function r1guess(button){
    if(!readyToGuess){
        return;
    };
    totalQuestions++;
    if(button.answer == currentQuestion.answer){
        questionsRight++;
        //console.log('correct')
        correctSound.play();
        correctIcon.alpha=1;
        correctIcon.bringToTop();
        r1Total += questionTimer;
        r1Correct++;
       game.add.tween(correctIcon).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
    }else{
        questionsWrong++;
        //console.log('incorrect')
        incorrectIcon.alpha=1;
        incorrectIcon.bringToTop();
       game.add.tween(incorrectIcon).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
        incorrectSound.play();
    }
    nextQuestion();
    
}

function r2guess(button){
    if(!readyToGuess){
        return;
    };
    totalQuestions++;
    if(button.answer == currentQuestion.answer){
        questionsRight++;
        //console.log('correct')
        correctSound.play();
        correctIcon.alpha=1;
        correctIcon.bringToTop();
        r2Total += questionTimer;
        r2Correct++;
       game.add.tween(correctIcon).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
    }else{
        questionsWrong++;
        //console.log('incorrect')
        incorrectIcon.alpha=1;
        incorrectIcon.bringToTop();
       game.add.tween(incorrectIcon).to({alpha:0},500,Phaser.Easing.Linear.None).delay(500).start();
        incorrectSound.play();
    };
    nextQuestion();
};

function nextQuestion(){
    resetQuestion();
    roundStart(currentQuestionBank);
};

function resetQuestion(){
    qText.setText('');
    clearInterval($qInterval);
    if(currentRound==1){
        questionTimer = 30;
    }else{
        questionTimer=60;
    };
    questionTimerText.setText(questionTimer);
    
};

function clickPlay(){
 clickSound.play();   
};

function startCount(){
    
    $cuInterval = setInterval(countUp,75);
};



function roundStart(roundData){

    currentQuestionBank = roundData;
    currentQuestion = getQuestion(currentQuestionBank);
    if(currentQuestion === undefined){
        setReady();
        nextScene();
        return;
    };
    displayQuestion(currentQuestion);
    startQuestionClock();
    readyToGuess = true;
};



function tfFadeOut(){
    setReady();
    var tw1 = game.add.tween(r1Title).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false);
    game.add.tween(watchImage).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(trueButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(falseButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(questionTimerText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(trueButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    var tw2 = game.add.tween(falseButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    tw2.onCompleteCallback(destroyR1Assets);
    tw1.onCompleteCallback(nextScene);
}

function mcFadeOut(){
    setReady();
    var tw1 = game.add.tween(r2Title).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false);
    game.add.tween(watchImage).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(aButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(bButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(cButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(dButton).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(questionTimerText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
     game.add.tween(aButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(bButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    game.add.tween(cButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    var tw2 = game.add.tween(dButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None).start();

    tw2.onCompleteCallback(destroyR2Assets);
    tw1.onCompleteCallback(nextScene);
};

function destroyR2Assets(){
    aButton.destroy();
    bButton.destroy();
    cButton.destroy();
    dButton.destroy();
    aButtonText.destroy();
    bButtonText.destroy();
    cButtonText.destroy();
    dButtonText.destroy();
    qText.destroy();
};

function destroyR1Assets(){
    trueButton.destroy();
    falseButton.destroy();
    trueButtonText.destroy();
    falseButtonText.destroy();
    qText.destroy();
};



function tfRoundEnd(){
    roundCompleteText = game.add.text(game.world.centerX,game.world.centerY,"Round Complete!",titleFontStyle);
   roundCompleteText.anchor.setTo(0.5,0.5);
   roundCompleteText.alpha=0;
   game.add.tween(roundCompleteText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:100},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   
   ul1 = game.add.graphics(25,62);
   ul1.lineStyle(1.5,0xffff00,1);
   ul1.beginFill();
   ul1.moveTo(25,62);
   ul1.lineTo(475,62);
   ul1.endFill();
   ul1.alpha = 0;
  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1750).start();    
  
   resultScoreText = game.add.text(game.world.centerX+160,game.world.centerY-75,"Score: "+r1Correct+" answers x 5000 = "+(r1Correct*5000)+" points",scoreFontStyle);
   resultScoreText.anchor.setTo(1,0.5);
   resultScoreText.alpha=0;
   game.add.tween(resultScoreText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2000).start();
   
   resultTimeLeftText = game.add.text(game.world.centerX+160,game.world.centerY-50,"Seconds Saved: "+r1Total+' x 100 = '+(r1Total*100)+' points',scoreFontStyle);
   resultTimeLeftText.anchor.setTo(1,0.5);
   resultTimeLeftText.alpha=0;
   game.add.tween(resultTimeLeftText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   
   ul2 = game.add.graphics(25,100);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(25,100);
   ul2.lineTo(475,100);
   ul2.endFill();
   ul2.alpha=0;
   
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();
  
   var roundTotal = (r1Correct*5000)+(r1Total*100);
   score+=roundTotal;
   resultTotalText = game.add.text(game.world.centerX,game.world.centerY+10,"Round Score: "+roundTotal,titleFontStyle);
   resultTotalText.anchor.setTo(0.5,0.5);
   resultTotalText.alpha = 0;
   game.add.tween(resultTotalText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4000).start();
  
   nextRoundButton = game.add.button(game.world.centerX,300,'greenbutton',nextScene,this,0,1,2);
   nextRoundButton.anchor.setTo(0.5,0.5);
   nextRoundButton.alpha = 0;
    nextRoundButtonText = game.add.text(nextRoundButton.x,nextRoundButton.y,"Next Round",titleFontStyle);
   nextRoundButtonText.anchor.setTo(0.5,0.5);
   nextRoundButtonText.alpha=0;
   game.add.tween(nextRoundButton).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   game.add.tween(nextRoundButtonText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   setReady();
};

function mcRoundEnd(){
        roundCompleteText = game.add.text(game.world.centerX,game.world.centerY,"Round Complete!",titleFontStyle);
   roundCompleteText.anchor.setTo(0.5,0.5);
   roundCompleteText.alpha=0;
   game.add.tween(roundCompleteText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:100},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   
   ul1 = game.add.graphics(25,62);
   ul1.lineStyle(1.5,0xffff00,1);
   ul1.beginFill();
   ul1.moveTo(25,62);
   ul1.lineTo(475,62);
   ul1.endFill();
   ul1.alpha = 0;
  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1750).start();    
  
   resultScoreText = game.add.text(game.world.centerX+160,game.world.centerY-75,"Score: "+r2Correct+" answers x 5000 = "+(r2Correct*5000)+" points",scoreFontStyle);
   resultScoreText.anchor.setTo(1,0.5);
   resultScoreText.alpha=0;
   game.add.tween(resultScoreText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2000).start();
   
   resultTimeLeftText = game.add.text(game.world.centerX+160,game.world.centerY-50,"Seconds Saved: "+r2Total+' x 100 = '+(r2Total*100)+' points',scoreFontStyle);
   resultTimeLeftText.anchor.setTo(1,0.5);
   resultTimeLeftText.alpha=0;
   game.add.tween(resultTimeLeftText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   
   ul2 = game.add.graphics(25,100);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(25,100);
   ul2.lineTo(475,100);
   ul2.endFill();
   ul2.alpha=0;
   
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();
  
   var roundTotal = (r2Correct*5000)+(r2Total*100);
   score+=roundTotal;
   resultTotalText = game.add.text(game.world.centerX,game.world.centerY+10,"Round Score: "+roundTotal,titleFontStyle);
   resultTotalText.anchor.setTo(0.5,0.5);
   resultTotalText.alpha = 0;
   game.add.tween(resultTotalText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4000).start();
  
   nextRoundButton = game.add.button(game.world.centerX,300,'greenbutton',nextScene,this,0,1,2);
   nextRoundButton.anchor.setTo(0.5,0.5);
   nextRoundButton.alpha = 0;
    nextRoundButtonText = game.add.text(nextRoundButton.x,nextRoundButton.y,"Final Results",titleFontStyle);
   nextRoundButtonText.anchor.setTo(0.5,0.5);
   nextRoundButtonText.alpha=0;
   game.add.tween(nextRoundButton).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   game.add.tween(nextRoundButtonText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4500).start();
   setReady();
};

function r1ResultsFade(){
    buttonSound.play();
    game.add.tween(ul1).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(ul2).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultScoreText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTimeLeftText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTotalText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(nextRoundButton).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(roundCompleteText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    var nb = game.add.tween(nextRoundButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    setReady();
    nb.onCompleteCallback(nextScene);
};

function r2ResultsFade(){
    buttonSound.play();
    game.add.tween(ul1).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(ul2).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultScoreText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTimeLeftText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(resultTotalText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(nextRoundButton).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    game.add.tween(roundCompleteText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    var nb = game.add.tween(nextRoundButtonText).to({alpha:0},1000,Phaser.Easing.Linear.None,true,0,0,false)
    setReady();
    nb.onCompleteCallback(nextScene);
};


function startQuestionClock(){
    $qInterval = setInterval(qCD,1000);
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
   ul1.lineTo(475,47);
   ul1.endFill();
   ul1.alpha = 0;
  
    finalGroup.add(ul1);
   
  
   finalQRightText = game.add.text(game.world.centerX,game.world.centerY-100,"Questions Right: "+questionsRight,scoreFontStyle);
   finalQRightText.anchor.setTo(0.5,0.5);
   finalQRightText.alpha=0;
   
   finalGroup.add(finalQRightText);
   
   finalQWrongText = game.add.text(game.world.centerX,game.world.centerY-75,"Questions Wrong: "+questionsWrong,scoreFontStyle);
   finalQWrongText.anchor.setTo(0.5,0.5);
   finalQWrongText.alpha=0;

   finalGroup.add(finalQWrongText);
   
   var acc = Math.round((questionsRight/totalQuestions)*100);
   finalAccuracyText = game.add.text(game.world.centerX,game.world.centerY-50,"Accuracy: "+acc+"%",scoreFontStyle);
   finalAccuracyText.anchor.setTo(0.5,0.5);
   finalAccuracyText.alpha=0;
 
  finalGroup.add(finalAccuracyText);
  
  
   
   ul2 = game.add.graphics(25,115);
   ul2.lineStyle(1.5,0xFFFF00,1);
   ul2.beginFill();
   ul2.moveTo(25,85);
   ul2.lineTo(475,85);
   ul2.endFill();
   ul2.alpha=0;
   
   finalGroup.add(ul2);
   
   finalScoreText = game.add.text(game.world.centerX,game.world.centerY+25,"Final Score: "+score,titleFontStyle);
   finalScoreText.anchor.setTo(0.5,0.5);
   finalScoreText.alpha =0;
   
   finalGroup.add(finalScoreText);
  

   
   game.add.tween(finalTitleText).to({alpha:1},1000,Phaser.Easing.Linear.None,true,0,0,false).to({y:75},1000,Phaser.Easing.Quadratic.Out,true,0,0,false);  
   game.add.tween(ul1).to({alpha:1},500,Phaser.Easing.Linear.None).delay(1500).start();    
   game.add.tween(finalQRightText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2000).start();
   game.add.tween(finalQWrongText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(2500).start();
   game.add.tween(finalAccuracyText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3000).start();   
   game.add.tween(ul2).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(3500).start();
   game.add.tween(finalScoreText).to({alpha:1},1000,Phaser.Easing.Linear.None).delay(4000).start();
   
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

function finalResultsFade(){
    var finalFade = game.add.tween(finalGroup._container).to({alpha:0},1000,Phaser.Easing.Linear.None).start();
    finalFade.onCompleteCallback(resetGame);
};



function qCD(){
   
    questionTimer--;
    secondsUsed++;
    tickSoft.play();
    if(questionTimer ==0){
        alarm.play();
        nextQuestion();
        questionsWrong++;
    };
    questionTimerText.setText(questionTimer);
};

function displayQuestion(qData){

  if(currentRound==1){
    var qFontStyle = {font:'16px Arial',fill:'#FFFFFF',align:'left',wordWrap:true,wordWrapWidth:315};
    qText = game.add.text(85,game.world.centerY+20,qData.questionText,qFontStyle);
    qText.anchor.setTo(0,0.5)
  }else{
      var qFontStyle = {font:'12px Arial',fill:'#FFFFFF',align:'left',wordWrap:true,wordWrapWidth:325};
      qText = game.add.text(85,game.world.centerY-10,qData.questionText,qFontStyle);
      qText.anchor.setTo(0,0.5)
  };
  
};

function getQuestion(qData){
    if(qData.length != 0 || qData.length != undefined){
        var randN = Math.floor(Math.random()*qData.length);
        var randQ = qData[randN];
        qData.splice(randN,1);
        return randQ;
    }else{
        return null;
    };
};

function resetGame(){
    ////console.log("RESET THE GAME!")
     sceneIndex = 0;
     inScene = false;
     questionsRight=0;
     questionsWrong=0;
     totalQuestions=0;
     readyForNext = false;
     numberOfQuestions=0;
     questionTimer=0;
     score=0;
     r1Total = 0;
     r1Correct = 0  ;
     r2Total = 0;
     r2Correct = 0;
     r1cd=3;
     currentRound=1;
     round=[];
     setQuestions();
     buttonSound.play();

};

function update(){
    
        if(!inScene){
            
            inScene = true;
            
            switch(sceneIndex){
                case 0: introduction();
                        break;
                case 1: introductionFadeOut();
                        break;
                case 2: setQuestions();  
                        break;
                case 3: tfRoundSetup();
                        break;
                case 4: roundStart(round[0]);
                        break;
                case 5: tfFadeOut();
                        break;
                case 6: tfRoundEnd();
                        break;
                case 7: r1ResultsFade();
                        break;
                case 8: mcRoundSetup();
                        break;
                case 9: roundStart(round[1]);
                        break;
                case 10: mcFadeOut();
                        break;
                case 11: mcRoundEnd();
                        break;
                case 12: r2ResultsFade();
                        break;
                case 13: finalResults();
                        break;
                case 14: finalResultsFade();
                        break;
                        
            };
        };
    

};

