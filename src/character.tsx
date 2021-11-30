import React, { useMemo, useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

const Character = () => {
  const ref = useRef<any>(null);

  const appConfig = useMemo(
    () => ({
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xffffff,
        antialias: true,
      }),
      sprite: PIXI.Sprite.from("/images/arrow.png"),
    }),
    []
  );
  const { app, sprite } = appConfig;
  const frames: any = [];
  const anim = new PIXI.AnimatedSprite(frames);

  useEffect(() => {
    sprite.width = 400;
    sprite.height = 400;
    sprite.x = 100;
    sprite.y = 300;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();
    app.stage.addChild(anim);
    app.stage.addChild(sprite);
    ref.current.appendChild(app.view);
  }, []);

  return (
    <>
      <div ref={ref} className="absolute" />
      <div className="absolute w-screen h-screen flex items-end justify-center pb-10">
        <button className="bg-green-900 font-bold text-white text-xl py-4 px-10 rounded-lg hover:opacity-80">
          Merge !!
        </button>
      </div>
    </>
  );
};

export default Character;
