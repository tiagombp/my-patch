const js = {

    params : {

        nof_letters : 10,
        l : null, // side of square -- comes from CSS
        ch : 8, // squares in each dimension of a letter
        sq : 40, // squares in each dimension of a drawing

        colors : {
            
            'treemap': [ '#0D05F2', '#1B6DFD', '#030A8C', '#9DF0FF', '#161A59' ],
            'dataviz' : ["#BF2C62", "#F6E2DF", "#F2A007", "#D95407", "#1E5693", "#161A59"],
            'webdev' : ['#FCE4D6', 'blue']

        },

        symbols : ["@", "!", ":", "_"],
        symbols_refs : ["heart", "exclamation", "smile", "ellipsis"]

    },

    utils : {

        nof_pixels : function(word) {

            //console.log(word.length);

            let sum = 0;
            
            for (letter of word) {
                if (letter == " ") continue
                sum += js.data.letters[letter].length;
            }
            
            return sum 

        },

        shuffle : function(array) {

            // #### Not my original code ####
            // taken from : https://bost.ocks.org/mike/shuffle/
            // just changed a 'var' for a 'let'

            let m = array.length, t, i;
          
            // While there remain elements to shuffle…
            while (m) {
          
              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);
          
              // And swap it with the current element.
              t = array[m];
              array[m] = array[i];
              array[i] = t;
            }
          
            return array;

        }

    },

    interactions : {

        theme : {

            ref : '.theme-selector select',

            container_ref : '.container',

            monitor_change : () => {

                const sel = document.querySelector(js.interactions.theme.ref);

                sel.addEventListener('change', js.interactions.theme.update);

            },

            update : (e) => {

                //console.log(e.target.value);

                const ref = js.interactions.theme.container_ref;
                const option = e.target.value;

                document.querySelector(ref).dataset.theme = option;
                document.querySelector('article').dataset.theme = option;

            }

        },

        temp_controls : {

            ref : '.temp-controls',

            monitor : () => {

                const cont = document.querySelector(js.interactions.temp_controls.ref);

                cont.addEventListener('click', js.interactions.temp_controls.on_click);

            },

            on_click : function(e) {

                if (e.target.tagName == 'BUTTON') {

                    const step = e.target.id;

                    if (step == 'dissolves') js.anims.dissolve();

                    else js.steps.compute_position(step);

                }

            }

        },

        controls : {

            ref : '.buttons-initial-controls',

            monitor : () => {

                const cont = document.querySelector(js.interactions.controls.ref);

                cont.addEventListener('click', js.interactions.controls.on_click);

            },

            on_click : function(e) {

                const cont = document.querySelector(js.interactions.controls.ref);

                if (e.target.tagName == 'BUTTON') {

                    const action = e.target.id;

                    console.log(action);

                    if (action == 'main-nav-start') anims.timeline.play();

                    else {

                        js.anims.dissolve();
                        js.anims.drop_and_show();

                    }

                    cont.classList.add('hidden');

                }

            }



        }

    },

    steps : {

        prepare_treemap_positions : function() {

            //console.log('Prepare');

            const data = {
                
                children : js.canvas.points.params.map(d => d.value)

            };

            //console.log(data);

            const w = js.canvas.sizings.w;
            const h = js.canvas.sizings.h;

            const calculated_data = d3.treemap()
              .tile(d3.treemapBinary)
              .size([w, h])
              .round(true)
              (d3.hierarchy(data).sum(d => d))
            ;

            // bring the data to the points 'treemap' state

            calculated_data.children.forEach( (leaf, i) => {

                const point = js.canvas.points.params[i];

                const x = leaf.x0;
                const y = leaf.y0;
                const w = leaf.x1 - leaf.x0;
                const h = leaf.y1 - leaf.y0;
                const line = 10; // setting the line width here

                const m = 1;
                const color_index = ( i % 5 );
                const color = js.params.colors.treemap[color_index];
                const opacity = 1;

                point.future_states_params['treemap'] = { x, y, w, h, m, color, line, opacity };

            })

        },

        // after the treemap
        prepare_default_positions : () => {

            const points = js.canvas.points.params;

            points.forEach( point => {

                const treemap_params = point.future_states_params.treemap;

                const offset_vector_index = point.p;
                const offset_vector = js.canvas.points.offset_vectors[offset_vector_index];
                const [ xo, yo ] = offset_vector;

                const l = js.params.l;

                let x = treemap_params.x + xo * ( treemap_params.w - l);
                if (x < 0) x = treemap_params.x;

                let y = treemap_params.y + yo * ( treemap_params.h - l);
                if (y < 0) y = treemap_params.y;

                const color = treemap_params.color;

                const m = treemap_params.m;

                const w = h = l;

                const line = 0;

                const opacity = 0.2

                point.future_states_params['default'] = { x, y, w, h, m, color, line, opacity };

            })

            js.canvas.points.shuffled = js.utils.shuffle([...points]);
            

        },

        prepare_step_positions: function(step) {

            const opacity = 1; // todos vao ter opacity 1

            const data = js.canvas.points.shuffled;

            const ch = js.params.ch; 
            const sq = js.params.sq; // nof squares in each letter side -- 8
            const l  = js.params.l;

            const last_index = ch * ch;
    

            const st = js.steps[step];

            p1 = st.phrase1;
            p2 = st.phrase2;
            dr = st.drawing;

            // overall width and height

            let height = 0;

            height += p1 ? ch * l : 0;
            height += p2 ? ch * l + l : 0;
            height += dr ? sq * l + l : 0;


            //let width = 0;

            //width += p1 ? p1.length * ch * l : 0;
            //width = p2 ? Math.max(p1.length, p2.length) * ch * l : width;
            //width = dr ? Math.max(sq * l, width) : width;

            let w_screen = js.canvas.sizings.w;
            let h_screen = js.canvas.sizings.h;

            // initial positions in pixels

            const y0 = (h_screen - height) / 2;

            // initialize positions

            let positions = {
                
                'p1' : null,
                'p2' : null

            };

            let phrases = {

                'p1' : p1,
                'p2' : p2
            }

            let general_index = 0;

            // a function to evaluate the positions for a given reference

            function evaluate_positions_and_move(ref) {

                let phrase_positions = [];

                const p = phrases[ref];

                const width = p.length * ch * l;
                const x0 = (w_screen - width)  / 2;

                // initialize counter

                //console.log(p);

                let n = 0;

                let y_desloc = ref == "p2" ? (l * (ch + 1) ) : 0;

                // for each letter of the phrase

                for (letter of p) {

                    //console.log(letter);
    
                    if (letter != ' ') {
    
                        if (js.params.symbols.includes(letter)) {

                            const symbol_index = js.params.symbols.indexOf(letter);
                            
                            letter = js.params.symbols_refs[symbol_index];

                        } else {

                            letter = letter.toLowerCase();

                        }
    
                        let this_letter_positions = js.data.letters[letter];

                        for (pos of this_letter_positions) {

                            let current_square = data[general_index];//js.canvas.points.params[general_index];
                            //d3.select('[data-id="' + general_index + '"]');

                            let x = ( ( (pos % ch)) * l ) + (n * l * ch) + x0;
                            let y = ( Math.floor( pos / ch ) * l ) + y_desloc + y0;
                            const color = "#F6E2DF";
                            const m = 0;
                            const w = h = l;

                            current_square.future_states_params[step] = { x, y, w, h, m, color, opacity};

                            general_index++;
                        }

                    }
    
                    n++;
    
                }

                positions[ref] = phrase_positions;

            }

            // now evalutate the positions for the phrases

            if (p1) evaluate_positions_and_move('p1');
            if (p2) evaluate_positions_and_move('p2');

            // drawing

            if (dr) {

                const picture_data = js.data.grids.drawings[dr];

                for (unit of picture_data) {

                    let current_square = data[general_index];//js.canvas.points.params[general_index];

                    const pos = unit.pos;
                    const color = js.params.colors[step][unit.cor[0]-1];
                    const m = 0;
                    const w = h = l;

                    const x0 = (w_screen - sq * l)  / 2;

                    y_desloc = ( l * (ch + 1) ) * ( p2 ? 2 : 1);

                    let x = ( ( (pos % sq)) * l ) + x0;
                    let y = ( Math.floor( pos / sq ) * l ) + y_desloc + y0;

                    current_square.future_states_params[step] = { x, y, w, h, m, color, opacity};

                    general_index++;
                }

            }

            // hide the rest, return to position

            for (let i = general_index; i < js.canvas.points.n; i++) {

                let current_square = data[i];//js.canvas.points.params[i];

                // reference params

                let reference_params = current_square.future_states_params['default'];

                const { x, y, w, h, m, color, opacity} = reference_params;

                current_square.future_states_params[step] = { x, y, w, h, m, color, opacity};

            }

        }, // @ for heart, _ for ...



        'hi' : {

            phrase1 : 'hi! :',
            phrase2 : null,
            drawing : null,

            computed : {

                phrase1_positions: null,
                phrase2_positions: null,
                drawing_positions: null

            }

        },

        'i-am' : {

            phrase1 : 'I am',
            phrase2 : 'tiago',
            drawing : null,

            computed : {

                phrase1_positions: null,
                phrase2_positions: null,
                drawing_positions: null

            }

        },

        'i-love' : { 

            phrase1 : 'I @',
            phrase2 : null,
            drawing : null,

            computed : {

                phrase1_positions: null,
                phrase2_positions: null,
                drawing_positions: null

            }

        },

        'dataviz' : {

            phrase1 : 'dataviz',
            phrase2 : null,
            drawing : 'bar_chart',


        },

        'webdev' : {

            phrase1 : 'webdev',
            phrase2 : null,
            drawing : 'webdev',


        },

        /*
        'family' : {

            phrase1 : 'my',
            phrase2 : 'family',
            drawing : 'family',


        },*/

        'cookie' : {

            phrase1 : 'and',
            phrase2 : 'cookies',
            drawing : 'cookie',

        }

    },

    anims : {
        //let els = d3.selectAll('[data-color]').transition().duration(1000).delay((d,i)=>50+i*25).style('transform', 'translate(800px,0px) scale(0)')

        // duracao boa
        // let els = d3.selectAll('[data-color]').transition().duration(1000).delay((d,i)=>50+i*5).style('transform', 'translate(800px,0px) scale(0)')

        dissolve : function() {

            let els = d3.selectAll('[data-id]')
              .classed('pixel', true)
              //.style('transform', null) // css will take care now
              .style('width', null)
              .style('height', null);
              //.transition().duration(1000).delay((d,i)=>50+i*25).style('transform', 'translate(800px,0px) scale(0)')
    
    
        },

        prepare : function() {

            let els = d3.selectAll('[data-id]')
              .classed('pixel-start', false)
              .classed('pixel', true);


        },

        drop : function() {

            let els = d3.selectAll('[data-id]')
            
            els
              .classed('active', false)
              .transition()
              .delay(100)
              .style('transform', function(d) {

                const sel = d3.select(this);

                //let current_transform = sel.style('transform'); // "translate(1241px, 472px)"
                let current_transform = sel.attr('data-original-transform');
                current_transform = current_transform.split(','); // ["translate(1241px", " 472px)"]

                const x = +current_transform[0].split('(')[1].slice(0,-2); 
                const y = +current_transform[1].split(')')[0].slice(0,-2).trim();

                const w = js.sizings.w;
                const h = js.sizings.h;

                const q_x = Math.floor(x / (w/3));
                const q_y = Math.floor(y / (h/2));

                let new_x, new_y;

                if (q_x == 0) new_x = -0.1 * w;
                else {
                    if (q_x == 1) new_x = x;
                    else new_x = 1.1*w;
                }

                if (q_y == 0) new_y = -0.1 * h;
                else new_y = 1.1*h;

                //console.log(x,y, q_x, q_y, new_x, new_y);
                //const original_transform = sel.attr('data-original-transform');
                
                return 'translate(' + new_x + 'px' + ',' + new_y + 'px)';

              })

        },

        show_text : () => {

            document.querySelector('article').classList.remove('shrunk');

        },

        show_header : () => {

            document.querySelector('header.header-home').classList.remove('hidden');

        },

        drop_and_show : function() {

            js.anims.drop();
            js.anims.show_text();
            js.anims.show_header();

        },

        timeline : {

            play : () => {

                let interval = 1000;

                setTimeout(js.anims.dissolve, 0);

                let steps = Object.keys(js.steps);
                steps = steps.slice(1);

                //steps.forEach( (step, i) => {

                //    console.log(step, i, i * interval);

                //    setTimeout(js.steps.compute_position(step), i * interval);

                //})

                setTimeout(() => {
                    js.steps.compute_position(steps[0]);

                    setTimeout(() => {
                        js.steps.compute_position(steps[1]);

                        setTimeout(() => {
                            js.steps.compute_position(steps[2]);

                            setTimeout(() => {
                                js.steps.compute_position(steps[3]);

                                setTimeout(() => {
                                    js.steps.compute_position(steps[4]);

                                    setTimeout(() => {
                                        js.steps.compute_position(steps[5]);
                                        
                                        setTimeout(js.anims.drop_and_show, 7 * interval - 800)
            
                                    }, 6 * interval - 600)
        
                                }, 5 * interval)
    
                            }, 4 * interval)

                        }, 3 * interval)

                    }, 2 * interval)

                }, 1 * interval);

            }

        }

    },

    canvas : {

        sel : 'canvas',

        context : null,

        set_context : () => {

            const canvas  = document.querySelector(js.canvas.sel);
            js.canvas.context = canvas.getContext('2d');

        },

        sizings : {

            // w and h will be set by .set()
            h : null,
            w : null,
            base_dim : 2000,
    
            set : function() {
    
                this.h = window.innerHeight;
                this.w = window.innerWidth;
    
                /*const larger_dimension = Math.max(this.w, this.h);
    
                if (this.w > this.h) {

                    console.log(this.h * this.base_dim / this.w);
    
                    this.w = this.base_dim;
                    this.h = this.h * this.base_dim / this.w
    
                } else {
    
                    js.canvas.sizings.h = this.base_dim;
                    js.canvas.sizings.w = this.w * this.base_dim / this.h
    
                } */
    
                const canvas  = document.querySelector(js.canvas.sel);
                canvas.width  = js.canvas.sizings.w;
                canvas.height = js.canvas.sizings.h;

                console.log(js.canvas.sizings.w, js.canvas.sizings.h);
    
            },
    
            get : {
    
                square_size : () => {
    
                    js.params.l = +window.getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0,-2)
    
                }
    
            }
    
    
        },

        points : {

            n : 800,

            offset_vectors : [
                [  0, 0], [  0, 0.5], [  0, 1 ],
                [0.5, 0], [0.5, 0.5], [0.5, 1 ],
                [1  , 0], [1  , 0.5], [1  , 1 ]
            ],
            
            // coração do negócio, onde vão ficar todos os parâmetros necessários para desenhar na tela
            params : [],

            shuffled : null, // aqui faço uma cópia de params depois de inicializar os valores do treemap e do default, e de dar um shuffle.

            initialize_grid : () => {

                const n = js.canvas.points.n;

                for (let i = 0; i < n; i++) {

                    js.canvas.points.params.push( 

                        {

                            // these are the current parameters, which will be updated by gsap

                            i : i,
                            value : Math.round(Math.random() * 100),
                            x : null,
                            y : null,
                            w : null,
                            h : null,
                            m : null, // vai determinar se é círculo ou quadrado. 0 circle, 1, square
                            color : null,
                            line : null, // só para o treemap
                            opacity : 1,

                            p : Math.floor(Math.random() * 9), // vou usar esse valor para o delay e para o offset (na transiçào treemap > rects). Não preciso do render, só para preparar.

                            // we will later calculate the future parameters for each state (positions, sizes etc.) and store them here. Then, in the gsap call, we will retrieve and passa these future params to the gsap function
                            future_states_params : {}

                        }

                    );
    
                }

            },

            get_future_value : (i, target, future_state, param ) => target.future_states_params[future_state][param]

        },

        set_current_state : (state) => {

            const marks = js.canvas.points.params;

            marks.forEach( mark => {

                const { x, y, w, h, m, color, line } =  mark.future_states_params[state];
                
                mark.x = x;
                mark.y = y;
                mark.w = w;
                mark.h = h;
                mark.m = m;
                mark.line = line;
                mark.color = color;
                
            })

        },

        render : () => {

            const [canvas_width, canvas_height] = [js.canvas.sizings.w, js.canvas.sizings.h];

            const ctx = js.canvas.context;

            ctx.clearRect(0, 0, canvas_width, canvas_height);

            const marks = js.canvas.points.params;

            marks.forEach( (mark,i) => {

                // it will always render the parameters of the current state. The trick is to animate the values of the current state, which we'll do with gsap. When setting the animation, we will get the future parameters from the appropriate next_state.

                const { x, y, w, h, m, color, line, opacity } = mark;

                ctx.fillStyle = color;
                ctx.lineStyle = 'black';
                ctx.lineWidth = line;
                ctx.globalAlpha = opacity;

                let r = line > 0 ? 0 : w/2; // w só vai ser != de h no treemap, e aí nesse caso não quero atrapalhar a posição ali embaixo

                //console.log( line, m);

                if (m == 0) {
    
                    ctx.beginPath();
                    ctx.arc(x, y, r, 0, Math.PI*2, true);
                    ctx.fill();

                    if (line > 0) ctx.stroke();
                       
                } else if (m == 1) {

                    if (line > 0) {

                        //if (mark.i > 300) return
                        // line vai de 10 a 0. 10-line

                        ctx.beginPath();
                        ctx.rect(x - r, y - r, w, h);//ctx.strokeRect(x - r, y - r, 2*r, 2*r);
                        ctx.stroke();
                        ctx.fill();
                        ctx.closePath();
                        
                    } else if (line == 0) { // isso aqui para evitar o saltinho que ele dava no começo do primeiro step após o default!

                        ctx.fillRect(x , y , w, h);

                    } else {

                        ctx.fillRect(x - r, y - r, w, h);

                    }

                } else {
                    
                    const l = r * m;
                    const R = Math.sqrt(l*l + r*r);
                    const theta = Math.atan(l/r);
                    
                    ctx.beginPath();
                    
                    ctx.moveTo(x + r, y - l);
                    ctx.lineTo(x + r, y + l);
                    
                    ctx.arc(x, 
                            y, 
                            R, 
                            Math.PI * 2 - theta,
                            Math.PI * 2 - (Math.PI/2 - theta), 
                            true);
                    
                    ctx.lineTo(x - l, y - r);
                    
                    ctx.arc(x,
                           y, 
                           R,
                           Math.PI * 2 - (Math.PI/2 + theta),
                           Math.PI * 2 - (Math.PI - theta),
                           true);
                    
                    ctx.lineTo(x - r, y + l);
                    
                    ctx.arc(x,
                            y, 
                            R,
                            Math.PI * 2 - (Math.PI + theta),
                            Math.PI * 2 - (Math.PI * 3/2 - theta),
                            true);
                    
                    ctx.lineTo(x + l, y + r);
                    
                    ctx.arc(x,
                            y, 
                            R,
                            Math.PI * 2 - (Math.PI * 3/2 + theta),
                            Math.PI * 2 - (Math.PI * 2 - theta),
                            true);
                    
                    if (line > 0) ctx.stroke();
                    ctx.fill();
                   
                }

                
            })

    

        },

    },

    data : {

        grids : null,

        letters : null,

        load : function() {

            fetch('./prep/grid.json')
              .then(response => response.json())
              .then(data => js.ctrl.after_data(data));

        }

    },

    ctrl : {

        current_state : {

            positions : null

        },

        init : function() {

            js.data.load();

            //js.utils.shuffle(js.data.indexes);

        },

        after_data : function(data) {

            js.data.grids = data;
            js.data.letters = data.letters;

            js.canvas.sizings.get.square_size();
            js.canvas.sizings.set();
            js.canvas.set_context();
            js.canvas.points.initialize_grid();

            js.steps.prepare_treemap_positions();
            js.steps.prepare_default_positions();
            js.canvas.set_current_state('treemap');
            //js.utils.shuffle(js.canvas.points.params);

            js.steps.prepare_step_positions('dataviz');
            js.steps.prepare_step_positions('webdev');
            //js.steps.prepare_step_positions('cookie');

            //js.canvas.set_current_state('treemap');
            js.canvas.render();
            //js.utils.shuffle(js.canvas.points.params);

            anims.make_tweens();
            anims.add_tweens_to_timeline();
            anims.timeline.pause();

            js.interactions.controls.monitor();

        }
    }

}

js.ctrl.init();

const anims = {

    tweens : null,

    make_tweens : () => {

        const states = ['default', 'dataviz', 'webdev'];
        anims.tweens = states.map(state => () => 
    
            gsap.to(js.canvas.points.params, {
    
                delay: (i, target) => (i % 6) * 0.1,
                duration: 1,
                x : (i, target) => js.canvas.points.get_future_value(i, target, state, 'x'),
                y : (i, target) => js.canvas.points.get_future_value(i, target, state, 'y'),
                w : (i, target) => js.canvas.points.get_future_value(i, target, state, 'w'),
                h : (i, target) => js.canvas.points.get_future_value(i, target, state, 'h'),
                m : (i, target) => js.canvas.points.get_future_value(i, target, state, 'm'),
                color : (i, target) => js.canvas.points.get_future_value(i, target, state, 'color'),
                line : (i, target) => js.canvas.points.get_future_value(i, target, state, 'line'),
                opacity : (i, target) => js.canvas.points.get_future_value(i, target, state, 'opacity'),
                onUpdate : js.canvas.render,
                //paused: true,
    
                ease: 'power2'
    
            })
    
    
        );

    },

    timeline: new gsap.timeline(),

    add_tweens_to_timeline : () => {

        const tweens = anims.tweens;
        tweens.forEach( tween => anims.timeline.add(tween(), "+=1") );

    }


}




