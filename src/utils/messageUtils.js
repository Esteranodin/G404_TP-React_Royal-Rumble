// Messages combats
export const COMBAT_MESSAGES = {
  ATTACK: {
    punch: (playerName, damage) => `${playerName} assène un coup de poing infligeant ${damage} dégâts !`,
    sword: (playerName, damage) => `${playerName} donne un coup d'épée infligeant ${damage} dégâts !`,
    fireBall: (playerName, damage) => `${playerName} lance une boule de feu infligeant ${damage} dégâts !`,
    swordCharged: (playerName, damage) => `${playerName} donne un puissant coup d'épée infligeant ${damage} dégâts !`,
  },
  SYSTEM: {
    gameStart: () => `Que le combat commence !`,
    notEnoughMana: () => `Pas assez de mana pour cette attaque !`,
    playerDied: (playerName) => `${playerName} est mort !`,
    gameWon: (playerName) => `Victoire de ${playerName} !`,
    turnChange: (playerName) => `C'est au tour de ${playerName} !`,
    turnMonster: () => `🔥 C'est au tour du monstre !`,
    roundStart: (roundNumber) => `🔄 Round ${roundNumber} commence !`,
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