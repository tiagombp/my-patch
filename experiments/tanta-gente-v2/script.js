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
ctx.lineWidth = 20;

const x0 = w * 0.1;
const y0 = h * 0.1 + margin/2;

ctx.rect(x0, y0, (nrow-1) * gap, (ncol-1)*gap);
ctx.stroke();

const nodes = [];

for (let i = 0; i < nrow; i++) {

    for (let j = 0; j < ncol; j++) {

        const point = {

            x : i * gap + x0,
            y : j * gap + y0,
            p1 : 0,
            p2 : 0

        }

        nodes.push(point);

    }

}

nodes.forEach(point => {

    const { x, y } = point

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.closePath();
    ctx.stroke();


})