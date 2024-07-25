import React from "react";
import Action from "../types/action";

export interface DispatchInterface {
  dispatch: React.Dispatch<Action>;
}

const ActionContext = React.createContext<DispatchInterface>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (action: Action) => {},
});

ActionContext.displayName = "ActionContext";

export default ActionContext;
