import { ContextType, ReactNode, createContext, useReducer } from "react";
import { ISingleAlertProps } from "../components/SingleAlert/SingleAlert.model";

const initialState: IInitialState = {
  alertsList: [],
};

interface IInitialState {
  alertsList: ISingleAlertProps[];
}

interface IReducerAction {
  type: string;
  payload: ISingleAlertProps;
}

const STORE_ACTION_TYPES = {
  SET_ALERT: "SET_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
  PURGE_STATE: "PURGE_STATE",
};

const Reducer = (state: IInitialState, action: IReducerAction): any => {
  switch (action.type) {
    case STORE_ACTION_TYPES.SET_ALERT:
      return {
        ...state,
        alertsList: [
          ...state.alertsList,
          {
            id:
              state.alertsList.length > 0
                ? state.alertsList[state.alertsList.length - 1].id + 1
                : 1,
            message: action.payload.message,
            variant: action.payload.variant,
          },
        ],
      };
    case STORE_ACTION_TYPES.REMOVE_ALERT:
      return {
        ...state,
        alertsList: state.alertsList.filter(
          (item: ISingleAlertProps) => item.id !== action.payload.id
        ),
      };
    case STORE_ACTION_TYPES.PURGE_STATE:
      return initialState;
    default:
      return state;
  }
};
const Store = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState as ContextType<any>);
export { Store, STORE_ACTION_TYPES };
