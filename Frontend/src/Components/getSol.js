export const getSol = async (number) => {
  try {
    const res = await fetch(`http://localhost:3000/giveup?number=${number}`, {
      method: 'POST', // still POST
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number }) // will still be sent in body
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log('Error getting solution:', err);
    throw err;
  }
};
