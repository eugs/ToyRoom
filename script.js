const MALE = "male";
const FEMALE = "female";
const ANY = "both_genders";

const SIZE_SMALL = "small";
const SIZE_MID = "mid";
const SIZE_BIG = "big";

//-----linking field ------
var button = document.getElementById("btn");
var toysTable = document.getElementById("toys_table");
var priceField = document.getElementById("price_field");
var ageField = document.getElementById("age_field");
var genderSelect = document.getElementById("gender_select");
var typeSelect = document.getElementById("type_select");


button.onclick = function() {
  printToys();
};

// ROOT
function AbstractToy (name, price, gender) {
  this.name = name || "unnamed toy";
  this.price = price || -1;
  this.gender = gender || ANY;
  this.ageTo = 100;
  this.ageFrom = 0;
}

//add functions
// AbstractToy.prototype.getPrice = function () {
//   return this.price;
// }
//
// AbstractToy.prototype.getGender = function () {
//   return this.gender;
// }
//
// AbstractToy.prototype.getName = function () {
//   return this.name;
// }

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

var wallet = 150.00;
var toys = [];

// CREATE TOYS
var car = new SimpleToyMachine("Colored Car", 15.00, true);
car.setupAge(10, 0);
addToy(car);

var soldier = new ToySoldier("Trooper", 10.00, true);
soldier.setupAge(15, 6);
addToy(soldier);

var bionycle = new ActionFigure("Megazord", 100.50, "megazord's sword");
bionycle.setupAge(18, 8);

var barbie = new Doll("Barbie", 25.00, true, false);
barbie.setupAge(14, 6);
addToy(barbie);

var trooper = new ToySoldier("Starship Trooper", 18.99, false);
trooper.setupAge(18, 5);
addToy(trooper);

var coloredBall = new RubberBall("Disney Ball", 5.60, true);
coloredBall.setupAge(12, 0);
addToy(coloredBall);

var footBall = new SportBall("UEFA Ball", 30, "football");
footBall.setupAge(18, 15);
addToy(footBall);



//operate toys
toys.sort(function age(a, b) {
  return (a.ageFrom > b.ageFrom);
})
// oys();
//
// toys.sort(function age(a, b) {
//   return (a.ageTo > b.ageTo);
// });

// toys.sort(function (a, b) {
//   return (a.getPrice() > b.getPrice());
// })

// showToysByGender(MALE);
// showToysByAge(14);
// showToysByPrice(15.00);
// showToysByType(AbstractFigure);
// printToys();

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
  // var typeObj = Object.create(type);
  // var p = eval("new " + type + "()");
  // var typeObj = new window[type];
  // console.log(typeObj);

  inputAr.forEach(function (toy) {
    //i know this is bad
    if(eval("toy instanceof "+ type) ) {
       tempArray.push(toy);
    }
    // var strFunc = "if (toy instanceof " + type +
    //   ") { tempArray.push(toy);}";
    //   console.log(strFunc);
    // eval(strFunc);
  });
  return tempArray;
}

function printToys() {
  toysTable.innerHTML = "";

  var tempToys = toys;
  console.log(tempToys);

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
    console.log(typeSelect.value);
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
    resString += "<td>" +toy.ageFrom + "- " + toy.ageTo + "</td>";
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
