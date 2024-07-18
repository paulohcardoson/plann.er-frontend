import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateTripPage from "@pages/create-trip";
import TripDetailsPage from "@pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;
