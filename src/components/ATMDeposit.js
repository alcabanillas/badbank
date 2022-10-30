const ATMDeposit = ({ onChange, isValid }) => {
  return (
    <div className="text-center">
        <div className="row">
          <div className="col">
            <input type="number" min="0" onChange={onChange}></input>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input type="submit" className="btn btn-primary" disabled={!isValid} value="Submit" ></input>
          </div>
        </div>
    </div>
    
  );
};