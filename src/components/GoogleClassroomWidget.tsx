"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type WidgetPosition = {
  top: string;
  left: string;
};

const POSITIONS: WidgetPosition[] = [
  { top: "12%", left: "5%" },
  { top: "18%", left: "78%" },
  { top: "32%", left: "12%" },
  { top: "38%", left: "82%" },
  { top: "52%", left: "6%" },
  { top: "58%", left: "78%" },
  { top: "70%", left: "14%" },
  { top: "76%", left: "72%" },
  { top: "25%", left: "45%" },
  { top: "64%", left: "45%" },
];

function getRandomPosition(currentIndex: number): number {
  const availablePositions = POSITIONS.map((_, index) => index).filter(
    (index) => index !== currentIndex
  );

  return availablePositions[
    Math.floor(Math.random() * availablePositions.length)
  ];
}

export default function GoogleClassroomWidget() {
  const [positionIndex, setPositionIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsMoving(true);

      window.setTimeout(() => {
        setPositionIndex((currentIndex) =>
          getRandomPosition(currentIndex)
        );

        setIsMoving(false);
      }, 350);
    }, 6500);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const position = POSITIONS[positionIndex];

  return (
    <>
      <style jsx>{`
        @keyframes classroomTechPulse {
          0% {
            transform: scale(1);
            filter: brightness(1);
          }

          25% {
            transform: scale(1.035);
            filter: brightness(1.08);
          }

          50% {
            transform: scale(1.075);
            filter: brightness(1.16);
          }

          75% {
            transform: scale(1.035);
            filter: brightness(1.08);
          }

          100% {
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes classroomTechGlow {
          0% {
            opacity: 0.15;
            transform: scale(0.92);
          }

          50% {
            opacity: 0.38;
            transform: scale(1.12);
          }

          100% {
            opacity: 0.15;
            transform: scale(0.92);
          }
        }

        @keyframes classroomTechScan {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }

          25% {
            opacity: 0.45;
          }

          75% {
            opacity: 0.45;
          }

          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .google-classroom-widget {
          position: fixed;
          z-index: 60;

          width: 76px;
          height: 76px;

          display: flex;
          align-items: center;
          justify-content: center;

          transition:
            top 1.8s cubic-bezier(0.22, 1, 0.36, 1),
            left 1.8s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.35s ease;

          transform: translate3d(0, 0, 0);

          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .google-classroom-widget.moving {
          opacity: 0.72;
        }

        .google-classroom-orb {
          position: relative;

          width: 68px;
          height: 68px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          animation:
            classroomTechPulse
            3.2s
            ease-in-out
            infinite;

          isolation: isolate;
        }

        .google-classroom-glow {
          position: absolute;
          inset: -7px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(66, 133, 244, 0.28) 0%,
              rgba(66, 133, 244, 0.12) 35%,
              transparent 72%
            );

          filter: blur(7px);

          animation:
            classroomTechGlow
            2.8s
            ease-in-out
            infinite;

          pointer-events: none;

          z-index: -1;
        }

        .google-classroom-tech-ring {
          position: absolute;
          inset: -3px;

          border-radius: 50%;

          border: 1px solid rgba(66, 133, 244, 0.28);

          opacity: 0.7;

          animation:
            classroomTechGlow
            2.4s
            ease-in-out
            infinite;

          pointer-events: none;
        }

        .google-classroom-tech-ring-two {
          position: absolute;
          inset: -8px;

          border-radius: 50%;

          border: 1px solid rgba(52, 168, 83, 0.16);

          animation:
            classroomTechGlow
            3.6s
            ease-in-out
            infinite
            reverse;

          pointer-events: none;
        }

        .google-classroom-logo {
          position: relative;

          width: 62px;
          height: 62px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          border-radius: 50%;

          background: transparent;

          box-shadow:
            0 8px 28px
            rgba(0, 0, 0, 0.18);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .google-classroom-widget:hover
          .google-classroom-logo {
          transform: scale(1.08);

          box-shadow:
            0 12px 36px
            rgba(0, 0, 0, 0.24);
        }

        .google-classroom-logo img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: contain;

          border-radius: 50%;

          user-select: none;

          -webkit-user-drag: none;
        }

        .google-classroom-scan {
          position: absolute;

          left: 10%;
          right: 10%;

          height: 2px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(66, 133, 244, 0.55),
              transparent
            );

          filter: blur(0.5px);

          animation:
            classroomTechScan
            2.6s
            ease-in-out
            infinite;

          pointer-events: none;
        }

        @media (max-width: 640px) {
          .google-classroom-widget {
            width: 64px;
            height: 64px;
          }

          .google-classroom-orb {
            width: 58px;
            height: 58px;
          }

          .google-classroom-logo {
            width: 54px;
            height: 54px;
          }

          .google-classroom-glow {
            inset: -5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .google-classroom-widget,
          .google-classroom-orb,
          .google-classroom-glow,
          .google-classroom-tech-ring,
          .google-classroom-tech-ring-two,
          .google-classroom-scan {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <Link
        href="/classroom"
        aria-label="Open Google Classroom"
        title="Google Classroom"
        className={`google-classroom-widget ${
          isMoving ? "moving" : ""
        }`}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <div className="google-classroom-orb">
          <div className="google-classroom-glow" />

          <div className="google-classroom-tech-ring" />

          <div className="google-classroom-tech-ring-two" />

          <div className="google-classroom-logo">
            <img
              src="/images/google-classroom-luqify.png"
              alt="Google Classroom"
              draggable={false}
            />

            <span className="google-classroom-scan" />
          </div>
        </div>
      </Link>
    </>
  );
}