// weight helpers
export const KG_PER_LB = 0.45359237;
export const LB_PER_KG = 1 / KG_PER_LB;            // 2.20462262185
export const OZ_PER_LB = 16;
export const OZ_PER_KG = LB_PER_KG * OZ_PER_LB;    // 35.2739619496

export const kgToLbs = (kg: number) => kg * LB_PER_KG;
export const lbsToKg = (lb: number) => lb * KG_PER_LB;
export const kgToOz  = (kg: number) => kg * OZ_PER_KG;
export const ozToKg  = (oz: number) => oz / OZ_PER_KG;


export type WeightUnit = "kg" | "lbs" | "grams" | "ounce";
