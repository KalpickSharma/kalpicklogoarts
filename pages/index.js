import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Auth from '../components/Auth';
import MoodBoard from '../components/MoodBoard';
import PromptHistory from '../components/PromptHistory';

export default function Home() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState('logo');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const generatePrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type }),
      });
      
      const data = await response.json();
      setResult(data.result);

      // Save to history if user is logged in
      if (user) {
        await addDoc(collection(db, `users/${user.uid}/prompts`), {
          prompt,
          type,
          result: data.result,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleHistorySelect = (item) => {
    setPrompt(item.prompt);
    setType(item.type);
    setResult(item.result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Design Prompt Generator</h1>
          {!user ? (
            <Auth onLogin={setUser} />
          ) : (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">{user.displayName}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Type
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="logo">Logo Design</option>
                  <option value="ui">UI/UX Design</option>
                  <option value="branding">Branding</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Brief
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Describe your project (e.g., modern tech startup looking for minimalist logo design)..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                onClick={generatePrompt}
                disabled={loading || !prompt}
              >
                {loading ? 'Generating...' : 'Generate Prompt'}
              </button>

              {result && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Generated Prompt:</h2>
                  <div className="bg-gray-50 p-4 rounded border">
                    {result}
                  </div>
                </div>
              )}

              <MoodBoard prompt={prompt} type={type} />
            </div>
          </div>

          <div className="lg:col-span-1">
            {user && (
              <PromptHistory
                userId={user.uid}
                onSelectPrompt={handleHistorySelect}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
