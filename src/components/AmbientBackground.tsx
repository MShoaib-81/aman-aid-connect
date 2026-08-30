/**
 * Purely decorative, slow-moving ambient background.
 * Uses design tokens only; respects prefers-reduced-motion via CSS.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span className="ambient-orb ambient-orb-1" />
      <span className="ambient-orb ambient-orb-2" />
      <span className="ambient-orb ambient-orb-3" />
      <span className="ambient-grid" />
    </div>
  );
}
