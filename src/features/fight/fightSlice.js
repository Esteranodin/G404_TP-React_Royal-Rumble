import { createSlice } from "@reduxjs/toolkit";
import { applyDamageToMonster, applyDamageToPlayer, damageRandom } from "../../utils/gamePlay";
import { createCombatMessage } from "../../utils/messageUtils";


const initialState = {
    players: [
        { name: "Pepie", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
        { name: "Oliv", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
        { name: "Prune", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
        { name: "Tom", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
    ],
    monster: {
        name: "Ménade",
        pv: 200,
        pvMax: 200,
    },

    currentTurn: {
        playerId: 1,
        turnNumber: 1,
        roundNumber: 1,
        playersPlayed: []
    },

    gameStatus: "playing",
    combatMessages: [],
};

export const fightSlice = createSlice({
    name: "fight",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.combatMessages.unshift(action.payload);
            // Limite le nombre de messages pour éviter des problèmes de performance
            if (state.combatMessages.length > 50) {
                state.combatMessages.pop();
            }
        },

        clearMessages: (state) => {
            state.combatMessages = [];
        },

        attack: (state, action) => {
            const { damage, attackType, manaCost = 0 } = action.payload;
            const currentPlayer = getCurrentPlayer(state);

            if (manaCost > 0 && currentPlayer.mana < manaCost) {
                return;
            }

            if (manaCost > 0) {
                currentPlayer.mana -= manaCost;
            }

            const statusMessage = applyDamageToMonster(state, damage);
            if (statusMessage) {
                state.combatMessages.unshift(statusMessage);
            }

            // Attaque opportunité monstre
            if (state.monster.pv > 0 && state.gameStatus === "playing") {

                const damageBack = damageRandom(3, 8);
                if (damageBack > 0) {
                    const messageBack = applyDamageToPlayer(state, damageBack, currentPlayer.id);
                    state.combatMessages.unshift(createCombatMessage('MONSTER', 'counterAttack', currentPlayer.name, damageBack));

                    if (messageBack) {
                        state.combatMessages.unshift(messageBack);
                    }
                } else {
                    state.combatMessages.unshift(createCombatMessage('MONSTER', 'missedAttack'));
                }
            }

            // Passer au tour suivant
            fightSlice.caseReducers.nextTurn(state);
        },

        monsterAttack: (state) => {

            const alivePlayers = state.players.filter(player => player.pv > 0);

            if (alivePlayers.length > 0) {
                // Afficher les joueurs vivants pour débogage

                // Joueur vivant au hasard
                const randomIndex = Math.floor(Math.random() * alivePlayers.length);
                const targetPlayer = alivePlayers[randomIndex];

                const damageBase = damageRandom(3, 8);
                const finalDamage = damageBase === 0 ? 0 : damageBase * 2;

               finalDamage === 0
                    ? state.combatMessages.unshift(createCombatMessage('MONSTER', 'bigMissedAttack', targetPlayer.name))
                    : state.combatMessages.unshift(createCombatMessage('MONSTER', 'bigAttack', targetPlayer.name, finalDamage));

                const statusMessage = applyDamageToPlayer(state, finalDamage, targetPlayer.id);

                // Si l'attaque a changé le statut du jeu, ajouter le message correspondant
                if (statusMessage) {
                    state.combatMessages.unshift(statusMessage);
                }
            }
        },


        resetGame: (state) => {
            // Réinitialiser les joueurs
            state.players.forEach((player) => {
                player.pv = player.pvMax;
                player.mana = player.manaMax;
            });

            // Réinitialiser le monstre
            state.monster.pv = state.monster.pvMax;

            // Réinitialiser le tour actuel
            state.currentTurn = {
                playerId: 1,
                turnNumber: 1,
                roundNumber: 1,
                playersPlayed: []
            };

            // Réinitialiser le statut et les messages
            state.gameStatus = "playing";
            state.combatMessages = [createCombatMessage('SYSTEM', 'gameStart')];
        },

        nextTurn: (state) => {
            // Ajoute joueur actuel liste joueurs qui ont dajà joué pdt round
            if (!state.currentTurn.playersPlayed.includes(state.currentTurn.playerId)) {
                state.currentTurn.playersPlayed.push(state.currentTurn.playerId);
            }

            // Ceux qui n'ont pas encore joué round + en vie
            const alivePlayers = state.players.filter(player => player.pv > 0);
            const remainingPlayers = alivePlayers.filter(
                player => !state.currentTurn.playersPlayed.includes(player.id)
            );


            if (remainingPlayers.length === 0) {

                if (state.gameStatus === "playing" && alivePlayers.length > 0) {
                    state.combatMessages.unshift(createCombatMessage('SYSTEM', 'turnMonster'));

                    // Exécuter l'attaque spéciale du monstre de fin de round
                    fightSlice.caseReducers.monsterAttack(state);
                }

                // Commencer un nouveau round
                state.currentTurn.roundNumber++;
                state.currentTurn.playersPlayed = [];
                state.combatMessages.unshift(createCombatMessage('SYSTEM', 'roundStart', state.currentTurn.roundNumber));

                // Prendre le premier joueur vivant pour le nouveau round
                if (alivePlayers.length > 0) {
                    state.currentTurn.playerId = alivePlayers[0].id;
                    state.currentTurn.turnNumber++;
                    state.combatMessages.unshift(createCombatMessage('SYSTEM', 'turnChange', alivePlayers[0].name));
                }
            } else {
                // Sinon, passer au joueur suivant qui n'a pas encore joué
                state.currentTurn.playerId = remainingPlayers[0].id;
                state.currentTurn.turnNumber++;
                state.combatMessages.unshift(createCombatMessage('SYSTEM', 'turnChange', remainingPlayers[0].name));
            }
        },
    },
});

const getCurrentPlayer = (state) => {
    return state.players.find(p => p.id === state.currentTurn.playerId);
};

export const {
    addMessage,
    clearMessages,
    attack,
    monsterAttack,
    resetGame,
} = fightSlice.actions;

export default fightSlice.reducer;