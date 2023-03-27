function Spinner(spinMessage) {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
      {spinMessage && (
        <div className="spin-message">
          <p>Server is loading</p>
        </div>
      )}
    </div>
  );
}

export default Spinner;
