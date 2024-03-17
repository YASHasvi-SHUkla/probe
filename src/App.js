import "./styles.css";
import Quiz from "./components/Quiz"

export default function App() {
  return (
    <>
      <div className="App">
        <h1 className="title">PROBE</h1>
        <h2 className="tagline">Expand Your Mind, One Question at a Time!</h2>
      </div>
      <Quiz />
    </>
  );
}
