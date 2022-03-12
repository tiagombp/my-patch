const s = {

    dims : {
        w : 49,
        h : 45
    },

    cria_divs : () => {

        const {w, h} = s.dims;

        const total_cells = w * h;

        const container = document.querySelector('.container');

        for (let i = 1; i <= total_cells; i++) {

            let new_div = document.createElement('div');
            new_div.classList.add('grid-cell');
            container.appendChild(new_div);

        }

    },

    flip : (target) => {

        target.classList.add("flipped");

    },

    monitora: () => {

        const container = document.querySelector('.container');

        container.addEventListener('click', e => s.flip(e.target));

    }

} 

s.cria_divs();
s.monitora();