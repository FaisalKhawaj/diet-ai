import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Answers = Record<string | number, any>;

type StepperCtx = {
  current: number;
  total: number;
  progress: number; // 0..1
  isFirst: boolean;
  isLast: boolean;

  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  reset: () => void;
  setTotal: (n: number) => void;

  type: string;
  setType: (t: string | any) => void;

  answers: Answers;
  setAnswer: (key: string | number, value: any) => void;

  canNext: boolean;
  setCanNext: (ok: boolean) => void;

  finish: () => void; // explicit finish trigger
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
  const [type, setType] = useState<"question" | "receipe">("question");
  const [answers, setAnswers] = useState<Answers>({});
  const [canNext, setCanNext] = useState(true);

  // navigation intent flag (so we don't navigate during render)
  const [finishRequested, setFinishRequested] = useState<null | "now">(null);

  const isFirst = current === 0;
  const isLast = total > 0 && current === total - 1;
  const progress = total > 0 ? (current + 1) / total : 0;

  // Only effect performs navigation
  useEffect(() => {
    if (finishRequested === "now") {
      if (type === "receipe") {
        router.push({
          pathname: "/personalizing",
          params: { type: "receipe" },
        });
        setCurrent(0);
      } else {
        router.push({
          pathname: "/personalizing",
          params: { type: "question" },
        });
        setCurrent(0);
      }
      setFinishRequested(null);
    }
  }, [finishRequested, type]);

  const next = useCallback(() => {
    setCurrent((i) => {
      const atLast = i >= total - 1;
      if (atLast) {
        setFinishRequested("now"); // defer navigation to effect
        return i; // keep index stable
      }
      return i + 1;
    });
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, total - 1));
      if (clamped === current && isLast) {
        // If already on last, request finish instead of navigating here
        setFinishRequested("now");
      } else {
        setCurrent(clamped);
      }
    },
    [current, isLast, total]
  );

  const finish = useCallback(() => setFinishRequested("now"), []);

  const reset = useCallback(() => {
    setCurrent(0);
    setAnswers({});
    setCanNext(true);
    setFinishRequested(null);
  }, []);

  const setAnswer = useCallback(
    (key: string | number, value: any) =>
      setAnswers((prev) => ({ ...prev, [key]: value })),
    []
  );

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
      setType,
      type,
      finish,
    }),
    [
      current,
      total,
      progress,
      isFirst,
      isLast,
      next,
      prev,
      goTo,
      reset,
      answers,
      canNext,
      type,
      finish,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStepper() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStepper must be used within StepperProvider");
  return ctx;
}
