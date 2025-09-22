// contexts/RecipeContext.tsx
import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStepper } from "./stepper";
  
  // 7 concrete steps = your questions
  export enum QuestionSteps {
    Dish = 0,                 // What do you want to cook?
    Dietary = 1,              // Any dietary restrictions?
    Servings = 2,             // How many servings?
    IncludeExclude = 3,       // Include/exclude ingredients?
    Time = 4,                 // How much time to cook?
    Equipment = 5,            // What kitchen equipment?
    TargetMacros = 6,         // Targeted Macros
  }
  
  export type TargetMacros = {
    calories?: number;
    protein?: number; // g
    carbs?: number;   // g
    fats?: number;    // g
  };
  
  export type RecipeQA = {
    // 1
    dish?: string;
  
    // 2
    dietaryRestrictions?: string[]; // e.g., ["vegan", "gluten-free"]
  
    // 3
    servings?: number; // integer 1..20 (tweak as needed)
  
    // 4
    includeIngredients?: string[];
    excludeIngredients?: string[];
  
    // 5
    cookTimeMinutes?: number; // e.g., 15, 30, 45, 60
  
    // 6
    equipment?: string[]; // e.g., ["oven", "stovetop", "air-fryer"]
  
    // 7
    targetMacros?: TargetMacros;
  };
  
  const defaultQA: RecipeQA = {
    dietaryRestrictions: [],
    includeIngredients: [],
    excludeIngredients: [],
    equipment: [],
    targetMacros: {},
  };
  
  // Per-step validators (tweak rules to match your UX)
  const validators: Record<QuestionSteps, (a: RecipeQA) => boolean> = {
    [QuestionSteps.Dish]: (a) => !!a.dish && a.dish.trim().length > 0,
    [QuestionSteps.Dietary]: (_a) => true, // optional
    [QuestionSteps.Servings]: (a) =>
      typeof a.servings === "number" && a.servings >= 1 && a.servings <= 20,
    [QuestionSteps.IncludeExclude]: (_a) => true, // optional
    [QuestionSteps.Time]: (a) =>
      typeof a.cookTimeMinutes === "number" && a.cookTimeMinutes > 0,
    [QuestionSteps.Equipment]: (_a) => true, // optional
    [QuestionSteps.TargetMacros]: (_a) => true, // optional (or enforce any combo you like)
  };
  
  type CtxType = {
    qa: RecipeQA;
  
    // generic setters
    setField: <K extends keyof RecipeQA>(key: K, value: RecipeQA[K]) => void;
    setMany: (patch: Partial<RecipeQA>) => void;
  
    // array helpers
    addIngredientToInclude: (name: string) => void;
    removeIngredientFromInclude: (name: string) => void;
    addIngredientToExclude: (name: string) => void;
    removeIngredientFromExclude: (name: string) => void;
    addEquipment: (name: string) => void;
    removeEquipment: (name: string) => void;
  
    // macros helper
    setTargetMacros: (patch: Partial<TargetMacros>) => void;
  
    // step helpers
    isStepValid: (step?: QuestionSteps) => boolean;
  
    // flow
    resetRecipe: () => void;
    submit: () => void; // call on last step "Finish"
    showRecipeAI: boolean;                                   // ✅ type it
    setShowRecipeAI: React.Dispatch<React.SetStateAction<boolean>>;
    showAddRecipe:boolean;
    setShowAddRecipe: React.Dispatch<React.SetStateAction<boolean>>
    showDietRecipe:boolean;
    setShowDietRecipe:React.Dispatch<React.SetStateAction<boolean>>
  };
  
  const Ctx = createContext<CtxType | null>(null);
  
  export function RecipeProvider({ children }: { children: ReactNode }) {
    const [qa, setQa] = useState<RecipeQA>(defaultQA);
   
    const { current, setCanNext, total, setTotal } = useStepper();
    const [showRecipeAI,setShowRecipeAI]=useState(false);
    const [showAddRecipe,setShowAddRecipe]=useState(false);
    const [showDietRecipe,setShowDietRecipe]=useState(false);
    // Ensure the stepper knows this flow has 7 steps
    useEffect(() => {
      if (total !== 7) setTotal(7);
    }, [total, setTotal]);
  
    const isStepValid = (step: QuestionSteps = current as QuestionSteps) =>
      validators[step]?.(qa) ?? true;
  
    // Gate "Next" button based on active step validity
    useEffect(() => {
      setCanNext(isStepValid(current as QuestionSteps));
    }, [qa, current, setCanNext]);
  
    // --- setters ---
    const setField = <K extends keyof RecipeQA>(key: K, value: RecipeQA[K]) =>
      setQa((prev) => ({ ...prev, [key]: value }));
  
    const setMany = (patch: Partial<RecipeQA>) =>
      setQa((prev) => ({ ...prev, ...patch }));
  
    // --- array helpers ---
    const addIngredientToInclude = (name: string) =>
      setQa((p) => ({
        ...p,
        includeIngredients: Array.from(new Set([...(p.includeIngredients ?? []), name.trim()])),
      }));
  
    const removeIngredientFromInclude = (name: string) =>
      setQa((p) => ({
        ...p,
        includeIngredients: (p.includeIngredients ?? []).filter((x) => x !== name),
      }));
  
    const addIngredientToExclude = (name: string) =>
      setQa((p) => ({
        ...p,
        excludeIngredients: Array.from(new Set([...(p.excludeIngredients ?? []), name.trim()])),
      }));
  
    const removeIngredientFromExclude = (name: string) =>
      setQa((p) => ({
        ...p,
        excludeIngredients: (p.excludeIngredients ?? []).filter((x) => x !== name),
      }));
  
    const addEquipment = (name: string) =>
      setQa((p) => ({
        ...p,
        equipment: Array.from(new Set([...(p.equipment ?? []), name.trim()])),
      }));
  
    const removeEquipment = (name: string) =>
      setQa((p) => ({
        ...p,
        equipment: (p.equipment ?? []).filter((x) => x !== name),
      }));
  
    const setTargetMacros = (patch: Partial<TargetMacros>) =>
      setQa((p) => ({ ...p, targetMacros: { ...(p.targetMacros ?? {}), ...patch } }));
  
    const resetRecipe = () => setQa(defaultQA);
  
    const submit = () => {
      // Final pass if you want to enforce any must-haves before proceeding:
      const allGood = (Object.keys(validators) as unknown as QuestionSteps[]).every((s) =>
        isStepValid(s)
      );
      if (!allGood) return;
  
      // Navigate to your loader/next screen
      router.push("/personalizing");
    };
  
    const value = useMemo<CtxType>(
      () => ({
        qa,
        setField,
        setMany,
        addIngredientToInclude,
        removeIngredientFromInclude,
        addIngredientToExclude,
        removeIngredientFromExclude,
        addEquipment,
        removeEquipment,
        setTargetMacros,
        isStepValid,
        resetRecipe,
        submit,
        showRecipeAI,
        setShowRecipeAI,
        showAddRecipe,
        setShowAddRecipe,
        showDietRecipe,
        setShowDietRecipe,

      }),
      [qa,showRecipeAI,showAddRecipe,showDietRecipe]
    );
  
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }
  
  export function useRecipe() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useRecipe must be used within RecipeProvider");
    return ctx;
  }
  