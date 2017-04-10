var k = 1;
var options;
var knn;
var neighbors;
var closest;

function setup(){}

function update(e) {

  var userClickLat = e.latlng.lat;
  var userClitLng = e.latlng.lng;

  // List of all neighbors by distance
  neighbors = [];
  for (var i = 70; i < Object.keys(data._layers).length; i++) {
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
