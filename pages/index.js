import { useState } from 'react';
import Head from 'next/head';

async function callLLM(prompt) {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.result || 'Sorry, something went wrong.';
}

export default function Home() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m your Disney planning assistant. Ask me anything about the parks, rides, or planning your trip!' },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg, { from: 'bot', text: 'Thinking...' }]);

    const result = await callLLM(input);

    setMessages((prev) => [
      ...prev.slice(0, -1), // remove "Thinking..."
      { from: 'bot', text: result },
    ]);
    setInput('');
  };

  return (
    <>
      <Head>
        <title>Disney Chatbot</title>
        <meta name="description" content="Chat with your AI Disney guide" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Disney Chatbot</h1>

        <div style={styles.chatContainer}>
          {messages.map((msg, i) => (
            <p
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.from === 'user' ? '#0070f3' : '#eee',
                color: msg.from === 'user' ? '#fff' : '#000',
              }}
            >
              {msg.text}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: { fontSize: '2.5rem', marginBottom: '1rem' },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '1rem',
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    maxWidth: '80%',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flexGrow: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
