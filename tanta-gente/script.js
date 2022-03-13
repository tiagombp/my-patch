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

        s.data.grid = document.querySelectorAll('.grid-cell');

    },

    flip : (target) => {

        target.classList.add("flipped");

    },

    unflip : (target) => {

        target.classList.remove("flipped");

    },

    monitora: () => {

        const container = document.querySelector('.container');

        container.addEventListener('click', e => s.flip(e.target));

    },

    data :  {

        raw : null,

        grid : null,

        read : () => {

            fetch('grid.json').then(response => response.json()).then(data => {
                s.data.raw = data;
            })

        }

    },

    write : (state) => {

        const data = s.data.raw;

        data.forEach(d => {
            console.log(d[state][0], d.i[0]);
            if (d[state][0] == 1) s.flip(s.data.grid[d.i[0] - 1]);
            else s.unflip(s.data.grid[d.i[0] - 1]);
        })

    }

} 

s.cria_divs();
s.monitora();
s.data.read();