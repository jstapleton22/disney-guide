import { useState } from 'react';
import Head from 'next/head';
async function callLLM(prompt) {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.result;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Before we dive in, how familiar are you with Disney World and its parks?' },
  ]);
  const [input, setInput] = useState('');
  const [awaitingParkSelection, setAwaitingParkSelection] = useState(false);
  const [awaitingGroupInfo, setAwaitingGroupInfo] = useState(false);
  const [awaitingFirstPark, setAwaitingFirstPark] = useState(false);
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

   if (awaitingGroupInfo) {
  setMessages((prev) => [
    ...prev,
    { from: 'user', text: input },
    {
      from: 'bot',
      text: `Thanks! Now, which park should we plan for first?`,
    },
  ]);

  setAwaitingGroupInfo(false);
  setAwaitingFirstPark(true);
  setInput('');
  return;
}

 if (awaitingFirstPark) {
  const selectedFirstPark = input;
  const userMsg = { from: 'user', text: input };

  setMessages((prev) => [...prev, userMsg, { from: 'bot', text: "Planning now..." }]);

  // Call your new backend API
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `Create a detailed day itinerary for ${selectedFirstPark} at Walt Disney World. Make it fun and family-friendly.`,
    }),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev.slice(0, -1), // remove "Planning now..." placeholder
    { from: 'bot', text: data.result || 'Sorry, something went wrong.' },
  ]);

  setAwaitingFirstPark(false);
  setInput('');
  return;
}


      setInput('');
      return;
    }

    if (messages.length === 1) {
      if (inputLower.includes('never') || inputLower.includes("don't know") || inputLower.includes('not much')) {
        botReply = `No worries! There are four main parks: Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom. I can help you pick!`;
      } else {
        botReply = `Awesome! Any favorite parks or must-do rides already in mind?`;
      }
      setMessages([...newMessages, { from: 'bot', text: botReply }]);
      setAwaitingParkSelection(true);
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
                {['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'].map((park) => {
                  const isSelected = selectedParks.includes(park);
                  return (
                    <button
                      key={park}
                      onClick={() => handleParkClick(park)}
                      style={{
                        padding: '0.5rem 1rem',
                        margin: '0.5rem',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#0070f3' : '#f0f0f0',
                        color: isSelected ? '#fff' : '#000',
                        fontWeight: isSelected ? 'bold' : 'normal',
                        boxShadow: isSelected ? '0 0 6px rgba(0, 112, 243, 0.5)' : 'none',
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      {park}
                    </button>
                  );
                })}

                <button
                  style={{
                    ...styles.parkButton,
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    marginTop: '8px',
                  }}
                  onClick={() => {
                    setAwaitingParkSelection(false);
                    setMessages((prev) => [
                      ...prev,
                      { from: 'user', text: `I picked: ${selectedParks.join(', ')}` },
                      {
                        from: 'bot',
                        text: 'Great picks! Now tell me: how many adults, how many kids, and any special needs I should keep in mind?',
                      },
                    ]);
                    setAwaitingGroupInfo(true);
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

        <p style={styles.footnote}>Made with ❤️ by Jamie Stapleton.</p>
      </main>
    </>
  );
}

function generateSampleItinerary(park) {
  if (park === 'Magic Kingdom') {
    return `🗓️ Magic Kingdom Day Plan:
- 🎠 Rope drop: Peter Pan’s Flight
- ☕ 10:30am: Snack break at Sleepy Hollow
- 🐘 11:15am: Dumbo the Flying Elephant
- 🍔 12:30pm: Lunch at Cosmic Ray’s
- 🏯 2:00pm: Rest break + character spotting near the castle
- 🚂 3:30pm: Jungle Cruise
- 🍦 5:00pm: Dole Whip at Aloha Isle
- 🎆 8:00pm: Fireworks from Main Street`;
  } else if (park === 'EPCOT') {
    return `🗓️ EPCOT Day Plan:
- 🚀 Rope drop: Soarin’
- ☕ 10:15am: Joffrey’s coffee break
- 🧪 11:00am: Journey into Imagination
- 🍣 12:30pm: Lunch in Japan Pavilion
- 🌍 2:00pm: Kidcot World Showcase scavenger hunt
- 🍰 4:00pm: Pastries in France
- 🎆 8:00pm: Luminous fireworks show`;
  } else {
    return `🗓️ ${park} sample plan coming soon!`;
  }
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
