import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import '../assets/css/global.css';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <Layout>
      {/* Different Head Component for each page? */}
      <Head>
        <title>Nefbi - Netzwerk Frühe Bildung</title>
        <meta
          name="description"
          content="nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige Materialien zu relevanten pädagogischen Themen. Egal ob du dich auf eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer innovativen Suchfunktion wirst du hier schnell fündig. Leg los und lass dich inspirieren!"
        />
        <meta property="og:title" content="Nefbi - Netzwerk Frühe Bildung" />
        <meta
          property="og:decription"
          content="nefbi steht für Netzwerk Frühe Bildung. Hier findest du vielfältige Materialien zu relevanten pädagogischen Themen. Egal ob du dich auf eine Facharbeit vorbereitest, den nächsten Praxisimpuls planst oder einen Text zum Thema Kinderrechte in der Kita suchst. Mit unserer innovativen Suchfunktion wirst du hier schnell fündig. Leg los und lass dich inspirieren!"
        />
        <meta property="og:url" content="www.nefbi.de" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}
