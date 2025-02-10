import React from "react";
import moment from "moment";

const RamadanSchedule = ({ data }) => {
  return (
    <div className="container p-4 max-sm:p-0 w-full ramadan-timings">
      <div className="bg-white shadow-lg rounded-lg overflow-scroll border border-green-200">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Ramazan
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Day
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Sehri Start
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Sehri End
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Iftar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-200">
            {data.map((item, index) => (
              <tr
                key={item.uuid}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-green-50"
                } hover:bg-green-100 transition-colors`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {item.dayOfRamadan}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {moment(item.date).format("LL")}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {item.sehri_start}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {item.sehri_end}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {item.iftar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RamadanSchedule;
