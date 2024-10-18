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
import { ShopperLayout } from "./layouts/ShopperLayout";
import { Checkout } from "./routes/shopper/Checkout";
import { CompleteOrder } from "./routes/shopper/CompleteOrder";
import { SellerOrders } from "./routes/seller/orders";
import { SellerSettings } from "./routes/seller/settings";
import { SingleOrder } from "./routes/seller/SingleOrder";
import { UserAccount } from "./routes/shopper/Account";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./routes/admin/dashboard";
import { AdminSettings } from "./routes/admin/settings";
import { AdminCreateUser } from "./routes/admin/createUser";

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
      element: (
        <ShopperLayout
          authState={authState}
          isAuthenticated={isAuthenticated}
        />
      ),
      children: [
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
          element: <SingleProduct isAuthenticated={isAuthenticated} />,
          errorElement: <RootError />,
          loader: async ({ params }) => {
            return params.id;
          },
        },
        {
          path: "/products/cart",
          element: <Cart authState={authState} />,
          errorElement: <RootError />,
        },
        {
          path: "/products/checkout",
          element: <Checkout authState={authState} />,
          errorElement: <RootError />,
        },
        {
          path: "/products/order/confirmation",
          element: <CompleteOrder />,
          errorElement: <RootError />,
        },
        {
          path: "/account",
          element: <UserAccount />,
          errorElement: <RootError />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/login",
          element: <Login />,
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
        {
          path: "/seller/orders",
          element: <SellerOrders />,
        },
        {
          path: "/seller/settings",
          element: <SellerSettings />,
        },
        {
          path: "/seller/orders/:id",
          element: <SingleOrder />,
          errorElement: <RootError />,
          loader: async ({ params }) => {
            return params.id;
          },
        },
      ],
    },
    {
      element: (
        <AdminLayout authState={authState} isAuthenticated={isAuthenticated} />
      ),
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/settings",
          element: <AdminSettings />,
        },
        {
          path: "/admin/user/new",
          element: <AdminCreateUser />,
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
