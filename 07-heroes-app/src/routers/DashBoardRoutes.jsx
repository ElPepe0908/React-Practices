import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { DcScreen } from "../components/dc/DcScreen";
import { HeroScreen } from "../components/heroes/HeroScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { SearchScreen } from "../components/search/SearchScreen";
import { Navbar } from "../components/ui/Navbar";

export const DashBoardRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-2">
        <Routes>
          <Route exact path="/marvel" element={<MarvelScreen />} />
          <Route exact path="/hero/:heroeId" element={<HeroScreen />} />
          <Route exact path="/dc" element={<DcScreen />} />
          <Route exact path="/search" element={<SearchScreen />} />

          <Route path="*" element={<Navigate replace to="/marvel" />} />
        </Routes>
      </div>
    </>
  );
};
