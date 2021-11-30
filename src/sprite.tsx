import React, { useRef, useEffect, useState, useMemo } from "react";
import * as PIXI from "pixi.js";
const Sprite = () => {
  const ref = useRef<any>(null);
  const [move, setMove] = useState(false);
  let count = 0;

  const appConfig = useMemo(() => {
    const ropeLength = 50;
    let points: any = [];
    for (let i = 0; i < 20; i++) {
      points.push(new PIXI.Point(i * ropeLength, 0));
    }
    let strip = new PIXI.SimpleRope(
      PIXI.Texture.from("images/snake.png"),
      points
    );
    const snakeContainer = new PIXI.Container();
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
      }),
      ropeLength,
      points,
      strip,
      snakeContainer,
    };
  }, []);

  const { app, ropeLength, points, strip, snakeContainer } = appConfig;

  snakeContainer.x = 330;
  snakeContainer.y = 500;
  snakeContainer.scale.set(1.2);
  app.stage.addChild(snakeContainer);
  snakeContainer.addChild(strip);

  useEffect(() => {
    ref.current.appendChild(app.view);
  }, []);

  const onMove = () => {
    app.ticker.add(() => {
      count += 0.3;
      for (let i = 0; i < points.length; i++) {
        points[i].y = Math.sin(i * 0.5 + count) * 30;
        points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 20;
      }
    });
    setMove(true);
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <div ref={ref} />
        <div className="absolute bottom-40 text-left">
          <div className="space-x-4 mt-4">
            <button
              className="rounded-lg bg-green-900 font-bold text-white w-52 h-20 disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={() => {
                onMove();
                app.ticker.start();
              }}
              disabled={move}
            >
              Speed Upppp..
            </button>
            <button
              className="rounded-lg bg-red-900 font-bold text-white w-52 h-20"
              onClick={() => {
                app.ticker.stop();
                setMove(false);
              }}
            >
              Stop now !
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sprite;
