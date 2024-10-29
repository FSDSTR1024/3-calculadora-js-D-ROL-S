
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

document.getElementById('on').addEventListener('click', (e) =>{

    e.preventDefault();

    const input = document.getElementById('input');

    input.focus();

})