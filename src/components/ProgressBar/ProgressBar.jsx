import "./ProgressBar.css";

function ProgressBar({ pv, pvMax, faType, barName, bgType }) {
  return (
    <div className="progress md-progress">
      <div 
        className="progress-bar"
        style={{ width: (pv * 100 / pvMax) + "%" }}
        aria-valuenow={pv}
        aria-valuemin="0"
        aria-valuemax={pvMax}
        role="progressbar"
      >
        <i className={` fas ${faType} ${bgType} icon-text`}>
          {pv} {barName}
        </i>
      </div>
    </div>
  );
}

export default ProgressBar;