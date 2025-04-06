"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Info } from "lucide-react";
import moment from "moment";

export default function MosqueDetails({ aboutInfo, facilities, uniqueId }) {
  // Function to format facility names
  const formatFacilityName = (facility) => {
    return facility
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="grid gap-6">
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Info className="h-5 w-5 mr-2 text-emerald-600" />
            About the Mosque
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Calendar className="h-10 w-10 text-emerald-600 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Established
                </h3>
                <p className="text-lg font-semibold">
                  {aboutInfo.established
                    ? moment(aboutInfo.established).format("MMMM DD, YYYY")
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Users className="h-10 w-10 text-emerald-600 mr-4" />
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Capacity
                </h3>
                <p className="text-lg font-semibold">
                  Regular: {aboutInfo.capacity.regular} | Friday:{" "}
                  {aboutInfo.capacity.friday}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Mosque ID
            </h3>
            <Badge variant="outline" className="text-xs px-2 py-1">
              {uniqueId}
            </Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Facilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {facilities.map((facility) => (
                <Badge
                  key={facility}
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-300"
                >
                  {formatFacilityName(facility)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
