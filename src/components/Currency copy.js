import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import "../App.css";

const Currency = () => {
  const { currency, dispatch } = useContext(AppContext);

  const changeCurrency = (val) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: val,
    });

    Swal.fire({
      position: "top",
      icon: "success",
      title: currency,
      text: "Currency change successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="card">
      <div className="card-header">Quote</div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>A well-known quote, contained in a blockquote element.</p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Currency;
