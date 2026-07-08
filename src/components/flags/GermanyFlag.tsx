function GermanyFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[3px] shadow-sm border border-black/10`}
      aria-label="Германия"
      role="img"
    >
      <rect width="24" height="5.34" fill="#000000" />
      <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
      <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
    </svg>
  );
}

export default GermanyFlag;
