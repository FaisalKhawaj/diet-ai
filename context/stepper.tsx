// contexts/StepperContext.tsx
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Answers = Record<string | number, any>;

type StepperCtx = {
  // 0-based index
  current: number;
  total: number;
  progress: number; // 0..1
  isFirst: boolean;
  isLast: boolean;

  // navigation
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
  setTotal: (n: number) => void;

  // answers
  answers: Answers;
  setAnswer: (key: string | number, value: any) => void;

  // validation
  canNext: boolean;
  setCanNext: (ok: boolean) => void;
};

const Ctx = createContext<StepperCtx | null>(null);

export function StepperProvider({
  children,
  initialTotal = 1,
  initialIndex = 0,
}: {
  children: ReactNode;
  initialTotal?: number;
  initialIndex?: number;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [total, setTotal] = useState(initialTotal);
  const [answers, setAnswers] = useState<Answers>({});
  const [canNext, setCanNext] = useState(true); // parent screen can gate "Next" per step

  const progress = total > 0 ? (current + 1) / total : 0;
  const isFirst = current === 0;
  const isLast = current === total - 1;

  const next = () => setCurrent((i) => Math.min(i + 1, total - 1));
  const prev = () => setCurrent((i) => Math.max(i - 1, 0));
  const goTo = (index: number) =>
    setCurrent(Math.max(0, Math.min(index, total - 1)));

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setCanNext(true);
  };

  const setAnswer = (key: string | number, value: any) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const value = useMemo<StepperCtx>(
    () => ({
      current,
      total,
      progress,
      isFirst,
      isLast,
      next,
      prev,
      goTo,
      reset,
      setTotal,
      answers,
      setAnswer,
      canNext,
      setCanNext,
    }),
    [current, total, progress, isFirst, isLast, answers, canNext]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStepper() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStepper must be used within StepperProvider");
  return ctx;
}
