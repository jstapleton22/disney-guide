// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Disney Guide</title>
        <meta name="description" content="An AI-powered trip planner for Disney vacations" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Disney Guide</h1>
        <p style={styles.subtitle}>Your AI-powered assistant for planning the ultimate Disney vacation.</p>

        <button style={styles.button} onClick={() => alert("Coming soon: AI trip planner!")}>
          Plan My Trip
        </button>

        <p style={styles.footnote}>Made with ❤️ by someone who really gets Disney planning.</p>
      </main>
    </>
  );
}

const styles = {
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    margin: 0,
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '1rem',
    maxWidth: '500px',
  },
  button: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    background: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
  },
  footnote: {
    marginTop: '4rem',
    fontSize: '0.8rem',
    color: '#666',
  },
};

