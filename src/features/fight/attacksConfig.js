export const attacksConfig = [

  // Attaques communes 
  {
    name: "Coup de poing",
    actionType: "punch",
    minDamage: 5,
    maxDamage: 10,
    manaCost: 0,
    icon: "fas fa-fist-raised",
    classes: ["Guerrier", "Archer", "Mage", "Paladin"]
  },
  
  // Attaques de Guerrier
  {
    name: "Coup d'epee",
    actionType: "swordStrike",
    minDamage: 10,
    maxDamage: 15,
    manaCost: 0,
    icon: "fas fa-sword",
    classes: ["Guerrier"]
  },
  {
    name: "Cri de guerre",
    actionType: "warCry",
    minDamage: 5, 
    maxDamage: 15,
    manaCost: 10,
    icon: "fas fa-bullhorn",
    classes: ["Guerrier"]
  },
  {
    name: "Frappe tourbillonnante",
    actionType: "whirlwindStrike",
    minDamage: 15,
    maxDamage: 25,
    manaCost: 15,
    icon: "fas fa-sync-alt",
    classes: ["Guerrier"]
  },
  
  // Attaques d'Archer
  {
    name: "Tir precis",
    actionType: "preciseShot",
    minDamage: 12,
    maxDamage: 18,
    manaCost: 0,
    icon: "fas fa-bullseye",
    classes: ["Archer"]
  },
  {
    name: "Pluie de flèches",
    actionType: "arrowRain",
    minDamage: 15,
    maxDamage: 25,
    manaCost: 15,
    icon: "fas fa-angle-double-down",
    classes: ["Archer"]
  },
  {
    name: "Tir empoisonne",
    actionType: "poisonedShot",
    minDamage: 5,
    maxDamage: 10,
    manaCost: 5,
    icon: "fas fa-skull-crossbones",
    special: "poison",
    classes: ["Archer"]
  },

  // Attaques de Mage
  {
    name: "Trait de feu",
    actionType: "fireBolt",
    minDamage: 8,
    maxDamage: 14,
    manaCost: 5,
    icon: "fas fa-fire",
    classes: ["Mage"]
  },
  {
    name: "Nova arcanique",
    actionType: "arcaneNova",
    minDamage: 20,
    maxDamage: 30,
    manaCost: 20,
    icon: "fas fa-radiation",
    classes: ["Mage"]
  },
    {
    name: "Conversion d'energie",
    actionType: "energyConversion",
    minDamage: 0,
    maxDamage: 0,
    manaCost: 0,
    icon: "fas fa-recycle",
    special: "mageMana",
    selfTarget: true,
    classes: ["Mage"]
  },
  
  // Attaques de Paladin
  {
    name: "Frappe de lumière",
    actionType: "lightStrike",
    minDamage: 8,
    maxDamage: 14,
    manaCost: 0,
    icon: "fas fa-sun",
    classes: ["Paladin"]
  },
  {
    name: "Bouclier divin",
    actionType: "divineShield",
    minDamage: 12,
    maxDamage: 20,
    manaCost: 15,
    icon: "fas fa-shield-alt",
    classes: ["Paladin"]
  },
  {
    name: "Lumière sacree",
    actionType: "sacredLight",
    minDamage: 0,
    maxDamage: 0,
    manaCost: 15,
    icon: "fas fa-hand-holding-medical",
    healing: true,
    selfHealing: true,  
    healMax: 25,
    classes: ["Paladin"]
  }
];