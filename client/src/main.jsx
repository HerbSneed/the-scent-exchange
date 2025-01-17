// Import necessary modules
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { CurrentUserProvider } from "./context";
import App from "./App";

// Import pages and components
import Error from "./pages/Error";
import Home from "./pages/HomePage";
import Product from "./pages/ProductPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import ForgotPassword from "./pages/forgotPassword";
import Search from "./pages/search";

// Create router with routes
const router = createBrowserRouter(
  createRoutesFromElements(
    // Main route for the app
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/search" element={<Search />} />
      
      {/* Protected routes */}
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />
      <Route
        path="search/:query"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />
      
    </Route>
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <CurrentUserProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CurrentUserProvider>
  </CookiesProvider>
);
