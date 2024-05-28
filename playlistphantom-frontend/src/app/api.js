export async function getSongPredictions(description, numberOfSongs) {
    const response = await fetch('http://localhost:8000/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, number_of_songs: numberOfSongs }),
    });
    const data = await response.json();
    return data.result;
  }
  