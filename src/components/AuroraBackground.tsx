const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden grain-overlay">
      {/* Large gradient band 1 */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12] animate-aurora-1 blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(25 100% 50%), hsl(31 100% 55%), transparent 70%)",
          top: "-20%",
          left: "-10%",
        }}
      />
      {/* Large gradient band 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.1] animate-aurora-2 blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(35 100% 64%), hsl(25 100% 50%), transparent 70%)",
          top: "20%",
          right: "-5%",
        }}
      />
      {/* Blob 3 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08] animate-aurora-3 blur-[80px]"
        style={{
          background: "radial-gradient(circle, hsl(31 100% 55%), transparent 70%)",
          bottom: "10%",
          left: "30%",
        }}
      />
      {/* Blob 4 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] animate-aurora-1 blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(25 80% 45%), transparent 70%)",
          top: "50%",
          left: "60%",
          animationDelay: "5s",
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default AuroraBackground;
