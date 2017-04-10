# Should I connect to wifi or go to a gallery?

![screenshot](./assets/icons/screenshot.png)

Using a KNN algorithm this page tells based on where you click on the screen, if you should go see an art gallery or connect to wifi. To do so, it searches for the K1 nearest neighbor between NYC art galleries and wifi hotspots.

It uses an Euclidean distance to get the distance from the current mouse position to all the points in data.

I'm using part of the [NOC KNN demo](https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week3-classification-regression/04_kNN_demo_p5).

Demo
------
[demo](https://cvalenzuela.github.io/NOC_Intelligence-Learning/tree/assignment3/index.html)

Data
------
Both dataset where taken from NYC Open Data Portal as GeoJSON datasets.

 - [New York City Art Galleries](https://data.cityofnewyork.us/Recreation/New-York-City-Art-Galleries/tgyc-r5jh)
 - [NYC Wifi Hotspot Locatios](https://data.cityofnewyork.us/Social-Services/NYC-Wi-Fi-Hotspot-Locations/a9we-mtpn)

I used [this](https://github.com/mapbox/geojson-merge) to merge both Geojson files.
