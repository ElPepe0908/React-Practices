import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashBoardRoutes } from "./DashBoardRoutes";
// In react-router-dom v6, "Switch" is replaced by
// routes "Routes" and "Route" "Component" needs to be replaced by "element"

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route path="*" element={<DashBoardRoutes />} />
        </Routes>
      </div>
    </Router>
  );
};
