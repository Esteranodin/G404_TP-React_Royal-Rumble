import { createSlice } from "@reduxjs/toolkit";
import { applyDamageToMonster, applyDamageToPlayer } from "../../utils/gamePlay";

const initialState = {
    players: [
        { name: "Pepie", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 1 },
        { name: "Oliv", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 2 },
        { name: "Prune", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 3 },
        { name: "Tom", pv: 100, pvMax: 100, mana: 30, manaMax: 30, id: 4 },
    ],
    monster: {
        name: "Ménade",
        pv: 80,
        pvMax: 100,
    },

    gameStatus: "playing",
    combatMessages: [],
};

export const fightSlice = createSlice({
    name: "fight",
    initialState,
    reducers: {
        punchHit: (state, action) => {
            const damage = action.payload;
            const statusMessage = applyDamageToMonster(state, damage);
            

            if (statusMessage) {
                state.combatMessages.unshift(statusMessage);
            }
        },

        swordHit: (state, action) => {
            const damage = action.payload;
            const statusMessage = applyDamageToMonster(state, damage);
            
            if (statusMessage) {
                state.combatMessages.unshift(statusMessage);
            }
        },

        swordHitCharged: (state, action) => {
            const damage = action.payload;
            const statusMessage = applyDamageToMonster(state, damage);
            
            if (statusMessage) {
                state.combatMessages.unshift(statusMessage);
            }
        },

        fireBall: (state, action) => {
            const manaCost = 10;
            const damage = action.payload;
            
            if (state.players[0].mana >= manaCost) {
                state.players[0].mana -= manaCost;
                const statusMessage = applyDamageToMonster(state, damage);
                
                if (statusMessage) {
                    state.combatMessages.unshift(statusMessage);
                }
            }
        },

        hitBack: (state, action) => {
            const { damageBack, targetId } = action.payload;
            const statusMessage = applyDamageToPlayer(state, damageBack, targetId);
            
            if (statusMessage) {
                state.combatMessages.unshift(statusMessage);
            }
        },

        addCombatMessage: (state, action) => {
            state.combatMessages.unshift(action.payload);
        },

        clearCombatMessages: (state) => {
            state.combatMessages = [];
        },
        
        resetGame: (state) => {
            return initialState;
        },
    },
});


export const { 
    punchHit, 
    fireBall, 
    swordHit, 
    swordHitCharged, 
    hitBack, 
    addCombatMessage, 
    clearCombatMessages,
    resetGame 
} = fightSlice.actions;

export default fightSlice.reducer;