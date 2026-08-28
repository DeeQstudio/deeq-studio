export function KwkrLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`kwkrLockup${compact ? " kwkrLockupCompact" : ""}`} aria-label="KWKR identity">
      <span className="kwkrLockupName">KWKR</span>
      <span className="kwkrLockupCity">8000</span>
      <span className="kwkrLockupDomain">.BE</span>
    </div>
  );
}
