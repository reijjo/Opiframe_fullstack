import { AnyAction, Reducer } from "redux";

export interface State {
  count: number;
}

const inintialState: State = {
  count: 0,
};

const countReducer: Reducer<State, AnyAction> = (
  state = inintialState,
  action
) => {
  console.log("Action:", action);

  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default countReducer;
