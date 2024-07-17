import React, { useContext } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiChatDeleteFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseItem = (props) => {
  // useContext returns the context value for the context you passed
  // and store the values to dispatch locally
  const { currency, dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        position: "top",
        title: "Are you sure?",
        text: "You won't be able to recover allocation!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, clear it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.success(`Allocation Remove`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            showConfirmButton: false,
          });

          dispatch({
            type: "DELETE_EXPENSE",
            payload: props.id,
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            position: "top",
            title: "Cancelled",
            text: "Allocation unchanged.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 1000,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    toast.success(`Expense increase by +${currency}1,000`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      showConfirmButton: false,
    });
  };

  const decreaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 1000,
    };

    dispatch({
      type: "RED_EXPENSE",
      payload: expense,
    });

    toast.warning(`Expense decrease by -${currency}1,000`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      showConfirmButton: false,
    });

    // alert("Expense reduce by [10] successfully.");
  };

  const handelDeleteDepartment = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        position: "top",
        title: "Are you sure?",
        text: "Department won't be recover!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.success(`Department Deleted`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            showConfirmButton: false,
          });

          dispatch({
            type: "DELETE_DEPARTMENT",
            payload: props.id,
          });
      
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            position: "top",
            title: "Cancelled",
            text: "Department remains.",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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
        <RiChatDeleteFill 
          color="orange"
          size="1.5em"
          onClick={handleDeleteExpense}
        ></RiChatDeleteFill>
      </td>
      <td>
        <RiDeleteBin6Fill
          size="1.5em"
           color="red"
          onClick={handelDeleteDepartment}
        ></RiDeleteBin6Fill>
      </td>
    </tr>
  );
};

export default ExpenseItem;
