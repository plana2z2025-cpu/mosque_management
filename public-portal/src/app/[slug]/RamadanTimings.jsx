import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Moon, Sunrise, Sunset } from "lucide-react";

export default function RamadanTimings({ ramadanData }) {
  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Moon className="h-5 w-5 mr-2 text-emerald-600" />
          Ramadan Timings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Day</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Sunrise className="h-4 w-4 mr-1" />
                    Sehri Start
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Sunrise className="h-4 w-4 mr-1" />
                    Sehri End
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Sunset className="h-4 w-4 mr-1" />
                    Iftar
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ramadanData.days.map((day) => (
                <TableRow key={day.uuid}>
                  <TableCell className="font-medium">
                    {day.dayOfRamadan}
                  </TableCell>
                  <TableCell>
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{day.sehri_start}</TableCell>
                  <TableCell>{day.sehri_end}</TableCell>
                  <TableCell>{day.iftar}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
