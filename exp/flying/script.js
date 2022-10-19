const steps_container = document.querySelector('.steps-container');
const steps = document.querySelectorAll('.steps-container li');

function monitor(e) {

  if (e.target.tagName == 'LI') {

    steps.forEach(step => step.classList.remove('selected'));
    e.target.classList.add('selected');

    const step_no = e.target.dataset.step;

    fly_to(step_no);

  }

}

steps_container.addEventListener('click', monitor);

const steps_locations = [

  [[18.06, 59.33], 'yes'],
  [[-34.8829, -8.0578], 'no'],
  [[-38.5016, -12.9777], 'yes'],
  [[-43.1729, -22.9068], 'no'],
  [[-48.6687, -28.2408], 'yes'],
  [[-34.8829, -8.0578], 'no'],
  [[1.4442, 43.6047], 'no'],
  [[11.5820, 48.1351], 'no'],
  [[-47.8919, -15.7975], 'no'],  
  [[18.06, 59.33], 'yes']
  
]

function fly_to(step_no) {

  const data = steps_locations[step_no];
  const centro = data[0];

  const pitch = data[1] == 'yes' ? 45 : 0;
  const bearing = data[1] == 'yes' ? 30 : 0;

  map.flyTo({

    center: centro,
    zoom: 8,
    speed: .6,
    pitch: pitch,
    bearing: bearing    
  
  });

}

mapboxgl.accessToken = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/tiagombp/ckaxzsefy0li11isd7utou0k4', // style URL
  center: [18.06, 59.33], // starting position [lng, lat]
  zoom: 6 // starting zoom
});

map.on('load', () => {

  fly_to(0);

  /*
  map.addSource('municipios', {
    type : 'vector',
    url : 'mapbox://tiagombp.a607oyly'
  });

  map.addLayer({
    'id': 'municipios-ce',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'type': 'fill',
    'paint': {
      'fill-color': 'transparent',
      'fill-outline-color': 'gold'
    }
  });

  map.addLayer({
    'id': 'mun-destacado',
    'type': 'fill',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'paint': {
        'fill-opacity' : .5,
        'fill-outline-color' : '#d7a565',
        'fill-color' : 'hotpink'
    },
    'filter': ['==', 'name_muni', ''] 
  });

  */

})



function pegaMun(nome) {

  return map.querySourceFeatures('municipios', {

    sourceLayer: 'mun_ce-adbvfq',
    filter: ['==', ['get', 'name_muni'], nome]
    
  })[0];

}

function criaMascara(nome) {

  let mun = turf.mask(pegaMun(nome))

  map.addSource('city-mask', {
    'type': 'geojson',
    'data': mun
  });

  map.addLayer({
    'id': 'city-mask',
    'type': 'fill',
    'source': 'city-mask',
    'paint': {
        'fill-color': 'black',
        'fill-opacity': 0.55,
        'fill-outline-color': 'transparent'
    }
  },
  'mun-destacado');

}
/*
function geraBbox(feature) {

  return [

    [
      feature.properties.xmin, 
      feature.properties.ymin
    ], 

    [
      feature.properties.xmax, 
      feature.properties.ymax
    ]

  ]

}
*/

function geraBbox(nome) {

  let mun = pegaMun(nome);
  let bbox = turf.bbox(mun.geometry);
  
  return bbox;

}

function pegaCentro(nome) {

  let mun = pegaMun(nome);
  let center = turf.center(mun.geometry).geometry.coordinates;

  return center;

}

function destacaCidade(nome) {

  map.setFilter(

    'mun-destacado', [
      '==', 
      ['get', 'name_muni'], 
      nome
    ]
  );

}

function voaParaCidade(nome) {

  let centro = pegaCentro(nome);
  
  map.flyTo({

    center: centro,
    zoom: 9,
    speed: 0.2,
    pitch: 45,
    bearing: 30    
  
  });

}

function ajustaCidade(nome) {

  let bbox = geraBbox(nome);
  
  map.fitBounds(bbox);


}

function voltaVisaoGeral() {

  map.flyTo({

    center: [-38.699, -5.305], 
    zoom: 6,
    pitch: 0,
    bearing: 0

  })

}

function montaChoropleth() {

  map.addLayer({
    'id': 'choro',
    'type': 'fill',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'paint': {
        'fill-outline-color': 'transparent'
    }
  })//, 'water')

  // vou usar uma variável nonsensical, o código do município

  const features = map.queryRenderedFeatures({layers: ['municipios-ce']});
  //let features_unicos = features.filter( (d,i,arr) => arr.indexOf(d) == i )
  const valores = features.map(d => d.properties.code_muni);

  const max = Math.max(...valores);
  const min = Math.min(...valores);

  map.setPaintProperty(
    'choro',
    'fill-color',
    [
      'interpolate', // declara uma interpolação para o valor do fill-color
      ['linear'], // declara que a interpolação é linear
      ['get', 'code_muni'], // indica a variável que vai ser usada como critério, capturando (via esse operador 'get') a propriedade "code_muni" dentre aquelas presentes na chave "properties" das features
      min, ['to-color', '#CC8899'], // indica o valor mínimo da variável, e a cor correspondente ao valor mínimo
      max, ['to-color', '#FFD700'] // indica o valor máximo da variável, e a cor correspondente ao valor máximo
    ]

  )

}

function removeChoropleth() {

  map.setPaintProperty(
    'choro',
    'fill-color',
    'transparent'
  )

}


/*
let bbox = geraBbox('Quixadá');
map.fitBounds(bbox);

let centro = pegaCentro('Fortaleza');
map.flyTo({

  center: centro,
  zoom: 9,
  speed: 0.2,
  pitch: 45,
  bearing: 30    

});

map.setPaintProperty('municipios-ce', 'fill-outline-color', 'blue');

map.setFilter(
  'highlighted_city', [
    '==', 
    ['get', 'code_muni'], 
    code
  ]);


map.getStyle().layers
map.getStyle().layers.map(d => d.id)
map.moveLayer('mun-destacado', 'water')
map.moveLayer('mun-destacado', 'road-label-simple')
*/




