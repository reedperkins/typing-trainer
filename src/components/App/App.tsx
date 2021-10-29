import TypingBox from "../TypingBox";
import "./styles.css";

const text = `this is some text
this is some more text
finally, the end!`;

export default function App() {
  return (
    <div className="App">
      <h1>Typing Trainer v2</h1>
      <p>Click anywhere in the box below and start typing!</p>
      <div>
        <TypingBox source={text} />
      </div>
    </div>
  );
}
