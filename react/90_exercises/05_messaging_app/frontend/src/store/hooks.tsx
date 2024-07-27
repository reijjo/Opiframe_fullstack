import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState, AppStore } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<AppStore>();
