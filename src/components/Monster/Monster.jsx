import './Monster.css';
import ProgressBar from "../ProgressBar/ProgressBar";
import { useSelector } from 'react-redux';
import { selectMonster } from '../../features/fight/fightSelectors';

function Monster() {
  const monster = useSelector(selectMonster);
  
  // Image du monstre
  const getMonsterImage = () => {
    switch(monster.type) {
      case 'dragon':
        return "../../assets/dragon.jpg"; 
    }
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="card-monstre col-sm-12">
            <div id="monsterCard">
              <h3 className="monster-name">{monster.name}</h3>
              <div className="text-center">
                <div className="row">
                  <div className="col-sm-6 offset-sm-3">
                    <span
                      className="badge badge-danger ml-2 "
                      id="degatSpanMonster"
                    ></span>
                    <img
                      className="img-fluid monster-image"
                      src={getMonsterImage()}
                      alt={monster.name}
                    />
                  </div>
                  <div id="comboOnMonster" className="col-sm-6"></div>
                </div>
              </div>
              <ProgressBar
                pv={monster.pv}
                pvMax={monster.pvMax}
                bgType="bg-danger"
                faType="fa-heart"
                barName=" : pv"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Monster;
