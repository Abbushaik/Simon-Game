//Default Intialization
let gameSeq=[];
let userSeq=[];
let level=0;
let started=false;
let btns=['yellow','red','purple','green'];
let h2 = document.querySelector("h2");

//Game is Starting..
document.addEventListener("keypress",function()
{
    if(started==false)
    {
        started=true;
       // console.log("Game is Started!!");
        levelUp();
    }
});


//Gets Flashed for Every Game Sequence
function gameFlash(btn)
{
    btn.classList.add("flash");
    addSound(btn.getAttribute("id"));
    setTimeout(function()
    {
        btn.classList.remove("flash");
    },200);
}



//Gets Flashed for Every User Sequence
function userFlash(btn)
{
    btn.classList.add("userFlash");
    addSound(btn.getAttribute("id"));
    setTimeout(function()
    {
        btn.classList.remove("userFlash");
    },200);
}


//EveryTime After New Color Level gets Increased
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn =document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    //console.log(gameSeq,"gameSeq");
    gameFlash(randBtn);
}

//Every Time When Color Changes This Function Gets Executed
function addSound(btn) {
    var audio = new Audio("sounds/" + btn + ".mp3");
    audio.play();
}


//This Function is used to check the Game Sequence colors and User Sequence Colors
function checkColor(idx)
{
    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
         //   console.log("Same Value!!");
            setTimeout(levelUp,800);
        }
    }else{
        h2.innerHTML=`Game Over!! Your Score was ${level} <br>Press any Key to Start the Game`;
        started=false;
        document.querySelector("body").style.backgroundColor="red";
        addSound("wrong");
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor="#011F3F";
        },200); 
        reset();
    }
}

//This function gets executed whenever User Clicks on Button
function btnPress()
{
    let btn=this;
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
   // console.log(userSeq,"UserSeq");
    userFlash(btn);
    checkColor(userSeq.length-1);
}


//This Function gets Executed when the Sequence of colors doesnt Match
function reset()
{
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
}

//We apply eventListeners On Every Button
//Which Button Gets Clicked Thats Corresponding CallBack() is Executed!!
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}


//Mohammad Abubackar