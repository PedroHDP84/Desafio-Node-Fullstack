import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/dashboard";
import { LocationsPage } from "../pages/locations";
import { AddLocationPage } from "../pages/add-location";
import { EventsPage } from "../pages/events";
import { AddEventPage } from "../pages/add-event";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/locais",
    element: <LocationsPage />,
  },
  {
    path: "/locais/criar",
    element: <AddLocationPage />,
  },
  {
    path: "/eventos",
    element: <EventsPage />,
  },
  {
    path: "/eventos/criar",
    element: <AddEventPage />,
  },
]);
