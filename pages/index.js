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
      // Other messages after park selection
      botReply = `Thanks! I’ll keep that in mind. Want to tell me about your group or what kind of experience you're hoping for?`;
      setMessages([...newMessages, { from: 'bot', text: botReply }]);
    }

    setInput('');
  };

  const handleParkClick = (park) => {
    if (selectedParks.includes(park)) return;

    const newSelections = [...selectedParks, park];
    setSelectedParks(newSelections);
    setMessages(
