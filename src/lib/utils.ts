import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: boolean, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");

    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

export const setSessionItem = (key: string, value: boolean): void => {
  sessionStorage.setItem(key, value.toString());
};

export const getSessionItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};