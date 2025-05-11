'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async () => {
    const res = await axios.post('http://127.0.0.1:5000/api/summarize', { text: input });
    setSummary(res.data.summary);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Summarizer</h1>
      <textarea
        className="w-full p-2 border mb-4"
        rows={6}
        placeholder="Paste text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
        Summarize
      </button>
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
