const js = {

    params : {

        nof_letters : 10,
        l : null, // side of square -- comes from CSS
        ch : 8, // squares in each dimension of a letter
        sq : 40, // squares in each dimension of a drawing

        symbols : ["@", "!", ":", "_"],
        symbols_refs : ["heart", "exclamation", "smile", "ellipsis"]

    },

    phrases : [

        'hi there',
        'i am tiago',
        'i like...'

        // make it work with capital letters to, later

    ],

    sizings : {

        // will be set by .set()
        h : null,
        w : null,

        set : function() {

            this.h = window.innerHeight;
            this.w = window.innerWidth;

        },

        get : {

            square_size : () => {

                js.params.l = +window.getComputedStyle(document.documentElement).getPropertyValue('--cell-size').slice(0,-2)

            }

        }


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

        },

        set_ids : function() {

            let rects = document.querySelectorAll('div.rect');
            
            rects.forEach(div => {

                let id = js.data.indexes.pop()

                div.dataset.id = String(id);

            })



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

        }
    },

    treemap : {

        prepare : function() {

            //console.log('Prepare');

            const data = {
                
                children : js.data.random

            };

            //console.log(data);

            const w = js.sizings.w;
            const h = js.sizings.h;

            js.data.root = d3.treemap()
              .tile(d3.treemapBinary)
              .size([w, h])
              .round(true)
              (d3.hierarchy(data).sum(d => d))

        },

        draw : function() {

            const root = js.data.root;

            const svg = d3.select(".container");

            const leaf = svg.selectAll("div.rect")
                .data(root.leaves())
                .join("div")
                .classed('rect', true)
                .style("transform", d => `translate(${d.x0}px,${d.y0}px)`)
                .attr('data-original-transform', d => `translate(${d.x0}px,${d.y0}px)`)
                .attr('data-color', (d,i) => `color${(i % 5) + 1}`)
                .style("width", d => (d.x1 - d.x0) + 'px')
                .style("height", d => (d.y1 - d.y0) + 'px');

        }

    },

    steps : {

        compute_position: function(step) {

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

            let w_screen = js.sizings.w;
            let h_screen = js.sizings.h;

            // initial positions in pixels

            //const x0 = (w_screen - width)  / 2;
            const y0 = (h_screen - height) / 2;

            // borda

            /*d3.select('div.borda').remove();

            const cont = d3.select('.container')
              .append('div')
              .classed('borda', true)
              .style('position', 'absolute')
              .style('top', y0 + 'px')
              .style('left', x0 + 'px')
              .style('width', width + 'px')
              .style('height', height + 'px')
              .style('background-color', 'transparent')
              .style('border', "3px solid black");*/

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

                            let current_square = d3.select('[data-id="' + general_index + '"]');

                            let x = ( ( (pos % ch)) * l ) + (n * l * ch) + x0;
                            let y = ( Math.floor( pos / ch ) * l ) + y_desloc + y0;

                            current_square
                                .classed('active', true)
                                .attr('data-color-drawing', '')
                                .attr('data-drawing', '')
                                .transition()
                                .delay(1000)
                                .duration(200)
                                //.style('opacity', 1)
                                //.style('width', l + 'px')
                                //.style('height', l + 'px')
                                .style('transform', `translate(${x}px,${y}px)`);

                            general_index++;
                        }
    
                        //console.log(n, n*last_index, this_letter_positions);
        
                        // phrase_positions = phrase_positions.concat(this_letter_positions);

                        //console.log(phrase_positions);
    
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

                    let current_square = d3.select('[data-id="' + general_index + '"]');

                    const pos = unit.pos;
                    const color = unit.cor;

                    const x0 = (w_screen - sq * l)  / 2;

                    y_desloc = ( l * (ch + 1) ) * ( p2 ? 2 : 1);

                    let x = ( ( (pos % sq)) * l ) + x0;
                    let y = ( Math.floor( pos / sq ) * l ) + y_desloc + y0;

                    current_square
                        .classed('active', true)
                        .attr('data-color-drawing', color)
                        .attr('data-drawing', dr)
                        .transition()
                        .delay(1000)
                        .duration(200)
                        //.style('opacity', 1)
                        //.style('width', l + 'px')
                        //.style('height', l + 'px')
                        .style('transform', `translate(${x}px,${y}px)`);

                    general_index++;
                }



            }


            //console.log(positions);

            // save positions to current state

            js.ctrl.current_state.positions = positions;

            // hide the rest, return to position

            d3.selectAll('[data-id]')
              .classed('active', function(d) {

                const sel = d3.select(this);
                  
                const id = +sel.attr('data-id')

                // retrieves and set original positions
                if (id >= general_index) {

                    const original_transform = sel.attr('data-original-transform');

                    sel
                      .style('transform', original_transform)
                      .attr('data-color-drawing', '')
                      .attr('data-drawing', '');

                }

                return !(id >= general_index);

              });

            // for (let id = general_index + 1; id <= js.data.random.length; id++) {

            //     let current_square = d3.select('[data-id="' + id + '"]');

            //     current_square
            //         .classed('active', false);

            // }

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

    /*

    grid : {

        ref : '.grid-container',

        init : function() {

            //const cont = document.querySelector(this.ref);

            // for (let i = 1; i<=js.params.nof_letters; i++) {

            //     const new_div = document.createElement('div');

            //     new_div.classList.add('grid--letter');

            //     cont.appendChild(new_div);

            // }

        },

        mark_cells : function() {

            const phrases = js.phrases;

            const div_letters = document.querySelectorAll('.grid--letter');

            console.log(phrases, div_letters);

            phrases.forEach( (phrase, i_phrase) => {

                const letters = phrase.split('');

                console.log('Letters: ', letters);

                letters.forEach((letter,i) => {

                    const first_cell = div_letters[i].querySelector('.grid--cell');

                    if (first_cell) div_letters[i].classList.add('has-cells');

                    //if (i > js.params.nof_letters) continue;

                    const letter_positions = js.data.letters[letter.toLowerCase()];

                    for (let n = 0; n <= 63; n++) {

                        //console.log(letter, i, n);

                        let current_cell;

                        const was_empty_div_letter = !div_letters[i].classList.contains('has-cells');

                        if (!was_empty_div_letter) {

                            current_cell = div_letters[i].querySelector('[data-cell-no="' + n + '"]');

                        } else {

                            current_cell = document.createElement('div');
                            current_cell.classList.add('grid--cell');
                            current_cell.dataset['cellNo'] = n;

                        }

                        if ( js.data.letters.hasOwnProperty(letter) ) {

                            if ( letter_positions.includes(n)) {

                                current_cell.classList.add('phrase' + i_phrase);

                            } 

                        }

                        if (was_empty_div_letter) {

                            div_letters[i].appendChild(current_cell);

                        }
                        
                        

                    }

                })

            })

            const anim = new gsap.timeline({paused: true})

            // gsap.to('[data-id]', {scale: 0,

            //     stagger: {
            //         from: "center",
            //         amount: 2
            //         }

            //  });

                //  .to('.grid--cell', {

                //     borderColor : "#efefef"

                //  })
                 .to('.phrase0', {

                    //rotationX: -90,
                    z: 0,
                    backgroundColor: "#333",
                    //scale: 0,
                    //opacity: 0,

                    stagger: {
                        grid: "auto",
                        from: "start",
                        each: 0.075
                        }

                 }, '+=.5')
                 .to('.phrase0', {

                    z : -1000,
                    backgroundColor: "transparent",
                    //rotationX: 0,
                    //scale: 0,
                    //opacity: 1,

                    stagger: {
                        grid: "auto",
                        from: "edges",
                        each: 0.025
                        }

                 }, '+=3')

                 .to('.phrase1', {

                    z: 0,
                    backgroundColor: "#333",
                    //scale: 0,
                    //opacity: 0,

                    stagger: {
                        grid: "auto",
                        from: "start",
                        each: 0.075
                        }

                 }, '+=.5')

            const anim2 = new gsap.timeline({paused: true})
            //  .to('.grid--cell', {

            //     borderColor : "#efefef"

            //  })
            .to('.phrase0', {

                //rotationX: -90,
                rotationY: 180,
                backgroundColor: "#333",
                //scale: 0,
                //opacity: 0,

                stagger: {
                    grid: "auto",
                    from: "start",
                    each: 0.075
                    }

            }, '+=.5')
            .to('.phrase0', {

                rotationY: 0,
                backgroundColor: "transparent",
                //rotationX: 0,
                //scale: 0,
                //opacity: 1,

                stagger: {
                    grid: "auto",
                    from: "end",
                    each: 0.02
                    }

            }, '+=2')

            .to('.phrase1', {

                rotationY: 180,
                backgroundColor: "#333",
                //scale: 0,
                //opacity: 0,

                stagger: {
                    grid: "auto",
                    from: "start",
                    each: 0.075
                    }

            }, '+=.5')
            
            anim2.play();


            


        }

    },

    */

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
                                        
                                        setTimeout(js.anims.drop_and_show, 7 * interval - 300)
            
                                    }, 6 * interval - 300)
        
                                }, 5 * interval)
    
                            }, 4 * interval)

                        }, 3 * interval)

                    }, 2 * interval)

                }, 1 * interval);

            }

        }

    },


    data : {

        grids : null,

        letters : null,

        indexes : [],

        random : [],

        load : function() {

            fetch('./prep/grid.json')
              .then(response => response.json())
              .then(data => js.ctrl.after_data(data));

        },

        create : function() {

            for (let i = 0; i < 800; i++) {

                js.data.random.push(Math.round(Math.random() * 100));

            }

        },

        make_indexes : function() {

            js.data.indexes = js.data.random.map((d,i) => i);

        }

    },

    ctrl : {

        current_state : {

            positions : null

        },

        init : function() {

            //js.grid.init();
            js.sizings.get.square_size();

            js.data.load();

            js.data.create();
            js.data.make_indexes();
            js.utils.shuffle(js.data.indexes);

            js.sizings.set();

            //js.ctrl.after_data();

        },

        after_data : function(data) {

            js.treemap.prepare();
            js.treemap.draw();

            js.data.grids = data;
            js.data.letters = data.letters;

            // commenting controls 
            //js.interactions.theme.monitor_change();
            //js.interactions.temp_controls.monitor();

            js.utils.set_ids();

            //js.grid.mark_cells();

        }
    }

}

js.ctrl.init();


