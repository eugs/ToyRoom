const MALE = "male";
const FEMALE = "female";
const ANY = "any gender";

function AbstractToy (name, price, gender) {
  this.name = name || "unnamed toy";
  this.price = price || -1;
  this.gender = gender || ANY;
  this.ageTo = 100;
  this.ageFrom = 0;
}

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

//-------------------

function AbstractFigure(name, price, gender, joints) {
  AbstractToy.apply(this, arguments);
  this.joints = joints || false;
}
AbstractFigure.prototype = new AbstractToy();

//-------------------

function Doll (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = FEMALE;
  this.joints = true;
}
Doll.prototype = new AbstractFigure();

function ToySoldier (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = MALE;
  this.joints = false;
}
ToySoldier.prototype = new AbstractFigure();

function ActionFigure (name, price) {
  AbstractFigure.apply(this, arguments);
  this.gender = MALE;
  this.joints = true;
}
ActionFigure.prototype = new AbstractFigure();

//---------------------------
function AbstractToyMachine(name, price, engine) {
  AbstractToy.apply(this, arguments);
  this.gender = MALE;
  this.engine = engine || false;
}

AbstractToyMachine.prototype = new AbstractToy();

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

//-----------------------


var car = new SimpleToyMachine("Colored Car", 15.00, true);
car.setupAge(10, 0);

var soldier = new ToySoldier("Trooper", 10.00, MALE);
soldier.setupAge(15, 6);

var bionycle = new ActionFigure("Megazord", 100.50, MALE);
bionycle.setupAge(16, 10);

var barbie = new Doll("Barbie", 25.00);
barbie.setupAge(14, 6);

var wallet = 150.00;
var toys = [];

function addToy(toy) {
    if((wallet - toy.price) >= 0) {
      wallet -= toy.price;
      return toys.push(toy);
    } else {
      return false;
    }
}

addToy(soldier);
addToy(barbie);
addToy(car);
var trooper = new ToySoldier("Starship Trooper", 18.99);
trooper.setupAge(18, 10);
addToy(trooper);

console.log(toys);

toys.sort(function age(a, b) {
  return (a.ageFrom >= b.ageFrom);
})

toys.forEach(function(toy) {
  console.log(toy.name+ ": " + toy.ageFrom + "-" + toy.ageTo);
});
