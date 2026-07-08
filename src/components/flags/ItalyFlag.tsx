function ItalyFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[3px] shadow-sm border border-black/10`}
      aria-label="Италия"
      role="img"
    >
      <rect width="8" height="16" fill="#009246" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#CE2B37" />
    </svg>
  );
}

export default ItalyFlag;
