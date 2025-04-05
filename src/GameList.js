import React, { useEffect, useState } from 'react';
import Tabletop from 'tabletop';

const SPREADSHEET_KEY = 'ここにスプレッドシートIDを貼る';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    Tabletop.init({
      key: SPREADSHEET_KEY,
      simpleSheet: true,
      callback: (data) => setGames(data),
    });
  }, []);

  const platforms = ['All', ...new Set(games.map(game => game.platform))];
  const filtered = filter === 'All' ? games : games.filter(g => g.platform === filter);

  return (
    <div>
      <h1>🎮 持っているゲーム一覧</h1>

      {/* フィルター */}
      <div style={{ margin: '1rem 0' }}>
        <label>機種で絞り込み: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          {platforms.map((p, idx) => (
            <option key={idx} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 一覧 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filtered.map((game, idx) => (
          <div key={idx} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '1rem',
            width: '200px',
            textAlign: 'center'
          }}>
            <img src={game.image} alt={game.title} style={{ width: '100%' }} />
            <h3>{game.title}</h3>
            <p>{game.platform}</p>
            <p>{game.releaseDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
