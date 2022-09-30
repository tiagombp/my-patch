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
        r : 0,
        next_x : X,
        next_y : Y,
        color: colors[color_index]//,
        //text : ''

    }

    points.push(point);

    theta += delta_theta;
}

// next points

const states = [

    {
        f : (x) => x * 2,
        label : 'n -> 2n',
        color : 'rgb(0, 255, 255)'
    },

    {
        f : (x) => x * 3,
        label : 'n -> 3n',
        color : 'rgb(0, 255, 127)'
    },

    {
        f : (x) => x * 4,
        label : 'n -> 4n',
        color : 'rgb(0, 255, 0)'
    },

    {
        f : (x) => x * 5,
        label : 'n -> 5n',
        color : 'rgb(127, 255, 0)'
    },

    {
        f : (x) => x * 6,
        label : 'n -> 6n',
        color : 'rgb(255, 255, 0)'
    },

    {
        f : (x) => x * 7,
        label : 'n -> 7n',
        color : 'rgb(255, 127, 0)'
    },

    {
        f : (x) => x * 8,
        label : 'n -> 8n',
        color : 'rgb(255, 0, 0)'
    },

    {
        f : (x) => x * 9,
        label : 'n -> 9n',
        color : 'rgb(255, 0, 127)'
    },

    {
        f : (x) => x * 10,
        label : 'n -> 10n',
        color : 'rgb(255, 0, 255)'
    },

    {
        f : (x) => x * 11,
        label : 'n -> 11n',
        color : 'rgb(255, 127, 255)'
    },

    {
        f : (x) => x * 12,
        label : 'n -> 12n',
        color : 'rgb(255, 255, 255)'
    },

    {
        f : (x) => x * 12 + n/12,
        label : 'n -> 12n + n / 12',
        color : 'rgb(255, 255, 255)'
    },

    {
        f : (x) => x * 12 + n / 2,
        label : 'n -> 12n + n / 2',
        color : 'rgb(255, 255, 255)'
    }

]

const ctx = canvas.getContext('2d');

// init timeline

const tl = new gsap.timeline({
    repeat : 1,
    yoyo: true
});

// prep

let states_1 = [...states];
states_1 = states_1.splice(1);

states.forEach(state => {

    points.forEach( (p,i) => {

        let next_i = state.f(i) % n ;

        const nextp = points[next_i];

        p[state.label] = {
            x : nextp.x,
            y : nextp.y,
            color : state.color//,
            //text: state.label
        }

    })

})

const tweens = states_1.map(state => () => gsap.to(
        
        points, 
        
        {
            duration: 2,

            next_x : (i, target) => target[state.label].x,
            next_y : (i, target) => target[state.label].y,
            color: (i, target) => target[state.label].color,

            onUpdate: render_anim,

            ease: "power1.inOut"
        
        }
    
    )
)

const texts = states_1.map(state => () => gsap.set(
        
    points, 
    
    {
        text : (i, target) => target[state.label].text
    
    })
)

tl.add( () => gsap.to(

    points,

    {

        //delay: (i) => i * 0.05,
        //duration: .01,
        r : 3,
        stagger: 0.01,
        onUpdate: render_points,

    }

));

tl.add( () => gsap.to(

    points,

    {

        next_x : (i, target) => target['n -> 2n'].x,
        next_y : (i, target) => target['n -> 2n'].y,
        color: (i, target) => target['n -> 2n'].color,
        ease: "power1.inOut",
        stagger: 0.03,
        onUpdate: render_lines

    }

), ">" + (0.01 * n) );

tweens.forEach( (tween,i) => { 
    tl.add(tween(), i == 0 ? (">" + (n * 0.03) + 1) : ">.5");
    //tl.add(texts[i], ">");
});

// drawing

ctx.lineWidth = 2;

function render_points() {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, w);

    points.forEach( (p,i) => {

        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    
    })

}

function render_lines() {

    //ctx.fillStyle = 'white';
    //ctx.font = `40px "Courier New"`;
    //ctx.fillText('n -> 2n', 20, 40);


    points.forEach( (p,i) => {

        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.next_x, p.next_y);
        ctx.closePath();
        
        ctx.stroke();
    
    })
    
}

function render_anim() {

    ctx.fillStyle = 'black'; //'white';//'#F2CECE';
    ctx.fillRect(0, 0, w, w);



    points.forEach( (p,i) => {

        ctx.strokeStyle = p.color;
        ctx.fillStyle = p.color;

        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.next_x, p.next_y);
        ctx.closePath();
        
        ctx.stroke();

        //ctx.fillStyle = 'white';
        //ctx.font = `40px "Courier New"`;
        //ctx.fillText(p.text, 20, 40);
    
    })
    
}

//render_anim();
tl.pause();
//tl.play();