import { type ClassValue, clsx as clsxHelper } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxHelper(...inputs));
}

export function translateType(type: string) {
  switch (type) {
    case "RETINOGRAPHY":
      return "RETINOGRAFIA";
    case "OCT":
      return "OCT";
    case "VISUAL_FIELD":
      return "CAMPIMETRIA";
    case "BIOMICROSCOPY":
      return "BIOMICROSCOPIA";
    case "TONOMETRY":
      return "TONOMETRIA";
    case "REFRACTION":
      return "REFRAÇÃO";
    case "BIOMETRY":
      return "BIOMETRIA";
    case "PACHYMETRY":
      return "PAQUIMETRIA";
    case "FUNDOSCOPY":
      return "FUNDOSCOPIA";
    case "CT_CORNEA":
      return "TC CÓRNEA";
    case "GONIOSCOPY":
      return "GONIOSCOPIA";
    default:
      return "N/A";
  }
}

export function isValidURL(string: string) {
  try {
    new URL(string);
    // check if is https
    if (!string.toLowerCase().startsWith("https")) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
