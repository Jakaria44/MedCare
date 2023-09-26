// RouteChangeHandler.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMenu } from "../contexts/MenuContextProvider";
import { actions } from "../contexts/actions";

function RouteChangeHandler() {
  const location = useLocation();
  const { dispatch } = useMenu();

  useEffect(() => {
    dispatch({
      type: actions.OPEN_MENU,
      opened: location.pathname.toString().split("/")[1],
    });
    console.log(
      "RouteChangeHandler",
      location.pathname.toString().split("/")[1]
    );
  }, [location.pathname]);

  return null;
}

export default RouteChangeHandler;
