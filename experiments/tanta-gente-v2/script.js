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

for (let j = 0; j < ncol; j++) {

    for (let i = 0; i < nrow; i++) {

        const point = {

            x : i * gap + x0,
            y : j * gap + y0,
            angulo_segmento1: 0,
            angulo_segmento2: 4

        }

        nodes.push(point);

    }

}

const posicoes = {
    iniciais : [
        [0,0],
    ]
}

ctx.strokeStyle = 'yellow';
ctx.fillStyle = 'yellow';

const teta = Math.PI / 4;

function render() {

    // clear
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, w, h);

    nodes.forEach((point) => {

        const { x, y, angulo_segmento1, angulo_segmento2 } = point

        ctx.strokeStyle = 'yellow';
        ctx.fillStyle = 'yellow';
    
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(teta * angulo_segmento1);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(gap,0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(teta * angulo_segmento2);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(gap,0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    
    })

}

gsap.to(nodes, {

    delay : 1,
    duration: 2,
    angulo_segmento1: 8,
    angulo_segmento2: -8,
    onUpdate: render,
    yoyo: true,
    repeat: 2

})



