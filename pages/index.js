import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Before we dive in, how familiar are you with Disney World and its parks?' },
  ]);
  const [input, setInput] = useState('');

  const handleStart = () => {
    setStarted(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const newMessages = [...messages, userMessage];

    // Super basic logic – can expand later
    let botReply = '';

    const inputLower = input.toLowerCase();
    if (inputLower.includes('never') || inputLower.includes("don't know") || inputLower.includes('not much')) {
      botReply = `No worries! There are four main parks—Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom. Want help picking the best ones for your trip?`;
    } else if (inputLower.includes('yes') || inputLower.includes('been') || inputLower.includes('know')) {
      botReply = `Awesome! Any favorite parks or must-do rides already in mind?`;
    } else {
      botReply = `Got it. Want to tell me more about your group or what kind of experience you're hoping for?`;
    }

    setMessages([...newMessages, { from: 'bot', text: botReply }]);
    setInput('');
  };

  return (
    <>
      <Head>
        <title>Disney Guide</title>
        <meta name="description" content="You
