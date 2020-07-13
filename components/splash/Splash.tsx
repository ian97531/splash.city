import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";

import {
  createInitMessage,
  createListener,
  CreateListener,
  WorkerMessage,
  createResetMessage,
  createPlayMessage,
} from "utils/workerApi";

import CanvasWorker from "workers/splashWorker.worker.ts";

import styles from "./Splash.module.scss";

export interface ComponentProps extends React.AllHTMLAttributes<HTMLElement> {
  play: boolean;
  width: number;
  height: number;
}

export default function Splash(props: ComponentProps) {
  const { className, play, width, height, ...elementProps } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const offline = canvasRef.current.transferControlToOffscreen();
    const worker = new CanvasWorker();
    const listener = createListener();

    listener.listen(WorkerMessage.Ready, () => {
      worker.postMessage(createInitMessage(offline, width, height), [offline]);
      worker.postMessage(createResetMessage());
      worker.postMessage(createPlayMessage());
    });

    worker.addEventListener("message", listener.onMessage);

    return () => {
      worker.terminate();
      worker.removeEventListener("message", listener.onMessage);
      listener.stopListening();
    };
  });

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
