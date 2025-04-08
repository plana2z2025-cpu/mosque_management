"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function MosqueCard({ mosque }) {
  const { name, address, timings } = mosque;
  const { street, city, state, postalCode, coordinates } = address;

  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;

  // Format the next prayer time
  const getCurrentPrayer = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour
      .toString()
      .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;

    const prayers = [
      { name: "Fajr", time: timings.fajr.jamaat },
      { name: "Dhuhr", time: timings.dhuhr.jamaat },
      { name: "Asr", time: timings.asr.jamaat },
      { name: "Maghrib", time: timings.maghrib.jamaat },
      { name: "Isha", time: timings.isha.jamaat },
    ];

    // Sort prayers by time
    prayers.sort((a, b) => a.time.localeCompare(b.time));

    // Find the next prayer
    for (const prayer of prayers) {
      if (prayer.time > currentTime) {
        return prayer;
      }
    }

    // If all prayers have passed, return the first prayer for tomorrow
    return prayers[0];
  };

  const nextPrayer = getCurrentPrayer();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-start gap-1">
          <MapPin size={16} className="shrink-0 mt-0.5 text-gray-500" />
          <span>
            {street}, {city}, {state} {postalCode}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Next Prayer
            </h4>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {nextPrayer.name}
              </Badge>
              <div className="flex items-center gap-1 text-sm">
                <Clock size={14} className="text-gray-500" />
                <span>{nextPrayer.time}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="font-medium">Jumma</p>
              <p className="text-gray-600">Khutbah: {timings.jumma.qutba}</p>
              <p className="text-gray-600">Jamaat: {timings.jumma.jamaat}</p>
            </div>
            <div className="col-span-2">
              <p className="font-medium mb-2">Prayer Times</p>
              <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-xs">
                <span className="font-medium">Prayer</span>
                <span className="font-medium text-center">Azaan</span>
                <span className="font-medium text-center">Jamaat</span>

                <span className="text-gray-600">Fajr</span>
                <span className="text-center">{timings.fajr.azaan}</span>
                <span className="text-center">{timings.fajr.jamaat}</span>

                <span className="text-gray-600">Dhuhr</span>
                <span className="text-center">{timings.dhuhr.azaan}</span>
                <span className="text-center">{timings.dhuhr.jamaat}</span>

                <span className="text-gray-600">Asr</span>
                <span className="text-center">{timings.asr.azaan}</span>
                <span className="text-center">{timings.asr.jamaat}</span>

                <span className="text-gray-600">Maghrib</span>
                <span className="text-center">{timings.maghrib.azaan}</span>
                <span className="text-center">{timings.maghrib.jamaat}</span>

                <span className="text-gray-600">Isha</span>
                <span className="text-center">{timings.isha.azaan}</span>
                <span className="text-center">{timings.isha.jamaat}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button variant="secondary" className="flex-1 gap-1">
          <Info size={16} />
          <span>View Details</span>
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-1 bg-emerald-600 text-white hover:text-white hover:bg-emerald-600"
          onClick={() => window.open(googleMapsUrl, "_blank")}
        >
          <MapPin size={16} />
          <span>Location</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
