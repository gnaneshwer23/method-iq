
export function HeroConnectingLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      {/* Dashed lines connecting to each feature card */}
      <line 
        x1="50%" y1="50%" x2="25%" y2="25%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
      <line 
        x1="50%" y1="50%" x2="50%" y2="15%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
      <line 
        x1="50%" y1="50%" x2="75%" y2="25%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
      <line 
        x1="50%" y1="50%" x2="75%" y2="75%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
      <line 
        x1="50%" y1="50%" x2="50%" y2="85%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
      <line 
        x1="50%" y1="50%" x2="25%" y2="75%" 
        className="stroke-primary/30" 
        strokeWidth="1" 
        strokeDasharray="5,5"
      />
    </svg>
  );
}
