import { RouterProvider } from "react-router-dom";
import router from "./router/router";

export default function App() {
  const user = {}; // TODO

  return <RouterProvider router={router(user)} />;
}
