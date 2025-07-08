import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [startPlanning, setStartPlanning] = useState(false);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleStart = () => {
    setStartPlanning(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder AI logic — replace with real flow later
    setResponse(`Cool! You said: "${input}". Let’s build your dream trip!`);
    setInput('');
  };

  return (
    <>
      <Head>
        <title>Disney Guide</title>
        <meta name="description" content="An AI-powered trip planner for Disney vacations" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Disney Guide</h1>
        <p style={styles.subtitle}>Your AI-powered assistant for planning the ultimate Disney vacation.</p>

        {!startPlanning ? (
          <button style={styles.button} onClick={handleStart}>
            Plan My Trip
          </button>
        ) : (
          <div style={styles.chatContainer}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tell me about your trip..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Send</button>
            </form>
            {response && <p style={styles.response}>{response}</p>}
          </div>
        )}

        <p style={styles.footnote}>Made with ❤️ by someone who really gets Disney planning.</p>
      </main>
    </>
  );
}

const styles = {
  main: {
    height: '100vh',
    padding: '2rem 1rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '400px',
    marginTop: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  response: {
    marginTop: '1rem',
    fontStyle: 'italic',
    color: '#333',
  },
  footnote: {
    marginTop: '3rem',
    fontSize: '0.8rem',
    color: '#666',
  },
  chatContainer: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
