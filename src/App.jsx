import { useContext } from "react";
import { Context } from "./context/Context";
import { AuthRoute, DashboardRoute } from "./routes";

const App = () => {

  const { token } = useContext(Context);

  return token ? <DashboardRoute /> : <AuthRoute />


}

export default App
