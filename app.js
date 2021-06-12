// constants
const EMPTY_ARRAY = [];
const EMPTY_STRING = "";
const EMPTY_OBJECT = {};

// get form elements
const form = document.getElementById("dino-compare");
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");
const compareBtn = document.getElementById("btn");
const grid = document.getElementById("grid");

// variables
let dinos = EMPTY_ARRAY;

// helpers
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Create Dino factory
function DinoFactory(dino) {
  return {
    species: dino.species,
    weight: dino.weight,
    height: dino.height,
    diet: dino.diet,
    where: dino.where,
    when: dino.when,
    fact: dino.fact,
  };
}

// Create Human factoy
function HumanFactory(name, weight, height, diet) {
  return {
    name: name,
    weight: weight,
    height: height,
    diet: diet,
  };
}

// get data from dino json and construct dino data.
const createDinos = async () => {
  const response = await fetch("dino.json");
  const data = await response.json();
  const dinosData = data.Dinos;
  const dinoObjects = dinosData.map((dino) => DinoFactory(dino));

  return dinoObjects;
};

// Create Dino Objects
createDinos().then((dinoData) => {
  dinos = dinoData;
});

// Generate Tiles for each Dino in Array
function generateTiles(humanData) {
  let tiles = EMPTY_ARRAY;
  const randomizedDinoFacts = shuffleDinoFacts(humanData);
  // place the human tile at the centre.
  dinos.splice(4, 0, humanData);
  let fragment = document.createDocumentFragment();

  dinos.forEach((dino, index) => {
    const speciesName = dino.species || humanData.name;
    const src = dino.species ? dino.species.toLowerCase() : "human";
    const fact =
      dino.species === "Pigeon"
        ? "All birds are Dinosaurs."
        : dino.fact && randomizedDinoFacts[index];

    const title = document.createElement("h4");
    title.textContent = speciesName;

    const img = document.createElement("img");
    img.src = `images/${src}.png`; // this would be a problem if the file name is different from species name.
    img.alt = "tile";

    const paragraph = document.createElement("p");
    paragraph.textContent = fact;
    paragraph.style.fontSize = "0.8em";

    const div = document.createElement("div");
    div.className = "grid-item";

    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(paragraph);

    fragment.appendChild(div);
  });

  grid.appendChild(fragment);
}

// submit the form whenever compare me is clicked.
function submitForm() {
  // Use IIFE to get human data from form
  const human = (function getHumanData() {
    const heightInInches = Number(feet.value * 12 + inches.value);
    const humanName = name.value || EMPTY_STRING;
    const humanWeight = weight.value;
    const humanDiet = diet.value;

    // Create Human Object
    const humanData = new HumanFactory(
      humanName,
      humanWeight,
      heightInInches,
      humanDiet
    );
    return humanData;
  })();

  // Add tiles to DOM
  generateTiles(human);

  // Remove form from screen
  form.remove(); // can be also done by setting the display property.
}

function compareDiet(human, dino = EMPTY_OBJECT) {
  return human.diet === dino.diet
    ? "This dino and you seem to prefer the same diet."
    : "This dino has a different diet preference than you.";
}
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(human, dino = EMPTY_OBJECT) {
  if (human.weight == dino.weight) {
    return "This dinosaur has the same weight as you.";
  } else if (human.weight < dino.weight) {
    return `This dinosaur is ${dino.weight - human.weight} lbs more than you`;
  } else {
    return `This dinosaur is ${
      human.weight - dino.weight
    } lbs lesser than you.`;
  }
}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight(human, dino = EMPTY_OBJECT) {
  if (human.height == dino.height) {
    return "This dinosaur is the same height as you.";
  } else if (human.height < dino.height) {
    return `This dinosaur is ${
      dino.height - human.height
    } inches taller than you.`;
  } else {
    return `This dinosaur is ${
      human.height - dino.height
    } inches shorter than you.`;
  }
}

function shuffleDinoFacts(humanData, dino) {
  const facts = dinos.map((dino) => dino.fact);

  return shuffleArray(facts);
}

// On button click, prepare and display infographic
compareBtn.addEventListener("click", submitForm);
