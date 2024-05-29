import { useState } from 'react';
import { getSongPredictions } from './api';

export default function Home() {
  const [description, setDescription] = useState('');
  const [numberOfSongs, setNumberOfSongs] = useState(5);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await getSongPredictions(description, numberOfSongs);
    setSongs(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      {/* navbar */}
      <nav className="bg-black p-4">
        <div className="flex items-center">
          <img src="/logo.png" alt="PlaylistPhantom" className="w-10 h-10 mr-2" />
          <h1 className="text-lg font-bold">PlaylistPhantom</h1>
        </div>
      </nav>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <img src="/logo.png" alt="Loading" className="animate-spin w-20 h-20" />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-black shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold mb-4">Playlist Generation</h1>
            <p className="text-sm text-gray-300 mb-4">
              Generate an entire music playlist based on your text description! Enter your description
              below and specify the number of songs you want in your playlist.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your description..."
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Number of Songs
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                  value={numberOfSongs}
                  onChange={(e) => setNumberOfSongs(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Give Me a Playlist!
              </button>
            </form>
          </div>

          {/* example description card */}
          <div className="bg-black shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold mb-2">Example Description</h2>
            <p className="text-sm text-gray-300">
              "A happy sunny day at the beach"
            </p>
          </div>

          {songs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Recommended Songs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {songs.map((song, index) => (
                  <div key={index} className="bg-black shadow-md rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-bold mb-2">{song[1]}</h3>
                    <p className="text-sm text-gray-300">Artist: {song[0]}</p>
                    <p className="text-sm text-gray-300">Release Date: {song[2]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
