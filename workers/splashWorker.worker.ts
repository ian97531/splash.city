/// <reference lib="WebWorker" />
export const worker: DedicatedWorkerGlobalScope = self as any;

import {
  createListener,
  createReadyMessage,
  HostMessage,
} from "utils/workerApi";

import { Color, setAll, setRowColumn } from "utils/canvas";

const listener = createListener();
worker.addEventListener("message", listener.onMessage);

let canvas: OffscreenCanvas;
let context: OffscreenCanvasRenderingContext2D;
let image: ImageData;
let width: number;
let height: number;

listener.listen(HostMessage.Pause, (evt) => {
  console.log("pause");
});

listener.listen(HostMessage.Play, (evt) => {
  console.log("play");
});

listener.listen(HostMessage.Reset, (evt) => {
  console.log("reset");
  setAll(image, Color.White);
  setRowColumn(image, height / 2, width / 2, Color.Black);
  context.putImageData(image, 0, 0);
});

listener.listen(HostMessage.Init, (evt) => {
  console.log("init");
  canvas = evt.data.canvas;
  width = evt.data.width;
  height = evt.data.height;

  context = canvas.getContext("2d");
  image = context.getImageData(0, 0, width, height);
});

worker.postMessage(createReadyMessage());
