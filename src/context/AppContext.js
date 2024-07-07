import React, { createContext, useReducer } from "react";
import Swal from "sweetalert2";

// 6. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  let budget = 0;

  switch (action.type) {
    case "ADD_EXPENSE":
      let total_budget = 0;
      total_budget = state.expenses.reduce((previousExp, currentExp) => {
        return previousExp + currentExp.cost;
      }, 0);
      total_budget = total_budget + action.payload.cost;
      action.type = "DONE";

      if (total_budget <= state.budget) {
        total_budget = 0;
        state.expenses.map((currentExp) => {
          if (currentExp.name === action.payload.name) {
            currentExp.cost = action.payload.cost + currentExp.cost;
          }
          return currentExp;
        });
        return {
          ...state,
        };
      } else {
        Swal.fire({
          position: "top",
          title: "Cannot increase the allocation!",
          text: "Out of funds, or empty allocation.",
          icon: "error",
        });
        
        return {
          ...state,
        };
      }
    case "RED_EXPENSE":
      const red_expenses = state.expenses.map((currentExp) => {
        if (
          currentExp.name === action.payload.name &&
          currentExp.cost - action.payload.cost >= 0
        ) {
          currentExp.cost = currentExp.cost - action.payload.cost;
          budget = state.budget + action.payload.cost;
        }
        return currentExp;
      });
      action.type = "DONE";
      return {
        ...state,
        expenses: [...red_expenses],
      };
    case "DELETE_EXPENSE":
      action.type = "DONE";
      state.expenses.map((currentExp) => {
        if (currentExp.name === action.payload) {
          budget = state.budget + currentExp.cost;
          currentExp.cost = 0;
        }
        return currentExp;
      });
      action.type = "DONE";
      return {
        ...state,
        budget,
      };
    case "SET_BUDGET":
      action.type = "DONE";
      state.budget = action.payload;
      return {
        ...state,
      };
    case "CHG_CURRENCY":
      action.type = "DONE";
      state.currency = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget:999999,
  expenses: [
    { id: "Marketing", name: "Marketing", cost: 50000 },
    { id: "Finance", name: "Finance", cost: 9500 },
    { id: "Sales", name: "Sales", cost: 77000 },
    { id: "Human Resource", name: "Human Resource", cost: 40500 },
    { id: "Research & Development", name: "Research & Development", cost: 19900 },
    { id: "IT", name: "IT", cost: 84000 },
    { id: "Logistic", name: "Logistic", cost: 33000 },
    { id: "Engineering", name: "Engineering", cost: 62000 },
    { id: "Production", name: "Production", cost: 144000 },
  ],

  currency: "£",
};

// 2. Department name to load for dropdown option
const deptOption = [
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Sales", label: "Sales" },
  { value: "Human Resource", label: "HR" },
  { value: "Research & Development", label: "R&D" },
  { value: "IT", label: "IT" },
  { value: "Logistic", label: "Logistic" },
  { value: "Engineering", label: "ENG" },
  { value: "Production", label: "PRO" },
];

// 3. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 4. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 5. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);
  let remaining = 0;

  if (state.expenses) {
    const totalExpenses = state.expenses.reduce((total, item) => {
      return (total = total + item.cost);
    }, 0);
    remaining = state.budget - totalExpenses;
  }

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        deptOption: deptOption,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
