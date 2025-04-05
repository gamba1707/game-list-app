import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwvo4rMvOgeRI6n5WRo8MP1Wbbyj9JT32Z5-l0O5U3N7f5mM2DQAQLkPvwNeeBOsty2Y5tPQ5Ir_9m/pub?gid=1073113726&single=true&output=csv";

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        setGames(results.data);
      },
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ゲーム一覧</h1>
      <ul className="space-y-2">
        {games.map((game, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-xl shadow">
            <p><strong>タイトル:</strong> {game.title}</p>
            <p><strong>機種:</strong> {game.platform}</p>
            <p><strong>発売日:</strong> {game.releaseDate}</p>
            {game.image && (
              <img src={game.image} alt={game.title} className="w-32 mt-2 rounded" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;