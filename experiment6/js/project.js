// project.js - purpose and description here
// Author: Your Name
// Date:



class Civilization {
  ethical_ideology = ["spirituality",
    "materialism",
    "egalitarianism",
    "heirarchical",
    "militarism", ,
    "pacifist",
    "diversity",
    "hegemony",
    "freedom",
    "control",
    "conservitism",
    "progressivism",
    "isolationist",
    "expansionist"]
    governing_ideology = ["parliamentarian",
      "socialist",
      "libertarian",
      "fascist",
      "technocratic",
      "nationalism",
      "confederate",
      "corporatist",
      "feudal",
      "anarchal",
      "republican",
      "presidential",
      "theocratic"]
    succession = [
      "democracy",
      "oligarchy",
      "dictatorship",
      "imperial state",
      "meritocracy",
      "monarchy",
      "mandate of heaven"
    ]
    economic_system = ["mercantile",
      "communal",
      "capitalist",
      "social welfare",
      "plunder",
      "agrarian",
      "controlled economy",
      "laissez faire",
      "colonial"
    ]
    
  // constructor function
  constructor() {

  }
  
  generateCivilization() {
    let civilization = {
      "ethical_ideology": this.ethical_ideology[Math.floor(Math.random() * this.ethical_ideology.length)],
      "governing_ideology": this.governing_ideology[Math.floor(Math.random() * this.governing_ideology.length)],
      "succession": this.succession[Math.floor(Math.random() * this.succession.length)],
      "economic_system": this.economic_system[Math.floor(Math.random() * this.economic_system.length)]
    }
    return `This is a ${civilization.governing_ideology} ${civilization.succession} which values ${civilization.ethical_ideology} and features a ${civilization.economic_system} economic system.`;
  }
}

function main() {
  // create an instance of the class
  let myInstance = new MyProjectClass("value1", "value2");

  // call a method on the instance
  myInstance.myMethod();
}

// let's get this party started - uncomment me
//main();