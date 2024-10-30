
// let withCover = true;
// let firstTime = true;
// let mainEnded = false;
// let coverEnded = true;

// document.getElementById('main').addEventListener('click', () =>{
//     const main = document.getElementById('main');
//     main.style.animationName = 'rotateCalculator';

//     main.addEventListener('animationend', () => {
//         mainEnded = true;
//     })
// });

// document.getElementById('cover').addEventListener('click', () =>{

//     if(!mainEnded || !coverEnded) return;

//     coverEnded = false;

//     if(withCover){
//         cover.style.animationName = 'removeCover';
//     }
//     else{
//         cover.style.animationName = 'putCover';
//     }

//     withCover = !withCover;

//     cover.addEventListener('animationend', ()=>{
//         if(firstTime){
//             firstTime = false;
//         }

//         coverEnded = true;
//     });

// })

const input = document.getElementById('input');
let calculatorOn = false;
let cursorPos = 0;

document.getElementById('on').addEventListener('click', (e) =>{

    e.preventDefault();

    if(!calculatorOn){
        input.focus();
    }

    else{
        input.value = '';
        cursorPos = 0;
    }

    calculatorOn = !calculatorOn;
})

input.addEventListener('keydown', (e) =>{  

    e.preventDefault();

    if(calculatorOn){

        let newValue = [...input.value];
        let dir = 0;

        if(!isNaN(e.key) && e.key !== " "){
            newValue.splice(cursorPos, 0, e.key);
            input.value = newValue.join("");
            dir = 1;
        }
    
        else if(e.key === "Backspace" && input.value.length > 0){
            if(cursorPos === 0){
                newValue.splice(cursorPos, 1);
                dir = 0;
            }

            else{
                newValue.splice(cursorPos - 1, 1);
                dir = -1
            }

            input.value = newValue.join("");
        }

        else if(e.key === "ArrowLeft"){
            dir = -1;
        }

        else if(e.key === "ArrowRight"){
            dir = 1;
        }

        moveCursor(dir);
    }

});

const buttons = [...document.getElementsByClassName('calculatorButton')];


buttons.forEach(button => {

    button.addEventListener('click', (e) => {

        if(calculatorOn){
            e.preventDefault();

            const input = document.getElementById('input');
            
            input.value += button.textContent

            input.focus();

        }
        
    })
});

const arrows = [...document.getElementById('arrowsContainer').childNodes];

arrows.forEach(arrow => {

    arrow.addEventListener('click', (e) => {

        e.preventDefault();   

        if(calculatorOn){    
            
            let dir = 0;
            
            if(arrow.id === 'leftArrow'){
                dir = -1;
            }

            else if(arrow.id === 'rightArrow'){
                dir = 1;
            }

            moveCursor(dir);
            input.focus();
        }
    })
})


function moveCursor(direction){

    cursorPos += direction;

    if(cursorPos < 0 ){
        console.log('hola');
        cursorPos = input.value.length;
    }
    else if(cursorPos > input.value.length){
        cursorPos = 0;
    }

    input.setSelectionRange(cursorPos, cursorPos);
}