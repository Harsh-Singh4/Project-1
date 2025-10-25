import { useState } from 'react';

export const useFetcher = () => {
  const [number, setNumber] = useState(null);

  const fetchNumber = async () => {
    try {
      const res = await fetch('http://localhost:3000/random');
      if (!res.ok) throw new Error('Network response not ok');

      const data = await res.json();

      // Use optional chaining to safely access the number
      setNumber(data?.randomNo?.number ?? 'No number found');
    } catch (err) {
      console.error('Error fetching number:', err);
      setNumber('Error getting the number');
    }
  };

  return { number, fetchNumber };
};
