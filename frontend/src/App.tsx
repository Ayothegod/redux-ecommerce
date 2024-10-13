import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RootLayout } from "./layouts/RootLayout";
import { SellerLayout } from "./layouts/SellerLayout";
import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";
import { Root, RootError, Loader as rootLoader } from "./routes/root";
import { Dashboard as SellerDashboard } from "./routes/seller/dashboard";
import { AuthState } from "./services/auth/types";
import { useAppSelector } from "./store";

export function App() {
  let authState: AuthState = {
    user: null,
    token: null,
  };
  const { token } = useAppSelector((state) => state.auth);
  const userData = sessionStorage.getItem("user");
  const userToken = sessionStorage.getItem("token");

  const response = userData ? JSON.parse(userData) : null;

  if (
    sessionStorage.getItem("isAuthenticated") === "true" &&
    response !== null
  ) {
    authState = {
      user: {
        id: response.id,
        email: response.email,
        accountType: response.accountType,
      },
      token: userToken ?? token,
    };
  }
  const isAuthenticated = authState.user !== null && authState.token !== null;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <RootError />,
      loader: rootLoader,
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/login",
          element: <Login authState={authState} isAuthenticated={isAuthenticated} />,
          errorElement: <RootError />,
        },
        {
          path: "/auth/register",
          element: <Register isAuthenticated={isAuthenticated} authState={authState} />,
          errorElement: <RootError />,
        },
      ],
    },
    {
      element: <SellerLayout />,
      children: [
        {
          path: "/seller/dashboard",
          element: <SellerDashboard />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </div>
  );
}
