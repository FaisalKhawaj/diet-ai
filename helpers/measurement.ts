export type Unit = "cm" | "ft" | "in";


export const cmToIn = (cm: number) => cm / 2.54;
export const inToCm = (inch: number) => inch * 2.54;
export const cmToFt = (cm: number) => cm / 30.48;
export const ftToCm = (ft: number) => ft * 30.48;

export const cmToFtIn = (cm: number) => {
  const totalIn = Math.round(cmToIn(cm));
  const ft = Math.floor(totalIn / 12);
  const inch = totalIn % 12;
  return { ft, inch, totalIn };
};

export const ftInToCm = (ft: number, inch: number) => inToCm(ft * 12 + inch);
