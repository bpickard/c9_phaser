
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Anomie-strain theory",definition:"Associated with Durkheim and Merton. Durkheim described “anomie” as a state of lawlessness, normlessness, or unrestrained ambition, which if left unchecked could lead to a breakdown in social solidarity. Durkheim said that a state of anomie would arise when the “forces of integration” (social bonds and collective beliefs) and the “forces of regulation” (laws and social institutions) were out of balance, and not functioning properly. Merton used Durkheim’s concept of anomie to explain high crime rates in American society. Merton argued that a dysfunction (an imbalance) existed between the cultural goals of American society (e.g., accumulation of wealth and social advancement) and access to the institutional means through which to achieve those cultural goals (e.g., getting a good education, or finding good employment opportunities). This dysfunction or imbalance caused “anomie.”"},
                 {term:"Merton’s Modes of Adaptation",definition:"Merton said that individuals could deal with their anomie-strain through five possible modes of adaptation: conformity, innovation, ritualism, retreatism, and rebellion. The mode of adaptation chosen would depend on whether the individual accepted or rejected the cultural goals of American society, and accepted or rejected the institutional means through which to achieve those goals. While the behaviour of retreatists and rebels might be regarded as deviant/criminal, Merton argued that innovators were most likely to typify criminals that came to the attention of the criminal justice system. Innovators accepted the cultural goals of wealth and consumerism, but didn’t believe that there were (legitimate) institutional means through which to achieve those goals."},
                 {term:"The Forces of Integration\nand the Forces of Regulation",definition:"Durkheim said that the forces of integration (the social forces of attraction) included social bonds and collective beliefs. The forces of regulation (the social forces of restraint) included the laws, the criminal justice system, and the social structure. Travis Hirschi borrowed liberally from these ideas—social bonds, collective beliefs—in his social bond theory."},
                 {term:"Social Bond Theory",definition:"Form of social control theory, by Travis Hirschi. Social bond theory is rooted in Durkheimian notions about social bonds and collective beliefs. Hirschi’s social bond theory can be broken down into four main elements/components: attachment, commitment, involvement, and belief. Hirschi said that if the four main components of the social bond were operating as they should, then individuals would be disinclined to engage in criminal or delinquent behaviour. Hirschi’s social bond theory provided the basis for a number of more recent social control theories, including Thornberry’s interactional theory and Sampson & Laub’s life-course-developmental theory."},
                 {term:"General Strain Theory",definition:"By Robert Agnew. General strain theory, part of a newer trend toward theoretical integration, was meant to address some of the criticisms of original anomie-strain theory. General strain theory represents a combination of sociological theory (Durkheim’s anomie theory and Merton’s anomie-strain theory) and psychological theory (differences in personality, negative affect, the frustration-aggression hypothesis, cognitive and behavioural coping mechanisms). Agnew described the sources of strain experienced by teens as “the presentation of negative stimuli” (e.g., parental punishment) and “the removal of positively valued stimuli” (e.g., being kicked off the high school basketball team), arguing that these strains or stressors could lead to frustration, anger, and, in some cases, to juvenile delinquency."},
                 {term:"Strain Moderators",definition:"According to Robert Agnew’s general strain theory, some individuals cope with strain better than others, because of the presence of strain moderators. Strain moderators (or buffers) include a good sense of self-esteem (a good sense of self-worth), self-efficacy (a sense of one’s ability to control one’s own life), and social support (from family and from non-delinquent peers). Strain moderators also include attachment to parents and teachers, and commitment to school. If strong enough, these strain moderators may act as a buffer between stressors, negative affect, and delinquent or criminal behaviour."},
                 {term:"Negative Affect",definition:"A psychological term, used in Agnew’s general strain theory. Negative affect is the key factor (or intervening condition) that links strain to delinquency. Negative affect includes a variety of negative emotions, e.g., anger, frustration, guilt, depression, worthlessness and anxiety. While negative affect may cause some individuals to withdraw, or become suicidal, it has its greatest influence on delinquency and criminal behaviour when it results in anger, and the individuals blaming others for the adversity they are facing."},
                 {term:"Interactional Theory",definition:"Interactional theory, by Terrence Thornberry, is an “integrated theory,” because it utilizes Hirschi’s social bond theory, Akers’s social learning theory, Merton’s anomie-strain theory, and the Chicago School’s social disorganization theory. Interactional theory is also a “life course” or “developmental” theory. It examines how social bonds—and the propensity for delinquency and criminality—change as individuals transition through the life stages of childhood, adolescence, young adulthood and adulthood. The interaction between social bonds and social learning is a two-way street. Weakened social bonds leads to exposure to delinquent peers and to the learning of delinquent values; at the same time, exposure to delinquent peers and the learning of delinquent values leads to further weakening of social bonds."},
                 {term:"Life-Course-Developmental Theory",definition:"Associated with Sampson & Laub (although Thornberry’s interactional theory is also a life-course-developmental theory). Sampson & Laub’s life-course-developmental theory describes the process of change over the life course in terms of “trajectories,” “transitions” and “turning points.” Life-course-developmental theory employs the attachment and commitment elements of Hirschi’s social bond theory. However, Sampson & Laub redefine the development of attachments and commitments (pro-social adult bonds) as the acquisition of “social capital.”"},
                 {term:"Social Capital",definition:"In their life-course-developmental theory, Sampson & Laub redefine the development of attachments and commitments (pro-social adult bonds) as the acquisition of “social capital.” The term “social capital” refers to the social resources that individuals have available to them—social relationships (or social bonds), neighborhood networks, the degree of social support which they might receive from family, friends and employers. As individuals reach adulthood, they may enter into good, stable marriages, and develop a strong sense of attachment and commitment to their partners and their children. They may find well-paying, stable jobs, and develop strong ties (or social bonds) to their employer and workplace colleagues. Through this process, they make a social investment in their future. They become reluctant to risk this social capital by engaging in criminal behaviour, just like they might be adverse to risking financial capital by investing it unwisely."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 8 Flashcards",titleFontStyle);
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

