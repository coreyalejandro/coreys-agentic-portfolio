"use client";

import { useState } from "react";

type TableCardDemoProps = {
  variant?: "default" | "creative-chaos";
};

export function TableCardDemo({ variant = "default" }: TableCardDemoProps) {
  const [isLaidDown, setIsLaidDown] = useState(false);
  const isCreativeChaos = variant === "creative-chaos";

  return (
    <div
      className={
        isCreativeChaos
          ? "flex flex-col items-center justify-center w-full h-full min-h-[600px] p-8 rounded-2xl"
          : "flex flex-col items-center justify-center w-full h-full min-h-[600px] bg-gray-100 p-8 rounded-xl"
      }
      data-variant={isCreativeChaos ? "creative-chaos" : undefined}
      style={
        isCreativeChaos
          ? {
              background: "linear-gradient(135deg, rgba(146, 64, 14, 0.4), rgba(92, 25, 2, 0.5), rgba(185, 28, 28, 0.4))",
            }
          : undefined
      }
    >
      <div className="table-container">
        <div
          className={`card ${isLaidDown ? "is-laid-down" : ""}`}
          id="myCard"
          onClick={() => setIsLaidDown(!isLaidDown)}
        >
          <div className="card-inner">
            <div className="card-front">
              <h2 className={isCreativeChaos ? "card-front-title-cc" : ""}>Vertical Card</h2>
              <p className={isCreativeChaos ? "card-front-body-cc" : ""}>Click the card or button to lay it down.</p>
            </div>
            <div className="card-back">
              <h1 className={isCreativeChaos ? "card-back-title-cc" : ""}>Back Side</h1>
              <p className={isCreativeChaos ? "card-back-body-cc" : ""}>Now I'm flat!</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsLaidDown(!isLaidDown)}
        className={
          isCreativeChaos
            ? "mt-8 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold rounded-full shadow-lg transition-all"
            : "mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        }
      >
        Toggle Lay Down Effect
      </button>

      <style jsx>{`
        /* --- Scene Setup --- */
        .table-container {
          perspective: 1000px; /* Establishes the 3D viewing space */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px; /* Reduced height for component view */
          width: 100%;
          max-width: 800px;
          background-color: #4caf50; /* Green "table" background */
          overflow: hidden; /* Helps contain movement if the card dips below the container */
          border-radius: 12px;
        }

        [data-variant="creative-chaos"] .table-container {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.6), rgba(185, 28, 28, 0.7), rgba(217, 119, 6, 0.6));
          border-radius: 1rem;
        }

        /* --- Card Base Styling --- */
        .card {
          width: 250px;
          height: 350px;
          position: relative;
          transition: transform 1s ease-in-out; /* Smooth transition */
          transform-style: preserve-3d;
          /* Starts vertically upright (0 degrees rotation on X axis) */
          transform: rotateX(0deg);
          /* We pivot the card from its bottom edge to make it look like it's falling onto the table */
          transform-origin: bottom center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }

        /* --- The "Layed Down" State --- */
        .card.is-laid-down {
          /* Lays the card completely flat (90 degrees rotation) */
          transform: rotateX(90deg);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* Shadow disappears when flat */
        }

        /* --- Inner Card Content (for front/back functionality) --- */
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
          backface-visibility: hidden; /* Hides the reverse side */
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
          justify-content: center;
        }

        .card-front {
          background-color: white;
          color: #333;
        }

        [data-variant="creative-chaos"] .card-front {
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.95), rgba(185, 28, 28, 0.9) 50%, rgba(217, 119, 6, 0.95));
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        [data-variant="creative-chaos"] .card-front .card-front-title-cc {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          margin-bottom: 0.5rem;
        }

        [data-variant="creative-chaos"] .card-front .card-front-body-cc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
        }

        .card-back {
          background-color: #333;
          color: white;
          transform: rotateX(180deg); /* Oriented correctly for when the card flips */
        }

        [data-variant="creative-chaos"] .card-back {
          background: linear-gradient(135deg, rgba(146, 64, 14, 0.95), rgba(92, 25, 2, 1));
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        [data-variant="creative-chaos"] .card-back .card-back-title-cc {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        [data-variant="creative-chaos"] .card-back .card-back-body-cc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
        }

        [data-variant="creative-chaos"] .card {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

      `}</style>
    </div>
  );
}
