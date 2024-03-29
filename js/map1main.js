mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 4, 
    center: [-100, 40],
    projection: 'albers' 
});

const grades = [
    0,
    40,
    80,
    160,
    200
];
const colors = ['rgb(255,255,178)','rgb(254,204,92)','rgb(253,141,60)','rgb(227,26,28)', 'rgb(177,0,38)'];

let icon = document.getElementsByClassName("icon")[0];

icon.addEventListener('click', responsive_control);

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function responsive_control() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

map.on('load', function loadingData() {
    map.addSource('rates', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.json'
    });
    
    map.addLayer({
        'id': 'rates-layer',
        'type': 'fill',
        'source': 'rates',
        'paint': {
            'fill-color': {
                'property': 'rates',
                'stops': [...grades.keys()].map(i => ([grades[i], colors[i]]))
            },
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    });
});

map.getCanvas().style.cursor = 'default';

const legend = document.getElementById('legend');
legend.innerHTML = "<b>COVID Case Rate<br>(cases/1000 pop)</b><br><br>";

grades.forEach((grade, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${grade} - ${grades[i+1] || '1000+'}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

map.on('mousemove', ({point}) => {
    const state = map.queryRenderedFeatures(point, {
        layers: ['rates-layer']
    });
    document.getElementById('text-description').innerHTML = state.length ?
        `<h3>County: ${state[0].properties.county}</h3><h3>State: ${state[0].properties.state}</h3><p><strong><em>${state[0].properties.rates}</strong> cases per 1000 residents</em></p>` :
        `<p>Hover over a county!</p>`;
});