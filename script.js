const MALE = "male";
const FEMALE = "female";
const ANY = "any gender";

// ROOT
function AbstractToy (name, price, gender) {
  this.name = name || "unnamed toy";
  this.price = price || -1;
  this.gender = gender || ANY;
  this.ageTo = 100;
  this.ageFrom = 0;
}

//add functions
AbstractToy.prototype.getPrice = function () {
  return this.price;
}

AbstractToy.prototype.getGender = function () {
  return this.gender;
}

AbstractToy.prototype.getName = function () {
  return this.name;
}

AbstractToy.prototype.setupAge = function (ageTo, ageFrom) {
  this.ageTo = ageTo || 100;
  this.ageFrom = ageFrom || 0;
}

//--------FIGURES BRANCH-----------

function AbstractFigure(name, price, gender, joints) {
  AbstractToy.apply(this, arguments);
  this.joints = joints || false;
}
AbstractFigure.prototype = new AbstractToy();

//---------
function Doll (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = FEMALE;
  this.joints = true;
}
Doll.prototype = new AbstractFigure();

//--------
function ToySoldier (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = MALE;
  this.joints = false;
}
ToySoldier.prototype = new AbstractFigure();

//--------
function ActionFigure (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = MALE;
  this.joints = true;
}
ActionFigure.prototype = new AbstractFigure();

//-----------MACHINES BRANCH---------
function AbstractToyMachine(name, price, engine) {
  AbstractToy.apply(this, arguments);
  this.gender = MALE;
  this.engine = engine || false;
}
AbstractToyMachine.prototype = new AbstractToy();

//--------
function SimpleToyMachine (name, price) {
  AbstractToyMachine.apply(this, arguments);
  this.engine = false;
}
SimpleToyMachine.prototype = new AbstractToyMachine();

function ElectroMobile(name, price, engine) {
  AbstractToyMachine.apply(this, arguments);
  this.engine = true;
}
ElectroMobile.prototype = new AbstractToyMachine();

function ModelMachine(name, price) {
  AbstractToyMachine.apply(this, arguments);
  this.engine = false;
}
ModelMachine.prototype = new AbstractToyMachine();

//-----------BALLS BRANCH--------
function AbstractBall(name, price, material) {
  AbstractToy.apply(this, arguments);
  this.material = material || "no material";
}
AbstractBall.prototype = new AbstractToy();

//----------
function RubberBall(name, price) {
  AbstractBall.apply(this, arguments);
  this.material = "rubber";
}
RubberBall.prototype = new AbstractBall();

function SportBall(name, price) {
  AbstractBall.apply(this, arguments);
  this.material = "fake skin";
}
SportBall.prototype = new AbstractBall();
//-----------------



var wallet = 150.00;
var toys = [];

// CREATE TOYS
var car = new SimpleToyMachine("Colored Car", 15.00, true);
car.setupAge(10, 0);
addToy(car);

var soldier = new ToySoldier("Trooper", 10.00, MALE);
soldier.setupAge(15, 6);
addToy(soldier);

var bionycle = new ActionFigure("Megazord", 100.50, MALE);
bionycle.setupAge(18, 8);

var barbie = new Doll("Barbie", 25.00);
barbie.setupAge(14, 6);
addToy(barbie);

var trooper = new ToySoldier("Starship Trooper", 18.99);
trooper.setupAge(18, 5);
addToy(trooper);

var coloredBall = new RubberBall("Disney Ball", 5.60);
coloredBall.setupAge(12, 0);
addToy(coloredBall);

var footBall = new SportBall("UEFA Ball", 30);
footBall.setupAge(18, 15);
addToy(footBall);

//operate toys
toys.sort(function age(a, b) {
  return (a.ageFrom > b.ageFrom);
})
// printToys();

toys.sort(function age(a, b) {
  return (a.ageTo > b.ageTo);
});

// showToysByGender(MALE);
// showToysByAge(14);
// showToysByPrice(15.00);
showToysByType(AbstractFigure);

var checkType = function (toy, type) {
    return(toy instanceof type);
}

// showToysBy(checkType(), "sdf");

// function showToysBy(checker, args) {
//   toys.forEach(function(toy) {
//     if(checker(toy, args)) {
//       console.log(toy);
//     };
//   });
// }

function addToy(toy) {
    if((wallet - toy.price) >= 0) {
      wallet -= toy.price;
      return toys.push(toy);
    } else {
      return false;
    }
}

function showToysByType(type) {
  toys.forEach(function (toy) {
    if(toy instanceof type) {
      console.log(toy);
    }
  });
}

function printToys() {
  toys.forEach(function(toy) {
    console.log(toy.name+ ": " + toy.ageFrom + "-" + toy.ageTo);
  });
}

function showToysByAge(age) {
  console.log("\nTOYS FOR AGE: " + age);
  toys.forEach(function(toy) {
    if((age >= toy.ageFrom) && (age <= toy.ageTo)) {
      console.log(toy);
    }
  });
}

function showToysByPrice(upperPrice) {
  console.log("\nSHOW BY PRICE: " + upperPrice);
  toys.forEach(function (toy) {
    if(upperPrice >= toy.getPrice()) {
      console.log(toy);
    }
  });
}

function showToysByGender(givenGender) {
  console.log("\nSHOW TOYS FOR GENDER: " + givenGender);
  toys.forEach(function (toy) {
    if(toy.getGender() === givenGender) {
      console.log(toy);
    }
  });
}
