const PageLoader = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-base">
    <span className="font-display text-4xl font-black tracking-tight text-white">
      try<span className="text-orange">v</span>o
    </span>
    <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
      <div className="h-full w-1/4 rounded-full bg-orange animate-progress-indeterminate" />
    </div>
  </div>
);

export { PageLoader };
