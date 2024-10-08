
 document.querySelector('.control-button span').onclick = function(){
    let yourName = prompt('whats your name');
    let visit = localStorage.setItem( "name", yourName);
    if(!visit){
        if(yourName == null || yourName == ''){
            document.querySelector('.name span').innerHTML = 'my friend';
        }else{
            document.querySelector('.name span').innerHTML =yourName;
        }
        localStorage.setItem( "name", yourName)
        document.querySelector('.control-button').remove();
    }else{
        document.querySelector('.control-button').remove();
    }
    
};

let time = 40;
let interava = setInterval(() => {
    time--;
    document.querySelector('.timer span').innerHTML = formatTime(time);
    if(time <= 0){
        clearInterval(interava);
        document.querySelector('.containar').classList.add('finished');
        document.getElementById("can").play();
        endgame()
        playAgean()
    }
}, 1000);
function formatTime(seconds){
    let secondss = seconds % 60;
    return secondss;
}

let duration = 1000;
let containar = document.querySelector('.Memory-Blocks-Game');
let Blocks = Array.from(containar.children);
let orderRange = Array.from(Array(Blocks.length).keys());
shuffle(orderRange);
Blocks.forEach((Block, index)=>{
    Block.style.order = orderRange[index];
    Block.addEventListener('click', function(){
        fliip(Block);
    })
});
function fliip(selected){
    selected.classList.add('is-flipped');
    let allflip = Blocks.filter(fliipp => fliipp.classList.contains('is-flipped'));
    if(allflip.length === 2){
        stopclick()
        chek(allflip[0], allflip[1]);
    }
}
function stopclick(){
    containar.classList.add("no-clicked")
    setTimeout(() => {
        containar.classList.remove("no-clicked")
    }, duration);
}
function chek(first, second){
    let tries = document.querySelector('.tries span');
    if(first.dataset.food === second.dataset.food ){
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');
        
        first.classList.add('has-match');
        second.classList.add('has-match');
    }else{
        tries.innerHTML = parseInt(tries.innerHTML)+1;
        setTimeout(()=>{
            first.classList.remove('is-flipped');
            second.classList.remove('is-flipped');
        },duration)
    }
}

function shuffle(array){
    let current = array.length,
    temb,
    random;

    while(current > 0){
        random = Math.floor(Math.random()* current);
        current--;
        temb = array[current];
        array[current] = array [random];
        array[random] = temb;
    }
    return array;
}

let win = false;
function endgame(result){
    let div = document.createElement("div");
    div.className = "popup";
    if(result === "win"){
        let divtex = document.createTextNode(`congratulation you won`)
        div.appendChild(divtex);
        document.body.appendChild(div);
    }else{
        let divtext = document.createTextNode(`Game over`)
    div.appendChild(divtext);
    document.body.appendChild(div);
    }}

function playAgean(){
    let add = document.createElement('button')
    add.className ="add"
    let butTxt = document.createTextNode('play Again')
    add.appendChild(butTxt)
    document.body.appendChild(add)
    add.addEventListener('click',()=>{
        window.location.reload();
    })
    
}

window.onload = function (){
    let STORED = localStorage.getItem("name");
    if(STORED){
        document.querySelector('.name span').innerHTML = STORED;
        document.querySelector('.control-button').remove();
    }
}