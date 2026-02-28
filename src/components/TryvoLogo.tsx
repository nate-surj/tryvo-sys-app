const TryvoLogo = ({ className = "", light = true }: { className?: string; light?: boolean }) => {
  const fill = light ? "hsl(37, 25%, 93%)" : "hsl(0, 0%, 10%)";
  
  return (
    <svg
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tryvo"
    >
      <text
        x="0"
        y="25"
        fontFamily="Satoshi, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill={fill}
        letterSpacing="-0.02em"
      >
        Try
      </text>
      <text
        x="52"
        y="25"
        fontFamily="Satoshi, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill="hsl(21, 92%, 47%)"
        letterSpacing="-0.02em"
      >
        v
      </text>
      <text
        x="70"
        y="25"
        fontFamily="Satoshi, sans-serif"
        fontWeight="900"
        fontSize="28"
        fill={fill}
        letterSpacing="-0.02em"
      >
        o
      </text>
    </svg>
  );
};

export default TryvoLogo;
