import { TypingState } from "../types";

const deleteChar = (state: TypingState): TypingState => {
  const { source, pos, isValid, curErrorCount, status } = state;
  if (status === "done") return state;
  if (status === null) return { ...state, status: "started" };
  const newPos = Math.max(0, pos - 1);
  if (isValid) {
    const newTargetChar = source[newPos];
    return {
      ...state,
      pos: newPos,
      targetChar: newTargetChar
    };
  } else if (curErrorCount > 1) {
    return {
      ...state,
      curErrorCount: curErrorCount - 1
    };
  } else {
    return {
      ...state,
      isValid: true,
      curErrorCount: 0
    };
  }
};

export default deleteChar;
