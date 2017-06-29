const MALE = "male";
const FEMALE = "female";
const ANY = "both_genders";

const SIZE_SMALL = "small";
const SIZE_MID = "mid";
const SIZE_BIG = "big";

//-----linking fields ------
var button = document.getElementById("btn");
var toysTable = document.getElementById("toys_table");
var priceField = document.getElementById("price_field");
var ageField = document.getElementById("age_field");
var genderSelect = document.getElementById("gender_select");
var typeSelect = document.getElementById("type_select");

button.onclick = function() {
  printToys();
};

//--------------------------

// ROOT
function AbstractToy (name, price, gender) {
  this.name = name || "unnamed toy";
  this.price = price || -1;
  this.gender = gender || ANY;
  this.ageTo = 100;
  this.ageFrom = 0;
}

AbstractToy.prototype.setupAge = function (ageTo, ageFrom) {
  this.ageTo = ageTo || 100;
  this.ageFrom = ageFrom || 0;
}

//--------FIGURES BRANCH-----------

function AbstractFigure(name, price, joints) {
  AbstractToy.call(this, name, price);
  this.joints = joints || false;
}
AbstractFigure.prototype = new AbstractToy();

//---------
function Doll (name, price, joints, eyeMovement) {
  AbstractFigure.call(this, name, price, joints);
  this.gender = FEMALE;
  this.eyeMovement = eyeMovement;
}
Doll.prototype = new AbstractFigure();

//--------
function ToySoldier (name, price, colored) {
  AbstractFigure.call(this, name, price);
  this.gender = MALE;
  this.joints = false;
  this.colored = colored;
}
ToySoldier.prototype = new AbstractFigure();

//--------
function ActionFigure (name, price, additionalParts) {
  AbstractFigure.call(this, name, price);
  this.gender = MALE;
  this.joints = true;
  this.additionalParts = additionalParts;
}
ActionFigure.prototype = new AbstractFigure();

//-----------MACHINES BRANCH---------
function AbstractToyMachine(name, price, engine) {
  AbstractToy.call(this, name, price);
  this.gender = MALE;
  this.engine = engine || false;
}
AbstractToyMachine.prototype = new AbstractToy();

//--------
function SimpleToyMachine (name, price) {
  AbstractToyMachine.call(this, name, price);
  this.engine = false;
  this.size = SIZE_MID;
}
SimpleToyMachine.prototype = new AbstractToyMachine();

function ElectroMobile(name, price) {
  AbstractToyMachine.call(this, name, price);
  this.engine = true;
  this.size = SIZE_BIG;
}
ElectroMobile.prototype = new AbstractToyMachine();

function ModelMachine(name, price, innerStructure) {
  AbstractToyMachine.call(this, name, price);
  this.engine = false;
  this.size = SIZE_SMALL;
  //Can the doors be opened and the interior of the car modeled
  this.innerStructure = innerStructure;
}
ModelMachine.prototype = new AbstractToyMachine();

//-----------BALLS BRANCH--------
function AbstractBall(name, price, material) {
  AbstractToy.call(this, name, price);
  this.material = material || "no material";
}
AbstractBall.prototype = new AbstractToy();

//----------
function RubberBall(name, price, pictures) {
  AbstractBall.call(this, name, price);
  this.material = "rubber";
  this.picteres = pictures;
}
RubberBall.prototype = new AbstractBall();

function SportBall(name, price, designedFor) {
  AbstractBall.call(this, name, price);
  this.material = "fake skin";
  this.designedFor = designedFor;
}
SportBall.prototype = new AbstractBall();
//-------------

var wallet = 250.00;
var toys = [];

// CREATE TOYS
createToy(new SimpleToyMachine("Colored Car", 15.00, true), 0, 10);
createToy(new ToySoldier("Trooper", 10.00, true), 6, 15);
createToy(new Doll("Barbie", 25.00, true, false), 6, 14);
createToy(new ToySoldier("Starship Trooper", 18.99, false), 5, 18);
createToy(new RubberBall("Disney Ball", 5.60, true), 0, 12);
createToy(new SportBall("UEFA Ball", 30, "football"), 15, 18);
createToy(new Doll("Pony", 14.50, true, false), 3, 12);
createToy(new ModelMachine("BMW model", 50.99, true), 12, 18);
createToy(new ActionFigure("Megazord", 100.50, "sword"), 8, 18);

//operate toys
toys.sort(function age(a, b) {
  return (a.ageFrom > b.ageFrom);
})

function createToy(toy, ageFrom, ageTo) {
  toy.setupAge(ageTo, ageFrom);
  addToy(toy);
}

function addToy(toy) {
    if((wallet - toy.price) >= 0) {
      wallet -= toy.price;
      return toys.push(toy);
    } else {
      return false;
    }
}

function showToysByType(type, inputAr) {
  var tempArray = [];
  inputAr.forEach(function (toy) {
    //i know this is bad
    if(eval("toy instanceof "+ type) ) {
       tempArray.push(toy);
    }
  });
  return tempArray;
}

function printToys() {
  console.log("\n==========================");
  toysTable.innerHTML = "";

  var tempToys = toys;

  if(priceField.value) {
    tempToys = showToysByPrice(priceField.value, tempToys);
  }

  if(ageField.value) {
    tempToys = showToysByAge(ageField.value, tempToys);
  }

  if(genderSelect.value) {
    tempToys = showToysByGender(genderSelect.value, tempToys);
  }

  if(typeSelect.value) {
    tempToys = showToysByType(typeSelect.value, tempToys);
  }

  var resString = "";
  resString += "<tr>";
  resString += "<th>NAME</th>";
  resString += "<th>age:</th>";
  resString += "<th>price, $</th>";
  resString += "</tr>";

  tempToys.forEach(function(toy) {
    var toyString = "\""+toy.name+ "\", age: " + toy.ageFrom + "-" + toy.ageTo+", price: $"+toy.price;
    console.log(toyString);
    resString += "<tr>";
    resString += "<td>" +toy.name + "</td>";
    resString += "<td>" +toy.ageFrom + "-" + toy.ageTo + "</td>";
    resString += "<td>" +toy.price + "</td>";
    resString += "</tr>";
  });
  toysTable.innerHTML += resString;
}

function showToysByAge(age, inputAr) {
  console.log("\nTOYS FOR AGE: " + age);
  var tempArray = [];
  inputAr.forEach(function(toy) {
    if((age >= toy.ageFrom) && (age <= toy.ageTo)) {
      tempArray.push(toy);
    }
  });
  return tempArray;
}

function showToysByPrice(upperPrice, inputAr) {
  console.log("\nSHOW BY PRICE: " + upperPrice);
  var tempArray = [];
  inputAr.forEach(function (toy) {
    if(upperPrice >= toy.price) {
      // console.log(toy);
      tempArray.push(toy);
    }
  });
  return tempArray;
}

function showToysByGender(givenGender, inputAr) {
  console.log("\nSHOW TOYS FOR GENDER: " + givenGender);
  var tempArray = [];
  inputAr.forEach(function (toy) {
    if(toy.gender === givenGender) {
      tempArray.push(toy);
    }
  });
  return tempArray;
}
