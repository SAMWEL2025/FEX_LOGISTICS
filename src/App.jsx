import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

// Layout Components
import AuthLayout from './components/Layouts/AuthLayout';
import DashboardLayout from './components/Layouts/DashboardLayout';
import MainLayout from './components/Layouts/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Static Pages
import Home from './pages/static/Home';
import Services from './pages/static/Services';
import Quote from './pages/static/Quote';
import Contact from './pages/static/Contact';
import Location from './pages/static/Location';
import Terms from './pages/static/Terms';
import Privacy from './pages/static/Privacy';

// Error Pages
import NotFound from './pages/errors/NotFound';
import ServerError from './pages/errors/ServerError';

// Admin Dashboard Pages
import AdminDashboard from './pages/dashboards/Admin/AdminDashboard';
import ManageUser from './pages/dashboards/Admin/ManageUsers';
import Reports from './pages/dashboards/Admin/Reports';

// Agent Dashboard Pages
import AgentDashboard from './pages/dashboards/Agent/AgentDashboard';
import AgentShipments from './pages/dashboards/Agent/Shipments/AgentShipments';
import UpdateTracking from './pages/dashboards/Agent/Shipments/UpdateTracking';
import Notifications from './pages/dashboards/Agent/Notifications';

// User Dashboard Pages
import UserDashboard from './pages/dashboards/User/UserDashboard';
import UserProfile from './pages/dashboards/User/Profile';
import MyShipments from './pages/dashboards/User/Shipments/MyShipments';
import NewShipment from './pages/dashboards/User/Shipments/NewShipment';
import Tracking from './pages/dashboards/User/Shipments/Tracking';

// Ecommerce Dashboard Pages
import EcommerceDashboard from './pages/dashboards/Ecommerce/EcommerceDashboard';
import ShipmentHistory from './pages/dashboards/Ecommerce/ShipmentHistory';
import BookShipment from './pages/dashboards/Ecommerce/BookShipment';

// Define routes using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "quote", element: <Quote /> },
      { path: "contact", element: <Contact /> },
      { path: "location", element: <Location /> },
      { path: "terms", element: <Terms /> },
      { path: "privacy", element: <Privacy /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard/agent" replace /> },
      
      // Admin Routes
      {
        path: "admin",
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "users", element: <ManageUser /> },
          { path: "reports", element: <Reports /> },
        ],
      },
      
      // Agent Routes
      {
        path: "agent",
        children: [
          { index: true, element: <AgentDashboard /> },
          { path: "shipments", element: <AgentShipments /> },
          { path: "tracking", element: <UpdateTracking /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },
      
      // User Routes
      {
        path: "user",
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "profile", element: <UserProfile /> },
          { path: "shipments", element: <MyShipments /> },
          { path: "shipments/new", element: <NewShipment /> },
          { path: "shipments/tracking", element: <Tracking /> },
          { path: "shipments/tracking/:id", element: <Tracking /> },
        ],
      },

      // Ecommerce Routes
      {
        path: "ecommerce",
        children: [
          { index: true, element: <EcommerceDashboard /> },
          { path: "shipment-history", element: <ShipmentHistory /> },
          { path: "book-shipment", element: <BookShipment /> },
        ],
      },
    ],
  },
  {
    path: "/server-error",
    element: <ServerError />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// App Component
const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;