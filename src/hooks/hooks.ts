import { RootState,Appdispatch } from "../redux/store";
import { useSelector,useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

export const useAppDispatch:() => Appdispatch = useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector
