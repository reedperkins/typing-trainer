import { useCallback, useReducer } from "react";
import { deleteChar, insertChar, resetState, getInitialState } from "./actions";
import { ActionType, TypingAction, TypingState } from "./types";

const reducer: React.Reducer<TypingState, TypingAction> = (state, action) => {
  switch (action.type) {
    case ActionType.INSERT:
      return insertChar(state, action);
    case ActionType.DELETE:
      return deleteChar(state);
    case ActionType.RESET:
      return resetState(state);
  }
};

// const usePrevious = <T>(val: T) => {
//   const ref = useRef<T>();
//   useEffect(() => {
//     ref.current = val;
//   });
//   return ref.current;
// };

const useTypingAdjudicator = (source: string) => {
  // const initialState = useMemo((): TypingState => {
  //   return getInitialState(source);
  // }, [source]);
  const initialState = getInitialState(source);
  const [state, dispatch] = useReducer(reducer, initialState);

  const appendNewChar = useCallback(
    (key: string) => {
      dispatch({
        type: ActionType.INSERT,
        payload: key
      });
    },
    [dispatch]
  );

  const deleteLastChar = useCallback(() => {
    dispatch({ type: ActionType.DELETE });
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch({ type: ActionType.RESET });
  }, [dispatch]);

  const status = state.status;
  // const prevStatus = usePrevious(status);

  // const onStart = useCallback(
  //   (callback) => {
  //     if (prevStatus === null && status === "started") callback();
  //   },
  //   [prevStatus, status]
  // );

  const onStart = useCallback(
    (callback) => {
      if (status === "started") callback();
    },
    [status]
  );

  const onEnd = useCallback(
    (callback) => {
      if (status === "done") callback();
    },
    [status]
  );

  return {
    state,
    actions: {
      appendNewChar,
      deleteLastChar,
      reset
    },
    handlers: {
      onEnd,
      onStart
    }
  };
};

export default useTypingAdjudicator;
