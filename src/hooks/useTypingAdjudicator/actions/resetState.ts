import { TypingState } from "../types";

const getInitialState = (source: string): TypingState => {
  return {
    source,
    pos: 0,
    targetChar: source[0],
    isValid: true,
    curErrorCount: 0,
    totalErrors: 0,
    status: null
  };
};

const resetState = ({ source }: TypingState): TypingState => {
  return getInitialState(source);
};

export { resetState, getInitialState };
