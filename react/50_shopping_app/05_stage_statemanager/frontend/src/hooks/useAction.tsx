import { useState, useEffect, useContext } from "react";
import useAppState from "./useAppState";
import ActionContext from "../context/actionContext";
import * as actionConstants from "../types/actionConstants";
import ShoppingItem from "../models/ShoppingItem";
import User from "../models/User";
// import { AppState } from "../types/states";

//Used by helper functions to trigger useEffect and fetching from backend
interface UrlRequest {
  request: Request;
  action: string;
}

interface Token {
  token: string;
}

const useAction = () => {
  const { token } = useAppState();
  const { dispatch } = useContext(ActionContext);

  const [urlRequest, setUrlRequest] = useState<UrlRequest>({
    request: new Request("", {}),
    action: "",
  });

  const setError = (error: string) => {
    dispatch({
      type: actionConstants.REGISTER_FAILED,
      payload: error,
    });
  };

  //Fetch stuff from backend using urlRequest and useEffect()

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: actionConstants.LOADING,
        payload: "",
      });

      const response = await fetch(urlRequest.request);

      dispatch({
        type: actionConstants.STOP_LOADING,
        payload: "",
      });

      if (!response) {
        dispatch({
          type: actionConstants.LOGOUT_FAILED,
          payload: "Server not responding",
        });
        return;
      }

      if (response.ok) {
        switch (urlRequest.action) {
          case "getlist": {
            const temp = await response.json();
            const list: ShoppingItem[] = temp as ShoppingItem[];

            dispatch({
              type: actionConstants.FETCH_LIST_SUCCESS,
              payload: list,
            });
            return;
          }
          case "additem": {
            dispatch({
              type: actionConstants.ADD_ITEM_SUCCESS,
              payload: "",
            });
            getList(token);
            return;
          }
          case "removeitem": {
            dispatch({
              type: actionConstants.REMOVE_ITEM_SUCCESS,
              payload: "",
            });
            getList(token);
            return;
          }
          case "edititem": {
            dispatch({
              type: actionConstants.EDIT_ITEM_SUCCESS,
              payload: "",
            });
            getList(token);
            return;
          }
          case "register": {
            dispatch({
              type: actionConstants.REGISTER_SUCCESS,
              payload: "",
            });
            return;
          }
          case "login": {
            const temp2 = await response.json();
            const data = temp2 as Token;

            dispatch({
              type: actionConstants.LOGIN_SUCCESS,
              payload: data.token,
            });
            return;
          }
          case "logout": {
            dispatch({
              type: actionConstants.LOGOUT_SUCCESS,
              payload: "",
            });
            return;
          }
          default:
            return;
        }
      } else {
        if (response.status === 403) {
          dispatch({
            type: actionConstants.LOGOUT_FAILED,
            payload: "Your session has expired",
          });
          return;
        }
        let errorMessage =
          "Server responded with a status " +
          response.status +
          " " +
          response.statusText;
        switch (urlRequest.action) {
          case "register": {
            if (response.status === 409) {
              errorMessage = "Username already in use";
            }
            dispatch({
              type: actionConstants.REGISTER_FAILED,
              payload: "Username already in use",
            });
            return;
          }
          case "login": {
            dispatch({
              type: actionConstants.LOGIN_FAILED,
              payload: errorMessage,
            });
            return;
          }
          case "getlist": {
            dispatch({
              type: actionConstants.FETCH_LIST_FAILED,
              payload: errorMessage,
            });
            return;
          }
          case "additem": {
            dispatch({
              type: actionConstants.ADD_ITEM_FAILED,
              payload: errorMessage,
            });
            return;
          }
          case "removeitem": {
            dispatch({
              type: actionConstants.REMOVE_ITEM_FAILED,
              payload: errorMessage,
            });
            return;
          }
          case "edititem": {
            dispatch({
              type: actionConstants.EDIT_ITEM_FAILED,
              payload: errorMessage,
            });
            return;
          }
          case "logout": {
            dispatch({
              type: actionConstants.LOGOUT_FAILED,
              payload: "Server responded with an error. Logging you out.",
            });
            return;
          }
          default:
            return;
        }
      }
    };

    fetchData();
  }, [urlRequest]);

  //Helper functions

  const getList = (token: string) => {
    setUrlRequest({
      request: new Request("/api/shopping", {
        method: "GET",
        headers: {
          token: token,
        },
      }),
      action: "getlist",
    });
  };

  const add = (item: ShoppingItem) => {
    setUrlRequest({
      request: new Request("/api/shopping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(item),
      }),
      action: "additem",
    });
  };

  const remove = (id: string) => {
    setUrlRequest({
      request: new Request("/api/shopping/" + id, {
        method: "DELETE",
        headers: {
          token: token,
        },
      }),
      action: "removeitem",
    });
  };

  const edit = (item: ShoppingItem) => {
    setUrlRequest({
      request: new Request("/api/shopping/" + item.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(item),
      }),
      action: "edititem",
    });
  };

  const register = (user: User) => {
    setUrlRequest({
      request: new Request("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }),
      action: "register",
    });
  };

  const login = (user: User) => {
    dispatch({
      type: actionConstants.SET_USER,
      payload: user.username,
    });
    setUrlRequest({
      request: new Request("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }),
      action: "login",
    });
  };

  const logout = () => {
    setUrlRequest({
      request: new Request("/logout", {
        method: "POST",
        headers: {
          token: token,
        },
      }),
      action: "logout",
    });
  };

  return { getList, add, remove, edit, register, login, logout, setError };
};

export default useAction;
