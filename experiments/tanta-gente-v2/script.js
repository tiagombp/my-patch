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
ctx.fillStyle = 'dimgrey';
ctx.lineWidth = 20;

ctx.rect(w * 0.1, h * 0.1 + margin/2, (nrow-1) * gap, (ncol-1)*gap);
ctx.stroke();