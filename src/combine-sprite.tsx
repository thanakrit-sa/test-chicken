import React, { useMemo, useRef, useEffect } from "react";
import * as PIXI from "pixi.js";

const SpriteCombine = () => {
  const ref = useRef<any>(null);
  const appConfig = useMemo(() => {
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xdadada,
      }),
    };
  }, []);

  const { app } = appConfig;
  let container = new PIXI.Container();
  let container2 = new PIXI.Container();
  app.stage.addChild(container);
  app.stage.addChild(container2);
  const chickenParts = [
    {
      key: "feet",
      position: {
        x: app.screen.width / 1.95,
        y: app.screen.height / 1.46,
      },
      scale: {
        width: 140,
        height: 40,
      },
    },
    {
      key: "tail",
      position: {
        x: app.screen.width / 1.75,
        y: app.screen.height / 1.92,
      },
      scale: {
        width: 100,
        height: 150,
      },
    },
    {
      key: "body",
      position: {
        x: app.screen.width / 2,
        y: app.screen.height / 2,
      },
      scale: {
        width: 295,
        height: 370,
      },
    },
    {
      key: "head",
      position: {
        x: app.screen.width / 2.07,
        y: app.screen.height / 2.22,
      },
      scale: {
        width: 235,
        height: 250,
      },
    },
    {
      key: "hair",
      position: {
        x: app.screen.width / 2.07,
        y: app.screen.height / 3.2,
      },
      scale: {
        width: 250,
        height: 180,
      },
    },
    {
      key: "eyes",
      position: {
        x: app.screen.width / 2.25,
        y: app.screen.height / 2.3,
      },
      scale: {
        width: 120,
        height: 60,
      },
    },
    {
      key: "mouth",
      position: {
        x: app.screen.width / 2.25,
        y: app.screen.height / 2.04,
      },
      scale: {
        width: 120,
        height: 40,
      },
    },
    {
      key: "wing",
      position: {
        x: app.screen.width / 1.87,
        y: app.screen.height / 1.7,
      },
      scale: {
        width: 80,
        height: 80,
      },
    },
  ];

  const onSuccess = (e: any) => {
    chickenParts.forEach((element) => {
      const chicken = PIXI.Sprite.from(app.loader.resources[element.key].url);
      chicken.anchor.set(0.5);
      chicken.width = element.scale.width;
      chicken.height = element.scale.height;
      chicken.position.set(element.position.x, element.position.y);
      container.addChild(chicken);
    });
  };

  app.loader
    .add("body", "images/chicken/body.svg")
    .add("eyes", "images/chicken/eyes.svg")
    .add("feet", "images/chicken/feet.svg")
    .add("hair", "images/chicken/hair.svg")
    .add("mouth", "images/chicken/mouth.svg")
    .add("tail", "images/chicken/tail.svg")
    .add("head", "images/chicken/head.svg")
    .add("wing", "images/chicken/wing.svg");
  app.loader.load(onSuccess);

  useEffect(() => {
    ref.current.appendChild(app.view);
  }, []);

  return (
    <>
      <div ref={ref} className="absolute" />
    </>
  );
};

export default SpriteCombine;
