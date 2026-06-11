import React, { useState } from 'react';
import './App.css';

const COOP_GAMES_DATABASE = [
  { 
    name: 'Overcooked! All You Can Eat', 
    description: 'A chaotic cooperative cooking game where players must prepare and cook a variety of orders in absurd kitchens before the customers storm out.',
    rating: 4.5, 
    released: '2020-11-12', 
    genres: ['action', 'simulation', 'indie'], 
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'] 
  },
  { 
    name: 'It Takes Two', 
    description: 'An genre-bending platform adventure built purely for co-op. Go on a crazy journey together across a fractured relationship turned magical wonderland.',
    rating: 4.8, 
    released: '2021-03-26', 
    genres: ['action', 'adventure'], 
    platforms: ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch'] 
  },
  { 
    name: 'Helldivers 2', 
    description: 'Join the premier elite galactic forces in a fast, frantic, and ferocious third-person shooter squad battle to safe-keep freedom across a hostile galaxy.',
    rating: 4.7, 
    released: '2024-02-08', 
    genres: ['action', 'shooter'], 
    platforms: ['PC', 'PlayStation 5'] 
  },
  { 
    name: 'Portal 2', 
    description: 'The definitive physics-puzzle co-op journey. Work with your partner through completely unique chamber maps using inventive double portal gun paths.',
    rating: 4.6, 
    released: '2011-04-18', 
    genres: ['action', 'puzzle', 'shooter'], 
    platforms: ['PC', 'PlayStation 3', 'Xbox 360', 'Nintendo Switch'] 
  },
  { 
    name: 'Cuphead', 
    description: 'A classic run-and-gun action game heavily focused on boss battles, beautifully styled after 1930s hand-drawn cartoons.',
    rating: 4.4, 
    released: '2017-09-29', 
    genres: ['action', 'indie', 'fighting'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'] 
  },
  { 
    name: 'Stardew Valley', 
    description: 'Build the farm of your dreams with your friends. Raise livestock, cultivate crops, explore procedural caves, and build a booming country life.',
    rating: 4.7, 
    released: '2016-02-26', 
    genres: ['simulation', 'role-playing-games-rpg', 'indie'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'iOS', 'Android'] 
  },
  { 
    name: 'Left 4 Dead 2', 
    description: 'A high-intensity, cooperative action horror game that takes you and your friends through the cities, swamps, and cemeteries of the Deep South.',
    rating: 4.3, 
    released: '2009-11-17', 
    genres: ['action', 'shooter'], 
    platforms: ['PC', 'Xbox 360'] 
  },
  { 
    name: 'A Way Out', 
    description: 'An exclusive split-screen cooperative prison break adventure, following two inmates making their high-stakes escape away from authority containment.',
    rating: 4.5, 
    released: '2018-03-23', 
    genres: ['action', 'adventure'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One'] 
  },
  { 
    name: 'Guacamelee! 2', 
    description: 'Brawl your way across a vibrant, Mexican folklore-inspired metroidvania world featuring chaotic 4-player wrestling combat mechanics.',
    rating: 4.2, 
    released: '2018-08-21', 
    genres: ['action', 'indie', 'adventure', 'fighting'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'] 
  },
  { 
    name: 'Moving Out', 
    description: 'A hilarious physics-based moving simulator that brings a whole new meaning to "couch co-op" as you pack up furniture in ridiculous scenarios.',
    rating: 4.0, 
    released: '2020-04-28', 
    genres: ['simulation', 'puzzle', 'indie'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch'] 
  },
  { 
    name: 'Brawlhalla', 
    description: 'An epic, free-to-play platform fighter battleground supporting competitive local couch multiplayer brawling across history\'s greatest warriors.',
    rating: 4.1, 
    released: '2017-10-17', 
    genres: ['fighting', 'massively-multiplayer'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'iOS', 'Android'] 
  },
  { 
    name: 'Rayman Legends', 
    description: 'Run, jump, and punch your way through stunningly animated musical stages and fantasy world maps in a brilliant cooperative platformer.',
    rating: 4.6, 
    released: '2013-08-29', 
    genres: ['action', 'adventure'], 
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'PlayStation 3', 'Xbox 360'] 
  }
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [tickerName, setTickerName] = useState(''); 
  const [selectedGenres, setSelectedGenres] = useState([]);

  const availableTags = [
    { id: 'action', label: 'Action / Adventure' },
    { id: 'shooter', label: 'FPS' },
    { id: 'indie', label: 'Relaxing' },
    { id: 'puzzle', label: 'Puzzles' },
    { id: 'adventure', label: 'Exploration' },
    { id: 'simulation', label: 'Simulation' },
    { id: 'fighting', label: 'Fighting' },
    { id: 'role-playing-games-rpg', label: 'RPG' },
    { id: 'massively-multiplayer', label: 'Free-to-play' }
  ];

  const handleCheckboxChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setSelectedGame(null);

    const filteredGames = COOP_GAMES_DATABASE.filter(game => {
      if (selectedGenres.length === 0) return true;
      return game.genres.some(g => selectedGenres.includes(g));
    });

    let counter = 0;
    const tickerInterval = setInterval(() => {
      const randomGame = COOP_GAMES_DATABASE[Math.floor(Math.random() * COOP_GAMES_DATABASE.length)];
      setTickerName(randomGame.name);
      counter++;

      if (counter > 15) {
        clearInterval(tickerInterval);
        
        if (filteredGames.length === 0) {
          alert('No co-op titles found matching this tag combo layout. Try unchecking a few categories!');
          setLoading(false);
          return;
        }

        const rolledGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
        const simulatedScore = Math.floor(Math.random() * 20) + 80;

        setSelectedGame({
          ...rolledGame,
          discovery_score: simulatedScore
        });
        setLoading(false);
      }
    }, 90);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CO-OP Roulette</h1>
      </header>

      <main className="main-content">
        <section className="control-panel">
          <div className="filter-group">
            <h3>Filter by Tag</h3>
            <p className="filter-instructions">Leave all unchecked to spin everything, or pick specific combinations:</p>
            <div className="checkbox-scroll-container">
              {availableTags.map((tag) => (
                <label key={tag.id} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value={tag.id}
                    checked={selectedGenres.includes(tag.id)}
                    onChange={() => handleCheckboxChange(tag.id)}
                  />
                  {tag.label}
                </label>
              ))}
            </div>
          </div>

          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Rolling...' : 'Generate!'}
          </button>
        </section>

        <section className="display-panel">
          {loading && (
            <div className="roulette-ticker">
              <div className="slot-machine-window">
                <div className="slot-text-blur">{tickerName}</div>
              </div>
              <p className="ticker-subtext">Cycling through multiplayer worlds...</p>
            </div>
          )}

          {!loading && selectedGame && (
            <div className="game-card">
              <div className="game-details">
                <h2>{selectedGame.name}</h2>
                
                <p className="game-description">{selectedGame.description}</p>
                
                {selectedGame.platforms && selectedGame.platforms.length > 0 && (
                  <div className="platform-container">
                    {selectedGame.platforms.map((platformName, idx) => (
                      <span key={idx} className="platform-tag">
                        {platformName}
                      </span>
                    ))}
                  </div>
                )}

                <div className="game-meta">
                  <span className="rating-badge">⭐ {selectedGame.rating} / 5</span>
                  <span className="release-badge">Released: {selectedGame.released}</span>
                  {selectedGame.discovery_score && (
                    <span className="catalog-badge">Match Score: {selectedGame.discovery_score}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && !selectedGame && (
            <div className="placeholder-display">
              <div className="roulette-icon">🎯</div>
              <p>Select your favorite tags and hit <strong>Generate</strong> to pick your next co-op experience!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}