import React from 'react';
import { useAttack } from '../../features/fight/hooks/useAttack';
import { attacksConfig } from '../../features/fight/attacksConfig';
import './ButtonCapacity.css';

const ButtonCapacity = ({ player }) => {
  return (
    <div className="button-container">
      {attacksConfig.map((attack, index) => {
        const { 
          handleAttack, 
          isDisabled, 
          notEnoughMana, 
          manaCost 
        } = useAttack(player, attack.actionType);
        
        // Combiner les conditions
        const buttonDisabled = isDisabled || notEnoughMana;
        
        return (
          <button 
            key={index}
            className={`btn ${attack.icon} ${buttonDisabled ? 'disabled' : ''} ${notEnoughMana ? 'no-mana' : ''}`}
            onClick={handleAttack}
            disabled={buttonDisabled}
            title={notEnoughMana ? "Pas assez de mana!" : ""}
          >
            {attack.icon && <i className={attack.icon}></i>} {attack.name}
            {manaCost > 0 && <span className="manaShow"> ({manaCost} mana)</span>}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(ButtonCapacity);
