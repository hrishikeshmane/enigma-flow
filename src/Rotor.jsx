const Rotor = ({ name, handleUp, handleDown, display }) => {
  return (
    <div>
      <span>
        <button name={name} onClick={handleUp}>
          ↑
        </button>
      </span>
      <p>{display[0][0]} </p>
      <span>
        <button name={name} onClick={handleDown}>
          ↓
        </button>
      </span>
    </div>
  );
};

export default Rotor;
