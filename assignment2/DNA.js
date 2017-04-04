function DNA(num) {

  // The genetic sequence.
  this.genes = [];
  this.fitness = 0;

  // Start with random chars
  for (var i = 0; i < num; i++) {
    this.genes[i] = floor(random(256));
  }

  // Fitneess
  // Fitness function (returns floating point % of "correct" characters)
  this.calcFitness = function(target) {
     var score = 0;

     for (var i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == img.pixels[i]) {
          score++;
        }
     }
     this.fitness = score / target.length;

  }

  // Crossover
  // Create a new child with parent genes
  this.crossover = function(partner) {
    // A new child
    var child = new DNA(this.genes.length);

    var midpoint = floor(random(this.genes.length)); // Pick a midpoint

    // Half from one, half from the other
    for (var i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else              child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Mutation
  // Based on a mutation probability, picks a new random character
  this.mutate = function(mutationRate) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = floor(random(256));
      }
    }
  }

  // Converts character array to a String, to compare and show in web
  this.getPixels = function() {
    return this.genes;
  }
}
