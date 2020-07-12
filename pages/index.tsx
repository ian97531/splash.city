import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useState } from "react";

const Splash = dynamic(() => import("../components/splash/Splash"), {
  ssr: false,
});

export default function Home() {
  const [play, setPlay] = useState<boolean>(true);
  const togglePlay = useCallback(() => {
    setPlay(!play);
  }, [play]);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Splash width={500} height={350} play={play} onClick={togglePlay} />

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
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
