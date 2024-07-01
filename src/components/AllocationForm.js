import React, { useContext, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { AppContext } from "../context/AppContext";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import "../App.css";

const AllocationForm = (props) => {
  // useContext returns the context value for the context you passed
  // and store the values to expenses locally
  const { currency, dispatch, remaining } = useContext(AppContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [action, setAction] = useState("");

  const submitEvent = (event) => {
    // validate if allocation cost is for than remaining; if so set clear cost value
    if (cost < 1 || !name.trim()) {
      Swal.fire({
        position: "top",
        title: `Allocation and Department`,
        text: `Can not be $0 or empty`,
        icon: "error",
      });

      setCost("");
      return;
    } else if (cost > remaining && !name.trim()) {
      Swal.fire({
        position: "top",
        title: `Allocation ${currency}` + cost,
        text:
          `The value cannot exceed remaining budget ${currency}` + remaining,
        icon: "error",
      });

      setCost("");
      return;
    }

    const expense = {
      name: name,
      cost: parseInt(cost),
    };

    if (action === "Reduce") {
      dispatch({
        type: "RED_EXPENSE",
        payload: expense,
      });

      Swal.fire({
        position: "top",
        title: `Allocation ${currency}` + cost,
        text: "decrease successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: expense,
      });

      Swal.fire({
        position: "top",
        title: `Allocation ${currency}` + cost,
        text: "Increase successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setName("");
    setCost("");
  };

  return (
    <div className="budge-panel">
      <div className="row">
        <div className="input-group mb-3" style={{ marginLeft: "2rem" }}>
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Department
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            name="inputGroupSelect01"
            onChange={(event) => setName(event.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="Marketing" name="marketing">
              {" "}
              Marketing
            </option>
            <option value="Sales" name="sales">
              Sales
            </option>
            <option value="Finance" name="finance">
              Finance
            </option>
            <option value="HR" name="hr">
              HR
            </option>
            <option value="IT" name="it">
              IT
            </option>
            <option value="Admin" name="admin">
              Admin
            </option>
          </select>

          <div className="input-group-prepend" style={{ marginLeft: "2rem" }}>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Allocation
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect02"
            onChange={(event) => setAction(event.target.value)}
          >
            <option defaultValue value="Add" name="Add">
              Add
            </option>
            <option value="Reduce" name="Reduce">
              Reduce
            </option>
          </select>
          <div className="allocate-input">
            <span style={{ marginLeft: "2rem" }}>{currency}</span>
            <CurrencyInput
              label="Amount"
              className="number"
              id="cost"
              name="cost"
              step="1000"
              defaultValue={0}
              allowDecimals={true}
              decimalsLimit={2}
              onValueChange={(value) => setCost(value)}
            />
            {/*
            <input
              className="number"
              required="required"
              type="number"
              id="cost"
              name="cost"
              step="1000"
              placeholder="Make allocation..."
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            ></input>
            */}
          </div>
          <button
            className="btn btn-primary"
            onClick={submitEvent}
            style={{ marginLeft: "2rem" }}
          >
            Save <FaSave />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllocationForm;
