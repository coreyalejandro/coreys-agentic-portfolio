"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";

type PathCardProps = {
  index: number;
  total: number;
  title: string;
  body: string;
  cameraZ: number;
  itemZ: number;
};

// Activated when we've "passed" this card in Z space (scroll = moving into depth)
const ACTIVATE_THRESHOLD = 0.55; // fraction of distance to this card we must pass to count as "read"

export function PathCard({ index, total, title, body, cameraZ, itemZ }: PathCardProps) {
  const cardZ = -index * itemZ;
  const activated = cameraZ >= index * itemZ * ACTIVATE_THRESHOLD;

  // Upright (signpost) → laying down on the path when we've passed it
  const tilt = useSpring(activated ? 72 : 6, {
    stiffness: 130,
    damping: 18,
    mass: 0.7,
  });

  const glow = useSpring(activated ? 1 : 0, {
    stiffness: 120,
    damping: 22,
  });

  const glowShadow = useMotionTemplate`
    0 0 0 1px rgba(148, 163, 184, ${glow}),
    0 0 30px rgba(56, 189, 248, ${glow}),
    0 0 60px rgba(59, 130, 246, ${glow})
  `;

  const isLast = index === total - 1;

  return (
    <motion.div
      className="card-path-item"
      style={{
        rotateX: tilt,
        z: cardZ,
        boxShadow: glowShadow,
        transformOrigin: "center bottom",
      }}
      transition={{ type: "spring" }}
    >
      <div
        className={
          "card-path-surface" +
          (activated ? " card-path-surface--active" : "")
        }
      >
        <div className="card-path-inner">
          <p className="card-path-eyebrow">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 className="card-path-title">{title}</h2>
          <p className="card-path-body">{body}</p>
        </div>

        {isLast && (
          <div className="card-path-portal" aria-hidden="true">
            <div className="card-path-portal-core" />
            <div className="card-path-portal-glow" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
