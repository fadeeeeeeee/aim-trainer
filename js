import { useState, useEffect } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    let timer;
    if (gameActive && time > 0) {
      timer = setInterval(() => setTime(prev => prev - 1), 1000);
    } else if (time === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameActive, time]);

  const startGame = () => {
    setScore(0);
    setTime(30);
    setGameActive(true);
    spawnTarget();
  };

  const endGame = () => {
    setGameActive(false);
    setTargets([]);
    alert(`Game Over! Your score: ${score}`);
  };

  const spawnTarget = () => {
    const newTarget = {
      id: Date.now(),
      left: Math.random() * 560, // 600px container - 40px target
      top: Math.random() * 360,  // 400px container - 40px target
    };
    setTargets([newTarget]);
  };

  const handleClickTarget = (id) => {
    setScore(prev => prev + 1);
    setTargets([]);
    spawnTarget();
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial", padding: "20px" }}>
      <h1>Aim Trainer</h1>
      <div
        style={{
          position: "relative",
          width: "600px",
          height: "400px",
          margin: "0 auto",
          background: "#222",
          border: "2px solid #555",
        }}
      >
        {targets.map(t => (
          <div
            key={t.id}
            onClick={() => handleClickTarget(t.id)}
            style={{
              position: "absolute",
              left: t.left,
              top: t.top,
              width: "40px",
              height: "40px",
              background: "red",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <div style={{ margin: "10px 0", fontSize: "18px" }}>
        <span>Score: {score}</span> | <span>Time: {time}s</span>
      </div>
      <button
        onClick={startGame}
        disabled={gameActive}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Start Game
      </button>
    </div>
  );
}
