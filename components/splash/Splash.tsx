import React, { useLayoutEffect, useRef } from "react";
import clsx from "clsx";

import styles from "./Splash.module.scss";

export interface ComponentProps extends React.AllHTMLAttributes<HTMLElement> {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getSquareCorners = (
  x: number,
  y: number,
  width: number,
  height: number
): ReadonlyArray<{ x: number; y: number }> => {
  return [
    { x, y },
    { x: x + width, y },
    { x: x + width, y: y + height },
    { x, y: y + height },
  ];
};

export default function Splash(props: ComponentProps) {
  const { className, x, y, width, height } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const context = canvasRef.current.getContext("2d");
    const corners = getSquareCorners(x, y, width, height);

    context.beginPath();
    corners.forEach((corner, index) => {
      if (index === 0) {
        context.moveTo(corner.x, corner.y);
      } else {
        context.lineTo(corner.x, corner.y);
      }
    });
    context.fillStyle = "purple";
    context.fill();
  }, []);

  return (
    <canvas
      width={2 * x + width}
      height={2 * y + height}
      className={clsx(styles.Splash, className)}
      ref={canvasRef}
    />
  );
}
