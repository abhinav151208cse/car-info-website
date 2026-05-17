import type { SyntheticEvent } from "react";

export const CAR_IMAGE_PLACEHOLDER = "/cars/placeholder.svg";

export function onCarImageError(e: SyntheticEvent<HTMLImageElement>): void {
  const el = e.currentTarget;
  if (!el.src.endsWith(CAR_IMAGE_PLACEHOLDER)) {
    el.src = CAR_IMAGE_PLACEHOLDER;
  }
}
