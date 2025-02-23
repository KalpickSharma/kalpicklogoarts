import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/music/Skyfall  - Demon Slayer [AMV].mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Auto-play on mount
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch {
        console.log('Auto-play prevented by browser. User interaction needed.');
      }
    };
    playAudio();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (document.hidden) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play().catch(() => {
            // Playback prevented by browser
            setIsPlaying(false);
          });
        }
      }
    };

    // Handle tab/window close
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch {
        console.log('Playback prevented by browser');
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3">
      <span className="text-sm text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
        {isPlaying ? 'Now Playing: SkyFall' : 'Play Music'}
      </span>
      <button
        onClick={togglePlay}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 group"
        title={isPlaying ? 'Pause SkyFall' : 'Play SkyFall'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 text-white group-hover:text-accent-cyan transition-colors" />
        ) : (
          <VolumeX className="w-6 h-6 text-white group-hover:text-accent-pink transition-colors" />
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic; 