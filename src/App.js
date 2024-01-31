import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./component/Signup";
import Grapes from "./component/Grapes";
import Login from "./component/Login";
import Page from "./component/Page";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Grapes />,
  },

  {
    path: "/page",
    element: <Page />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}
export default App;