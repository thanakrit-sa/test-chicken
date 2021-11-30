import React, { useEffect, useRef, useMemo } from "react";
import * as PIXI from "pixi.js";
import { Spine } from "../src/pixi-spine.js";

const GeneratePng = () => {
  const ref = useRef<any>(null);
  const appConfig = useMemo(() => {
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xffffff,
      }),
    };
  }, []);

  const { app } = appConfig;

  const onAssetsLoaded = (loader: any, res: any) => {
    alien = new Spine(res.alien.spineData);
    alien.update(0);
    alien.autoUpdate = false;

    const alienBoom = new PIXI.Container();
    alienBoom.addChild(alien);
    alien.width = 200;
    alien.height = 220;
    alien.position.set(app.renderer.width / 2, app.renderer.height / 1.5);
    app.stage.addChild(alienBoom);
    alien.state.setAnimation(0, "death", true);
    app.start();
  };

  app.stop();
  app.loader.add("alien", "images/alien/alien.json").load(onAssetsLoaded);
  let alien: any = null;

  app.ticker.add(() => {
    alien.update(0.01666666666667);
  });

  useEffect(() => {
    ref.current.appendChild(app.view);
  }, []);

  return (
    <>
      <div ref={ref} className="absolute" />
    </>
  );
};

export default GeneratePng;
