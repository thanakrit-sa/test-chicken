import React, { useRef, useEffect, useState, useMemo } from "react";
import * as PIXI from "pixi.js";
import "./index.css";

const Spin = () => {
  const ref = useRef<any>(null);
  const [spin, setSpin] = useState(false);
  const appConfig = useMemo(
    () => ({
      app: new PIXI.Application({
        width: 200,
        height: 200,
        backgroundColor: 0xffffff,
        transparent: true,
      }),
      sprite: PIXI.Sprite.from("/images/arrow.png"),
    }),
    []
  );
  const { app, sprite } = appConfig;

  useEffect(() => {
    sprite.anchor.set(0.5);
    sprite.width = 400;
    sprite.height = 400;
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;
    app.stage.addChild(sprite);
    ref.current.appendChild(app.view);
  }, []);

  const onSpin = () => {
    app.ticker.add(() => {
      sprite.rotation += 0.3;
      setSpin(true);
    });
    app.ticker.start();
  };

  return (
    <>
      <div className="absolute w-screen h-screen flex items-center justify-center">
        <div ref={ref} className="absolute top-86" />
        <img src="/images/bg-wheel.png" className="w-3/6 h-5/6" />
      </div>
      <div className="absolute h-screen w-screen flex items-end justify-end flex-col gap-4 pr-10 pb-10">
        <button
          className="w-72 h-20 bg-green-900 text-white rounded-2xl uppercase text-40 font-bold hover:bg-opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={() => {
            onSpin();
          }}
          disabled={spin}
        >
          Spin
        </button>
        <button
          className="w-72 h-20 bg-red-900 text-white rounded-2xl uppercase text-40 font-bold hover:bg-opacity-80"
          onClick={() => {
            app.ticker.stop();
            sprite.rotation = 0;
            setSpin(false);
          }}
        >
          Stop
        </button>
      </div>
    </>
  );
};

export default Spin;
