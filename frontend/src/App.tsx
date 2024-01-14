import "./App.css";
import GameView from "./components/game/GameView";
import { useState } from "react";
import JoinGame from "./components/ui/JoinGame";
import ColorScheme from "./components/ui/ColorScheme";

const App = () => {
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [gameDetailsConfirmed, setGameDetailsConfirmed] = useState<boolean>(false);

  return (
    <div className="App" style={{ backgroundColor: ColorScheme.mainDarker }}>
      {!gameDetailsConfirmed && <JoinGame {...{ setGameCode, setGameDetailsConfirmed, setNickname }} />}

      {gameDetailsConfirmed && gameCode && nickname && (
        <div className="mainContainer">
          <GameView code={gameCode} nickname={nickname} />
          <div className="log"></div>
        </div>
      )}
    </div>
  );
};

export default App;
