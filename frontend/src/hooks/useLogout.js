import { useAuthContext } from "./useAuthContext";
import { useAdsContext } from "./useAdsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: adsDispatch } = useAdsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    adsDispatch({ type: "SET_ADS", payload: null });
  };
  return { logout };
};
