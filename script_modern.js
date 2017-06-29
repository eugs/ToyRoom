function mix() {
  var arg, prop, child = {};

  for(arg = 0; arg<arguments.length; arg+=1) {
    for(prop in arguments[arg]) {
      if(arguments[arg].hasOwnProperty(prop)) {

        //cloning property
        addProperty(arguments[arg], prop, child, "");

      }
    }
  }
  return child;
}

function addProperty(parent, prop, child, index) {
  if(child[prop+index]) {
    index = (index) ? index : "0";
    addProperty(parent, prop, child, parseInt(index)+1);
  } else {
    child[prop+index] = parent[prop];
  }
}


//CREATURES

//FROG
var frog = {
  legs: 4,
  quack: true,
  name: "FROG"
};
frog.say = function () {
  console.log("QUACK");
};
frog.swim = function() {
  console.log("I'm swimming!");
}

//SNAKE
var snake = {
  name: "SNAKE",
  legs: false,
  tongue: "long",
  poison: true
};
snake.say = function () {
  console.log("SHHHHH");
}
snake.crawl = function() {
  console.log("crawling");
}

//LIZARD
var lizard = {
  name: "LIZARD",
  legs: 4,
  skin: "green",

  regenerate: function() {
    console.log("I have tail again!");
  },
  say: function () {
    console.log("silence...");
  },
  sneak: function() {
    console.log("sneaking...")
  }
};

var chimera = mix(frog, snake, lizard);
chimera.fireBreath = function () {
  console.log("exterminate everything with fire!");
}

console.log(chimera);

console.log("\n------\n\tCHIMERA CAN:");
chimera.regenerate();
chimera.sneak();
chimera.crawl();
chimera.swim();

console.log("\n-------\n\tchimera says:");
chimera.say();
chimera.say1();
chimera.say2();

console.log("\n-------\n\tand finally:");
chimera.fireBreath();
