import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Before we dive in, how familiar are you with Disney World and its parks?' },
  ]);
  const [input, setInput] = useState('');
  const [awaitingParkSelection, setAwaitingParkSelection] = useState(false);
  const [selectedParks, setSelectedParks] = useState([]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const newMessages = [...messages, userMessage];
    const inputLower = input.toLowerCase();
    let botReply = '';

    if (messages.length === 1) {
      // First response: knowledge check
      if (inputLower.includes('never') || inputLower.includes("don't know") || inputLower.includes('not much')) {
        botReply = `No worries! There are four main parks: Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom. I can help you pick!`;
      } else {
        botReply = `Awesome! Any favorite parks or must-do rides already in mind?`;
      }
      setMessages([...newMessages, { from: 'bot', text: botReply }]);
      setAwaitingParkSelection(true); // now show buttons
} else {
  let newBotMessages = [];

  if (inputLower.includes('done')) {
    setAwaitingParkSelection(false);
    newBotMessages.push({ from: 'bot', text: `Got it! We’ll move on from park picks.` });
  }

  newBotMessages.push({
    from: 'bot',
    text: `Want to tell me about your group or what kind of experience you're hoping for?`,
  });

  setMessages([...newMessages, ...newBotMessages]);
}


    setInput('');
  };

const handleParkClick = (park) => {
  setSelectedParks((prev) =>
    prev.includes(park) ? prev.filter((p) => p !== park) : [...prev, park]
  );
};


  return (
    <>
      <Head>
        <title>Disney Guide</title>
        <meta name="description" content="Your AI-powered Disney trip planner" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Disney Guide</h1>
        <p style={styles.subtitle}>Your AI-powered assistant for planning the ultimate Disney vacation.</p>

        {!started ? (
          <button style={styles.button} onClick={handleStart}>
            Plan My Trip
          </button>
        ) : (
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

         {awaitingParkSelection && (
  <div style={styles.buttonGroup}>
    {['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'].map((park) => (
     const isSelected = selectedParks.includes(park);

<button
  key={park}
  onClick={() => handleParkClick(park)}
  style={{
    ...styles.parkButton,
    backgroundColor: isSelected ? '#0070f3' : '#f0f0f0',
    color: isSelected ? '#fff' : '#000',
    fontWeight: isSelected ? 'bold' : 'normal',
  }}
>
  {park}
</button>

    ))}

    {/* ✅  new “Done” button */}
    <button
      style={{
        ...styles.parkButton,
        backgroundColor: '#0070f3',
        color: '#fff',
        marginTop: '8px',
      }}
      onClick={() => {
        setAwaitingParkSelection(false);              // hide the park buttons
        setMessages((prev) => [
          ...prev,
          { from: 'user', text: 'Done choosing parks' },
          {
            from: 'bot',
            text:
              "Got it! Who’s coming on the trip? (Any kids, adults, or special needs I should know about?)",
          },
        ]);
      }}
    >
      ✅ Done
    </button>
  </div>
)}


            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Type your reply..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Send</button>
            </form>
          </div>
        )}

        <p style={styles.footnote}>Made with ❤️ by someone who really gets Disney planning.</p>
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
  title: { fontSize: '3rem', marginBottom: 0 },
  subtitle: { fontSize: '1.2rem', margin: '1rem 0 2rem', textAlign: 'center', maxWidth: '500px' },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  parkButton: {
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    fontSize: '0.9rem',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  buttonGroup: {
    marginTop: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    justifyContent: 'center',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '600px',
  },
  message: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    maxWidth: '80%',
    marginBottom: '0.5rem',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  input: {
    flexGrow: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  footnote: {
    marginTop: '3rem',
    fontSize: '0.8rem',
    color: '#666',
    textAlign: 'center',
  },
};
