import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useState } from "react";

const Splash = dynamic(() => import("../components/splash/Splash"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Splash width={600} height={450} />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          display: grid;
          align-items: center;
          justify-items: center;
          min-height: 100vh;
          background-color: #455a64;
          color: #ddd;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
