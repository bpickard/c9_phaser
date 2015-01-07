
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Crime vs. Deviance",definition:"Crimes are violations against formal prescriptions (prohibitions), that are codified in law. The penalty (sanction) for crime may involve imprisonment in a state institution, or some other form of punishment by the state, e.g., being placed on probation or ordered to pay a fine. Crimes are prosecuted by the state because they are considered to be harmful to the society at large, or a threat to public order.\n\nDeviance involves violation of social norms/expectations, rather than violation of a codified (written) law (deviance is often “in the eye of the beholder”). What some people regard as deviance, others may regard as normal behaviour. Deviance is usually punished (or sanctioned) through informal social processes, e.g., social exclusion, stigmatization, gossip, being ridiculed."},
                 {term:"Mala in se",definition:"Latin term; literally means something that is evil, or bad in itself. Most societies and cultures recognize that certain acts are inherently wrong. Most countries around the world have laws against murder, assault, robbery, rape and incest. Most people would agree that mala in se crimes were just plain wrong, even if there wasn’t a written law prohibiting them."},
                 {term:"Mala Prohibita",definition:"Latin term; literally, means bad because it is prohibited. There may not be culture-to-culture or society-to society agreement regarding the illegality of these acts. Mala prohibita laws may change in the same culture or society over time. E.g., homosexuality is legal in Canada, but not in many other countries around the world; polygamy is legal in many countries around the world, but not in Canada."},
                 {term:"The Magna Carta",definition:"Canadian criminal/constitutional laws can be traced back to the Magna Carta (literally means “great charter”). Magna Carta signed by King John in Runnymede, England, in 1215. British barons took advantage of King John’s military defeats, pressuring the king into pledging to respect their traditional rights, and to be bound by law. Magna Carta later interpreted in 1613 legal decision to support rights of individuals, to guarantee basic liberties for all citizens, and to prohibit Crown from prosecuting individuals without due cause. These rights can now be found in the 1982 Canadian Charter of Rights and Freedoms."},
                 {term:"Habeas Corpus",definition:"An old English legal tradition that has been carried forward into Canadian law. Literally translated, means “you have the body”. Intended to prevent capricious, corrupt or unfair imprisonment (imprisonment without cause), by allowing a prisoner to challenge the lawfulness of his or her imprisonment. Section 10 of the 1982 Canadian Charter of Rights and Freedoms states that “everyone has the right on arrest and detention to... have the validity of the detention determined by way of habeas corpus and to be released if the detention is not lawful”."},
                 {term:"Probation",definition:"Is a sentence in itself, ordered by sentencing judge at the time of sentencing. 45% of convicted adult offenders are sentenced to probation, i.e., probation is the most common sentence. Probation can be combined with other penalties or sanctions—e.g., fines, community service, etc. Probation comes with conditions, e.g., obeying the law, reporting to court as required, and notifying court (or probation officer) of change in address or occupation. If offender fails to comply with conditions of probation, then he/she can be charged with Breach of Probation, which is separate offence under the Criminal Code. Maximum length of probation allowable by law is three years."},
                 {term:"Parole",definition:"Convicted offender who is sentenced to imprisonment is eligible to apply for parole (release from prison) prior to the expiration of his/her sentence. Most offenders are eligible to apply for day parole after serving six months of sentence of imprisonment, or six months before eligibility to apply for full parole, whichever is longer. Most offenders (except lifers) are eligible to apply for full parole after serving one-third of sentence. Conditions of parole include regular reporting to parole officer, not leaving country, reporting changes in marital status, residence or employment to parole officer, etc. If Parole Board is satisfied that parolee is in violation of his/her parole conditions, and/or poses undue risk to society, Board can suspend or revoke parole, and put individual back in prison to serve his/her sentence."},
                 {term:"Statutory Release",definition:"Most inmates are released automatically, after completing two thirds of sentence. Parole Board can only deny statutory release if Board has reasonable grounds to believe an offender is likely to commit a crime that will cause death or serious harm to the victim, commit serious drug-related offence, or commit sexual offence involving a child. Board can impose release conditions identical to those imposed on regular parolees—reporting to parole officer, not leaving country, reporting changes in marital status, residence or employment to parole officer, etc. If Board is satisfied that individual on statutory release is in violation of his/her release conditions, and/or poses an undue risk to society, they can suspend or revoke statutory release, and put individual back in prison to serve his/her sentence."},
                 {term:"Summary Conviction and Indictable Offences",definition:"Summary offences are less serious offences, like theft under $5,000. They generally carry maximum penalty of six months imprisonment or $5,000 fine. In summary conviction offences, matter proceeds directly to trial in Provincial Court. Indictable offences are more serious offences, like murder or rape, with potentially higher fines and/or periods of imprisonment. Indictment is formal process of setting out criminal charge in a court document. Often results in a preliminary inquiry, at which a Provincial Court Judge determines whether or not there is sufficient evidence to proceed to trail."},
                 {term:"Superior Courts",definition:"Most provinces and territories have two superior courts—Superior Court Trial Division and Superior Court Appeal Division. Superior courts deal with the most serious cases, both criminal and civil. Superior Court Trial Division may be called (e.g.,) Supreme Court of British Columbia, Court of Queen’s Bench in Alberta, or Superior Court of Justice in Ontario. Cases in Superior Court Trial Division may be heard by judge alone, or by judge and jury. Superior Court Appeal Division may be called (e.g.,) B. C. Court of Appeal, Court of Appeal of New Brunswick, or Appeal Division of Supreme Court in PEI. Superior Court Appeal Division hears appeals of decisions (criminal and civil) made by lower level (“inferior”) Provincial or Territorial courts, and decisions made by Superior Court Trail Division. Cases in Superior Court Appeal Division heard by three Appeal Court judges."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 2 Flashcards",titleFontStyle);
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

