import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { RootLayout } from "./layouts/RootLayout";
import { SellerLayout } from "./layouts/SellerLayout";
import { Login } from "./routes/auth/login";
import { Register } from "./routes/auth/register";
import { Products } from "./routes/products";
import { Root, RootError, Loader as rootLoader } from "./routes/root";
import { SellerCreateProduct } from "./routes/seller/CreateProduct";
import { Dashboard as SellerDashboard } from "./routes/seller/dashboard";
import { SellerProducts } from "./routes/seller/products";
import { SingleProduct } from "./routes/shopper/SingleProduct";
import { AuthState } from "./services/auth/types";
import { useAppSelector } from "./store";
import { Cart } from "./routes/shopper/Cart";

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
      path: "/products",
      element: <Products />,
      errorElement: <RootError />,
      loader: rootLoader,
    },
    {
      path: "/products/:id",
      element: <SingleProduct />,
      errorElement: <RootError />,
      loader: async ({ params }) => {
        return params.id;
      },
    },
    {
      path: "/products/cart",
      element: <Cart  authState={authState} />,
      errorElement: <RootError />,
    },
    // {
    //   element: <ShopperLayout/>,
    //   children: [

    //   ]
    // },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/login",
          element: (
            <Login authState={authState} isAuthenticated={isAuthenticated} />
          ),
          errorElement: <RootError />,
        },
        {
          path: "/auth/register",
          element: (
            <Register isAuthenticated={isAuthenticated} authState={authState} />
          ),
          errorElement: <RootError />,
        },
      ],
    },
    {
      element: (
        <SellerLayout authState={authState} isAuthenticated={isAuthenticated} />
      ),
      children: [
        {
          path: "/seller/dashboard",
          element: <SellerDashboard />,
        },
        {
          path: "/seller/products",
          element: <SellerProducts authState={authState} />,
        },
        {
          path: "/seller/products/new",
          element: <SellerCreateProduct />,
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
