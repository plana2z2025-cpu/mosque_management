export function PrayerTiming({ name, timing, isJumma }) {
  return (
    <div className={`prayer-timing bg-emerald-50 p-4 rounded-lg shadow-md`}>
      <h3 className="font-medium text-emerald-800 mb-2 capitalize">{name}</h3>
      {timing.qutba && <p className="text-gray-700">Qutba: {timing.qutba}</p>}
      <p className="text-gray-700">Azaan: {timing.azaan}</p>
      <p className="text-gray-700">Jamaat: {timing.jamaat}</p>
    </div>
  );
}

export default PrayerTiming;
