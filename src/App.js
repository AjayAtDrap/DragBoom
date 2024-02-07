import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./component/Signup";
import Grapes from "./component/Grapes";
import Login from "./component/Login";
import Page from "./component/Page";
import CreateProject from "./component/CreateProject";
import { Provider } from "react-redux";
import appStore from "./component/redux/appStore";

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
  {
    path: "/createp",
    element: <CreateProject />,
  },
]);

function App() {
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />;
      </Provider>
    </>
  );
}
export default App;
