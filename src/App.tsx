/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Pickup from "./pages/Pickup";
import Education from "./pages/Education";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ArticleDetail from "./pages/ArticleDetail";
import Profile from "./pages/Profile";
import ImpactMap from "./pages/ImpactMap";
import WasteAudit from "./pages/WasteAudit";
import AdminDashboard from "./pages/AdminDashboard";
import NGOCollaboration from "./pages/NGOCollaboration";
import { UserProvider } from "./contexts/UserContext";
import { ToastProvider } from "./contexts/ToastContext";

export default function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <Router>
          <Layout>
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/map" element={<ImpactMap />} />
          <Route path="/audit" element={<WasteAudit />} />
          <Route path="/community" element={<NGOCollaboration />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:id" element={<ArticleDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
        </Router>
      </UserProvider>
    </ToastProvider>
  );
}
