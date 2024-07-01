import React, { useContext } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

const ExpenseItem = (props) => {
  // useContext returns the context value for the context you passed
  // and store the values to dispatch locally
  const { currency, dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
    });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    Swal.fire({
      position: "top",
      icon: "success",
      title: "+10",
      text: "Expense increase by 10 successfully.",
      showConfirmButton: false,
      timer: 1500
    });

  };

  const decreaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    dispatch({
      type: "RED_EXPENSE",
      payload: expense,
    });

    Swal.fire({
      position: "top",
      icon: "warning",
      title: "-10",
      text: "Expense decrease by 10 successfully.",
      showConfirmButton: false,
      timer: 1500
    });

    // alert("Expense reduce by [10] successfully.");
  };

  return (
    <tr>
     <td>{props.row}</td>
      <td>{props.name}</td>
      <td>
        {currency}
        {props.cost}
      </td>
      <td>
        <FaPlusCircle
          size="2.2em"
          color="SpringGreen"
          onClick={(event) => increaseAllocation(props.name)}
        ></FaPlusCircle>
      </td>
      <td>
        <FaMinusCircle
          size="2.2em"
          color="red"
          onClick={(event) => decreaseAllocation(props.name)}
        ></FaMinusCircle>
      </td>
      <td>
        <TiDelete color="orange" size="1.5em" onClick={handleDeleteExpense}></TiDelete>
      </td>
    </tr>
  );
};

export default ExpenseItem;
