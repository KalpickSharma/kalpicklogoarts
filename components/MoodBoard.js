import { useState, useEffect } from 'react';

export default function MoodBoard({ prompt, type }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prompt && type) {
      generateMoodBoard();
    }
  }, [prompt, type]);

  const generateMoodBoard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/moodboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type }),
      });
      
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error generating mood board:', error);
    }
    setLoading(false);
  };

  if (!prompt || !type) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Mood Board</h2>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img
                src={image}
                alt={`Mood board image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
