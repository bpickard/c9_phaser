
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Neo-Marxism",definition:"Associated with the thinking of critical criminologists Ian Taylor, Paul Walton and Jock Young, and their 1973 book, The New Criminology. Neo-Marxism adopted notions that were consistent with the 19th century works of Karl Marx and Friedrich Engels—that the capitalist economy dictates the structure and functioning of society (and crime), that capitalism is to blame for crime because it creates social inequality, and that the only way to eliminate crime is to get rid of capitalism. In arriving at Neo-Marxism, Taylor, Walton and Young combined the interactionist perspective (symbolic interactionism, labelling theory, moral panics) with traditional Marxist thinking."},
                 {term:"The Punitive Turn",definition:"Refers to the move away from correctional treatment-rehabilitation programs, and toward punishment for the sake of punishment. E.g., the offender population in Canada has increased by 7.1% over the past five years, despite declining crime rates. The punitive turn may be driven in part by extensive media coverage of particularly horrendous crimes, the emergence of victims’ rights groups and their influence on criminal justice policy, and the growth of the private prison industry in the US (prisons for profit). The punitive turn has also been linked to politicians seizing upon crime as an issue that appeals to voters."},
                 {term:"Relative Deprivation",definition:"A concept used by the left realists (a more recent branch of critical criminology). The concept was adopted/adapted from Robert Merton’s earlier work on anomie-strain theory and relative deprivation theory. Left realists argue that crime is more likely in situations where members of a certain group feel deprived because they don’t have access to the same things that other groups have. The deprivation is not “absolute”—i.e., they are not necessarily homeless or starving. Rather, the deprivation is relative—i.e., they feel deprived, in relation to other groups."},
                 {term:"Critical Race Theory",definition:"Critical race theory has deconstructed (taken apart) ideas (constructions) of race as “biological.” Critical race theory argue that race is a social construction—a label, stigma or symbol placed upon an individual by society, which affects that individual’s life opportunities. Opportunities are blocked, not only because some people are prejudiced against other races, “but because racism exists within social relations, practices and institutions.” Examples include the over-policing of ethnic communities, racial profiling, and the mistreatment of ethnic minorities by the criminal justice system."},
                 {term:"Post-Structuralist Criminology",definition:"A branch of criminology that falls under the umbrella of critical criminology. Influenced by Michel Foucault, and a group of thinkers called the Foucauldians. Marxists (conflict theorists) and structural functionalists (consensus theorists) focus on the structure of society, and assume that individuals can stand outside of the social system in order to critique it. Post-structuralists argue that power and oppression permeate all levels of society; thus, it is impossible for an individual to stand outside of a social system as an objective, neutral observer. Everybody’s understanding or interpretation of reality is bounded (structured) by their historical epoch, their culture, their language, and by the predominant social discourse."},
                 {term:"Socialist Feminism",definition:"A second wave of feminism, coming onto the scene after earlier forms of liberal feminism and radical feminism. Socialist feminism combines Marxist and other radical perspectives, arguing that the patriarchal relations of capitalism (male dominance) are reproduced in the family. Patriarchy refers to the type of social structure and family structure that permits males to exercise control over women’s labour and women’s sexuality. Capitalism needs familial reproduction and the patriarchal structure of the nuclear family to produce a labour force that is suitable for the capitalist workplace.       "},
                 {term:"Intersectional Feminism",definition:"A third wave of feminism (following liberal feminism, radical feminism and socialist feminism), that focusses on the intersection between race, class and gender. Examines multiple inequalities, including sexuality (LGBT), age, and physical ability. In particular, race, class and gender intersect, and “structure” how individuals behave, what opportunities are available to them, and how their behaviour is socially defined. An example would be Sally Simpson’s work on caste, class and violent crime."},
                 {term:"Employment as a Symbolic Resource",definition:"From MacMillan and Gartner’s article “When She Brings Home the Bacon,” based on the 1993 Violence Against Women Survey conducted by Statistics Canada. MacMillan and Gartner conclude that the primary significance of employment is symbolic—it concerns the relative status of husbands and wives. Employment as a symbolic resource takes on added significance in families that are structured around male authority and female dependence, where spousal violence is used to dominate and control women in marital relationships. If women in such relationships are employed and their male partners are not, or the women have more workplace authority than their male partners, there is an increased risk of serious domestic violence by the male partner."},
                 {term:"Patriarchal Terrorism",definition:"According to MacMillan and Gartner’s “When She Brings Home the Bacon,” based on the 1993 Violence Against Women Survey conducted by Statistics Canada, approximately 1% of the sample of women were subjected to systematic abuse—multiple forms of violence, with close to 100% having been threatened, hit or kicked; around 75% beaten or choked; and 25% physically attacked, forced to have sex, or threatened with a knife or a gun. MacMillan and Gartner say that females who are subjected to systematic abuse by their male partners are victims of “patriarchal terrorism,” a form of patriarchal (male-dominated) social control over females."},
                 {term:"Exchange/Social Control Theory",definition:"By Richard Gelles, the author of “Through a Sociological Lens: Social Structure and Family Violence.” Gelles argues that “wife abuse and child abuse are governed by the principle of costs and rewards.” The likelihood of violence and abuse increases when the rewards are perceived to be higher than the potential costs (a “rational choice,” exchange, “cost-benefit analysis”). Violence (e.g., in disciplining children) has traditionally been “accepted” as a form of informal social control in the family household. The family (as a social institution) is considered sacrosanct, and is largely left to its own devices by other institutions of social control (e.g., the criminal justice system)."}];

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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 6 Flashcards",titleFontStyle);
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

