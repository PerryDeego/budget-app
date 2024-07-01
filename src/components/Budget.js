import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

const Budget = () => {
  // useContext returns the context value for the context you passed
  // and store the values to budget locally
  const { budget, dispatch, currency, expenses } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  // When this event is triggered a new value is set for budget
  const handleBudgetChange = (event) => {
    setNewBudget(event.target.value);

    const totalExpenses = expenses.reduce((total, item) => {
      return (total += item.cost);
    }, 0);

    if (newBudget > 200000) {
      Swal.fire({
        position: "top",
        title: `Budget entered ${currency}` + budget,
        text: `Budget entered ${currency}` + event.target.value,
        icon: "error",
      });

      return;
    }

    if (newBudget < totalExpenses) {
      Swal.fire({
        position: "top",
        title: `Budget: ${currency}` + event.target.value,
        text: `Less than amount spent ${currency}` + totalExpenses,
        icon: "warning",
      });
      return;
    } 
      dispatch({
        type: "SET_BUDGET",
        payload: newBudget,
      });
  
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
