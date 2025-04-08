import { MosqueCard } from "./MosqueCard";

export function MosqueList({ mosques }) {
  if (mosques.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No mosques found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mosques.map((mosque) => (
        <MosqueCard key={mosque._id} mosque={mosque} />
      ))}
    </div>
  );
}
