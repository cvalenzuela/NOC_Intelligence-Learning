// BaseMap and Layer
var base_layer = L.tileLayer('https://api.mapbox.com/styles/v1/cvalenzuela/cizlkagzy00142smyadtagds5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA');

var mapa = L.map('mapa', {
    center: [40.7246342, -73.9427715],
    zoom: 13,
    minZoom: 9
});

mapa.addLayer(base_layer);

var result = document.getElementById('resultText');
var emoji = document.getElementById('emoji');

var data = new L.GeoJSON.AJAX("./data/data.geojson");

var iphone = L.icon({
    iconUrl: 'assets/icons/iphone.png',
    iconSize: [18, 28]
});

var art = L.icon({
    iconUrl: 'assets/icons/art.png',
    iconSize: [18, 28]
});

mapa.on('click', function(e) {
  var nearest = update(e);

  if(nearest.type == 'wifi'){
    emoji.innerHTML = '<i class="em em-iphone"></i>'
    result.innerHTML = 'Meh... Connect to Wifi located in: <span>' + nearest.name + '</span>';
    var marker = L.marker([nearest.lat, nearest.lng], {icon: iphone}).addTo(mapa);
    //console.log('Meh...Connect to Wifi located in: ' + nearest.name)
  }
  else{
    emoji.innerHTML = '<i class="em em-art"></i>'
    result.innerHTML = 'Go to a gallery! <span>' + nearest.name +  ' </span> is close!'
    var marker = L.marker([nearest.lat, nearest.lng], {icon: art}).addTo(mapa);
    //console.log('Go to a gallery! ' + nearest.name +  'is close!');
  }

});
