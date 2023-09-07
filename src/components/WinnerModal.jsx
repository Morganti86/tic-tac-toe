import { Square } from "./UI/Square";

export function WinnerModal({winner, resetGame}) {
    if (winner === null) return null
    const winnerText = winner === false ? "Empate" : "Gano: "
    const draw = null;
    console.log("winner: " + winner);
    return (
      <section className="winner">
        <div className="text">
          <h2>{winnerText}</h2>
          <header>{winner && <Square>{winner}</Square>}</header>
          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    );
}

