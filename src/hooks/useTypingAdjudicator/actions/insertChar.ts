import { TypingAction, TypingState } from "../types";

const insertChar = (state: TypingState, action: TypingAction): TypingState => {
  const {
    source,
    pos,
    targetChar,
    isValid,
    curErrorCount,
    totalErrors,
    status
  } = state;
  if (status === "done") return state;
  const newChar = action.payload;
  if (isValid && newChar && newChar === targetChar) {
    const newPos = pos + 1;
    if (newPos === source.length) {
      return {
        ...state,
        status: "done"
      };
    }
    const newTargetChar = source[newPos];
    return {
      ...state,
      pos: newPos,
      targetChar: newTargetChar,
      status: "started"
    };
  }
  return {
    ...state,
    isValid: false,
    curErrorCount: curErrorCount + 1,
    totalErrors: totalErrors + 1,
    status: "started"
  };
};

export default insertChar;
