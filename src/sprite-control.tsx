import React, { useMemo, useEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import classNames from "classnames";

const SpriteControl = () => {
  const ref = useRef<any>(null);
  const [state, setState] = useState({
    gameStart: false,
    gameOver: false,
  });

  const appConfig = useMemo(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xdadada,
      antialias: true,
    });
    const sprite = PIXI.Sprite.from("/images/car.png");
    const human = PIXI.Sprite.from("/images/pngegg.png");
    sprite.anchor.set(0.5);
    sprite.width = 60;
    sprite.height = 120;
    sprite.rotation = 0;
    sprite.x = app.screen.width / 2;
    sprite.y = app.screen.height / 2;

    return {
      app,
      sprite,
      human,
    };
  }, []);

  const { app, sprite, human } = appConfig;

  const wallTop = new PIXI.Graphics();
  wallTop.lineStyle(20, 0x000000, 1);
  wallTop.lineTo(app.screen.width, 0);
  app.stage.addChild(wallTop);
  const wallBottom = new PIXI.Graphics();
  wallBottom.lineStyle(20, 0x000000, 1);
  wallBottom.position.y = app.screen.height;
  wallBottom.lineTo(app.screen.width, 0);
  app.stage.addChild(wallBottom);
  const wallLeft = new PIXI.Graphics();
  wallLeft.lineStyle(20, 0x000000, 1);
  wallLeft.lineTo(0, app.screen.height);
  app.stage.addChild(wallLeft);
  const wallRight = new PIXI.Graphics();
  wallRight.lineStyle(20, 0x000000, 1);
  wallRight.lineTo(0, app.screen.height);
  wallRight.position.x = app.screen.width;
  app.stage.addChild(wallRight);

  useEffect(() => {
    app.stage.addChild(sprite);
    ref.current.appendChild(app.view);
  }, []);

  useEffect(() => {
    app.ticker.addOnce(() => {
      human.width = 80;
      human.height = 90;
      human.x = 500;
      human.y = 500;
      // human.x = Math.floor(Math.random() * app.screen.width);
      // human.y = Math.floor(Math.random() * app.screen.height);
      human.interactive = true;
      human.hitArea = new PIXI.Circle(500, 500, 2);
      app.stage.addChild(human);
    });
    document.addEventListener("keydown", (e) => {
      console.log(human);

      gameLoop(e.keyCode);
    });
    app.ticker.add(() => {
      if (
        onDetectActionWall(sprite, wallTop, wallBottom, wallLeft, wallRight)
      ) {
        app.ticker.stop();
        setState({ ...state, gameOver: true });
      }

      if (onDetectActionHuman(sprite, human)) {
        console.log("fsdfds");
      }
    });
  });

  const gameLoop = (key: number) => {
    let anchor_y: any;
    let anchor_x: any;
    anchor_y = sprite.y;
    anchor_x = sprite.x;
    app.ticker.add((delta) => {
      switch (key) {
        case 38: //up
          sprite.rotation = 0;
          sprite.y = anchor_y -= 3;
          sprite.x = anchor_x;
          break;
        case 40: //down
          sprite.rotation = 600;
          sprite.y = anchor_y += 3;
          sprite.x = anchor_x;
          break;
        case 37: //left
          sprite.rotation = 300;
          sprite.x = anchor_x -= 3;
          sprite.y = anchor_y;
          break;
        case 39: //right
          sprite.rotation = -300;
          sprite.x = anchor_x += 3;
          sprite.y = anchor_y;
          break;
        case 32: //right
          app.ticker.stop();
          break;
        default:
          break;
      }
    });
  };

  const onDetectActionWall = (
    player: any,
    wall_1: any,
    wall_2: any,
    wall_3: any,
    wall_4: any
  ) => {
    let player_mock = player.getBounds();
    let wall_1_mock = wall_1.getBounds();
    let wall_2_mock = wall_2.getBounds();
    let wall_3_mock = wall_3.getBounds();
    let wall_4_mock = wall_4.getBounds();

    return (
      player_mock.top <= wall_1_mock.top ||
      player_mock.bottom >= wall_2_mock.bottom ||
      player_mock.left <= wall_3_mock.left ||
      player_mock.right >= wall_4_mock.right
    );
  };

  const onDetectActionHuman = (car: any, human: any) => {
    let car_mock = car.getBounds();
    let human_mock = human.getBounds();

    // console.log("car_x", Math.floor(car_mock.x * 1));
    // console.log("car_y", Math.floor(car_mock.y * 1));
    // console.log("human_x", human_mock.x * 1);
    // console.log("human_y", human_mock.y * 1);
    // console.log("condition", Math.floor(car_mock.x) - Math.floor(human_mock.x));

    return (
      Math.floor(car_mock.x) - Math.floor(human_mock.x) <= 50 ||
      Math.floor(car_mock.x) - Math.floor(human_mock.x) <= -50
    );
  };

  const onClickPlayAgain = () => {
    window.location.reload();
  };

  return (
    <>
      <div ref={ref} className="absolute" />
      <div className="w-screen h-screen absolute flex items-end justify-center bottom-32 text-3xl font-semibold opacity-30">
        <p>On key press for play !!</p>
      </div>

      <div className="absolute w-screen h-screen flex items-center justify-center">
        <div
          className={classNames(
            "w-96 h-52 bg-white rounded-2xl p-10 bg-red-900 flex-col transition-all duration-300",
            state.gameOver ? "inline" : "hidden"
          )}
        >
          <p className="text-white text-5xl font-bold text-center">GAME OVER</p>
          <div className="flex justify-center mt-10">
            <button
              className="w-32 h-10 bg-red-300 rounded-lg font-bold hover:bg-red-300 hover:bg-opacity-30 hover:text-white"
              onClick={() => onClickPlayAgain()}
            >
              play again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpriteControl;
