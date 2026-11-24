function AustriaFlag({ className = "w-9 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`${className} rounded-[3px] shadow-sm border border-black/10`}
      aria-label="Австрия"
      role="img"
    >
      <rect width="24" height="16" fill="#FFFFFF" />
      <rect width="24" height="5.33" fill="#ED2939" />
      <rect y="10.67" width="24" height="5.33" fill="#ED2939" />
    </svg>
  );
}

export default AustriaFlag;
