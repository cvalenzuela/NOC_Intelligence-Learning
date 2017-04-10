var k = 1;
var options;
var knn;
var neighbors;
var closest;
var skip = 30;

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  background(255,0,0);
}

function update(e) {
  var userClickLat = e.latlng.lat;
  var userClitLng = e.latlng.lng;

  // List of all neighbors by distance
  neighbors = [];
  for (var i = (parseInt(Object.keys(data._layers)[0]) + 2); i < Object.keys(data._layers).length; i++) {
    // Euclidean distance to this neighbor using lat and lng as x and y
    var d = dist(userClickLat, userClitLng, data._layers[i].feature.geometry.coordinates[1], data._layers[i].feature.geometry.coordinates[0]);
    var t;

    if(data._layers[i].feature.properties.type != null){
      t = 'wifi'
    }
    else{
      t = 'gallery'
    }

    neighbors.push({
      dist: d,
      name: data._layers[i].feature.properties.name,
      type: t,
      lat: data._layers[i].feature.geometry.coordinates[1],
      lng: data._layers[i].feature.geometry.coordinates[0]
    });
  }

  // Sort array by distance
  neighbors.sort(byDistance);

  // This function tells the array how to sort
  function byDistance(a, b) {
    return a.dist - b.dist;
  }

  // In the top k spots, how many neighbors per label
  knn = {};
  for (var i = 0; i < k; i++) {
    // Here's the i'th closest neighbor
    var nb = neighbors[i];
    // Increment its count if we've seen it before
    // We could add something to weight by distance here!
    knn["name"] = neighbors[i].name;
    knn["type"] = neighbors[i].type;
    knn["lat"] = neighbors[i].lat;
    knn["lng"] = neighbors[i].lng;

    if (knn[nb.name]) {
      knn[nb.name]++;
    } else {
      // Otherwise start with 1
      knn[nb.name] = 1;
    }
  }
  console.log(knn)
  return knn;
}

function drawPattern(){
  for (var x = 0; x < window.innerWidth; x += skip) {
    for (var y = 0; y < window.innerHeight; y += skip) {

      // List of all neighbors by distance
      neighbors = [];
      for (var i = (parseInt(Object.keys(data._layers)[0]) + 2); i < Object.keys(data._layers).length; i++) {
        // Euclidean distance to this neighbor using lat and lng as x and y
        var latlng = new L.latLng(data._layers[i].feature.geometry.coordinates[1], data._layers[i].feature.geometry.coordinates[0]);
        var d = dist(x, y, mapa.latLngToLayerPoint(latlng).x , mapa.latLngToLayerPoint(latlng).y);
        var t;

        if(data._layers[i].feature.properties.type != null){
          t = 'wifi'
        }
        else{
          t = 'gallery'
        }

        neighbors.push({
          dist: d,
          name: data._layers[i].feature.properties.name,
          type: t,
          lat: data._layers[i].feature.geometry.coordinates[1],
          lng: data._layers[i].feature.geometry.coordinates[0]
        });
      }
      // Sort array by distance
      neighbors.sort(byDistance);

      // This function tells the array how to sort
      function byDistance(a, b) {
        return a.dist - b.dist;
      }

      // In the top k spots, how many neighbors per label
      knn = {};
      for (var i = 0; i < k; i++) {
        // Here's the i'th closest neighbor
        var nb = neighbors[i];
        // Increment its count if we've seen it before
        // We could add something to weight by distance here!
        knn["name"] = neighbors[i].name;
        knn["type"] = neighbors[i].type;
        knn["lat"] = neighbors[i].lat;
        knn["lng"] = neighbors[i].lng;

        if (knn[nb.name]) {
          knn[nb.name]++;
        } else {
          // Otherwise start with 1
          knn[nb.name] = 1;
        }
      }

      // Here are all the possible labels
      var options = Object.keys(knn);
      // Which one is the most frequent?
      var record = 0;
      var classification = null;
      for (var i = 0; i < options.length; i++) {
        var label = options[i];
        var total = knn[name];

        // If it's count is higher than any we've found before
        if (total > record) {
          record = total;
          // This is the classification!
          classification = label;
        }
      }

      // Draw rectangle with a color based on classfied label
      if (knn["type"] == 'wifi') {
        //console.log(knn["type"])
        fill(255, 255, 0, 200);
      } else if (knn["type"] == 'gallery') {
        fill(0, 255, 255, 200);
      } else {
        fill(255, 0, 255, 200);
      }
      noStroke();
      rect(x, y, skip, skip);
    }
  }

  // Now draw all the training data to see how it looks
  // for (var i = 0; i < training.length; i++) {
  //   var point = training[i];
  //   if (point.label == 'A') {
  //     fill(255, 255, 0, 200);
  //   } else if (point.label == 'B') {
  //     fill(0, 255, 255, 200);
  //   } else {
  //     fill(255, 0, 255, 200);
  //   }
  //   stroke(0);
  //   ellipse(point.x, point.y, 24, 24);
  //   noStroke();
  //   fill(0);
  //   textAlign(CENTER);
  //   textSize(12);
  //   text(point.label, point.x, point.y + 6);
  // }
}
