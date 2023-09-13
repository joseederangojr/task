import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
  * Tailwind CSS classnames generator
  */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
