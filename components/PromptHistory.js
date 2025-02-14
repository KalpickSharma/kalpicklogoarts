import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function PromptHistory({ userId, onSelectPrompt }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadHistory();
    }
  }, [userId]);

  const loadHistory = async () => {
    try {
      const promptsRef = collection(db, `users/${userId}/prompts`);
      const q = query(promptsRef, orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      
      const prompts = [];
      querySnapshot.forEach((doc) => {
        prompts.push({ id: doc.id, ...doc.data() });
      });
      
      setHistory(prompts);
    } catch (error) {
      console.error('Error loading history:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Prompts</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectPrompt(item)}
          >
            <div className="font-medium text-gray-800">{item.type}</div>
            <div className="text-sm text-gray-600 mt-1">{item.prompt}</div>
            <div className="text-xs text-gray-400 mt-2">
              {new Date(item.createdAt.toDate()).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
