import React, { useReducer } from "react";
import ActionContext from "./actionContext";
import AppStateContext from "./appStateContext";
import { AppState } from "../types/states";
import ShoppingItem from "../models/ShoppingItem";
import * as actionConstants from "../types/actionConstants";
import Action from "../types/action";

interface Props {
  children: React.ReactNode;
}

const getInitialState = (): AppState => {
  const state = sessionStorage.getItem("state");

  if (state) {
    return JSON.parse(state);
  } else {
    return {
      list: [],
      isLogged: false,
      token: "",
      loading: false,
      error: "",
      user: "",
    };
  }
};

const saveToStorage = (state: AppState) => {
  sessionStorage.setItem("state", JSON.stringify(state));
};

const initialState = getInitialState();

const listReducer = (state: AppState, action: Action): AppState => {
  let tempState = {
    ...state,
  };

  switch (action.type) {
    case actionConstants.LOADING:
      return {
        ...tempState,
        loading: true,
        error: "",
      };
    case actionConstants.STOP_LOADING:
      return {
        ...tempState,
        loading: false,
      };
    case actionConstants.REGISTER_SUCCESS:
      tempState = {
        ...state,
        error: "Register success",
      };
      saveToStorage(tempState);
      return tempState;
    case actionConstants.LOGIN_SUCCESS: {
      const token = action.payload as string;
      tempState = {
        ...state,
        isLogged: true,
        token: token,
      };
      saveToStorage(tempState);
      return tempState;
    }
    case actionConstants.LOGOUT_SUCCESS:
      tempState = {
        list: [],
        isLogged: false,
        token: "",
        loading: false,
        error: "",
        user: "",
      };
      saveToStorage(tempState);
      return tempState;
    case actionConstants.LOGOUT_FAILED: {
      const error = action.payload as string;
      tempState = {
        list: [],
        isLogged: false,
        token: "",
        loading: false,
        error: error,
        user: "",
      };
      saveToStorage(tempState);
      return tempState;
    }
    case actionConstants.FETCH_LIST_SUCCESS: {
      const list = action.payload as ShoppingItem[];
      tempState = {
        ...state,
        list: list,
      };
      saveToStorage(tempState);
      return tempState;
    }
    case actionConstants.SET_USER: {
      const user = action.payload as string;
      tempState = {
        ...state,
        user: user,
      };
      saveToStorage(tempState);
      return tempState;
    }
    case actionConstants.ADD_ITEM_SUCCESS:
    case actionConstants.REMOVE_ITEM_SUCCESS:
    case actionConstants.EDIT_ITEM_SUCCESS:
    case actionConstants.REGISTER_FAILED:
    case actionConstants.LOGIN_FAILED:
    case actionConstants.FETCH_LIST_FAILED:
    case actionConstants.ADD_ITEM_FAILED:
    case actionConstants.REMOVE_ITEM_FAILED:
    case actionConstants.EDIT_ITEM_FAILED: {
      const error = action.payload as string;
      tempState = {
        ...state,
        error: error,
      };
      saveToStorage(tempState);
      return tempState;
    }
    default:
      return state;
  }

  // return state;
};

const StateManager = (props: Props) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <ActionContext.Provider value={{ dispatch }}>
        {props.children}
      </ActionContext.Provider>
    </AppStateContext.Provider>
  );
};

export default StateManager;
