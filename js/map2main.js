mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 4, // starting zoom
    center: [-100, 40], // starting center
    projection: 'albers'
});

const grades = [100, 1000, 5000, 50000, 200000],
    colors = ['rgb(255,255,178)','rgb(254,204,92)','rgb(253,141,60)','rgb(227,26,28)', 'rgb(177,0,38)'];
    radii = [1, 5, 10, 20, 40];

//load data to the map as new layers.
//map.on('load', function loadingData() {
map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

// when loading a geojson, there are two steps
// add a source of the data and then add the layer out of the source
map.addSource('cases', {
    type: 'geojson',
    data: 'assets/us-covid-2020-counts.json'
});

map.addLayer({
    'id': 'cases-layer',
    'type': 'circle',
    'source': 'cases',
    'minzoom': 3,
    'paint': {
        'circle-radius': {
            'property': 'cases',
            'stops': [...grades.keys()].map(i => ([{
                zoom: 4,
                value: grades[i]
            }, radii[i]]))
        },
        'circle-color': {
            'property': 'cases',
            'stops': [...grades.keys()].map(i => ([grades[i], colors[i]]))
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': 0.6
        }
    },
    'waterway-label'
);

map.getCanvas().style.cursor = 'default';

// click on tree to view magnitude in a popup
map.on('click', 'cases-layer', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[1].geometry.coordinates)
        .setHTML(`<strong>Cases:</strong> ${event.features[1].properties.cases}`)
        .addTo(map);
});

});


// create legend
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong>Magnitude</strong>'], vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
vbreak = grades[i];
// you need to manually adjust the radius of each dot on the legend 
// in order to make sure the legend can be properly referred to the dot on the map.
dot_radii = 2 * radii[i];
labels.push(
    '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
    'px; height: ' +
    dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
    '</span></p>');

}
const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">NY-Times</a></p>';

legend.innerHTML = labels.join('') + source;