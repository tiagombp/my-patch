const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const [w, h] = [2000, 2000];

canvas.width = w;
canvas.height = h;

ncol = 20;
nrow = 25;

ndots = ncol * nrow;

const gap = w * 0.8 / (nrow - 1);

const margin = (h * 0.8) - ( (ncol - 1) * gap );

console.log(gap, margin);

ctx.fillStyle = '#333';
ctx.fillRect(0, 0, w, h);

ctx.strokeStyle = 'yellow';
ctx.lineWidth = 10;

const x0 = w * 0.1;
const y0 = h * 0.1 + margin/2;

ctx.rect(x0, y0, (nrow-1) * gap, (ncol-1)*gap);
ctx.stroke();

//const posicoes = 

const nodes = [];
let k = 0;

for (let j = 0; j < ncol; j++) {

    for (let i = 0; i < nrow; i++) {

        const point = {

            n : k,

            x : i * gap + x0,
            y : j * gap + y0,

            a1 : null,
            a2 : null,

            angulos : {
                inicial : [i % 2 == 0 ? 0 : 4, j % 2 == 0 ? 2 : 6],
                primeira : null
            }

        }

        k++;

        nodes.push(point);

    }

}

/*
 
  5 6 7
   \|/
 4 -+- 0
   /|\
  3 2 1

*/


const posicoes_primeira = [
    // [[i,j], [a1, a2]]
    [ [0, 7],  [2, 0] ],
    [ [1, 7],  [4, 0] ],
    [ [2, 7],  [4, 0] ],
    [ [3, 7],  [4, 0] ],
    [ [4, 7],  [4, 0] ],
    [ [5, 7],  [4, 2] ],

    [ [0, 8],  [6, 0] ],
    [ [1, 8],  [4, 0] ],
    [ [2, 8],  [4, 2] ],
    [ [2, 9],  [6, 2] ],
    [ [2, 10], [6, 2] ],
    [ [2, 11], [6, 2] ],
    [ [2, 12], [6, 0] ],
    [ [3, 12], [4, 6] ],
    [ [3, 11], [6, 2] ],
    [ [3, 10], [6, 2] ],
    [ [3,  9], [6, 2] ],
    [ [3,  8], [0, 2] ],
    [ [4,  8], [0, 4] ],
    [ [5,  8], [6, 4] ]

]

posicoes_primeira.forEach(elemento => {

    const [pos, ang] = elemento;

    const [i,j] = pos;

    const n = j * nrow + i;

    console.log(n);

    nodes[n].angulos.primeira = ang;

})

ctx.strokeStyle = 'yellow';
ctx.fillStyle = 'yellow';

const teta = Math.PI / 4;

//seta estado inicial
nodes.forEach(point => {
    point.a1 = point.angulos.inicial[0];
    point.a2 = point.angulos.inicial[1];
});

//console.log(nodes.map(d => [d.a1, d.a2]));

function pega_valor_futuro(target, estado) {

    let valores = [target.a1, target.a2];

    if (target.angulos[estado]) {

        valores = target.angulos[estado]

    }

    //console.log(estado, target.angulos[estado], valores[0], valores[1]);

    return valores;

}



function render() {

    // clear
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, w, h);

    nodes.forEach(point => {

        const { n, x, y, a1, a2 } = point;

        //if (n == 175) console.log(a1, a2);

        ctx.strokeStyle = 'yellow';
        ctx.fillStyle = 'yellow';
    
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(teta * a1);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(gap,0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(teta * a2);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(gap,0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    
    })

}

render();


gsap.to(nodes, {

    delay : 1,
    duration: 5,
    a1: (i, target) => pega_valor_futuro(target, 'primeira')[0],
    a2: (i, target) => pega_valor_futuro(target, 'primeira')[1],
    onUpdate: render,
    yoyo: true,
    repeat: 0,

    ease: 'linear'

})

