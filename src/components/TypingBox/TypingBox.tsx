import React, { useEffect, useState } from "react";
import useTypingAdjudicator from "../../hooks/useTypingAdjudicator";

type Props = {
  source: string;
};

const TypingBox = ({ source }: Props) => {
  const {
    state: { totalErrors, pos, isValid, curErrorCount },
    actions: { deleteLastChar, appendNewChar, reset: resetTA },
    handlers: { onStart, onEnd }
  } = useTypingAdjudicator(source);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerId: number | undefined;
    const startTime = Date.now();
    if (timerRunning) {
      timerId = window.setInterval(() => setTime(Date.now() - startTime), 100);
    }
    return () => clearInterval(timerId);
  }, [timerRunning]);

  useEffect(() => {
    onStart(() => {
      setTimerRunning(true);
    });
  }, [onStart]);

  useEffect(() => {
    onEnd(() => {
      setDone(true);
      setTimerRunning(false);
    });
  }, [onEnd]);

  const handleResetClicked = () => {
    setDone(false);
    resetTA();
    setTimerRunning(false);
    setTime(0);
  };

  const handleKey = (key: string) => {
    if (key === "Backspace" || key === "Delete") {
      deleteLastChar();
    } else if (key === "Enter") {
      appendNewChar("\n");
    } else if (key.length === 1) {
      appendNewChar(key);
    }
  };

  return (
    <div>
      <div>{(time / 1000).toFixed(1)}</div>
      <div
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          handleKey(e.key);
        }}
        tabIndex={0}
        style={{ border: "1px solid black" }}
      >
        <pre>
          {Array.from(source).map((c, i) => {
            const char = i === pos && c === "\n" ? "\u23ce\n" : c;
            let validity = "";
            if (i === pos) {
              validity = isValid ? "valid" : "invalid";
            } else if (i > pos && i <= pos + curErrorCount) {
              validity = "invalid";
            }
            return (
              <span className={validity} key={char + i}>
                {char}
              </span>
            );
          })}
        </pre>
      </div>
      {done && (
        <div>
          <p>Complete!</p>
          <p>Total elapsed time: {(time / 1000).toFixed(3)}</p>
          <p>Total Errors: {totalErrors}</p>
          <button onClick={handleResetClicked}>Reset</button>
        </div>
      )}
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};

export default TypingBox;
