import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";

import CanvasWorker from "../../workers/splashWorker.worker.ts";

import styles from "./Splash.module.scss";

export interface ComponentProps extends React.AllHTMLAttributes<HTMLElement> {
  play: boolean;
  width: number;
  height: number;
}

export default function Splash(props: ComponentProps) {
  const { className, play, width, height, ...elementProps } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<CanvasWorker>();
  // const contextRef = useRef<CanvasRenderingContext2D>();
  // const pixelsRef = useRef<ImageData>();
  // const rafRef = useRef<number | undefined>();

  // const updateArray = useCallback(() => {
  //   if (pixelsRef.current) {
  //     const { width, height } = pixelsRef.current;
  //     const numPixels = width * height;
  //     for (let row = 0; row < height; row++) {
  //       for (let column = 0; column < width; column++) {
  //         updateNeighbors(pixelsRef.current, row, column);
  //       }
  //     }
  //   }
  //   contextRef.current.putImageData(pixelsRef.current, 0, 0);

  //   if (play) {
  //     rafRef.current = requestAnimationFrame(updateArray);
  //   }
  // }, [play]);

  // useLayoutEffect(() => {
  //   contextRef.current = canvasRef.current.getContext("2d");
  //   if (!pixelsRef.current) {
  //     const imageData = contextRef.current.createImageData(width, height);
  //     pixelsRef.current = imageData;
  //     for (let row = 0; row < height; row++) {
  //       for (let column = 0; column < width; column++) {
  //         setRowColumn(pixelsRef.current, row, column, 255);
  //       }
  //     }
  //     setRowColumn(pixelsRef.current, height / 2, width / 2);
  //   }
  //   contextRef.current.putImageData(pixelsRef.current, 0, 0);
  //   if (play) {
  //     rafRef.current = requestAnimationFrame(updateArray);
  //   }

  //   return () => {
  //     if (rafRef.current !== undefined) {
  //       cancelAnimationFrame(rafRef.current);
  //     }
  //   };
  // }, [width, height, play]);

  useEffect(() => {
    workerRef.current = new CanvasWorker();
    workerRef.current.postMessage("from Host");
    workerRef.current.addEventListener("message", console.log);

    return () => workerRef.current.terminate();
  }, []);

  console.log("render");

  return (
    <canvas
      width={`${width}px`}
      height={`${height}px`}
      className={clsx(styles.Splash, className)}
      ref={canvasRef}
      {...elementProps}
    />
  );
}
