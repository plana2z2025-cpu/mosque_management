export function AnimatedCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default AnimatedCard;
