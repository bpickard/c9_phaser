
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"The Constructionist Perspective",definition:"Argues that identification, coding and counting of crime is an inherently social process. How we identify, code and count crime says as much about our society and our justice system as it does about the amount of crime. Police “produce” crime statistics by choosing which calls they think are important enough to warrant police response, and also through exercise of police discretion—i.e., dealing with situations formally (by charge) or informally (by resolving problem without charges)."},
                 {term:"The Dark Figure of Recording",definition:"Not the same as the “dark figure of crime,” which refers to two-thirds of crime that is not reported to police. “Dark figure of recording” refers to crime that is reported to the police, but is not recorded by the police. Once a crime is reported to police, it goes through process of assessment, classification and (perhaps) recording. Police decision-making may be influenced by relationship between offender and victim, policing style of individual officer, characteristics of the suspect, and preferences of the complainant. If a reported crime is not recorded by police, then it is not reflected in the UCR."},
                 {term:"Proactive Policing",definition:"Policing styles can have impact on the number and type of crimes reported in the UCR. “Proactive policing” is where police actively go out and look for crime (or opportunities to prevent crime) through enhanced surveillance measures, more interaction with community, or conducting more foot, bike or police car patrols. If police are engaged in proactive policing, then there is higher likelihood of crime being detected and recorded."},
                 {term:"Reactive Policing",definition:"Policing styles can have impact on number and type of crimes reported in the UCR. “Reactive policing” is where police don’t do anything unless they receive a call for help or somebody reports a crime. They “react” to calls or reports of crime, or to criminal events they actually witness in the course of their duties. If police are engaged in reactive policing, there is lower likelihood of crime being detected and recorded."},
                 {term:"The Crime Swap",definition:"Questions whether there has been a “crime drop” or a “crime swap.” E.g., homicide (murder) rates have been going down, while serious assault rates have been going up (people may be just as violent as before, but improvements in emergency medical care may have improved survival rates). While police-reported break and enters and motor vehicle thefts are going down, Internet-related crimes—credit fraud, identity theft, child-luring—are going up. Many Internet crimes not reported to the police, because victims do not realize they have been victimized, or because police cannot resolve crimes due to jurisdictional issues."},
                 {term:"The Security Hypothesis",definition:"According to UCR, motor vehicle thefts in Canada have declined by 43% over past 10 years. Security hypothesis proposes that decline in motor vehicle thefts is not due to fewer offenders, or to declining interest in stealing cars. Rather, decline may be attributable to greater use of speed bumps and other traffic calming measures, making joyriding less attractive. Alarm systems, better door locks, central locking systems and electronic immobilizers have made motor vehicle theft more difficult. "},
                 {term:"Routine Activities Theory",definition:"By Cohen and Felson, 1979. For a predatory criminal event to occur, you need: \n\n\t\t\t\t1) a motivated offender, \n\t\t\t\t2) a suitable target (a victim), and \n\t\t\t\t3) absence of capable guardianship.\n\nRoutine activities theory says that majority of crimes will occur when victims and offenders intersect in three major social domains where people spend most of their time—i.e., family domain, work domain, and leisure domain. Like lifestyle exposure theory, routine activities theory benefitted from new information being revealed by victimization surveys."},
                 {term:"Lifestyle Exposure Theory",definition:"By Hindelang, Gottfredson and Garofalo, 1978. Like routine activities theory, lifestyle exposure theory benefitted from new information being revealed by victimization surveys. Lifestyle exposure theory says that lifestyles of individuals and groups follow certain patterns, in terms of where they go, when they go there, who they go with (or who they meet there), what they do when they get there. Offenders do not select victims at random; instead, they follow similar lifestyle patterns to those of victims, and often resemble victims in terms of age, gender, social class and ethnic origin. The more time you spend—especially at night—in public places, the more likely you are to become a victim. Lifestyle choices influence likelihood that you will spend more or less time in public."},
                 {term:"Homicide as a Situated Transaction",definition:"1977 study by Luckenbill of 70 homicides (murders) in one Californian county over 10 year period. Found that all these crimes took place away from workplace, mostly on evenings or weekends, in “permissive environs”—informal environments, e.g., parties, bars, street corners, or at home, where individuals would be drinking and partying. Driving force behind transactions was “loss of face,” real or imagined; somebody felt insulted, or thought their honour was at stake. Also found that majority of murder victims (63%) initiated transactions themselves, by insulting or threatening “the offender,” and in another 29% of cases, the status of offender and victim could only be determined by who lived, and who died."},
                 {term:"Individual Deviance, the Deviant Exchange, and Deviant Exploitation",definition:"From Best and Luckenbill’s 1994 book, Organizing Deviance. With first two typologies—individual deviance and the deviant exchange—it’s not clear whether there’s a “true victim.” “Individual deviance” (e.g., drug use or suicide) can be committed by single person in privacy of his/her own home, i.e., offender and victim are the same person. “Deviant exchange” is voluntary transaction in which two or more individuals exchange illicit goods or services. e.g., buying and selling illegal drugs or paying for the services of prostitute. Again, there’s no “clear” victim. “Deviant exploitation” is illicit transaction in which deviant uses stealth, trickery or physical force to compel another person to surrender goods or services; the “deviant” is clearly the offender, while the target is most likely a “true victim” (e.g., credit card fraud, shoplifting, armed robbery)."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 3 Flashcards",titleFontStyle);
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

