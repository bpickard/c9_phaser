
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Rational Choice Theory",definition:"Associated with Cornish & Clarke’s 1986 book, The Reasoning Criminal. Rational choice theory sometimes referred to as Neo-Classicism, because it has its roots in Classical School thinking. Based on Classical School notions of hedonism and utilitarianism—the idea that criminal offenders go through a cost-benefit analysis when deciding whether or not to commit crime. (Similar to decision an average consumer might make when deciding whether or not to purchase a product—how  much it costs, how much pleasure they might derive, how long the pleasure will last for, whether they really need it, etc)."},
                 {term:"The Hedonistic Calculus",definition:"Associated with Classical School philosopher Jeremy Bentham. Bentham proposed a “penal pharmacy,” which prescribed certain punishments for certain crimes, using a calculated “ratio” for the delivery of pain, depending upon  seriousness of the offence. Bentham reasoned that if the pain outweighed the pleasure, then offenders would make a rational (free-willed) choice not to engage in crime."},
                 {term:"The Purposive Nature of Crime ",definition:"Associated with Cornish & Clarke’s rational choice theory. They say that all crime has some sort of purpose, even though that purpose may not be readily apparent to outside observers. Smashing a window might bring degree of pleasure or excitement, even though there is no apparent economic gain or benefit. Gang violence might not result in economic gain, but could confer status or prestige."},
                 {term:"Limited or Bounded Rationality",definition:"Cornish & Clarke’s rational choice theory recognizes that offenders may exercise “limited” or “bounded rationality.” Criminal decision-making may be less than perfect, because criminals might have to make decisions on the spur of the moment, when the opportunity presents itself. They may not plan their crimes in elaborate detail, or fully and properly assess chances of being caught and punished."},
                 {term:"Atavistic Man",definition:"Associated with Positivist School thinking and 1879 book On Criminal Man, by Cesare Lombroso. Lombroso said he could identify criminals by body type, facial features, and skulls. He described criminals as “atavisms,” saying they resembled earlier forms of human life, e.g., extinct Neanderthal cavemen and cavewomen. He said that atavisms could be identified by sloping foreheads, protruding jaws, flat noses, long arms, etc."},
                 {term:"Mesomorphy",definition:"William Sheldon (1949) described three body types—endomorphs, who were soft and round; mesomorphs who were solid and muscular; and ectomorphs, who were tall and thin. It has been observed that incarcerated offenders are more muscular (mesomorphic), but this ignores fact that there’s lots of time in prison for weightlifting and body-building. Also, stronger, muscular individuals are more likely to come out on the winning end of a fight, and end up being seen as the “offender,” even though they may not have started the fight themselves."},
                 {term:"Meta-Analysis",definition:"A meta-analysis is a synthesis of existing research studies. Researchers try to gather all empirical studies on a particular topic, and subject them to in-depth statistical analysis. E.g., sample used in Pratt & Cullen’s meta-analysis of low- self-control theory included 21 empirical studies, from 17 different (independent) data sets, with 49,727 individual cases."},
                 {term:"Low Self-Control",definition:"In their 1990 book, A General Theory of Crime, Gottfredson & Hirschi stated that low self-control was the cause of all crime, all the time. They said the symptoms (or characteristics) of low self-control included: 1) being easily irritated or frustrated; 2) being short-sighted and impulsive; 3) engaging in a lot of risky, thrill-seeking behaviour; and 4) being insensitive to the harm caused to others. They said that the primary causes of low self-control were “ineffective or incomplete socialization,” in turn caused by “ineffective child-rearing.”"},
                 {term:"Social Learning Theory",definition:"Ronald Akers’s social learning theory blends Edwin Sutherland’s differential association theory, B. F. Skinner’s operant conditioning, and Albert Bandura’s imitation and modelling behaviour. Edwin Sutherland was a Chicago School theorist (a sociologist). Sutherland proposed that criminal behavior was learned through the process of social interaction, just like other social behaviour, via the exchange of words, gestures, and symbols. Operant conditioning (often associated with behaviour modification) stated that individuals learned behaviour through a process of reinforcement and punishment, by operating on their own environment. Bandura argued that most human behaviour is learned through imitation and modelling of behavior of others...in other words, learning through example (also known as “vicarious learning”—you can learn about behaviours without actually having to engage in those behaviours yourself)."},
                 {term:"Neutralizing Definitions",definition:"Social learning theory posits that individuals learn neutralizing definitions, which help to justify/excuse criminal behaviour. This is consistent with Edwin Sutherland’s differential association theory, and his notion that individuals learned the rationalizations, motivations and attitudes that went along with being a criminal. Also consistent with Sykes and Matza’s 1957 “techniques of neutralization,” wherein Sykes and Matza specified what it was that criminals learned in order to deflect their feelings of guilt. Neutralizing definitions may also be used to help criminals avoid punishment—e.g., blaming somebody else for the crime, blaming it on poor parenting, etc. "}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 4 Flashcards",titleFontStyle);
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

