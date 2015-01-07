
var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

var game = new Phaser.Game(800 , 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

var cardArray = [{term:"Level 1, 2, 3, and 4 Gangs",definition:"Level 1 gangs are loosely formed groups, with no leadership or organizational structure (no “hierarchy”), based on a shared cultural identity or particular neighbourhood; they engage in periodic, unorganized criminal activity for fun and excitement, rather than for financial or material gain. Level 2 gangs have been together for at least a year, but typically have no leadership or organizational structure; they frequently engage in planned (deliberate) criminal activity. Level 3 gangs have a “hierarchical organizational structure,” with clearly defined leaders and followers. Level 3 gangs have been together for at least a year, and engage in planned criminal activities, often trying to control an illicit activity, such as drug-trafficking within a specified territory. Level 4 gangs have been in existence for 5 years or longer, have sophisticated organizational structures, and may be involved in both legal and illegal activity, in some cases engaging in international business transactions (money laundering, drug-trafficking)."},
				{term:"Weed and Seed",definition:"Gang suppression strategies assume that police intervention can successfully suppress or eliminate gang activity. However, police intervention has little impact on gang membership or future involvement in gang-related activity. One gang suppression strategy that seems to have garnered support is the “weed and seed” strategy. The first step in the “weed and seed strategy” is to remove violent gang members from the community. This means identifying, arresting, and prosecuting serious criminals. This is the “weeding” side of the suppression strategy. After the violent gang members are removed from the community, the second step is to invest in long-term community development, such as neighbourhood revitalization, and after-school and weekend activities for youth. This is the “seeding” side of the suppression strategy."},
				{term:"Gang Prevention Strategies",definition:"Gang prevention strategies seem to be more successful than gang suppression strategies. Prevention strategies tend to be community-based, and developed in response to failed suppression tactics. Gang prevention strategies that have experienced success include Operation Ceasefire, the Comprehensive Gang Prevention Model, GREAT (an acronym for Gang Resistance, Education and Training), and The Philadelphia Model. Gang prevention strategies may involve the police, the prosecution, school officials, youth workers, street workers, probation officers, and parents of the gang members."},
				{term:"Enterprise Crime",definition:"Sacco & Kennedy argue that high-level organized crime (like level 4 gangs) could more accurately be categorized as “enterprise crime.” Illegal activities are often mixed with legal activities. High-level criminal organizations may be structured much like business enterprises, with lawyers, accountants, and offices with employees. Also, like business enterprises, high-level criminal organizations are set up primarily for the purpose of pursuing profits."},
				{term:"White-Collar Crime",definition:"The term white-collar crime originated with Edwin Sutherland. Sutherland challenged prevailing wisdom about crime, arguing that white-collar criminals—bankers, lawyers, accountants, doctors and corporate executives—committed as much or more crime than lower-class individuals. Examples of white-collar crime include a lawyer stealing money from his or her client’s trust accounts, a doctor overbilling Medicare, or a bank manager embezzling money from the bank. White-collar crime is distinguished from corporate crime by the fact that the white-collar criminal is committing the crime for his/her own personal benefit, whereas corporate crime is usually committed for the benefit of the corporation (although the individual white-collar/corporate criminal may benefit as well)."},
				{term:"The Ponzi Scheme",definition:"The “Ponzi Scheme” is named after Charles Ponzi, a con artist who told American investors back in the early 20th century that he had a foolproof investment scheme that would guarantee them huge returns on their money. As the word spread, and enthusiasm grew, new investors flocked to the scheme, permitting Charles Ponzi to pay dividends to the original investors, while at the same time keeping most of the new money for himself. Eventually the scheme unravelled, because Ponzi ran out of new investors, and none of the money had been invested in anything that would provide financial security or financial returns for the investors."},
				{term:"Corporate Crime",definition:"Corporate crime is similar to white-collar crime, in that it’s usually committed by white-collar individuals, e.g., chief operating officers or chief financial officers, many of whom hold professional designations (e.g., in accounting). Rather than being committed for personal benefit, however, corporate crime is committed for the benefit of the corporation (to enhance corporate profitability, or to raise share prices). Examples of corporate crimes include price-fixing, false advertising, knowingly selling hazardous products, safety violations that endanger the lives of workers, the illegal dumping of toxic waste, etc."},
				{term:"Green Criminology",definition:" “Green criminology” is new area of study, linked to the study of white-collar and corporate crime. Green criminology examines environmental disasters that are caused by corporate negligence or intentional corporate malfeasance. An example would be the massive oil spill from British Petroleum’s deep sea oil rig in the Gulf of Mexico. Many of these purported environmental “crimes” are not treated as crimes at all. Instead, they are typically regarded as corporate transgressions, dealt with by government regulatory agencies (rather than by the criminal courts), and are usually met with censure, administrative monetary penalties, and compliance orders. "},
				{term:"Regulatory Capture",definition:"The term “regulatory capture does not mean that white-collar criminals or corporations are captured by the government agencies that are responsible for overseeing and regulating their behaviour (or misbehaviour). Instead, the term regulatory capture refers to the practice of regulatory agencies to recruit experts (including consultants and industry advisors) from the ranks of private industry. These consultants and advisors are then expected to advise the regulatory agencies regarding acceptable industry practices and standards. Because these experts come with extensive ties to the business community, and in particular to the industry they are supposed to be regulating, they have been known to put the interests of the private sector ahead of the interests of the regulatory agency or the interests of the Canadian public."},
				{term:"The Subculture of Power Abuse",definition:"James Hackler says that in reality, corporations are governed by  small groups of executives, who decide who gets to sit on the Board of Directors and make corporate decisions. They control their own salaries and bonuses, guarantee themselves “golden parachutes” if the company fails or they get fired for poor performance, and help themselves to perks, like corporate jets and business trips that are really all-expense-paid luxury vacations. Hackler describes this as a “subculture of power abuse,” where a select group of executives learn (transmit) cultural values that are conducive to abusing corporate power, and reinforce either other’s behaviour, much like what happens in a criminal subculture."}]
				
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
  
  var titleText = game.add.text(game.world.centerX,75,"Crime in Canada: Tutorial 10 Flashcards",titleFontStyle);
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

