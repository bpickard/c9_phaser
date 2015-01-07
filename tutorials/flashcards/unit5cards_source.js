
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"MZ and DZ Twins",definition:"Used in twin and adoption studies. MZ (monozygotic) twins result from a single sperm fertilizing a single egg (two genetically identical twins); MZ twins share 100% of the 1% of DNA that explains variations in characteristics. DZ (dizygotic) twins result from two sperm fertilizing two eggs (no more similar than any other full siblings); DZ twins share 50% of the 1% of DNA that explains variations in characteristics. Researchers look for concordance—the degree to which related pairs exhibit a particular trait, behaviour or characteristic (e.g., propensity for criminality)."},
                 {term:"The Kallikaks",definition:"Study conducted by psychologist Henry Goddard, of two families that were fathered by the same man. Intended to demonstrate the heritability of feeble-mindedness, or low IQ. According to Goddard, Mr. Kallikak fathered one family with a reportedly feeble-minded barmaid, which “resulted in a family tree full of hopeless, impoverished, ne’er-do-wells.” Mr. Kallikak then fathered a family with “a respectable Quaker woman,” with all but three of this family tree deemed normal by Henry Goddard. "},
                 {term:"Neurotransmitters",definition:"Part of brain chemistry. Communication between nerve cells is conducted by chemical messengers. Neurotransmitters are substances that carry signals from cell to cell. Serotonin, dopamine and norepinephrine are all neurotransmitters. Serotonin levels play a role in aggressive-impulsive behaviours. Individuals who do not get enough pleasurable stimulation through natural, dopamine-producing activities may turn to alcohol or illicit drugs."},
                 {term:"Moffitt’s Developmental Taxonomy",definition:"Moffitt says there are two distinct types of offenders: life-course persistent offenders, and adolescent-limited offenders. The life-course persistent (or LCP) group represents only 5% of all offenders. Life-course persistent offenders engage in anti-social behaviour early in childhood; continue criminal offending throughout adolescence, and well into adulthood. Life-course persistent offending behaviour stems from neuropsychological deficits, occurring prior to birth or shortly after birth. Adolescent-limited offending accounts for about 95% of all offending. Adolescent-limited or AL offenders demonstrate little or no anti-social behaviour as children; their criminal offending is restricted to adolescence (the teen years); most desist from offending when they reach young adulthood. Adolescent-limited offending caused by “the maturity gap,” where teenagers today mature earlier, but are still prohibited from engaging in “mature,” adult behaviours."},
                 {term:"The Cambridge Study",definition:"Longitudinal cohort study in the UK, conducted by psychologist David Farrington. Followed the lives of 411 males from age 8 until age 50. Study entailed five personal interviews with the research participants, over a period of 40 years, and included testing in school by psychologists, interviews with parents, psychiatric interviews with participants, and interviews with the participants’ spouses. Study found that over half of all criminal offending was concentrated in 6% of the families. 93% of the participants self-reported committing a criminal offence at one time or another, but most had not been convicted. The main risk factors uncovered by the Cambridge Study were family criminality, risk-taking (or impulsivity), low school attainment, poverty, and poor parenting.  "},
                 {term:"The Frustration-Aggression Hypothesis",definition:"Links Freudian concepts of frustration and aggression with behavioural perspectives. Frustration precedes aggression, and some form of aggression inevitably follows frustration. More recent revisions distinguish between angry aggression and instrumental aggression. Angry aggression is a response to frustration, and is intended to injure or harm someone else. Instrumental aggression is learned in accordance with the principles of operant conditioning, and is oriented toward some other goal or reward."},
                 {term:"PIQ and VIQ",definition:"Performance IQ (PIQ) and Verbal IQ (VIQ). PIQ measures the general performance on IQ tests, while VIQ measures verbal intelligence (reading, writing and conversational skills). PIQ is not a good predictor of criminality, while VIQ is a good predictor of criminality. Lower VIQ scores are believed to be indicative of poor school performance, which leads to dropping out of school, hanging out with delinquent peers, and getting into trouble with the law."},
                 {term:"The Id, the Ego and the Superego",definition:"Part of Freud’s personality psychology. The id, which acts in accordance with “the pleasure principle,” is the instinctual, impulsive part of our personality, that contains our hidden urges, desires and wishes (i.e., the subconscious). The ego interfaces with reality, regulates the demands of the id and superego, and operates in accordance with “the reality principle.” The superego develops as we mature, and is our moral compass, or conscience. Neurotic offenders (who have an overactive superego) commit crimes in order to be punished and lessen their feelings of guilt. Impulsive, pleasure-seeking offenders have a weak ego, which fails to control their behaviour and regulate the demands of their id. A psychopathic personality results when the superego fails to develop properly (psychopaths lack a conscience, or moral compass)."},
                 {term:"Psychopathy",definition:"Typically associated with Hervey Cleckley’s book The Mask of Sanity, and with Robert Hare’s Psychopathy Check List (PCL). Psychopathy is a personality disorder, not a metal disorder, i.e., psychopaths do not suffer from neurosis, psychosis, hallucinations or delusions. Recent research suggests that psychopaths may have mental and physical abnormalities, e.g., brain abnormalities, lower fear response, lower resting heart rate. Psychopathy is characterized by lack of empathy, remorselessness (no superego, no feelings of guilt), egotism, glibness, deceitfulness, and a fondness for risk-taking activity."},
                 {term:"ICAP Theory",definition:"Refers to Integrated Cognitive Anti-Social Potential Theory, by psychologist David Farrington. ICAP distinguishes between long-term anti-social potential and short-term anti-social potential. Long-term anti-social potential includes impulsivity, low IQ, low empathy, delinquent associates, weakened social bonds, low socioeconomic status. Short-term anti-social potential includes environmental factors and immediate situational factors that contribute to offending (e.g., opportunity, routine activities, the mental state of the offender at the time of the offence)."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 5 Flashcards",titleFontStyle);
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

