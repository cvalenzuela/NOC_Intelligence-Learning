// genetic Algorithm to match a pixels in an image

var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

var img;

function preload() {
  img = loadImage("assets/red.jpg");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);

  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600,10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  // Image
  imageMode(CENTER);
  img.loadPixels();
  //image(img, width/1.3, height/2);
  // Create a population with a target phase, mutation rate, and population max

  target = img.pixels;

  popmax = 100;
  mutationRate = 0.03;
  //population = new Population(target, mutationRate, popmax);
  console.log("Population Loaded")
}

function draw() {
  // 1) Create a mating pool
  population.naturalSelection();
  // 2) Create the next generation
  population.generate();
  // 3) Calculate the fitness
  population.calcFitness();
  // 4) Check if a object matches the expression
  population.evaluate();
  // If we found the target phrase, stop
  if (population.isFinished()) {
     //println(millis()/1000.0);
      console.log("finish");
      noLoop();
  }
  //console.log(nf(population.getAverageFitness()))
   loadPixels();
  for (var y = 0; y < height; y++){
    for (var x = 0; x < width; x++){
      var index = (x + y * width)*4;
      pixels[index + 0] = random(255);
      pixels[index + 1] = random(255);
      pixels[index + 2] = random(255);
      pixels[index + 3] = random(255);
    }
  }
  updatePixels();

  // Display the information about the population
//  displayInfo();
}

function displayInfo() {
  // Display current status of population
  var answer = population.getBest();

  bestPhrase.html("Best pixels:<br>" + answer);

  var statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext +=    "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext +=    "total population:      " + popmax + "<br>";
  statstext +=    "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
