import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

const Budget = () => {
  // useContext returns the context value for the context you passed
  // and store the values to budget locally
  const { budget, currency, RemainingBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  // When this event is triggered a new value is set for budget
  const handleBudgetChange = (event) => {

    if (event.target.value > 20000) {
      Swal.fire({
        position: "top",
        title: `Budget entered ${currency}` + budget,
        text: `Budget entered ${currency}` + event.target.value,
        icon: "error"
      });

      return;
    } else if (event.target.value < RemainingBudget) {
      Swal.fire({
        position: "top",
        title: `Budget: ${currency}` + event.target.value,
        text: `Lower than amount spent ${currency}` + RemainingBudget,
        icon: "warning"
      });

      return;
    } 
     
  };

  return (
    <div className="alert alert-secondary">
      <span>Budget: {currency}</span>
      <input
        type="number"
        step="10"
        value={newBudget}
        onChange={handleBudgetChange}
      ></input>
    </div>
  );
};
export default Budget;
