import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

export default function PrayerTimings({ timings }) {
  const prayers = [
    { name: "Fajr", time: timings.fajr, icon: "🌅" },
    { name: "Dhuhr", time: timings.dhuhr, icon: "☀️" },
    { name: "Asr", time: timings.asr, icon: "🌇" },
    { name: "Maghrib", time: timings.maghrib, icon: "🌆" },
    { name: "Isha", time: timings.isha, icon: "🌃" },
  ];

  return (
    <div className="grid gap-6">
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Clock className="h-5 w-5 mr-2 text-emerald-600" />
            Daily Prayer Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {prayers.map((prayer) => (
              <Card
                key={prayer.name}
                className="bg-gray-50 dark:bg-gray-800 border-none"
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{prayer.icon}</div>
                    <h3 className="font-medium text-lg">{prayer.name}</h3>
                    <div className="mt-3 grid gap-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Azaan:
                        </span>
                        <span className="font-medium">{prayer.time.azaan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          Jamaat:
                        </span>
                        <span className="font-medium">
                          {prayer.time.jamaat}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
            Jumu'ah Prayer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <h4 className="text-gray-500 dark:text-gray-400 mb-1">Qutba</h4>
                <p className="text-lg font-medium">{timings.jumma.qutba}</p>
              </div>
              <div className="p-3">
                <h4 className="text-gray-500 dark:text-gray-400 mb-1">Azaan</h4>
                <p className="text-lg font-medium">{timings.jumma.azaan}</p>
              </div>
              <div className="p-3">
                <h4 className="text-gray-500 dark:text-gray-400 mb-1">
                  Jamaat
                </h4>
                <p className="text-lg font-medium">{timings.jumma.jamaat}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
