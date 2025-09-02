let gameseq=[];
let userseq=[];
let started=false;
let level=0;
let HighestScore=localStorage.getItem("highScore") || 0;
let h2=document.querySelector("h2")
let btns=["red","green","blue","orange"];
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
    
});
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)

}
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}| Highest Score ${HighestScore}`;
    let randomIdx=Math.floor(Math.random()*btns.length);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    gameseq.push(randomColor);
    console.log(gameseq)
    btnFlash(randomBtn);
}
function checkAns(idx){
    
    if (userseq[idx]===gameseq[idx]){
        if(userseq.length===gameseq.length){
            setTimeout(levelUp,1000);
        }
    }
        // console.log("same value!")
        else{
            if(level>HighestScore){
                HighestScore=level;
                localStorage.setItem("highScore", HighestScore);
            }
            h2.innerHTML=`Game Over! Your score was <b>${level}</b><br> Highest Score: <b>${HighestScore}</b> <br>press any key to START`;
            document.querySelector("body").style.backgroundColor="red";
            setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
         },150)
        reset();
    }
    }

function btnPress(){
    let btn=this;
    userFlash(btn)
    userColor=btn.getAttribute("id");
    userseq.push(userColor);
    console.log(userColor);
    checkAns(userseq.length-1);

}
let allBtns=document.querySelectorAll(".btn")
for (btn of allBtns ){
    btn.addEventListener("click",btnPress)

}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}       
    
