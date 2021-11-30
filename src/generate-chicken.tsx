import React, { useRef, useMemo, useState, useEffect } from "react";
import * as PIXI from "pixi.js";

const elementToImage = require("dom-to-image");

const style = {
  hairStyle: [
    {
      style: "Hair_001",
      rectangle: [760, 0, 660, 650],
      position: [-200, -350],
    },
    //   {
    //     style: "Hair_002",
    //     rectangle: [450, 0, 205, 301],
    //     position: [-10, -175],
    //   },
    {
      style: "Hair_002",
      rectangle: [450, 0, 205, 301],
      position: [-5, -225],
    },
    {
      style: "Hair_003",
      rectangle: [450, 0, 205, 301],
      position: [-5, -255],
    },
    {
      style: "Hair_004",
      rectangle: [450, 0, 205, 301],
      position: [-9, -195],
    },
    {
      style: "Hair_005",
      rectangle: [450, 0, 205, 301],
      position: [-9, -235],
    },
  ],
};

const GenerateChicken = () => {
  const ref = useRef<any>(null);
  const [hair, setHair] = useState("Hair_001");

  const appConfig = useMemo(() => {
    return {
      app: new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xffffff,
        transparent: true,
      }),
      container: new PIXI.Container(),
      container2: new PIXI.Container(),
    };
  }, []);

  const { app, container, container2 } = appConfig;
  container.position.set(app.renderer.width / 1.2, 300);
  container.scale.set(0.4, 0.4);
  container2.position.set(0, 300);
  container2.scale.set(0.4, 0.4);

  const generateChicken = () => {
    setHair(`Hair_00${Math.floor(Math.random() * 5) + 1}`);
    const element = document.getElementById("diagram");
    elementToImage.toPng(element).then(function (dataUrl: any) {
      app.loader.destroy();
      app.loader.add("chicken", dataUrl).load(() => {
        onLoadSuccess(
          document
            .getElementById("image")
            ?.getAttribute("src")
            ?.split("/")[2]
            .split(".")[0]
        );
      });
      ref.current.appendChild(app.view);
    });
  };

  const onSplitBaseSprite = (styleHair?: any) => {
    // split png to sprite
    const chickenResources = PIXI.BaseTexture.from(
      app.loader.resources["chicken"].url
    );
    const body: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(0, 0, 440, 650)
    );
    const head: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(2230, 0, 350, 650)
    );
    const hair: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(
        styleHair?.rectangle[0],
        styleHair?.rectangle[1],
        styleHair?.rectangle[2],
        styleHair?.rectangle[3]
      )
    );
    const eyes: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(440, 0, 320, 650)
    );
    const mouth: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(1640, 0, 170, 650)
    );
    const tail: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(1810, 0, 420, 650)
    );
    const wing: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(2580, 0, 340, 650)
    );
    const frontFeet: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(1420, 0, 110, 650)
    );
    const backFeet: any = new PIXI.Texture(
      chickenResources,
      new PIXI.Rectangle(1530, 0, 110, 650)
    );

    let chicken: any = {};
    Object.assign(chicken, {
      body: PIXI.Sprite.from(body),
      head: PIXI.Sprite.from(head),
      hair: PIXI.Sprite.from(hair),
      eyes: PIXI.Sprite.from(eyes),
      mouth: PIXI.Sprite.from(mouth),
      tail: PIXI.Sprite.from(tail),
      wing: PIXI.Sprite.from(wing),
      backFeet: PIXI.Sprite.from(backFeet),
      frontFeet: PIXI.Sprite.from(frontFeet),
    });

    return chicken;
  };

  const onLoadSuccess = (baseImage: any) => {
    const styleHair = style.hairStyle.find((rec) => rec.style === baseImage);
    const chicken = onSplitBaseSprite(styleHair); // add other style chicken
    onSetupProperties(chicken, styleHair);
    app.stage.addChild(container);
    // if (app.stage.children.length === 0) {
    //   onSetupProperties(chicken, styleHair);
    //   app.stage.addChild(container, container2);
    // } else {
    //   for (var i = container.children.length - 1; i >= 0; i--) {
    //     container.removeChild(container.children[i]);
    //     onSetupProperties(chicken, styleHair);
    //     app.stage.addChild(container);
    //   }
    // }
    onAnimate(chicken);
  };

  const onSetupProperties = (chicken: any, styleHair: any) => {
    const {
      body,
      head,
      hair,
      eyes,
      mouth,
      tail,
      wing,
      backFeet,
      frontFeet,
    } = chicken;

    head.position.set(0, -185);
    hair.position.set(styleHair?.position[0], styleHair?.position[1]);
    eyes.position.set(-90, -210);
    mouth.position.set(-10, -130);
    tail.position.set(310, 150);
    wing.position.set(255, 130);
    backFeet.position.set(185, 170);
    frontFeet.position.set(225, 170);
    wing.pivot.set(20, 150);
    tail.pivot.set(20, 300);
    container.addChild(
      backFeet,
      frontFeet,
      tail,
      body,
      head,
      hair,
      eyes,
      mouth,
      wing
    );
  };

  const onAnimate = (chicken: any) => {
    const {
      body,
      head,
      hair,
      eyes,
      mouth,
      tail,
      wing,
      frontFeet,
      backFeet,
    } = chicken;
    let count = 0;
    // app.ticker.add((delta) => {
    //   count += 0.05 * delta;
    //   hair.vertexData[0] += Math.sin(count) / 12;
    //   hair.vertexData[1] += Math.sin(count) / 3;
    //   hair.vertexData[2] += Math.sin(count) / 5;
    //   hair.vertexData[3] += Math.sin(count) / 3;

    //   wing.rotation += Math.sin(count) / -600;
    //   tail.rotation += Math.sin(count) / -800;

    //   tail.y += Math.sin(count) / 5;
    //   wing.y += Math.sin(count) / 5;
    //   body.y += Math.sin(count) / 5;
    //   head.y += Math.sin(count) / 5;
    //   eyes.y += Math.sin(count) / 5;
    //   mouth.y += Math.sin(count) / 5;
    // });
    container.rotation = -0.4;
    frontFeet.rotation = 0.7;
    eyes.rotation = 0.4;
    mouth.rotation = 0.4;
    backFeet.position.set(195, 412);
    frontFeet.position.set(195, 414);
    eyes.position.set(30, -280);
    mouth.position.set(85, -180);
    wing.pivot.set(50, 300);
    backFeet.pivot.set(50, 250);
    frontFeet.pivot.set(50, 250);
    wing.position.set(300, 300);
    wing.rotation = -0.7;
    console.log(hair);

    app.ticker.add((delta) => {
      count += 0.3 * delta; // 0.19
      // container.x -= 2;
      hair.vertexData[1] += Math.sin(count) / 0.8;
      hair.vertexData[2] += Math.sin(count) * 1.25;
      hair.vertexData[3] += Math.sin(count);
      wing.rotation += Math.sin(count) / -100;
      // hair.y += Math.sin(count);
      tail.y += Math.sin(count);
      wing.y += Math.sin(count);
      body.y += Math.sin(count);
      head.y += Math.sin(count);
      eyes.y += Math.sin(count);
      mouth.y += Math.sin(count);
      backFeet.rotation += Math.sin(count) / 10;
      frontFeet.rotation -= Math.sin(count) / 10;
    });
  };

  const randomColor = () => {
    return `0x${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  return (
    <>
      <div id="diagram" className="flex" style={{ width: 2920, height: 650 }}>
        <img
          src="images/chickenParts/BChick_001.svg"
          width="440"
          height="320"
          alt="body"
        />
        <img
          src="images/chickenParts/Eyes_001.svg"
          width="320"
          height="200"
          alt="Eyes_001"
        />
        <img
          src={`images/chickenParts/Hair_001.svg`}
          // src={`images/chickenParts/${hair}.svg`}
          width="660"
          height="650"
          alt="hair"
          id="image"
        />
        <img
          src="images/chickenParts/LFeets_001.svg"
          width="110"
          height="90"
          alt="head"
        />
        <img
          src="images/chickenParts/RFeets_001.svg"
          width="110"
          height="90"
          alt="head"
        />
        <img
          src="images/chickenParts/Mouth_001.svg"
          width="170"
          height="60"
          alt="head"
        />
        <img
          src="images/chickenParts/Tail_001.svg"
          width="420"
          height="460"
          alt="head"
        />
        <img
          src="images/chickenParts/TChick_001.svg"
          width="350"
          height="370"
          alt="head"
        />
        <img
          src="images/chickenParts/Wing_001.svg"
          width="340"
          height="500"
          alt="head"
        />
      </div>

      <div ref={ref} className="absolute z-10" />
      <div className="w-screen h-screen">
        <button
          className="absolute z-50 w-64 h-20 bg-green-900 rounded-lg text-2xl font-semibold text-white right-32"
          onClick={() => generateChicken()}
        >
          Random Chicken
        </button>
      </div>
    </>
  );
};

export default GenerateChicken;
