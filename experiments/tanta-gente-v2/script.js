const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const [w, h] = [2000, 2000];

canvas.width = w;
canvas.height = h;

ncol = 18; //na verdade, o numero de fileiras
nrow = 25; // o numero de colunas

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
const T_1_i = 0;
const T_1_j = 6;
const A_1_i = 6;
const A_1_j = 6;
const N_1_i = 10;
const N_1_j = 6;
const T_2_i = 15;
const T_2_j = 6;
const A_2_i = 21;
const A_2_j = 6;

const G_1_i = 0;
const G_1_j = 12;
const E_1_i = 6;
const E_1_j = 12;
const N_2_i = 10;
const N_2_j = 12;
const T_3_i = 15;
const T_3_j = 12;
const E_2_i = 21;
const E_2_j = 12;

const C_1_i = 12;
const C_1_j = 0;
const O_1_i = 16;
const O_1_j = 0;

const posicoes_primeira = [
    // [[i,j], [a1, a2]]

    // TANTA

    // T
    [ [0 + T_1_i, 0 + T_1_j],  [2, 0] ],
    [ [1 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [2 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [3 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [4 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [5 + T_1_i, 0 + T_1_j],  [4, 2] ],
    [ [0 + T_1_i, 1 + T_1_j],  [6, 0] ],
    [ [1 + T_1_i, 1 + T_1_j],  [4, 0] ],
    [ [2 + T_1_i, 1 + T_1_j],  [4, 2] ],
    [ [2 + T_1_i, 2 + T_1_j],  [6, 2] ],
    [ [2 + T_1_i, 3 + T_1_j], [6, 2] ],
    [ [2 + T_1_i, 4 + T_1_j], [6, 2] ],
    [ [2 + T_1_i, 5 + T_1_j], [6, 0] ],
    [ [3 + T_1_i, 5 + T_1_j], [4, 6] ],
    [ [3 + T_1_i, 4 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 3 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 2 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 1 + T_1_j], [0, 2] ],
    [ [4 + T_1_i, 1 + T_1_j], [0, 4] ],
    [ [5 + T_1_i, 1 + T_1_j], [6, 4] ],

    // A
    [ [0 + A_1_i, 0 + A_1_j],  [6, 0] ],
    [ [1 + A_1_i, 0 + A_1_j],  [4, 0] ],
    [ [2 + A_1_i, 0 + A_1_j],  [4, 0] ],
    [ [3 + A_1_i, 0 + A_1_j],  [4, 2] ],
    [ [0 + A_1_i, 1 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 1 + A_1_j],  [2, 0] ],
    [ [2 + A_1_i, 1 + A_1_j],  [4, 2] ],
    [ [3 + A_1_i, 1 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 2 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 2 + A_1_j],  [6, 0] ],
    [ [2 + A_1_i, 2 + A_1_j],  [4, 6] ],
    [ [3 + A_1_i, 2 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 3 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 3 + A_1_j],  [2, 0] ],
    [ [2 + A_1_i, 3 + A_1_j],  [4, 2] ],
    [ [3 + A_1_i, 3 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 4 + A_1_j],  [2, 6] ],
    [ [2 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [3 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 5 + A_1_j],  [6, 0] ],
    [ [1 + A_1_i, 5 + A_1_j],  [4, 6] ],
    [ [2 + A_1_i, 5 + A_1_j],  [6, 0] ],
    [ [3 + A_1_i, 5 + A_1_j],  [6, 4] ],

    // N
    [ [0 + N_1_i, 0 + N_1_j],  [0, 2] ],
    [ [1 + N_1_i, 0 + N_1_j],  [4, 1] ],
    [ [3 + N_1_i, 0 + N_1_j],  [0, 2] ],
    [ [4 + N_1_i, 0 + N_1_j],  [4, 2] ],
    [ [0 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [2 + N_1_i, 1 + N_1_j],  [5, 1] ],
    [ [3 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [4 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 2 + N_1_j],  [6, 2] ],
    [ [3 + N_1_i, 2 + N_1_j],  [6, 5] ],
    [ [4 + N_1_i, 2 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 3 + N_1_j],  [6, 2] ],
    [ [1 + N_1_i, 3 + N_1_j],  [1, 2] ],
    [ [4 + N_1_i, 3 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [1 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [2 + N_1_i, 4 + N_1_j],  [5, 1] ],
    [ [4 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 5 + N_1_j],  [6, 0] ],
    [ [1 + N_1_i, 5 + N_1_j],  [6, 4] ],
    [ [3 + N_1_i, 5 + N_1_j],  [5, 0] ],
    [ [4 + N_1_i, 5 + N_1_j],  [6, 4] ],

    // T
    [ [0 + T_2_i, 0 + T_2_j],  [2, 0] ],
    [ [1 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [2 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [3 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [4 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [5 + T_2_i, 0 + T_2_j],  [4, 2] ],
    [ [0 + T_2_i, 1 + T_2_j],  [6, 0] ],
    [ [1 + T_2_i, 1 + T_2_j],  [4, 0] ],
    [ [2 + T_2_i, 1 + T_2_j],  [4, 2] ],
    [ [2 + T_2_i, 2 + T_2_j],  [6, 2] ],
    [ [2 + T_2_i, 3 + T_2_j], [6, 2] ],
    [ [2 + T_2_i, 4 + T_2_j], [6, 2] ],
    [ [2 + T_2_i, 5 + T_2_j], [6, 0] ],
    [ [3 + T_2_i, 5 + T_2_j], [4, 6] ],
    [ [3 + T_2_i, 4 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 3 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 2 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 1 + T_2_j], [0, 2] ],
    [ [4 + T_2_i, 1 + T_2_j], [0, 4] ],
    [ [5 + T_2_i, 1 + T_2_j], [6, 4] ],

    // A
    [ [0 + A_2_i, 0 + A_2_j],  [6, 0] ],
    [ [1 + A_2_i, 0 + A_2_j],  [4, 0] ],
    [ [2 + A_2_i, 0 + A_2_j],  [4, 0] ],
    [ [3 + A_2_i, 0 + A_2_j],  [4, 2] ],
    [ [0 + A_2_i, 1 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 1 + A_2_j],  [2, 0] ],
    [ [2 + A_2_i, 1 + A_2_j],  [4, 2] ],
    [ [3 + A_2_i, 1 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 2 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 2 + A_2_j],  [6, 0] ],
    [ [2 + A_2_i, 2 + A_2_j],  [4, 6] ],
    [ [3 + A_2_i, 2 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 3 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 3 + A_2_j],  [2, 0] ],
    [ [2 + A_2_i, 3 + A_2_j],  [4, 2] ],
    [ [3 + A_2_i, 3 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 4 + A_2_j],  [2, 6] ],
    [ [2 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [3 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 5 + A_2_j],  [6, 0] ],
    [ [1 + A_2_i, 5 + A_2_j],  [4, 6] ],
    [ [2 + A_2_i, 5 + A_2_j],  [6, 0] ],
    [ [3 + A_2_i, 5 + A_2_j],  [6, 4] ],

    // GENTE

    // G
    [ [0 + G_1_i, 0 + G_1_j],  [2, 0] ],
    [ [1 + G_1_i, 0 + G_1_j],  [4, 0] ],
    [ [2 + G_1_i, 0 + G_1_j],  [4, 0] ],
    [ [3 + G_1_i, 0 + G_1_j],  [4, 0] ],
    [ [4 + G_1_i, 0 + G_1_j],  [4, 0] ],
    [ [5 + G_1_i, 0 + G_1_j],  [4, 2] ],
    [ [0 + G_1_i, 1 + G_1_j],  [2, 6] ],
    [ [1 + G_1_i, 1 + G_1_j],  [1, 0] ],
    [ [2 + G_1_i, 1 + G_1_j],  [4, 0] ],
    [ [3 + G_1_i, 1 + G_1_j],  [4, 0] ],
    [ [4 + G_1_i, 1 + G_1_j],  [4, 0] ],
    [ [5 + G_1_i, 1 + G_1_j],  [4, 6] ],
    [ [0 + G_1_i, 2 + G_1_j],  [2, 6] ],
    [ [1 + G_1_i, 2 + G_1_j],  [2, 6] ],
    [ [3 + G_1_i, 2 + G_1_j],  [2, 0] ],
    [ [4 + G_1_i, 2 + G_1_j],  [4, 0] ],
    [ [5 + G_1_i, 2 + G_1_j],  [4, 2] ],
    [ [0 + G_1_i, 3 + G_1_j],  [2, 6] ],
    [ [1 + G_1_i, 3 + G_1_j],  [2, 6] ],
    [ [3 + G_1_i, 3 + G_1_j],  [6, 0] ],
    [ [4 + G_1_i, 3 + G_1_j],  [4, 2] ],
    [ [5 + G_1_i, 3 + G_1_j],  [6, 2] ],
    [ [0 + G_1_i, 4 + G_1_j],  [2, 6] ],
    [ [1 + G_1_i, 4 + G_1_j],  [0, 6] ],
    [ [2 + G_1_i, 4 + G_1_j],  [4, 0] ],
    [ [3 + G_1_i, 4 + G_1_j],  [4, 0] ],
    [ [4 + G_1_i, 4 + G_1_j],  [4, 6] ],
    [ [5 + G_1_i, 4 + G_1_j],  [6, 2] ],
    [ [0 + G_1_i, 5 + G_1_j],  [0, 6] ],
    [ [1 + G_1_i, 5 + G_1_j],  [0, 4] ],
    [ [2 + G_1_i, 5 + G_1_j],  [4, 0] ],
    [ [3 + G_1_i, 5 + G_1_j],  [4, 0] ],
    [ [4 + G_1_i, 5 + G_1_j],  [4, 0] ],
    [ [5 + G_1_i, 5 + G_1_j],  [6, 4] ],

    // E
    [ [0 + E_1_i, 0 + E_1_j],  [2, 0] ],
    [ [1 + E_1_i, 0 + E_1_j],  [4, 0] ],
    [ [2 + E_1_i, 0 + E_1_j],  [4, 0] ],
    [ [3 + E_1_i, 0 + E_1_j],  [2, 4] ],
    [ [0 + E_1_i, 1 + E_1_j],  [2, 6] ],
    [ [1 + E_1_i, 1 + E_1_j],  [2, 0] ],
    [ [2 + E_1_i, 1 + E_1_j],  [4, 0] ],
    [ [3 + E_1_i, 1 + E_1_j],  [6, 4] ],
    [ [0 + E_1_i, 2 + E_1_j],  [2, 6] ],
    [ [1 + E_1_i, 2 + E_1_j],  [6, 0] ],
    [ [2 + E_1_i, 2 + E_1_j],  [4, 2] ],
    [ [0 + E_1_i, 3 + E_1_j],  [2, 6] ],
    [ [1 + E_1_i, 3 + E_1_j],  [2, 0] ],
    [ [2 + E_1_i, 3 + E_1_j],  [4, 6] ],
    [ [0 + E_1_i, 4 + E_1_j],  [2, 6] ],
    [ [1 + E_1_i, 4 + E_1_j],  [6, 0] ],
    [ [2 + E_1_i, 4 + E_1_j],  [4, 0] ],
    [ [3 + E_1_i, 4 + E_1_j],  [2, 4] ],
    [ [0 + E_1_i, 5 + E_1_j],  [0, 6] ],
    [ [1 + E_1_i, 5 + E_1_j],  [4, 0] ],
    [ [2 + E_1_i, 5 + E_1_j],  [4, 0] ],
    [ [3 + E_1_i, 5 + E_1_j],  [6, 4] ],

    // N
    [ [0 + N_2_i, 0 + N_2_j],  [0, 2] ],
    [ [1 + N_2_i, 0 + N_2_j],  [4, 1] ],
    [ [3 + N_2_i, 0 + N_2_j],  [0, 2] ],
    [ [4 + N_2_i, 0 + N_2_j],  [4, 2] ],
    [ [0 + N_2_i, 1 + N_2_j],  [6, 2] ],
    [ [2 + N_2_i, 1 + N_2_j],  [5, 1] ],
    [ [3 + N_2_i, 1 + N_2_j],  [6, 2] ],
    [ [4 + N_2_i, 1 + N_2_j],  [6, 2] ],
    [ [0 + N_2_i, 2 + N_2_j],  [6, 2] ],
    [ [3 + N_2_i, 2 + N_2_j],  [6, 5] ],
    [ [4 + N_2_i, 2 + N_2_j],  [6, 2] ],
    [ [0 + N_2_i, 3 + N_2_j],  [6, 2] ],
    [ [1 + N_2_i, 3 + N_2_j],  [1, 2] ],
    [ [4 + N_2_i, 3 + N_2_j],  [6, 2] ],
    [ [0 + N_2_i, 4 + N_2_j],  [6, 2] ],
    [ [1 + N_2_i, 4 + N_2_j],  [6, 2] ],
    [ [2 + N_2_i, 4 + N_2_j],  [5, 1] ],
    [ [4 + N_2_i, 4 + N_2_j],  [6, 2] ],
    [ [0 + N_2_i, 5 + N_2_j],  [6, 0] ],
    [ [1 + N_2_i, 5 + N_2_j],  [6, 4] ],
    [ [3 + N_2_i, 5 + N_2_j],  [5, 0] ],
    [ [4 + N_2_i, 5 + N_2_j],  [6, 4] ],

    // T
    [ [0 + T_3_i, 0 + T_3_j],  [2, 0] ],
    [ [1 + T_3_i, 0 + T_3_j],  [4, 0] ],
    [ [2 + T_3_i, 0 + T_3_j],  [4, 0] ],
    [ [3 + T_3_i, 0 + T_3_j],  [4, 0] ],
    [ [4 + T_3_i, 0 + T_3_j],  [4, 0] ],
    [ [5 + T_3_i, 0 + T_3_j],  [4, 2] ],
    [ [0 + T_3_i, 1 + T_3_j],  [6, 0] ],
    [ [1 + T_3_i, 1 + T_3_j],  [4, 0] ],
    [ [2 + T_3_i, 1 + T_3_j],  [4, 2] ],
    [ [2 + T_3_i, 2 + T_3_j],  [6, 2] ],
    [ [2 + T_3_i, 3 + T_3_j], [6, 2] ],
    [ [2 + T_3_i, 4 + T_3_j], [6, 2] ],
    [ [2 + T_3_i, 5 + T_3_j], [6, 0] ],
    [ [3 + T_3_i, 5 + T_3_j], [4, 6] ],
    [ [3 + T_3_i, 4 + T_3_j], [6, 2] ],
    [ [3 + T_3_i, 3 + T_3_j], [6, 2] ],
    [ [3 + T_3_i, 2 + T_3_j], [6, 2] ],
    [ [3 + T_3_i, 1 + T_3_j], [0, 2] ],
    [ [4 + T_3_i, 1 + T_3_j], [0, 4] ],
    [ [5 + T_3_i, 1 + T_3_j], [6, 4] ],

    // E
    [ [0 + E_2_i, 0 + E_2_j],  [2, 0] ],
    [ [1 + E_2_i, 0 + E_2_j],  [4, 0] ],
    [ [2 + E_2_i, 0 + E_2_j],  [4, 0] ],
    [ [3 + E_2_i, 0 + E_2_j],  [2, 4] ],
    [ [0 + E_2_i, 1 + E_2_j],  [2, 6] ],
    [ [1 + E_2_i, 1 + E_2_j],  [2, 0] ],
    [ [2 + E_2_i, 1 + E_2_j],  [4, 0] ],
    [ [3 + E_2_i, 1 + E_2_j],  [6, 4] ],
    [ [0 + E_2_i, 2 + E_2_j],  [2, 6] ],
    [ [1 + E_2_i, 2 + E_2_j],  [6, 0] ],
    [ [2 + E_2_i, 2 + E_2_j],  [4, 2] ],
    [ [0 + E_2_i, 3 + E_2_j],  [2, 6] ],
    [ [1 + E_2_i, 3 + E_2_j],  [2, 0] ],
    [ [2 + E_2_i, 3 + E_2_j],  [4, 6] ],
    [ [0 + E_2_i, 4 + E_2_j],  [2, 6] ],
    [ [1 + E_2_i, 4 + E_2_j],  [6, 0] ],
    [ [2 + E_2_i, 4 + E_2_j],  [4, 0] ],
    [ [3 + E_2_i, 4 + E_2_j],  [2, 4] ],
    [ [0 + E_2_i, 5 + E_2_j],  [0, 6] ],
    [ [1 + E_2_i, 5 + E_2_j],  [4, 0] ],
    [ [2 + E_2_i, 5 + E_2_j],  [4, 0] ],
    [ [3 + E_2_i, 5 + E_2_j],  [6, 4] ]

];

const posicoes_segunda = [

    // [[i,j], [a1, a2]]

    // COM

    // C
    [ [0 + C_1_i, 0 + C_1_j],  [2, 0] ],
    [ [1 + C_1_i, 0 + C_1_j],  [4, 0] ],
    [ [2 + C_1_i, 0 + C_1_j],  [4, 0] ],
    [ [3 + C_1_i, 0 + C_1_j],  [2, 4] ],
    [ [0 + C_1_i, 1 + C_1_j],  [2, 6] ],
    [ [1 + C_1_i, 1 + C_1_j],  [2, 0] ],
    [ [2 + C_1_i, 1 + C_1_j],  [4, 0] ],
    [ [3 + C_1_i, 1 + C_1_j],  [6, 4] ],
    [ [0 + C_1_i, 2 + C_1_j],  [2, 6] ],
    [ [1 + C_1_i, 2 + C_1_j],  [2, 6] ],
    [ [0 + C_1_i, 3 + C_1_j],  [2, 6] ],
    [ [1 + C_1_i, 3 + C_1_j],  [2, 6] ],
    [ [0 + C_1_i, 4 + C_1_j],  [2, 6] ],
    [ [1 + C_1_i, 4 + C_1_j],  [6, 0] ],
    [ [2 + C_1_i, 4 + C_1_j],  [4, 0] ],
    [ [3 + C_1_i, 4 + C_1_j],  [2, 4] ],
    [ [0 + C_1_i, 5 + C_1_j],  [0, 6] ],
    [ [1 + C_1_i, 5 + C_1_j],  [4, 0] ],
    [ [2 + C_1_i, 5 + C_1_j],  [4, 0] ],
    [ [3 + C_1_i, 5 + C_1_j],  [6, 4] ],

    // O
    [ [0 + O_1_i, 0 + O_1_j],  [2, 0] ],
    [ [1 + O_1_i, 0 + O_1_j],  [4, 0] ],
    [ [2 + O_1_i, 0 + O_1_j],  [4, 0] ],
    [ [3 + O_1_i, 0 + O_1_j],  [2, 4] ],
    [ [0 + O_1_i, 1 + O_1_j],  [2, 6] ],
    [ [1 + O_1_i, 1 + O_1_j],  [2, 0] ],
    [ [2 + O_1_i, 1 + O_1_j],  [4, 2] ],
    [ [3 + O_1_i, 1 + O_1_j],  [6, 2] ],
    [ [0 + O_1_i, 2 + O_1_j],  [2, 6] ],
    [ [1 + O_1_i, 2 + O_1_j],  [2, 6] ],
    [ [2 + O_1_i, 2 + O_1_j],  [6, 2] ],
    [ [3 + O_1_i, 2 + O_1_j],  [6, 2] ],
    [ [0 + O_1_i, 3 + O_1_j],  [2, 6] ],
    [ [1 + O_1_i, 3 + O_1_j],  [2, 6] ],
    [ [2 + O_1_i, 3 + O_1_j],  [6, 2] ],
    [ [3 + O_1_i, 3 + O_1_j],  [6, 2] ],
    [ [0 + O_1_i, 4 + O_1_j],  [2, 6] ],
    [ [1 + O_1_i, 4 + O_1_j],  [0, 6] ],
    [ [2 + O_1_i, 4 + O_1_j],  [6, 4] ],
    [ [3 + O_1_i, 4 + O_1_j],  [6, 2] ],
    [ [0 + O_1_i, 5 + O_1_j],  [0, 6] ],
    [ [1 + O_1_i, 5 + O_1_j],  [4, 0] ],
    [ [2 + O_1_i, 5 + O_1_j],  [4, 0] ],
    [ [3 + O_1_i, 5 + O_1_j],  [6, 4] ],




    // TANTA

    // T
    [ [0 + T_1_i, 0 + T_1_j],  [2, 0] ],
    [ [1 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [2 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [3 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [4 + T_1_i, 0 + T_1_j],  [4, 0] ],
    [ [5 + T_1_i, 0 + T_1_j],  [4, 2] ],
    [ [0 + T_1_i, 1 + T_1_j],  [6, 0] ],
    [ [1 + T_1_i, 1 + T_1_j],  [4, 0] ],
    [ [2 + T_1_i, 1 + T_1_j],  [4, 2] ],
    [ [2 + T_1_i, 2 + T_1_j],  [6, 2] ],
    [ [2 + T_1_i, 3 + T_1_j], [6, 2] ],
    [ [2 + T_1_i, 4 + T_1_j], [6, 2] ],
    [ [2 + T_1_i, 5 + T_1_j], [6, 0] ],
    [ [3 + T_1_i, 5 + T_1_j], [4, 6] ],
    [ [3 + T_1_i, 4 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 3 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 2 + T_1_j], [6, 2] ],
    [ [3 + T_1_i, 1 + T_1_j], [0, 2] ],
    [ [4 + T_1_i, 1 + T_1_j], [0, 4] ],
    [ [5 + T_1_i, 1 + T_1_j], [6, 4] ],

    // A
    [ [0 + A_1_i, 0 + A_1_j],  [6, 0] ],
    [ [1 + A_1_i, 0 + A_1_j],  [4, 0] ],
    [ [2 + A_1_i, 0 + A_1_j],  [4, 0] ],
    [ [3 + A_1_i, 0 + A_1_j],  [4, 2] ],
    [ [0 + A_1_i, 1 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 1 + A_1_j],  [2, 0] ],
    [ [2 + A_1_i, 1 + A_1_j],  [4, 2] ],
    [ [3 + A_1_i, 1 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 2 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 2 + A_1_j],  [6, 0] ],
    [ [2 + A_1_i, 2 + A_1_j],  [4, 6] ],
    [ [3 + A_1_i, 2 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 3 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 3 + A_1_j],  [2, 0] ],
    [ [2 + A_1_i, 3 + A_1_j],  [4, 2] ],
    [ [3 + A_1_i, 3 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [1 + A_1_i, 4 + A_1_j],  [2, 6] ],
    [ [2 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [3 + A_1_i, 4 + A_1_j],  [6, 2] ],
    [ [0 + A_1_i, 5 + A_1_j],  [6, 0] ],
    [ [1 + A_1_i, 5 + A_1_j],  [4, 6] ],
    [ [2 + A_1_i, 5 + A_1_j],  [6, 0] ],
    [ [3 + A_1_i, 5 + A_1_j],  [6, 4] ],

    // N
    [ [0 + N_1_i, 0 + N_1_j],  [0, 2] ],
    [ [1 + N_1_i, 0 + N_1_j],  [4, 1] ],
    [ [3 + N_1_i, 0 + N_1_j],  [0, 2] ],
    [ [4 + N_1_i, 0 + N_1_j],  [4, 2] ],
    [ [0 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [2 + N_1_i, 1 + N_1_j],  [5, 1] ],
    [ [3 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [4 + N_1_i, 1 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 2 + N_1_j],  [6, 2] ],
    [ [3 + N_1_i, 2 + N_1_j],  [6, 5] ],
    [ [4 + N_1_i, 2 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 3 + N_1_j],  [6, 2] ],
    [ [1 + N_1_i, 3 + N_1_j],  [1, 2] ],
    [ [4 + N_1_i, 3 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [1 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [2 + N_1_i, 4 + N_1_j],  [5, 1] ],
    [ [4 + N_1_i, 4 + N_1_j],  [6, 2] ],
    [ [0 + N_1_i, 5 + N_1_j],  [6, 0] ],
    [ [1 + N_1_i, 5 + N_1_j],  [6, 4] ],
    [ [3 + N_1_i, 5 + N_1_j],  [5, 0] ],
    [ [4 + N_1_i, 5 + N_1_j],  [6, 4] ],

    // T
    [ [0 + T_2_i, 0 + T_2_j],  [2, 0] ],
    [ [1 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [2 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [3 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [4 + T_2_i, 0 + T_2_j],  [4, 0] ],
    [ [5 + T_2_i, 0 + T_2_j],  [4, 2] ],
    [ [0 + T_2_i, 1 + T_2_j],  [6, 0] ],
    [ [1 + T_2_i, 1 + T_2_j],  [4, 0] ],
    [ [2 + T_2_i, 1 + T_2_j],  [4, 2] ],
    [ [2 + T_2_i, 2 + T_2_j],  [6, 2] ],
    [ [2 + T_2_i, 3 + T_2_j], [6, 2] ],
    [ [2 + T_2_i, 4 + T_2_j], [6, 2] ],
    [ [2 + T_2_i, 5 + T_2_j], [6, 0] ],
    [ [3 + T_2_i, 5 + T_2_j], [4, 6] ],
    [ [3 + T_2_i, 4 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 3 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 2 + T_2_j], [6, 2] ],
    [ [3 + T_2_i, 1 + T_2_j], [0, 2] ],
    [ [4 + T_2_i, 1 + T_2_j], [0, 4] ],
    [ [5 + T_2_i, 1 + T_2_j], [6, 4] ],

    // A
    [ [0 + A_2_i, 0 + A_2_j],  [6, 0] ],
    [ [1 + A_2_i, 0 + A_2_j],  [4, 0] ],
    [ [2 + A_2_i, 0 + A_2_j],  [4, 0] ],
    [ [3 + A_2_i, 0 + A_2_j],  [4, 2] ],
    [ [0 + A_2_i, 1 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 1 + A_2_j],  [2, 0] ],
    [ [2 + A_2_i, 1 + A_2_j],  [4, 2] ],
    [ [3 + A_2_i, 1 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 2 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 2 + A_2_j],  [6, 0] ],
    [ [2 + A_2_i, 2 + A_2_j],  [4, 6] ],
    [ [3 + A_2_i, 2 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 3 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 3 + A_2_j],  [2, 0] ],
    [ [2 + A_2_i, 3 + A_2_j],  [4, 2] ],
    [ [3 + A_2_i, 3 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [1 + A_2_i, 4 + A_2_j],  [2, 6] ],
    [ [2 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [3 + A_2_i, 4 + A_2_j],  [6, 2] ],
    [ [0 + A_2_i, 5 + A_2_j],  [6, 0] ],
    [ [1 + A_2_i, 5 + A_2_j],  [4, 6] ],
    [ [2 + A_2_i, 5 + A_2_j],  [6, 0] ],
    [ [3 + A_2_i, 5 + A_2_j],  [6, 4] ],



]

posicoes_primeira.forEach(elemento => {

    const [pos, ang] = elemento;

    const [i,j] = pos;

    const n = j * nrow + i;

    console.log(n);

    nodes[n].angulos.primeira = ang;

})

posicoes_segunda.forEach(elemento => {

    const [pos, ang] = elemento;

    const [i,j] = pos;

    const n = j * nrow + i;

    console.log(n);

    nodes[n].angulos.segunda = ang;

});

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

gsap.timeline()
    .to(nodes, {

        delay : 1,
        duration: 2,
        a1: (i, target) => pega_valor_futuro(target, 'primeira')[0],
        a2: (i, target) => pega_valor_futuro(target, 'primeira')[1],
        onUpdate: render,
        yoyo: true,
        repeat: 0,

        ease: 'linear'

    })
    .to(nodes, {

        delay : 1,
        duration: 2,
        a1: (i, target) => pega_valor_futuro(target, 'segunda')[0],
        a2: (i, target) => pega_valor_futuro(target, 'segunda')[1],
        onUpdate: render,
        yoyo: true,
        repeat: 0,

        ease: 'linear'

    })

