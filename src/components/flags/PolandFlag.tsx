function PolandFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[3px] shadow-sm border border-black/10`}
      aria-label="Польша"
      role="img"
    >
      <rect width="24" height="8" fill="#FFFFFF" />
      <rect y="8" width="24" height="8" fill="#DC143C" />
    </svg>
  );
}

export default PolandFlag;
