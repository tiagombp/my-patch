const js = {

    params : {

        nof_letters : 10

    },

    phrases : [

        'hi there',
        'i am tiago'
        // make it work with capital letters to, later

    ],

    utils : {

        nof_pixels : function(word) {

            console.log(word.length);

            let sum = 0;
            
            for (letter of word) {
                if (letter == " ") continue
                sum += js.data.raw[letter].length;
            }
            
            return sum 

        }

    },

    treemap : {

        prepare : function() {

            console.log('Prepare');

            const data = {
                
                children : js.data.random

            };

            console.log(data);

            js.data.root = d3.treemap()
              .tile(d3.treemapBinary)
              .size([1000, 600])
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
                .attr('data-id', (d,i) => i)
                .attr('data-color', (d,i) => `color${(i % 5) + 1}`)
                //.attr("fill", "hotpink")
                //.attr("stroke", "khaki")
                //.attr("fill-opacity", 0.6)
                .style("width", d => (d.x1 - d.x0) + 'px')
                .style("height", d => (d.y1 - d.y0) + 'px');

            /* document.querySelectorAll('[data-color="color1"]').forEach(div => {
                let current_transform = div.style.transform.slice(0,-9);
                div.style.transform = current_transform + 'scale(1)'; }) */

        }

    },

    // interacoes : {

    //     theme : { // document.querySelector('.container').dataset.theme = "santuario" }


    // },

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

                    const letter_positions = js.data.raw[letter.toLowerCase()];

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

                        if ( js.data.raw.hasOwnProperty(letter) ) {

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


    data : {

        raw : null,

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

        }

    },

    ctrl : {

        init : function() {

            //js.grid.init();

            //js.data.load();

            js.data.create();

            js.ctrl.after_data();

        },

        after_data : function(data) {

            js.treemap.prepare();
            js.treemap.draw();

            //js.data.raw = data;

            //console.log('Hi there');

            //js.grid.mark_cells();

        }
    }

}

js.ctrl.init();


