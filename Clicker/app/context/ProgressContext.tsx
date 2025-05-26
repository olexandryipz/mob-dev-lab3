import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProgressState = {
  score: number;
  clicks: number;
  doubleClicks: number;
  longPress: boolean;
  pan: boolean;
  flingLeft: boolean;
  flingRight: boolean;
  pinch: boolean;
};

type ProgressContextType = {
  progress: ProgressState;
  addProgress: (type: keyof ProgressState) => void;
  increment: (value: number) => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useState<ProgressState>({
    score: 0,
    clicks: 0,
    doubleClicks: 0,
    longPress: false,
    pan: false,
    flingLeft: false,
    flingRight: false,
    pinch: false,
  });

  const addProgress = (type: keyof ProgressState) => {
    setProgress((prev) => {
      if (typeof prev[type] === 'number') {
        return { ...prev, [type]: (prev[type] as number) + 1 };
      }
      return { ...prev, [type]: true };
    });
  };

  const increment = (value: number) => {
    setProgress((prev) => ({ ...prev, score: prev.score + value }));
  };

  return (
    <ProgressContext.Provider value={{ progress, addProgress, increment }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
};
