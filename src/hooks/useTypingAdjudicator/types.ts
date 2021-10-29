export type ActionResult = number;

export enum ActionType {
  INSERT,
  DELETE,
  RESET
}

export type TypingState = {
  source: string;
  pos: number;
  targetChar: string;
  isValid: boolean;
  curErrorCount: number;
  totalErrors: number;
  status: "started" | "done" | null;
};

export type TypingAction = {
  type: ActionType;
  payload?: string;
};
