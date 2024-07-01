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
      title: `${currency} Replaced`,
      text: "Currency change successfully",
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="alert alert-info">
      <label htmlFor="currency">Currency </label>
      <select
        id="currency"
        className="currency"
        value={currency}
        onChange={(event) => changeCurrency(event.target.value)}
      >
        <option className="money" value="$">$ Dollar</option>
        <option className="money" value="£">£ Pound</option>
        <option className="money" value="€">€ Euro</option>
        <option className="money"  value="₹">₹ Rupee</option>
        <option className="money" value="CA">$ Cad</option>
        <option className="money" value="¥">¥ Yuan</option>
        <option className="money" value="₦">₦ Naira</option>
        <option className="money" value="EC">$ EC</option>
      </select>
    </div>
  );
};


export default Currency;
