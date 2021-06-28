const js = {

    params : {

        nof_letters : 10

    },

    phrases : [

        'Hi there',
        'I am Tiago'

    ],

    grid : {

        ref : '.grid-container',

        init : function() {

            const cont = document.querySelector(this.ref);

            for (let i = 1; i<=js.params.nof_letters; i++) {

                const new_div = document.createElement('div');

                new_div.classList.add('grid--letter');

                cont.appendChild(new_div);


            }



        },

        mark_cells : function() {

            const phrases = js.phrases;

            const div_letters = document.querySelectorAll('.grid--letter');

            console.log(phrases, div_letters);

            phrases.forEach( (phrase, i_phrase) => {

                const letters = phrase.split('');

                console.log('Letters: ', letters);

                letters.forEach((letter,i) => {

                    //if (i > js.params.nof_letters) continue;

                    const letter_positions = js.data.raw[letter.toLowerCase()];

                    for (let n = 0; n <= 63; n++) {

                        console.log(letter, i, n);

                        const new_cell = document.createElement('div');

                        new_cell.classList.add('grid--cell');

                        if ( js.data.raw.hasOwnProperty(letter) ) {

                            if ( letter_positions.includes(n)) {

                                new_cell.classList.add('phrase' + i_phrase);

                            } 

                        }
                        
                        div_letters[i].appendChild(new_cell);

                    }

                })

            })


        }

    },

    data : {

        raw : null,

        load : function() {

            fetch('./prep/grid.json')
              .then(response => response.json())
              .then(data => js.ctrl.after_data(data));






        }

    },

    ctrl : {

        init : function() {

            js.grid.init();

            js.data.load();

        },

        after_data : function(data) {

            js.data.raw = data;

            console.log('Hi there');

            js.grid.mark_cells();

        }
    }

}

js.ctrl.init();