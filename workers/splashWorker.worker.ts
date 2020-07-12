/// <reference lib="WebWorker" />
export const worker: DedicatedWorkerGlobalScope = self as any;

worker.addEventListener("message", (event) =>
  console.log("Worker received:", event.data)
);
worker.postMessage("from Worker");
