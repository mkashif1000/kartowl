import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns a random item from an array
 */
export function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

/**
 * Returns n random items from an array
 */
export function getRandomItems<T>(array: T[], n: number): T[] {
  if (n <= 0) return []
  if (n >= array.length) return [...array]
  
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

/**
 * Returns a random item from an array that matches a condition
 */
export function getRandomItemByCondition<T>(array: T[], condition: (item: T) => boolean): T | undefined {
  const filtered = array.filter(condition)
  return getRandomItem(filtered)
}
