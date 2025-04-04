import { createSlice } from "@reduxjs/toolkit";
import { getNextPlayer, handleRoundEnd, startNewRound } from "../../utils/turnUtils";
import { handlePlayerAttack, handleCounterAttack, handleMonsterSpecialAttack } from "../../utils/attackUtils";
import { createCombatMessage } from "../../utils/messageUtils";


const initialState = {
    players: [
        { name: "Thorgar", class: "Guerrier", pv: 150, pvMax: 150, mana: 20, manaMax: 20, id: 1, icon: "fa-shield-alt" },
        { name: "Lyandra", class: "Archer", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2, icon: "fa-bow-arrow" },
        { name: "Eldryn", class: "Mage", pv: 80, pvMax: 80, mana: 50, manaMax: 50, id: 3, icon: "fa-hat-wizard" },
        { name: "Darius", class: "Paladin", pv: 130, pvMax: 130, mana: 40, manaMax: 40, id: 4, icon: "fa-hammer" },
        
    ],
    monster: {
        name: "Nalargwen le dragon ancien",
        icon: "fa-dragon",
        pv: 250,
        pvMax: 250,
        type: "dragon"
    },

    currentTurn: {
        playerId: 1,
        turnNumber: 1,
        roundNumber: 1,
        playersPlayed: []
    },

    gameStatus: "playing",
    combatMessages: [],
    shouldClearMessages: false, // pour indiquer qd nettoyer messages
};

export const fightSlice = createSlice({
    name: "fight",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.combatMessages = [...state.combatMessages, action.payload];
        },

        clearMessages: (state) => {
            state.combatMessages = [];
            state.shouldClearMessages = false;
        },

        setShouldClearMessages: (state, action) => {
            state.shouldClearMessages = action.payload;
        },

        attack: (state, action) => {
            // logique complexe extraites dans des utils -- optimisation 
            const { damage, attackType, manaCost = 0 } = action.payload;

            // attaque du joueur via les utlitaires de gestion des attaques 
            const attackResult = handlePlayerAttack(state, damage, manaCost, attackType);
            if (!attackResult.success) return;

            state.combatMessages = [...state.combatMessages, ...attackResult.messages];

            // contre attaque monstre
            const counterAttackMessages = handleCounterAttack(state, attackResult.currentPlayer);
            state.combatMessages = [...state.combatMessages, ...counterAttackMessages];

            // Passer au tour suivant
            fightSlice.caseReducers.nextTurn(state);
        },

        monsterAttack: (state) => {
            const messages = handleMonsterSpecialAttack(state);
            state.combatMessages = [...state.combatMessages, ...messages];
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
            state.shouldClearMessages = false;
        },

        nextTurn: (state) => {
            // Ajoute joueur actuel liste joueurs qui ont dajà joué pdt round
            if (!state.currentTurn.playersPlayed.includes(state.currentTurn.playerId)) {
                state.currentTurn.playersPlayed.push(state.currentTurn.playerId);
            }

            // joueurs restants pour round
            const { remainingPlayers, alivePlayers } = getNextPlayer(state.players, state.currentTurn);

            if (remainingPlayers.length === 0) {
                // Fin du round
                if (handleRoundEnd(state)) {
                    state.combatMessages = [...state.combatMessages, createCombatMessage('SYSTEM', 'turnMonster')];
                    fightSlice.caseReducers.monsterAttack(state);
                }

                // Commencer un nouveau round
                const newRoundPlayer = startNewRound(state);
                if (newRoundPlayer) {
                    state.currentTurn.turnNumber++;
                    state.combatMessages = [...state.combatMessages, createCombatMessage('SYSTEM', 'turnChange', newRoundPlayer)];
                }
            } else {
                // joueur suivant qui n'a pas encore joué
                state.currentTurn.playerId = remainingPlayers[0].id;
                state.currentTurn.turnNumber++;
                state.combatMessages = [...state.combatMessages, createCombatMessage('SYSTEM', 'turnChange', remainingPlayers[0].name)];
            }
        },
    },
});


export const {
    addMessage,
    clearMessages,
    setShouldClearMessages,
    attack,
    monsterAttack,
    resetGame,
} = fightSlice.actions;

export default fightSlice.reducer;