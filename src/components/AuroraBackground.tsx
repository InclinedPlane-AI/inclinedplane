const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle orange tint behind hero text — top-left */}
      <div
        className="absolute w-[700px] h-[600px] rounded-full blur-[160px] will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(var(--orange-start) / 0.18), hsl(var(--orange-mid) / 0.08), transparent 70%)",
          top: "-5%",
          left: "-8%",
        }}
      />
      {/* Large gradient band 1 */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full animate-aurora-1 blur-[100px] will-change-transform opacity-[var(--aurora-opacity)]"
        style={{
          background: "radial-gradient(circle, hsl(var(--orange-start)), hsl(var(--orange-mid)), transparent 70%)",
          top: "-20%",
          left: "-10%",
        }}
      />
      {/* Large gradient band 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-aurora-2 blur-[120px] will-change-transform opacity-[calc(var(--aurora-opacity)*0.85)]"
        style={{
          background: "radial-gradient(circle, hsl(var(--orange-end)), hsl(var(--orange-start)), transparent 70%)",
          top: "20%",
          right: "-5%",
        }}
      />
      {/* Blob 3 — reduced size */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-aurora-3 blur-[80px] will-change-transform opacity-[calc(var(--aurora-opacity)*0.6)]"
        style={{
          background: "radial-gradient(circle, hsl(var(--orange-mid)), transparent 70%)",
          bottom: "10%",
          left: "30%",
        }}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default AuroraBackground;
