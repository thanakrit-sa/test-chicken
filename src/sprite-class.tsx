import React, { useMemo, useRef, useEffect, useState } from "react";
import * as PIXI from "pixi.js";

const SpriteClass = () => {
  const ref = useRef<any>(null);
  const appConfig = useMemo(() => {
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xdadada,
        antialias: true,
      }),
    };
  }, []);

  const { app } = appConfig;
  let imageIdleArr = [
    "images/walk (1).png",
    "images/walk (2).png",
    "images/walk (3).png",
    "images/walk (4).png",
    "images/walk (5).png",
    "images/walk (6).png",
    "images/walk (7).png",
    "images/walk (8).png",
    "images/walk (9).png",
    "images/walk (10).png",
    "images/walk (11).png",
    "images/walk (12).png",
    "images/walk (13).png",
    "images/walk (14).png",
    "images/walk (15).png",
  ];
  let imageJumpArr = [
    "images/jump (1).png",
    "images/jump (2).png",
    "images/jump (3).png",
    "images/jump (4).png",
    "images/jump (5).png",
    "images/jump (6).png",
    "images/jump (7).png",
    "images/jump (8).png",
    "images/jump (9).png",
    "images/jump (10).png",
    "images/jump (11).png",
    "images/jump (12).png",
    "images/jump (13).png",
    "images/jump (14).png",
    "images/jump (15).png",
  ];
  let imageRunArr = [
    "images/run (1).png",
    "images/run (2).png",
    "images/run (3).png",
    "images/run (4).png",
    "images/run (5).png",
    "images/run (6).png",
    "images/run (7).png",
    "images/run (8).png",
    "images/run (9).png",
    "images/run (10).png",
    "images/run (11).png",
    "images/run (12).png",
    "images/run (13).png",
    "images/run (14).png",
    "images/run (15).png",
  ];
  let imageDeadArr = [
    "images/dead (1).png",
    "images/dead (2).png",
    "images/dead (3).png",
    "images/dead (4).png",
    "images/dead (5).png",
    "images/dead (6).png",
    "images/dead (7).png",
    "images/dead (8).png",
    "images/dead (9).png",
    "images/dead (10).png",
    "images/dead (11).png",
    "images/dead (12).png",
    "images/dead (13).png",
    "images/dead (14).png",
    "images/dead (15).png",
  ];
  let textureIdleArray: any = [];
  let textureJumpArray: any = [];
  let textureRunArray: any = [];
  let textureDeadArray: any = [];
  let animatedPlayer: any;

  useEffect(() => {
    for (let i = 0; i < imageIdleArr.length; i++) {
      let texture = PIXI.Texture.from(imageIdleArr[i]);
      textureIdleArray.push(texture);
    }
    animatedPlayer = new PIXI.AnimatedSprite(textureIdleArray);
    animatedPlayer.anchor.set(0.5);
    animatedPlayer.animationSpeed = 0.3;
    animatedPlayer.x = app.screen.width / 1.7;
    animatedPlayer.y = app.screen.height / 2;
    app.stage.addChild(animatedPlayer);
    animatedPlayer.play();
    ref.current.appendChild(app.view);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  });

  const onKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      for (let i = 0; i < imageRunArr.length; i++) {
        let texture = PIXI.Texture.from(imageRunArr[i]);
        textureRunArray.push(texture);
      }
      let animatedRun = new PIXI.AnimatedSprite(textureRunArray);
      animatedPlayer.textures = animatedRun.textures;
      animatedPlayer.play();
    }
    if (e.keyCode === 32) {
      for (let i = 0; i < imageJumpArr.length; i++) {
        let texture = PIXI.Texture.from(imageJumpArr[i]);
        textureJumpArray.push(texture);
      }
      let animatedJump = new PIXI.AnimatedSprite(textureJumpArray);
      animatedPlayer.textures = animatedJump.textures;
      animatedPlayer.play();
      setTimeout(() => {
        animatedPlayer.textures = new PIXI.AnimatedSprite(
          textureRunArray
        ).textures;
        animatedPlayer.play();
      }, 800);
    }
    if (e.keyCode === 68) {
      for (let i = 0; i < imageDeadArr.length; i++) {
        let texture = PIXI.Texture.from(imageDeadArr[i]);
        textureDeadArray.push(texture);
      }
      let animatedDead = new PIXI.AnimatedSprite(textureDeadArray);
      animatedPlayer.textures = animatedDead.textures;
      animatedPlayer.play();
      setTimeout(() => {
        animatedPlayer.stop();
      }, 800);
    }
  };

  return (
    <>
      <div ref={ref} className="absolute" />
      <div className="w-screen h-screen flex items-end justify-center">
        <div className="absolute flex-col space-y-4 pb-20">
          <p className="font-semibold text-2xl text-normalTest opacity-30 text-center">
            Please press the <span className="font-bold">"Enter"</span> button
            to Run !!
          </p>
          <p className="font-semibold text-2xl text-normalTest opacity-30 text-center">
            Please press the <span className="font-bold">"Space Bar"</span>{" "}
            button to Jump !!
          </p>
          <p className="font-semibold text-2xl text-normalTest opacity-30 text-center">
            Please press the <span className="font-bold">"D"</span> button to
            Dead !!
          </p>
        </div>
      </div>
    </>
  );
};

export default SpriteClass;
