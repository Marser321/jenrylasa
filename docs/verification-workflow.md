# Visual Verification Workflow

> [!IMPORTANT]
> **MANDATORY RULE**: Before committing any UI change, you MUST verify it visually.

## The Problem
AI-generated code often "compiles" but looks broken (misaligned buttons, bad contrast, broken layouts).

## The Workflow

1.  **Implement Change**: Write the code.
2.  **Visual Check**:
    - If running in a browser environment (e.g. via `browser_subagent`), take a screenshot.
    - If running locally (as the user does), explicitly ask the user to verify key elements or describe what they should see.
    - Check for:
        - Alignment & Spacing (Margins/Paddings)
        - Text Contrast & Readability
        - Mobile Responsiveness (Resize window to phone width)
        - Animation smoothness
3.  **Self-Correction**: If something looks "off", FIX IT immediately. Do not ask the user if it's okay to ship broken UI.
4.  **Commit**: Only after verification.

## Specific Checks for Henry Project
- **Dark Mode**: Verify all text is legible on dark backgrounds (`bg-void`, `bg-surface`).
- **Scroll**: Verify scroll animations (GSAP) are smooth and don't jitter.
- **Images**: Verify images are loaded and `object-fit` is correct (no stretching).
