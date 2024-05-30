import * as React from "react";

interface IShowMoreButtonProps {
  currentState: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

export type { IShowMoreButtonProps };
