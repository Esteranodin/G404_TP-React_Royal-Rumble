import "./ButtonCapacity.css";

function ButtonCapacity() {
  const fight = () => {
    console.log("aie !");
  };

  return (
    <button
      type="button"
      onClick={fight}
      className="btn btn-success material-tooltip-main "
    >
      hit
      <i className="fas fa-bomb"></i> 5<i className="fas fa-fire-alt"></i> - 5
    </button>
  );
}

export default ButtonCapacity;
