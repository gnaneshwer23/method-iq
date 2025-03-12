
export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-background/60 via-background/10 to-background/60" />
      </div>
    </>
  );
}
