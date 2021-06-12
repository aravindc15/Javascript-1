// constants
const EMPTY_ARRAY = [];
const EMPTY_STRING = '';

// get form elements 
const form = document.getElementById('dino-compare');    
const name = document.getElementById('name');    
const feet = document.getElementById('feet');    
const inches = document.getElementById('inches');    
const weight = document.getElementById('weight');    
const diet = document.getElementById('diet');
const compareBtn = document.getElementById('btn');
const grid = document.getElementById("grid");

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

let dinos = EMPTY_ARRAY;

// Create Dino Objects
createDinos().then((dinoData) => {
  dinos = dinoData;
});

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen
compareBtn.addEventListener('click', ()=>{
    form.remove();
})

// On button click, prepare and display infographic
