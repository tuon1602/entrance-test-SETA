'use client';
import { Provider } from "react-redux";
import { store } from "../stores/redux/store";

export function ReduxStoreProviders({ children }  : { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}