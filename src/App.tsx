import React from "react";
import "./index.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Spin from "./spin";
import Sprite from "./sprite";
import SpriteControl from "./sprite-control";
import SpriteClass from "./sprite-class";
import SpriteCombine from "./combine-sprite";
import SpriteAxie from "./sprite-axie";
import SpriteTiling from "./sprite-tiling";
import Character from "./character";
import GeneratePng from "./generate-png";
import GenerateChicken from "./generate-chicken";

function MyComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spin" element={<Spin />} />
        <Route path="/sprite-action" element={<Sprite />} />
        <Route path="/sprite-control" element={<SpriteControl />} />
        <Route path="/sprite-class" element={<SpriteClass />} />
        <Route path="/sprite-combine" element={<SpriteCombine />} />
        <Route path="/sprite-Axie" element={<SpriteAxie />} />
        <Route path="/sprite-tiling" element={<SpriteTiling />} />
        <Route path="/character-kit" element={<Character />} />
        <Route path="/generate-png" element={<GeneratePng />} />
        <Route path="/generate-chicken" element={<GenerateChicken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyComponent;
