import React, { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { useSelector } from 'react-redux';
import { mosqueActions } from '@/redux/combineActions';
import toast from 'react-hot-toast';

const breadCumbs = [{ label: 'Gallery', href: null }];

const GalleryView = () => {
  const { communityMosqueDetail } = useSelector((state) => state.mosqueState);
  const { deleteMosqueGalleryImagesAction } = mosqueActions;

  const [info, setInfo] = useState({
    selectedImages: [],
  });

  // Toggle selection of an image
  const toggleSelect = useCallback(
    (imageId) => {
      setInfo((prevInfo) => {
        const isSelected = prevInfo.selectedImages.includes(imageId);
        return {
          ...prevInfo,
          selectedImages: isSelected
            ? prevInfo.selectedImages.filter((id) => id !== imageId)
            : [...prevInfo.selectedImages, imageId],
        };
      });
    },
    [info?.selectedImages]
  );

  // Delete selected images
  const deleteSelected = async () => {
    toast.loading('Deleting selected images...');
    let json = {
      images: info?.selectedImages,
    };
    const response = await deleteMosqueGalleryImagesAction(json);
    toast.dismiss();
    if (response[0] === true) {
      toast.success('images deleted successfully');
    } else {
      toast.error(response[1]?.message);
    }
  };

  // Select all images
  const selectAll = useCallback(() => {
    setInfo((prevInfo) => {
      if (prevInfo.selectedImages.length === communityMosqueDetail?.images.length) {
        return { ...prevInfo, selectedImages: [] };
      } else {
        return { ...prevInfo, selectedImages: communityMosqueDetail?.images.map((img) => img._id) };
      }
    });
  }, [communityMosqueDetail?.images]);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="container mx-auto p-4">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Image Gallery</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={selectAll}>
              {info?.selectedImages.length === communityMosqueDetail?.images.length
                ? 'Deselect All'
                : 'Select All'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelected}
              disabled={info?.selectedImages.length === 0}
              className="flex items-center gap-1"
            >
              <Trash2 size={16} />
              Delete ({info?.selectedImages.length})
            </Button>
          </div>
        </div>

        {/* Masonry layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {communityMosqueDetail?.images.map((image) => (
            <div
              key={image._id}
              className={`relative group overflow-hidden rounded-lg shadow-md transition-all duration-200 ${
                info?.selectedImages.includes(image._id) ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              {/* Checkbox for selection */}
              <div
                className={`absolute top-2 left-2 z-10 ${
                  info?.selectedImages.includes(image._id)
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center cursor-pointer ${
                    info?.selectedImages.includes(image.id)
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-white bg-black bg-opacity-20'
                  }`}
                  onClick={() => toggleSelect(image._id)}
                >
                  {info?.selectedImages.includes(image._id) && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Image */}
              <img
                src={image?.url}
                alt={image?.originalName}
                className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105"
                onClick={() => toggleSelect(image._id)}
              />

              {/* Overlay on hover or selection */}
              <div
                className={`absolute inset-0 transition-opacity duration-200 ${
                  info?.selectedImages.includes(image._id)
                    ? 'bg-blue-900 bg-opacity-20'
                    : 'bg-black bg-opacity-0 group-hover:bg-opacity-10'
                }`}
                onClick={() => toggleSelect(image._id)}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {communityMosqueDetail?.images?.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg">
            <Trash2 size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">No images available</h3>
            <p className="text-gray-500">All images have been deleted</p>
          </div>
        )}
      </div>
    </Mainwrapper>
  );
};

export default GalleryView;
