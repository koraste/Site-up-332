import { useEffect, useState } from 'react';

function useVisibilityPause() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    const handleBlur = () => {
      setIsPaused(true);
    };

    const handleFocus = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    handleVisibility();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return isPaused;
}

export default useVisibilityPause;
