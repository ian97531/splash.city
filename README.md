# [Splash City](https://splash.city) 
Only works on Chrome at the moment

Splash City is a water stain simulator that I put together to explore Web Workers and Offscreen Canvas in Typescript. I'm not sure that the result looks much like a water stain, but it neat nonetheless. 

I created this website to try out some new (to me) technologies including:
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) to offload the work of computing each from of the simulation from the main UI thread.
- [Offscreen Canvas](https://developers.google.com/web/updates/2018/08/offscreen-canvas) to allow the Web Worker to draw directly to the canvas, avoiding the need to copy the canvas image data back and forth between the worker and the main thread.

Additional, I used the following technologies:
- [Next.js](https://nextjs.org/) and Server Side Rendering
- [Zeit](https://zeit.co/) for deployments and hosting
- [React hooks](https://reactjs.org/docs/hooks-intro.html)
- [Typescript](https://www.typescriptlang.org/)
