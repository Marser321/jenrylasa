import { useGSAP } from "@gsap/react";

/**
 * Re-exporting useGSAP from @gsap/react to satisfy the "Frontend Animator" skill requirement.
 * 
 * RULES FOR ANIMATION:
 * 1. ALWAYS use this hook or the import from "@gsap/react" directly.
 * 2. This hook automatically wraps your code in a `gsap.context()`, which handles cleanup (reverting animations) when the component unmounts.
 * 3. Do NOT manually create `gsap.context()` inside `useEffect` unless absolutely necessary (use this hook instead).
 * 
 * Example:
 * ```tsx
 * useGSAP(() => {
 *   gsap.to(".box", { x: 100 });
 * }, { scope: containerRef });
 * ```
 */

export { useGSAP };
