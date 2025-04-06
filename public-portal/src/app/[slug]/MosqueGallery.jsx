"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image } from "lucide-react";
import NextImage from "next/image";

export default function MosqueGallery({ images = [] }) {
  return (
    <Card className="bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Image className="h-5 w-5 mr-2 text-emerald-600" />
          Mosque Gallery
        </CardTitle>
      </CardHeader>

      {images?.length === 0 ? (
        <CardContent>
          <div className="text-center p-4 text-gray-500 dark:text-gray-400">
            No images available for this mosque.
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="relative aspect-square rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <NextImage
                  src={image.url}
                  alt={image.originalName}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
