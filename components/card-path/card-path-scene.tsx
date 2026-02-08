"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PathCard } from "./path-card";

export type CardData = {
  id: string;
  title: string;
  body: string;
};

type CardPathSceneProps = {
  cards: CardData[];
};

// Scroll-on-Z-axis: scroll position = how far into the path (depth) we are.
// Scene moves in Z (translateZ(cameraZ)); cards sit at fixed Z. No vertical stack = no ladder.
const ITEM_Z = 220;
const CAMERA_SPEED = 1;
const SCENE_PERSPECTIVE = 1200;

function getSceneHeight(cardCount: number): number {
  if (typeof window === "undefined") return 4000;
  return (
    window.innerHeight +
    SCENE_PERSPECTIVE * CAMERA_SPEED +
    ITEM_Z * CAMERA_SPEED * cardCount
  );
}

export function CardPathScene({ cards }: CardPathSceneProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const [cameraZ, setCameraZ] = useState(0);
  const [sceneHeight, setSceneHeight] = useState(() => getSceneHeight(cards.length));

  const updateSceneHeight = useCallback(() => {
    setSceneHeight(getSceneHeight(cards.length));
  }, [cards.length]);

  useEffect(() => {
    updateSceneHeight();
    window.addEventListener("resize", updateSceneHeight);
    return () => window.removeEventListener("resize", updateSceneHeight);
  }, [updateSceneHeight]);

  const handleScroll = useCallback(() => {
    const el = spacerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // When spacer top is above viewport (rect.top < 0), we're "in" the path; cameraZ = how far we've gone in
    const z = Math.max(0, Math.min(-rect.top, sceneHeight));
    setCameraZ(z);
  }, [sceneHeight]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="card-path-root">
      {/* Spacer: creates scroll height so page scroll = "depth" along the path */}
      <div
        ref={spacerRef}
        className="card-path-viewport-spacer"
        style={{ height: sceneHeight, width: 1 }}
        aria-hidden="true"
      />

      {/* Fixed overlay: 3D scene. Scroll drives translateZ = moving deeper into the path */}
      <div className="card-path-scene-container" aria-hidden="true">
        <div
          className="card-path-scene"
          style={{
            transform: `translateZ(${cameraZ}px)`,
          }}
        >
          {cards.map((card, index) => (
            <PathCard
              key={card.id}
              index={index}
              total={cards.length}
              title={card.title}
              body={card.body}
              cameraZ={cameraZ}
              itemZ={ITEM_Z}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
