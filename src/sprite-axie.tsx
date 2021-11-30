import React, { useMemo, useRef, useEffect } from "react";
import * as PIXI from "pixi.js";

const SpriteAxie = () => {
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

  const onSuccess = () => {
    const axie = PIXI.BaseTexture.from(app.loader.resources["axie"].url);
    const body: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(285, 0, 580, 434)
    );
    const head: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(1720, 0, 125, 434)
    );
    const eyes: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(1500, 0, 215, 85)
    );
    const mouth: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(1845, 75, 90, 150)
    );
    const back: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(0, 0, 225, 300)
    );
    const tail: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(1350, 138, 225, 296)
    );
    const ear_left: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(980, 0, 90, 90)
    );
    const ear_right: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(850, 0, 128, 120)
    );
    const shadow: any = new PIXI.Texture(
      axie,
      new PIXI.Rectangle(222, 0, 90, 110)
    );
    const sprite_body = PIXI.Sprite.from(body);
    const sprite_head = PIXI.Sprite.from(head);
    const sprite_eyes = PIXI.Sprite.from(eyes);
    const sprite_mouth = PIXI.Sprite.from(mouth);
    const sprite_back = PIXI.Sprite.from(back);
    const sprite_tail = PIXI.Sprite.from(tail);
    const sprite_ear_left = PIXI.Sprite.from(ear_left);
    const sprite_ear_right = PIXI.Sprite.from(ear_right);
    const sprite_shadow = PIXI.Sprite.from(shadow);
    sprite_head.position.set(100, -70);
    sprite_eyes.position.set(60, 150);
    sprite_mouth.position.set(130, 230);
    sprite_back.position.set(350, -40);
    sprite_tail.position.set(490, 200);
    sprite_ear_left.position.set(0, 80);
    sprite_ear_right.position.set(350, 60);
    sprite_shadow.position.set(490, 130);
    container.position.set(app.screen.width / 3, app.screen.height / 3);
    container.addChild(
      sprite_ear_left,
      sprite_back,
      sprite_tail,
      sprite_body,
      sprite_head,
      sprite_eyes,
      sprite_mouth,
      sprite_ear_right,
      sprite_shadow
    );
    container.addChild(sprite_shadow);
    app.stage.addChild(container);
  };

  app.loader.add("axie", "images/axie.png");
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

export default SpriteAxie;
