import "./ProgressBar.css";

function ProgressBar({ pv, pvMax, faType, barName, type }) {
  return (
    <div className="progress-container">
      <div className="progress">
        <div 
          className={`progress-bar ${type}`}
          style={{ width: (pv * 100 / pvMax) + "%" }}
          aria-valuenow={pv}
          aria-valuemin="0"
          aria-valuemax={pvMax}
          role="progressbar"
        >
        </div>
      </div>
      <div className="progress-text">
        <i className={`${faType} icon-text`}>
          {pv}/{pvMax} {barName}
        </i>
      </div>
    </div>
  );
}

export default ProgressBar;