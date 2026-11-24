function SwitzerlandFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[3px] shadow-sm border border-black/10`}
      aria-label="Швейцария"
      role="img"
    >
      <rect width="24" height="16" fill="#DA291C" />
      <rect x="10" y="3" width="4" height="10" fill="#FFFFFF" />
      <rect x="7" y="6" width="10" height="4" fill="#FFFFFF" />
    </svg>
  );
}

export default SwitzerlandFlag;