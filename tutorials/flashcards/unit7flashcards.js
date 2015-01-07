
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Crime Pattern Theory",definition:"Associated with the thinking of Patricia and Paul Brantingham, and their 1984 book, Patterns in Crime. The idea that the physical environment influences criminal behaviour is not new. That’s why we build high walls around properties, keep guard dogs in the yard or in the house, and have doors that lock. As the Brantinghams say, crime is highly patterned, and is usually concentrated in certain areas. We all know that there are certain parts of town where there is a lot of crime, and other parts of town where it is relatively safe. Crime tend to be concentrated around activity nodes, also known as crime generators and crime attractors."},
                 {term:"The Three Social Domains",definition:"In their routine activity theory, Cohen and Felson say that most crime occurs during routine activities in the home (the household), the workplace, and during leisure (when people are shopping, going out to the movies, attending sporting events, etc.). In criminal event theory, these are referred to as the three social domains. These three social domains structure our lives—where we spend our time, where we are most likely to intersect with other people, where we are most likely to find opportunities to commit crime, and where we are most likely to become a victim of crime. These three social domains are also regarded as “nodes” in the Brantinghams’ environmental criminology."},
                 {term:"Nodes",definition:"Associated with Paul and Pat Brantingham’s environmental criminology, and their work on nodes, paths and edges. Activity nodes are crime generators and crime attractors. Crime generators generate crime by attracting a large number of people, e.g., entertainment districts, shopping centres, and sports stadiums. Crime attractors include known prostitution strolls, markets for illicit drugs, and large shopping malls or unprotected parking lots, where criminals know that there will be opportunities waiting for them. The concept of nodes also includes the three social domains mentioned in routine activity theory—the home, the workplace, and the leisure domain (people commit crimes close to places that are central to their lives)."},
                 {term:"Paths",definition:"Associated with Paul and Pat Brantingham’s environmental criminology, and their work on nodes, paths and edges. Criminals tend to commit their crimes near their normal paths, which include road networks, walking paths, sidewalks, and transit routes. Paths can take criminals to and from suitable targets—they help the offenders get to scene of the crime, and escape from the scene of the crime. Criminal events and crime “hot spots” cluster near major roads, major intersections, subway exits, and bus stops."},
                 {term:"Edges",definition:"Associated with Paul and Pat Brantingham’s environmental criminology, and their work on nodes, paths and edges. The environment is full of physical and perceptual edges, places where there is enough distinctiveness from one [place] to another that the change is noticeable. Land that borders on a river is a physical and perceptual edge—criminal offenders are unlikely to cross that edge, unless there is a bridge (a path) nearby. A major, 8-lane freeway serves as an edge, that criminal offenders are unlikely to cross, unless there is an overpass nearby. Perceptual edges may occur when there is a marked land use change, like going from the area in which the offender lives, into a totally different area that is strange and unfamiliar."},
                 {term:"The Environmental Backcloth",definition:"A term used by environmental criminologists Patricia and Paul Brantingham, to describe the elements that surround the criminal event. The environmental backcloth might also be thought of as a background, or backdrop. The backcloth emits cues, that tell a potential offender whether or not there is likely to be a suitable target, whether or not the offender is likely to be observed and apprehended. The presence (or absence) of bystanders and witnesses is part of the environmental backcloth.  Bystanders and/or witnesses may deter or prevent a crime, just by their presence. The temporal setting is a part of the environmental backcloth. Crime is patterned in accordance with the season, the day, and the time, or the temporal setting."},
                 {term:"The Metroreef",definition:"A more recent extension or elaboration on the routine activity theory, by Marcus Felson. Felson argues that we need a new urban ecology of crime—one that explains how crime is shaped or influenced by the manner in which the urban landscape has in turn been transformed by the automobile. The new urban ecology and its extensive road network has no boundaries—it is much easier to travel from one place to the other, and from one end of the metropolis to the other. People travel greater distances, to go to work, to go to school, or to partake in leisure activities. Crime flows quite easily around the metroreef, due to the road network, and the ease of movement. Many property crimes happen on or around streets and highways, on sidewalks and in alleys, and that many crimes happen in parking lots and residential garages."},
                 {term:"Situational Crime Prevention",definition:"Situational crime prevention is usually associated with the thinking of Ronald V. Clarke, who is also known for his work with Derek B. Cornish, on rational choice theory. Situational crime prevention is also linked to Cohen and Felson’s routine activity theory and the Brantinghams’ environmental criminology. If criminals go through a reasoning process, however limited that process might be, and if they do indeed weigh the costs and benefits of committing a crime, then if you can make the costs outweigh the benefits, they will presumably be deterred (or at least, less motivated). Situational crime prevention prescribes target hardening, increasing the risks (the costs), and reducing the rewards (benefits)."},
                 {term:"The Principle of Least Effort",definition:"In his work on the metroreef, Felson says that Zipf’s 1950 “Principle of Least Effort” should be applied to offender activity. This principle states that people will try to find the shortest route, and that  people will seek the easiest means of accomplishing something. According to Felson, “least effort” implies not wasting time or calories to get somewhere and do something. Felson adds the “Principle of the Most Obvious”—the offender will rely on readily available information, and stick to targets that appear easily in front of his or her nose. Offenders will not travel very far to commit an offence, and may miss better opportunities that are nearby, because they aren’t willing to expend the extra effort."},
                 {term:"Offender Activity Space",definition:"According to the Brantinghams’ environmental criminology (or crime pattern theory), the routine activities of the offender shape, influence or define “offender activity space,” as well as  “offender awareness space.” Offenders commit crimes close to the places that are central to their lives…near their homes, their places of work, or their favourite recreational sites. If offenders are not familiar with an area—either because they do not live there, or do not go to work there, or do not go there during their leisure time—then it is not likely to be included in their activity space, or awareness space."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 7 Flashcards",titleFontStyle);
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

