import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/index";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/tailwind.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          theme="colored"
          position="bottom-right"
          autoClose={3000}
          closeOnClick
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
