import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import Image from "next/image";

export default function MosqueHeader({
  name,
  profileImage,
  address,
  contactInfo,
}) {
  return (
    <Card className="bg-white dark:bg-gray-900 overflow-hidden">
      <div className="relative h-40 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="absolute inset-0 bg-opacity-60 bg-black flex items-end">
          <div className="p-6 text-white">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="flex items-center mt-2 text-gray-200">
              <MapPin className="h-4 w-4 mr-2" />
              {address.street}, {address.city}, {address.state}{" "}
              {address.postalCode}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {profileImage && (
            <div className="relative w-24 h-24 md:w-32 md:h-32 -mt-16 md:-mt-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 mt-4 md:mt-0">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-emerald-600 mr-2" />
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-emerald-600 mr-2" />
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-emerald-600 mr-2" />
              <a
                href={contactInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
