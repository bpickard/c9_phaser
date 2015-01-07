
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Assault Levels 1, 2, and 3",definition:"Assault level 1 is also referred to as “common assault.” No weapon is produced, and nobody is seriously injured, e.g., punching somebody, slapping them, kicking them in the shin, or shoving them to the ground.\n\nAssault level 2 involves either a weapon, or bodily harm.  To be categorized as assault level 2, the act does not require a weapon plus bodily harm. It is also referred to as “assault with a weapon” or “assault causing bodily harm.”\n\nAssault level 3 involves wounding the victim, maiming or disfiguring the victim, or endangering the victim’s life. It is sometimes referred to as “aggravated assault.”"},
                 {term:"Manslaughter",definition:"The term “manslaughter” refers to the unintentional killing of a human being, without any premeditation (planning), and without the intent to kill the victim. Manslaughter involves a degree of negligence on the part of the offender—akin to criminal negligence causing death. "},
                 {term:"1st and 2nd Degree Murder",definition:"First degree murder is an intentional killing. It requires a high degree of planning and deliberation, and a high degree of moral blameworthiness.\n\nSecond degree murder is an intentional killing, but without the same degree of planning, deliberation, or moral blameworthiness as first degree murder"},
                 {term:"The Frontier Phenomenon",definition:"“The Frontier Phenomenon” is one possible explanation for differences in violent crime rates across Canada. Police–reported crime statistics indicate that violent crime rates are lowest in Eastern Canada, higher in Western Canada, and higher still up North, in the Northwest Territories and Nunavut. This could be attributed  to “a historical culture of violence” associated with the settlement of the western and northern frontiers, where there was traditionally a lot of younger men, relatively little law enforcement, and many people with guns."},
                 {term:"Subcultures of Violence",definition:"Wolfgang and Ferracuti’s 1967 “subcultures of violence” is an integrated, psychological-sociological approach, underpinned by Edwin Sutherland’s notion that subcultural values and norms are learned through the process of differential association. Wolfgang and Ferracuti noted that comparatively few homicides were intentional or premeditated. They said that certain subcultures regard  aggression and toughness as normal behaviour, and might not consider acts of violence such as assault or assault with a weapon to be illegal behaviour. Carrying weapons (and being willing to use them) would be considered normal. In such subcultures, certain reactions are expected—individuals might be quick to take offense, or feel that they have to fight in order to protect their reputation."},
                 {term:"The Code of the Street",definition:"Elijah Anderson’s ethnographic study, conducted in Philadelphia. Follows in the footsteps of Wolfgang and Ferracuti’s “subcultures of violence.” Also consistent with Edwin Sutherland, Chicago School symbolic interactionism, the social construction of meaning, the social construction of “self-image,” and “presentation of self.” Anderson described the street culture in poor, inner city Black communities in the US. The code revolves around the issue of respect and disrespect, or being “dissed.” If you are being dissed (disrespected), then it is expected that you will respond in a violent manner. You want others to know that you are a man who can “take care of himself,” that you are “the baddest dude on the street.”"},
                 {term:"Sexual Assault, Levels 1, 2 and 3",definition:"Sexual assault level 1 involves no physical injury or minor physical injury; it may include unwanted sexual touching, unwanted grabbing, or unwanted kissing.\n\nSexual assault level 2 involves a weapon, or threats of harm, or bodily harm that requires professional medical attention.\n\nSexual assault level 3, also known as aggravated sexual assault, involves wounding the victim, maiming or disfiguring the victim, or endangering the victim’s life."},
                 {term:"Predictors of Sex Offender Recidivism",definition:"There are three main factors to be considered when it comes to estimating the likelihood of future offending: static factors, dynamic factors, and acute dynamic factors.\n\nStatic factors—like age, gender, and previous arrest record—cannot be changed.\n\nDynamic factors—like learned rationalizations (for example, “she said no, but she really meant yes”, or “nice girls don’t get raped”)—can sometimes be targeted through intervention and treatment.\n\nAcute dynamic factors are those that change rapidly, including the offender’s mood, or level of intoxication at the time."},
                 {term:"The Forensic-Clinical Model",definition:"Starting from the late 19th century, the burgeoning disciplines of psychiatry and psychology actively campaigned for indeterminate sentences for psychopaths and other individuals who they deemed to be “sexual perverts.” The idea behind indeterminate sentencing was that if sexual offenders were “sick” and in need of medical treatment, then they shouldn’t be released until a medical professional decided that they were officially “cured” of their disease. This is described in chapter 14 of the textbook as “the forensic-clinical model.”"},
                 {term:"The Community Protection Approach",definition:"The Community Protection Approach got underway in the 1980s and 1990s, as a corollary of the victims’ rights movement, and the backlash against perceived government coddling of criminals. Rather than focussing on the treatment and rehabilitation of sexual offenders, the Community Protection Approach insisted on longer (or indeterminate) sentences for sexual offenders (not for purposes of retribution or rehabilitation, but for incapacitation), and on enhanced surveillance and monitoring for sexual offenders following their release from prison. Examples of the Community Protection Approach at work include the Sex Offender Registry."}];

var sceneIndex = 0;
var inScene = false;
var fontChoice = 'Arial';
if(isMac){
    fontChoice = 'Helvetica';
}

var termFontStyle = {font:'18pt '+fontChoice,fill:'#000099',align:'center',wordWrap:true,wordWrapWidth:500};

var definitionFontStyle = {font:'12pt '+fontChoice,fill:'#000000',align:'left',wordWrap:true,wordWrapWidth:500};
if(isMac){
    definitionFontStyle = {font:'13pt '+fontChoice,fill:'#000000',align:'left',wordWrap:true,wordWrapWidth:500};
}
var uxFontStyle = {font:'9pt '+fontChoice,fill:'#FFFFFF',align:'left'};
var flipFontStyle = {font:'9pt ',fill:'#000000',align:'center'};
var buttonFontStyle= {font:'20px '+fontChoice,fill:'#FFFFFF',align:'center'};
var titleFontStyle = {font:'30pt '+fontChoice,fill:'#FFFFFF',align:'center'};
var flashcard;
var cardIndex =0;
var numCards = cardArray.length;
var buttonSound;
var flipped = false;

var definitionText;
var termText;
var currentPosition;
var sortButtonText;
var paperSound;
var shuffleSound;

var displayType = "term";
function preload(){
    game.stage.backgroundColor='#000066';
    game.load.image('mycard','assets/card6.png');
    game.load.spritesheet('greenbutton','assets/greenbutton.png',186,43);
    game.load.audio('button',['assets/buttonclick.mp3','assets/buttonclick.ogg']);
    game.load.audio('paper',['assets/paperflip.mp3','assets/paperflip.ogg']);
    game.load.audio('shuffle',['assets/shuffle.mp3','assets/shuffle.ogg']);
    game.load.image('flip','assets/fliparrow2.png');

};

function create(){
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
 
    buttonSound = game.add.audio('button');
    paperSound  = game.add.audio('paper');
    shuffleSound = game.add.audio('shuffle');
    
  flashcard = game.add.sprite(game.world.centerX,game.world.centerY,'mycard');
  flashcard.anchor.setTo(0.5,0.5);
  
  var nextButton  = game.add.button(game.world.centerX+200,515,'greenbutton',nextCard,this,0,1,2);
  nextButton.anchor.setTo(0.5,0.5);
  
  var nextButtonText = game.add.text(nextButton.x,nextButton.y,"Next Card",buttonFontStyle);
  nextButtonText.anchor.setTo(0.5,0.5);
  
  var prevButton = game.add.button(game.world.centerX-200,515,'greenbutton',prevCard,this,0,1,2);
  prevButton.anchor.setTo(0.5,0.5);
  
  var prevButtonText = game.add.text(prevButton.x,prevButton.y,"Previous Card",buttonFontStyle);
  prevButtonText.anchor.setTo(0.5,0.5);
  
  var flipButton = game.add.button(flashcard.x+((flashcard.width/2)-40),flashcard.y+((flashcard.height/2)-50),'flip',flipCard,this);
  flipButton.anchor.setTo(0.5,0.5);
  
  var flipButtonText = game.add.text(flipButton.x-2,flipButton.y+30,"Flip Card",flipFontStyle);
  flipButtonText.anchor.setTo(0.5,0.5);
  
  var shuffleButton = game.add.button(game.world.centerX,515,'greenbutton',shuffle,this,0,1,2);
  shuffleButton.anchor.setTo(0.5,0.5);
  
  var shuffleText = game.add.text(shuffleButton.x,shuffleButton.y,"Shuffle Deck",buttonFontStyle);
  shuffleText.anchor.setTo(0.5,0.5);
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 9 Flashcards",titleFontStyle);
  titleText.anchor.setTo(0.5,0.5);
  
  var sortButton = game.add.button(game.world.centerX,560,'greenbutton',swapSort,this);
  sortButton.anchor.setTo(0.5,0.5);
  sortButton.alpha =0;
  
  sortButtonText = game.add.text(sortButton.x,sortButton.y,"View By: Term",buttonFontStyle);
  sortButtonText.anchor.setTo(0.5,0.5);
  
  if(!isMac){
  definitionText = game.add.text(flashcard.x,flashcard.y-120,'',definitionFontStyle);
  termText = game.add.text(game.world.centerX,game.world.centerY+4,'',termFontStyle);
  currentPosition = game.add.text(game.world.centerX,110,"Card "+(cardIndex+1)+" of "+numCards,uxFontStyle);
  }else{
  definitionText = game.add.text(flashcard.x,flashcard.y-121,'',definitionFontStyle);
  termText = game.add.text(game.world.centerX,game.world.centerY+9,'',termFontStyle);
  currentPosition = game.add.text(game.world.centerX,111,"Card "+(cardIndex+1)+" of "+numCards,uxFontStyle);  
      
  }
  currentPosition.anchor.setTo(0.5,0.5);
  definitionText.anchor.setTo(0.5,0);
  termText.anchor.setTo(0.5,0.5);

};

function swapSort(){
    flipped = false;
    buttonSound.play();
    if(displayType==="term"){
        displayType="definition";
        sortButtonText.setText("View By: Definition");
    }else{
        displayType="term";
        sortButtonText.setText("View By: Term");
    }
    displayCards();
}

function shuffle(){
    flipped = false;
    shuffleSound.play();
    var tempArray = [];
    
    for(var i=0;i<cardArray.length;i++){
        var randomNum = Math.floor(Math.random()*cardArray.length);
        tempArray.push(cardArray[randomNum]);
        cardArray.splice(randomNum,1);
        i--;
    }
    cardIndex=0;
    cardArray = tempArray;
    displayCards();
}

function nextCard(){
    flipped = false;
    buttonSound.play();
    if(cardIndex+1>=numCards){
        cardIndex=0;
    }else{
        cardIndex++;
    }
    displayCards();
}

function prevCard(){
    flipped=false;
    buttonSound.play();
    if(cardIndex-1<0){
        cardIndex = numCards-1;
    }else{
        cardIndex--;
    }
    displayCards();
}

function flipCard(){
    if(flipped===false){
        paperSound.play();
        if(displayType == "definition"){
             termText.setText(cardArray[cardIndex].term);
             definitionText.setText("");
        }else{
            definitionText.setText(cardArray[cardIndex].definition);
            termText.setText("");
        }
        flipped = true;
        return;
    }
    
    if(flipped){
        paperSound.play();
          if(displayType == "definition"){
             termText.setText("");
             definitionText.setText(cardArray[cardIndex].definition);
        }else{
            definitionText.setText("");
            termText.setText(cardArray[cardIndex].term);
        }
        flipped = false;
        return;
    }
}

function nextScene(){
    sceneIndex++;
    inScene = false;
}

function introduction(){
    console.log("introduction");
    nextScene();
};


function introductionFadeOut(){
    console.log("introductionFadeOut");
    nextScene();
}

function displayCards(){
    console.log("displayCards");
    //insert logic for displaying term or definition first
    //insert logic if sorting is applied
    definitionText.setText("");
    termText.setText("");
    
    if(displayType == "definition"){
        definitionText.setText(cardArray[cardIndex].definition);
    }else{
        termText.setText(cardArray[cardIndex].term);
    }
    currentPosition.setText("Card "+(cardIndex+1)+" of "+numCards);
  

    

    
}

function update(){

        if(!inScene){
            
            inScene = true;
            
            switch(sceneIndex){
                case 0: introduction();
                        break;
                case 1: introductionFadeOut();
                        break;
                case 2: displayCards();
                        break;
            };
        };
        

};

