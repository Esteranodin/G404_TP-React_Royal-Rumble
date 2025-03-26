// Messages combats
export const COMBAT_MESSAGES = {
  ATTACK: {
    // Attaque commune
    punch: (playerName, damage) => `${playerName} assène un coup de poing infligeant ${damage} dégâts !`,
    
    // Attaques Guerrier
    swordStrike: (playerName, damage) => `${playerName} donne un coup d'épée infligeant ${damage} dégâts !`,
    warCry: (playerName, damage) => `${playerName} pousse un cri de guerre terrifiant et inflige ${damage} dégâts !`,
    whirlwindStrike: (playerName, damage) => `${playerName} exécute une frappe tourbillonnante infligeant ${damage} dégâts !`,
    
    // Attaques Archer
    preciseShot: (playerName, damage) => `${playerName} effectue un tir précis infligeant ${damage} dégâts !`,
    arrowRain: (playerName, damage) => `${playerName} déchaîne une pluie de flèches infligeant ${damage} dégâts !`,
    poisonedShot: (playerName, damage) => `${playerName} tire une flèche empoisonnée infligeant ${damage} dégâts !`,
    
    // Attaques Mage
    fireBolt: (playerName, damage) => `${playerName} lance un trait de feu infligeant ${damage} dégâts !`,
    arcaneNova: (playerName, damage) => `${playerName} libère une nova arcanique dévastatrice infligeant ${damage} dégâts !`,
    energyConversion: (playerName, pvLost, manaGained) => `${playerName} sacrifie ${pvLost} points de vie pour récupérer ${manaGained} points de mana !`,
    
    // Attaques  Paladin
    lightStrike: (playerName, damage) => `${playerName} frappe avec la lumière sacrée infligeant ${damage} dégâts !`,
    divineShield: (playerName, damage) => `${playerName} invoque un bouclier divin qui repousse l'ennemi et inflige ${damage} dégâts !`,
    sacredLight: (playerName, amount) => `${playerName} s'enveloppe de lumière sacrée et récupère ${amount} points de vie !`,

  },
  SYSTEM: {
    gameStart: () => `Que le combat commence !`,
    notEnoughMana: () => `Pas assez de mana pour cette attaque !`,
    playerDied: (playerName) => `${playerName} est mort !`,
    gameWon: (playerName) => `Victoire de ${playerName} !`,
    turnChange: (playerName) => `C'est au tour de ${playerName} !`,
    turnMonster: () => `🔥 C'est au tour du monstre !`,
    roundStart: (roundNumber) => `🔄 Round ${roundNumber} commence !`,
    selectTarget: () => `Sélectionnez un joueur à soigner`,
    notEnoughHealth: () => `Vous n'avez pas assez de points de vie pour cette action !`,
  },
  MONSTER: {
    counterAttack: (playerName, damage) => `Le monstre contre-attaque et inflige ${damage} dégâts à ${playerName} !`,
    missedAttack: () => `Le monstre rate sa contre-attaque !`,	
    bigAttack: (playerName, damage) => `💢 Le monstre concentre une attaque puissante sur ${playerName} et lui inflige ${damage} !`,
    bigMissedAttack: (playerName) => `Le monstre rate complètement son attaque sur ${playerName} !`,
  }
};

// Fonction helper pour créer un message de combat
export const createCombatMessage = (type, subtype, ...args) => {
  if (!COMBAT_MESSAGES[type]) {
    console.warn(`Type de message inconnu: ${type}`);
    return "Message non défini";
  }

  if (!COMBAT_MESSAGES[type][subtype]) {
    console.warn(`Sous-type de message inconnu: ${subtype}`);
    return "Message non défini";
  }

  return COMBAT_MESSAGES[type][subtype](...args);
};