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

        grid_filtered : null,

        grid : null,

        read : () => {

            fetch('grid.json').then(response => response.json()).then(data => {

                s.data.raw = data;
                const indices = data.map(d => d.i[0] - 1);
                s.data.grid_filtered = Array.from(s.data.grid).filter((d,i) => indices.includes(i));

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

    },

    anims : {

        tl : new gsap.timeline()

        /*

        add : () => s.anims.tl.add(
            gsap.to(s.data.grid_filtered, {
        
                rotateY: (i,target) => s.data.raw[i]['st1'][0] == 1 ? '180deg' : '0',
                paused : true
            
            })
        )
        */

    }

} 

s.data.read();
s.cria_divs();
s.monitora();

setTimeout(

    () => {

        s.anims.tl.to(s.data.grid_filtered, {
        
            rotateY: (i) => (s.data.raw[i]['st1'][0] == 1) & (i % 2 == 1) ? '180deg' : '0',
            rotateX: (i) => (s.data.raw[i]['st1'][0] == 1) & (i % 2 == 0) ? '180deg' : '0',
            delay : (i) => (i % 6) * 0.1,
            duration : 2//(i) => (i % 3) * 0.5
        
        })
        .to(s.data.grid_filtered, {
        
            rotateY: (i) => (s.data.raw[i]['st2'][0] == 1) & (i % 2 == 1) ? '180deg' : '0',
            rotateX: (i) => (s.data.raw[i]['st2'][0] == 1) & (i % 2 == 0) ? '180deg' : '0',
            delay : (i) => (i % 6) * 0.1,
            duration : 2//(i) => (i % 3) * 0.5
        
        })
        .to(s.data.grid_filtered, {
        
            rotateY: (i) => (s.data.raw[i]['st3'][0] == 1) & (i % 2 == 1) ? '180deg' : '0',
            rotateX: (i) => (s.data.raw[i]['st3'][0] == 1) & (i % 2 == 0) ? '180deg' : '0',
            delay : (i) => (i % 6) * 0.1,
            duration : 2//(i) => (i % 3) * 0.5
        
        })

    },

    2000

) 





