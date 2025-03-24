import { useSelector } from "react-redux";
import "./Messages.css";


function Messages() {
  const gameMessages = useSelector(state => state.fight.combatMessages);

  return (
    <div className="combat-log">
      <h4>Journal de combat</h4>
      {gameMessages.length === 0 ? (
        <p>Le combat n'a pas encore commencé...</p>
      ) : (
        <ul>
          {gameMessages.map((message, index) => (
            <li key={index} className={message.includes("rate") ? "miss-message" : "hit-message"}>
              {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

}

export default Messages;