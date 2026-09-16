import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateShort(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function isUpcoming(date: Date | string): boolean {
  return new Date(date) > new Date()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export const PROGRAM_CATEGORIES = [
  'All',
  'Education',
  'Healthcare',
  'Empowerment',
  'Environment',
  'Community',
]

export const GALLERY_CATEGORIES = [
  'All',
  'Events',
  'Education',
  'Healthcare',
  'Volunteers',
  'Community',
  'Environment',
]

export const DONATION_PRESETS = [500, 1000, 2000, 5000]
