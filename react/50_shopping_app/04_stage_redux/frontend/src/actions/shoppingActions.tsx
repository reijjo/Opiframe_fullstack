/* eslint-disable @typescript-eslint/no-explicit-any */
import { loading, stopLoading, logoutFailed } from "./loginActions";
import ShoppingItem from "../models/ShoppingItem";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as actionConstants from "../types/actionConstants";

// ASYNC THUNKS

export const getList = (token: string) => {
  return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const request = new Request("/api/shopping", {
      method: "GET",
      headers: { token: token },
    });
    handleFetch(request, "getList", dispatch, token);
  };
};

export const add = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const request = new Request("/api/shopping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(item),
    });
    handleFetch(request, "addItem", dispatch, token);
  };
};

export const remove = (token: string, id: string) => {
  return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const request = new Request(`/api/shopping/${id}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });
    handleFetch(request, "removeItem", dispatch, token);
  };
};

export const edit = (token: string, item: ShoppingItem) => {
  return (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    const request = new Request(`/api/shopping/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(item),
    });
    handleFetch(request, "editItem", dispatch, token);
  };
};

const handleFetch = async (
  request: Request,
  act: string,
  dispatch: ThunkDispatch<any, any, AnyAction>,
  token: string
) => {
  dispatch(loading());
  const response = await fetch(request);
  dispatch(stopLoading());

  if (!response) {
    dispatch(logoutFailed("Server never responded. Resetting!"));
    return;
  }

  if (response.ok) {
    switch (act) {
      case "getList": {
        const temp = await response.json();
        if (!temp) {
          dispatch(fetchListFailed("Failed to fetch the list"));
          return;
        }
        const list = temp as ShoppingItem[];
        dispatch(fetchListSuccess(list));
        return;
      }
      case "addItem": {
        dispatch(fetchItemSuccess(actionConstants.ADD_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      case "removeItem": {
        dispatch(fetchItemSuccess(actionConstants.REMOVE_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      case "editItem": {
        dispatch(fetchItemSuccess(actionConstants.EDIT_ITEM_SUCCESS));
        dispatch(getList(token));
        return;
      }
      default: {
        return;
      }
    }
  } else {
    if (response.status === 403) {
      dispatch(logoutFailed("Session expired. Please login again."));
      return;
    }
    const errorMessage =
      "Server responded with a status " +
      response.status +
      " " +
      response.statusText;

    switch (act) {
      case "getList": {
        dispatch(fetchListFailed("Failed to fetch the list" + errorMessage));
        return;
      }
      case "addItem": {
        dispatch(
          fetchItemFailed(actionConstants.ADD_ITEM_FAILED, errorMessage)
        );
        return;
      }
      case "removeItem": {
        dispatch(
          fetchItemFailed(actionConstants.REMOVE_ITEM_FAILED, errorMessage)
        );
        return;
      }
      case "editItem": {
        dispatch(
          fetchItemFailed(actionConstants.EDIT_ITEM_FAILED, errorMessage)
        );
        return;
      }
      default: {
        return;
      }
    }
  }
};
// ACTION CREATORS

const fetchListSuccess = (list: ShoppingItem[]) => {
  return {
    type: actionConstants.FETCH_LIST_SUCCESS,
    list: list,
  };
};

const fetchListFailed = (error: string) => {
  return {
    type: actionConstants.FETCH_LIST_FAILED,
    error: error,
  };
};

const fetchItemSuccess = (type: string) => {
  return {
    type: type,
  };
};

const fetchItemFailed = (type: string, error: string) => {
  return {
    type: type,
    error: error,
  };
};
