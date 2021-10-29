// import React, { useEffect, useRef } from "react";
// import { useImperativeHandle, useState } from "react";

// export type TimerRef = {
//   start: () => void;
//   stop: () => void;
//   reset: () => void;
//   time: number;
// };

// export const Timer = React.forwardRef<TimerRef>((_, ref) => {
//   const [time, setTime] = useState(0);
//   const timerId = useRef<number>();
//   const start = () => {
//     const startTime = Date.now();
//     if (timerId.current) clearInterval(timerId.current);
//     timerId.current = setInterval(
//       () => setTime(() => Date.now() - startTime),
//       100
//     );
//   };
//   const stop = () => {
//     clearInterval(timerId.current);
//   };
//   const reset = () => {
//     clearInterval(timerId.current);
//     setTime(0);
//   };
//   useEffect(() => () => clearInterval(timerId.current), [timerId]);
//   useImperativeHandle(ref, () => ({
//     start,
//     stop,
//     reset,
//     time
//   }));
//   return <div>{(time / 1000).toFixed(1)}</div>;
// });
