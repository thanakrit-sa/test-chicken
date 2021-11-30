import React, { useRef, useMemo, useEffect } from "react";
import * as PIXI from "pixi.js";

const SpriteTiling = () => {
  const ref = useRef<any>(null);

  const appConfig = useMemo(() => {
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xffffff,
        transparent: true,
      }),
    };
  }, []);

  useEffect(() => {
    ref.current.appendChild(app.view);
  }, []);

  const { app } = appConfig;
  return (
    <>
      <div ref={ref} className="absolute" />
    </>
  );
};

export default SpriteTiling;
