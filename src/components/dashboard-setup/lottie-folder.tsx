"use client";
import React from "react";
import Lottie from "react-lottie-player";
import animationJson from "./folders.json";

export default function LottieFolder() {
  return (
    <div className="p-4 max-w-[500px] max-h-[500px] ">
      <Lottie
        loop
        animationData={animationJson}
        play
        className="w-full h-full border-2 border-violet-300-300 rounded-lg"
      />
    </div>
  );
}
