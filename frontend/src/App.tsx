import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, RootError, Loader as rootLoader } from "./routes/root";
import { RootLayout } from "./layouts/RootLayout";
import { SellerLayout } from "./layouts/SellerLayout";
import { Dashboard as SellerDashboard } from "./routes/seller/dashboard";

// NOTE: make sure to add errorBoundary to all routes that throw error from loader and actions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <RootError />,
    loader: rootLoader,
  },
  // {
  //   path: "/auth",
  //   element: <Auth />,
  //   errorElement: <RootError />,
  // },
  // {
  //   path: "/onboarding",
  //   element: <Onboarding />,
  //   errorElement: <RootError />,
  // },
  // {
  //   path: "/user-details",
  //   element: <UserDetails />,
  //   errorElement: <RootError />,
  // },
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

export function App() {
  return (
    <div>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </div>
  );
}
