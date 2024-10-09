import { useReducer } from "react";
import { ActionContext } from "./ActionContext";
import { AppStateContext } from "./AppStateContext";
import * as actionConstants from "../types/actionConstants";

const initialState = {
  list: [],
  isLogged: false,
  token: "",
  error: "",
  loading: false,
  mode: "Add",
  editable: {
    _id: "",
    type: "",
    count: "",
    price: "",
  },
};

const listReducer = (state, action) => {
  switch (action.type) {
    case actionConstants.LOADING: {
      return { ...state, loading: true, error: "" };
    }
    case actionConstants.STOP_LOADING: {
      return { ...state, loading: false, error: "" };
    }
    case actionConstants.REGISTER_SUCCESS: {
      return { ...state, error: "Register success." };
    }
    case actionConstants.LOGIN_SUCCESS: {
      return { ...state, isLogged: true, token: action.token };
    }
    case actionConstants.FETCH_LIST_SUCCESS: {
      return { ...state, list: action.list };
    }
    case actionConstants.ADD_ITEM_SUCCESS:
    case actionConstants.REMOVE_ITEM_SUCCESS:
    case actionConstants.EDIT_ITEM_SUCCESS:
      return state;
    case actionConstants.REGISTER_FAILED:
    case actionConstants.LOGIN_FAILED:
    case actionConstants.FETCH_LIST_FAILED:
    case actionConstants.ADD_ITEM_FAILED:
    case actionConstants.REMOVE_ITEM_FAILED:
    case actionConstants.EDIT_ITEM_FAILED:
      return { ...state, error: action.error };
    case actionConstants.LOGOUT: {
      return {
        list: [],
        isLogged: false,
        token: "",
        error: "",
        loading: false,
        mode: "Add",
        editable: { _id: "", type: "", count: "", price: "" },
      };
    }
    case actionConstants.CHANGE_MODE: {
      return { ...state, mode: action.mode, editable: action.editable };
    }
    default:
      return state;
  }
};

export const StateProvider = (props) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <ActionContext.Provider value={dispatch}>
        {props.children}
      </ActionContext.Provider>
    </AppStateContext.Provider>
  );
};
