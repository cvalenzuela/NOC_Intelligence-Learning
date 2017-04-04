// Population to store DNA

function Population(p, m, num) {

  this.population = [];              // Array to hold the current population
  this.matingPool = [];              // ArrayList which we will use for our "mating pool"
  this.generations = 0;              // Number of generations
  this.finished = false;             // Are we finished evolving?
  this.target = p;                   // Target phrase
  this.mutationRate = m;             // Mutation rate
  this.perfectScore = 1;
  this.best;

  // Create the first population of DNA objects based on the max population var
  for (var i = 0; i < num; i++) {
    this.population[i] = new DNA(this.target.length);
  }

  // Get the fitness for every member of the population
  this.calcFitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  // Get the fitness for the population. Do it once for the first generation
  this.calcFitness();

  // Generate a mating pool
  this.naturalSelection = function() {
    // Clear the ArrayList
    this.matingPool = [];
    // Get the max fitness for the current population
    var maxFitness = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    for (var i = 0; i < this.population.length; i++) {
      var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      var n = floor(fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]); // add the new objects to the matingPool
      }
    }
  }

  // Create a new generation
  this.generate = function() {
    // Replace the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate); // Add mutation to child
      this.population[i] = child; // Replace the parent i with this new child
    }
    this.generations++; // update the amount of generations
  }

  // Get the best phrase from all the population
  this.getBest = function() {
    return this.best;
  }

  // Get the current "most fit" member of the population
  this.evaluate = function() {
    var worldrecord = 0.0;
    var index = 0;
    for (var i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    // Store the best result
    this.best = this.population[index].getPixels();
    // If the result is found, stop
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  // Check if we found 'the one'
  this.isFinished = function() {
    return this.finished;
  }

  // Just update the amount of generations
  this.getGenerations = function() {
    return this.generations;
  }

  // Get the average fitness for the population
  this.getAverageFitness = function() {
    var total = 0;
    for (var i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  this.allPhrases = function() {
    var everything = "";

    var displayLimit = min(10);

    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPixels() + "<br>";
    }
    return everything;
  }
}
