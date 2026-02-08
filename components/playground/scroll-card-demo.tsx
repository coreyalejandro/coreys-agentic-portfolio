"use client";

import { useEffect, useRef, useState } from "react";

type ScrollCardDemoProps = {
  variant?: "default" | "creative-chaos";
};

export function ScrollCardDemo({ variant = "default" }: ScrollCardDemoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLaidDown, setIsLaidDown] = useState(false);
  const isCreativeChaos = variant === "creative-chaos";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update state based on visibility
          setIsLaidDown(entry.isIntersecting);
        });
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% visible
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <div
      className={
        isCreativeChaos
          ? "w-full overflow-y-auto max-h-[800px] rounded-2xl border border-white/10 overflow-hidden"
          : "bg-gray-50 w-full overflow-y-auto max-h-[800px] border rounded-xl"
      }
      data-variant={isCreativeChaos ? "creative-chaos" : undefined}
    >
      {/* Spacer to force scrolling */}
      <div className="spacer flex items-center justify-center text-2xl text-gray-500 font-mono">
        ↓ Scroll Down to see the card...
      </div>

      {/* Scene Container */}
      <div className="table-container">
        <div
          ref={cardRef}
          id="myCard"
          className={`card ${isLaidDown ? "is-laid-down" : ""}`}
        >
          <div className="card-inner">
            <div className="card-front">
              <h2 className="text-2xl font-bold mb-2">Vertical Card</h2>
              <p>Watch me lay down as you scroll!</p>
            </div>
            <div className="card-back">
              <h1 className="text-2xl font-bold">Back Side</h1>
              <p>Now I'm flat!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to allow scrolling past */}
      <div className="spacer flex items-center justify-center text-2xl text-gray-500 font-mono">
        ↑ You scrolled past the card!
      </div>

      <style jsx>{`
        .spacer {
          height: 80vh;
          background-color: #eee;
          border-bottom: 1px dashed #ccc;
        }

        [data-variant="creative-chaos"] .spacer {
          background: linear-gradient(180deg, rgba(146, 64, 14, 0.3), rgba(92, 25, 2, 0.4));
          border-bottom-color: rgba(234, 88, 12, 0.4);
          color: rgba(255, 255, 255, 0.8);
        }

        /* --- Scene Setup --- */
        .table-container {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 600px;
          width: 100%;
          background-color: #4caf50;
          overflow: hidden;
        }

        [data-variant="creative-chaos"] .table-container {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.6), rgba(185, 28, 28, 0.7), rgba(217, 119, 6, 0.6));
        }

        /* --- Card Base Styling --- */
        .card {
          width: 250px;
          height: 350px;
          position: relative;
          transition: transform 1s ease-in-out;
          transform-style: preserve-3d;
          /* Starts vertically upright (0 degrees rotation on X axis) */
          transform: rotateX(0deg);
          /* Pivot from bottom edge */
          transform-origin: bottom center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        /* --- The "Laid Down" State --- */
        .card.is-laid-down {
          transform: rotateX(90deg);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }

        /* --- Inner Card Content --- */
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transform-style: preserve-3d;
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .card-front {
          background-color: white;
          color: #333;
        }

        [data-variant="creative-chaos"] .card-front {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(254, 243, 199, 0.9));
          color: #1c1917;
        }

        .card-back {
          background-color: #333;
          color: white;
          transform: rotateX(180deg);
        }

        [data-variant="creative-chaos"] .card-back {
          background: linear-gradient(135deg, rgba(146, 64, 14, 0.95), rgba(92, 25, 2, 1));
          color: white;
        }

      `}</style>
    </div>
  );
}
