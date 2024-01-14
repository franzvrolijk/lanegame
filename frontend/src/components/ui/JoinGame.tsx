interface JoinGameProps {
  setGameCode: (gameCode: string) => void;
  setGameDetailsConfirmed: (locked: boolean) => void;
  setNickname: (nickname: string) => void;
}

const JoinGame = ({ setGameCode, setGameDetailsConfirmed, setNickname }: JoinGameProps) => {
  return (
    <div className="joinGame">
      <input
        type="text"
        placeholder="Nickname"
        onChange={(e) => {
          setNickname(e.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Code"
        onChange={(e) => {
          setGameCode(e.target.value);
        }}
      ></input>
      <button onClick={() => setGameDetailsConfirmed(true)}>Connect</button>
    </div>
  );
};

export default JoinGame;
