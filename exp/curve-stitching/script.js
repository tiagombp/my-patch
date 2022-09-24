const n = 360;

const delta_theta = Math.PI * 2/n;

const points = [];

const canvas = document.querySelector('canvas');
let w = 2 * window.getComputedStyle(canvas).width.slice(0,-2);
canvas.width = w;
canvas.height = w;
console.log(w);

let colors = ['ghostwhite']//['#95cfb7', '#fff7bd', '#f04155', '#ff823a'];
//[ '#0D05F2', '#1B6DFD', '#030A8C', '#9DF0FF', '#161A59' ];
//['#F22248','#F25270', '#9E9BF2', '#F2A2A2'];

const r = 0.9 * w / 2

const x0 = w / 2;
const y0 = w / 2;

// nodes

let theta = 0;

for (let i = 0; i < n; i++) {

    const X = x0 + r * Math.sin(theta);
    const Y = y0 - r * Math.cos(theta);

    const color_index = 0;//i % 4;

    const point = {

        x : X,
        y : Y,
        next_x : X,
        next_y : Y,
        color: colors[color_index]

    }

    points.push(point);

    theta += delta_theta;
}

// next points

for (m = 2; m <= 12; m++) {

    points.forEach( (p, i) => {

        let next_i = (i * m) % n ;
        //if (next_i == 0) next_i = 1;
        const nextp = points[next_i];

        p['m' + m] = {
            x : nextp.x,
            y : nextp.y
        }

    })

}

// drawing

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
//ctx.strokeStyle = 'cyan';
//ctx.globalAlpha = .5;

// function render(m) {

//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, w, w);

//     ctx.fillStyle = 'cyan';

//     /*
//     points.forEach(p => {

//         ctx.beginPath()
//         ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
//         ctx.closePath();
//         ctx.fill();
//         ctx.stroke();
    
//     })*/

//     points.forEach( (p,i) => {

//         const nextp = p['m' + m];
        
//         ctx.beginPath();
//         ctx.moveTo(p.x, p.y);
//         ctx.lineTo(nextp.x, nextp.y);
//         ctx.closePath();
//         ctx.stroke();
    
//     })
    
// }

function render_anim() {

    ctx.fillStyle = 'black'; //'white';//'#F2CECE';
    ctx.fillRect(0, 0, w, w);

    //ctx.fillStyle = 'cyan';

    /*
    points.forEach(p => {

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    
    })*/

    points.forEach( (p,i) => {
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.next_x, p.next_y);
        ctx.closePath();
        ctx.strokeStyle = p.color;
        ctx.stroke();
    
    })
    

}

render_anim();

gsap.timeline( {
    delay: 3,
    repeat: 2,
    yoyo: true
})
    .to(points, {

        next_x : (i, target) => target.m2.x,
        next_y : (i, target) => target.m2.y,

        onUpdate: render_anim,

        //delay: (i) => i * 0.02,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m3.x,
        next_y : (i, target) => target.m3.y,
        //color: 'cyan',

        onUpdate: render_anim,

        //delay: (i) => i * 0.02,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m4.x,
        next_y : (i, target) => target.m4.y,
        //color: 'yellow',

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m5.x,
        next_y : (i, target) => target.m5.y,
        //color: 'green',

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m6.x,
        next_y : (i, target) => target.m6.y,
        //color: 'lightcoral',

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m7.x,
        next_y : (i, target) => target.m7.y,
        //color: 'crimson',

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m8.x,
        next_y : (i, target) => target.m8.y,
        //color: 'orange',

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m9.x,
        next_y : (i, target) => target.m9.y,

        onUpdate: render_anim,

        duration: 2
    })
    .to(points, {

        next_x : (i, target) => target.m10.x,
        next_y : (i, target) => target.m10.y,

        onUpdate: render_anim,

        duration: 2
    })

