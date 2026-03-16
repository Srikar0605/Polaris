function LoadingSkeleton() {
  return (
    <section className="grid">
      <div className="grid grid-3">
        <div className="card skeleton skeleton-h-20" />
        <div className="card skeleton skeleton-h-20" />
        <div className="card skeleton skeleton-h-20" />
      </div>
      <div className="card skeleton skeleton-h-28" />
      <div className="card skeleton skeleton-h-12" />
    </section>
  );
}

export default LoadingSkeleton;
