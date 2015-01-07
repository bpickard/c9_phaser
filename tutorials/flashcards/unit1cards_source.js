
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Stigmatization",definition:"Refers to the manner in which individuals or groups who do not conform (do not play by society’s rules) come to be regarded as deviants, social outcasts, or folk devils. The media and moral entrepreneurs often play a role in the stigmatization process, helping to draw public and political attention to certain individuals or groups, type-casting them as enemies of society who have to be “dealt with” by the government and/or the criminal justice system."},
                 {term:"Media Effects",definition:"Social scientists who first studied crime and the media in the 1960s and 1970s attempted to measure the impact of media consumption on aggression. They described “media effects,” saying that children who watched a lot of violence on TV were more likely engage in violence in real life. Today, those who still study media effects argue that while violent movies and violent video games may not directly cause individuals to become criminals, such violent media can provide guidance (e.g., copycat crime), or serve as crime catalysts for individuals who are already predisposed to violence. "},
                 {term:"Cultural Criminology",definition:"A newer branch of “critical criminology,” that explores the links between culture, crime, and crime control in contemporary society. From the cultural criminology perspective, news media and popular culture are social sites where we collectively negotiate and shape the meaning of crime, violence, victimization, justice and community. Media narratives are considered excellent cultural artifacts for cultural criminologists to examine, as they provide a window into the social construction of the meaning of crime."},
                 {term:"Active Audiences ",definition:"Associated with cultural criminology. With “active audiences” (as opposed to “passive audiences”), the meaning of media messages is “negotiated” through interaction between those who produce the messages, and the audiences who consume them. Members of the audience do not simply absorb the media messages; rather, they assign their own meaning to the messages. Crime generates media stories, but those media stories in turn generate “narratives,” that contextualize our understanding of crime. "},
                 {term:"Folk Devils",definition:"Terminology comes from the title of Stanley Cohen’s book, Folk Devils and Moral Panics. In Cohen’s book, the Mods and Rockers were the “folk devils”—scapegoats, who were portrayed by the media and moral entrepreneurs as the personification of “evil.” In Hall et al.’s Policing the Crisis, young, Black offenders (“muggers”) were the folk devils. In Brezina and Phipps’s work on “false news reports” in the aftermath of Hurricane Katrina, the lower class hurricane refugees were the folk devils."},
                 {term:"Primary and Secondary Deviance",definition:"Based on Edwin Lemert’s 1951 book on Social Pathology. Underpins Becker’s labelling theory and Cohen’s work on moral panics. Primary deviance occurs when an individual (or group) engages in disapproved behaviour, without necessarily seeing their behaviour as “deviant” or “criminal.” Individuals or groups may be able to rationalize the behavior, or even see it as normal, until they are caught by the police, and put through the criminal justice process. Secondary deviance results from the social reaction to primary deviance. Individuals may come to view themselves as “deviant” or “criminal,” and accept their new deviant status because of the stigmatization and social control."},
                 {term:"Labelling Theory",definition:"Associated with Howard Becker’s 1963 book Outsiders: Studies in the Sociology of Deviance. Becker pinpointed the role of moral entrepreneurs (moral crusaders) in the social construction of deviance. Becker argued that unless a certain type of behaviour was deemed to be deviant or criminal by these moral entrepreneurs, and became the target of rule-making and rule enforcement as a consequence, then that behaviour would likely to be tolerated by society, or if not, then at least ignored. Once the deviant label is applied (e.g., criminal, drug addict, mugger), it is very difficult to get rid of, and may become a self-fulfilling prophecy."},
                 {term:"The Grassroots Model",definition:"One of three models from Goode & Ben-Yehuda’s 1994 article, “Moral Panics and Social Construction.” The “Grassroots Model” proposes that moral panics begin with genuine public concern about a problem (real or imagined), and that politicians and the media become involved in response to this public concern. Most proponents of the grassroots model would acknowledge that involvement of the media, action groups and politicians is necessary in order for a moral panic to develop fully."},
                 {term:"The Elite-Engineered Model",definition:"One of three models from Goode & Ben-Yehuda’s 1994 article, “Moral Panics and Social Construction.” The “Elite-Engineered Model” argues that small, powerful groups deliberately set out to create moral panics, in order to divert public attention away from truly serious social problems, where the solutions to those problems might negatively impact the interests of the elite groups themselves. Goode and Ben-Yehuda point to Hall et al.’s 1978 book Policing the Crisis as an example of the elite-engineered model."},
                 {term:"Interest Group Theory",definition:"One of three models from Goode & Ben-Yehuda’s 1994 article, “Moral Panics and Social Construction.” “Interest Group Theory”—exemplified by Howard Becker’s work on how moral crusades are launched by moral entrepreneurs—is the most widely used approach to moral panics. Interest groups such as the media, politicians, professional groups and religious organizations may act independently, rather than in consort with each other. While the moral panics generated by these interest groups may seem self-serving, the groups might genuinely believe that they are acting in the best interests of society. "}];

var sceneIndex = 0;
var inScene = false;
var fontChoice = 'Arial';
if(isMac){
    fontChoice = 'Helvetica';
}

var termFontStyle = {font:'18pt '+fontChoice,fill:'#000099',align:'left'};

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 1 Flashcards",titleFontStyle);
  titleText.anchor.setTo(0.5,0.5);
  
  var sortButton = game.add.button(game.world.centerX,560,'greenbutton',swapSort,this);
  sortButton.anchor.setTo(0.5,0.5);
  sortButton.alpha =0;
  
  sortButtonText = game.add.text(sortButton.x,sortButton.y,"View By: Term",buttonFontStyle);
  sortButtonText.anchor.setTo(0.5,0.5);
  
  if(!isMac){
  definitionText = game.add.text(flashcard.x,flashcard.y-120,'',definitionFontStyle);
  termText = game.add.text(game.world.centerX,game.world.centerY+10,'',termFontStyle);
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

