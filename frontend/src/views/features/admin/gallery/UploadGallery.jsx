import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '@/components/ui/card';
import { CloudUpload, Upload } from 'lucide-react';
import { getImageSizeFormat } from '@/helpers/file-size';
import { Button } from '@/components/ui/button';
import _ from '@/helpers/loadash';
import axios from 'axios';

const INITIAL_STATE = {
  uploadImages: {},
  uploadSize: 0,
  startedUploading: false,
  uploadLimit: 1,
  currentUpload: 1,
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; //2Mb

const breadCumbs = [{ label: 'Analytics', href: null }];
const UploadGallery = () => {
  const [info, setInfo] = useState({ ...INITIAL_STATE });
  const recentImageInitiatedRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    let uploadedImages = { ...info?.uploadImages };
    let uploadedSize = 0;

    selectedFiles.forEach((singleImage) => {
      let uploadedImageCount = Object.keys(uploadedImages)?.length;
      if (singleImage.size <= MAX_FILE_SIZE && uploadedImageCount <= 20) {
        uploadedImages[singleImage.name] = {
          file: singleImage,
          isUploaded: false,
          uploadedPercentage: 0,
          isFailed: false,
          size: singleImage.size,
        };
        uploadedSize += singleImage.size;
      }
    });

    setInfo((prev) => ({ ...prev, uploadImages: uploadedImages, uploadSize: uploadedSize }));
  };

  const getJsonFunction = (currentImage) => {
    const imageKeysArray = _.keys(info?.uploadImages || {});

    const imageKeyIndex =
      recentImageInitiatedRef.current !== null
        ? imageKeysArray[imageKeysArray.indexOf(currentImage)]
        : imageKeysArray[0];
    const image = info?.uploadImages[imageKeyIndex];

    if (image && image?.isUploaded) return null;

    const formData = new FormData();
    formData.append('galleryImage', image.file);

    return formData;
  };

  const uploadToServerFunction = async (form) => {
    console.log(form, 'upload');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

  const uploadFilesConcurrently = async () => {
    const queue = _.keys(info.uploadImages);
    console.log(queue, 'uploadFilesCon');
    const activeUploads = [];
    let totalImages = _.size(info.uploadImages || {});

    const nextUploadFunc = async () => {
      if (queue.length === 0) return;
      const currentFile = queue.shift();
      const json = getJsonFunction(currentFile);
      let attempts = 0;
      let isSuccessUpload = false;

      while (attempts < 3) {
        let uploadPromise = await uploadToServerFunction(json);
        activeUploads.push(uploadPromise);
        console.log(uploadPromise);

        isSuccessUpload = await uploadPromise;

        if (isSuccessUpload) {
          activeUploads.splice(activeUploads.indexOf(uploadPromise), 1);
          break;
        }

        if (attempts !== 0) {
          // Wait for 1 minute before retrying
          setInfo((prev) => ({
            ...prev,
            uploadImages: {
              ...prev.uploadImages,
              [currentFile]: { ...prev.uploadImages[currentFile], isFailed: true },
            },
          }));
          let waitTime = 2000 * attempts;
          await new Promise((resolve) => {
            console.log('waiting  for ', waitTime, 'seconds');
            setTimeout(() => {
              resolve();
            }, waitTime);
          });
        }
        attempts++;
      }

      if (isSuccessUpload) {
        nextUploadFunc();
      }
    };

    for (let i = 0; i < info.uploadLimit && queue.length > 0; i++) {
      console.log(i, 'loop');
      nextUploadFunc();
    }

    await Promise.allSettled(activeUploads);
  };
  console.log(info);

  return (
    <Mainwrapper breadCumbs={breadCumbs}>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudUpload size={35} color="#6c7479" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 20 Images, each up to 2MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="text_div">
              <h1>
                {Object.keys(info?.uploadImages || {}).length} Images added -{' '}
                {getImageSizeFormat(info?.uploadSize)}
              </h1>
            </div>

            <Button
              className={`rounded-full ${_.size(info?.uploadImages) === 0 ? 'opacity-20' : ''}`}
              onClick={uploadFilesConcurrently}
            >
              {' '}
              <Upload /> Start Upload
            </Button>
          </CardTitle>
          <CardDescription>Max amount 20 photos</CardDescription>
        </CardHeader>

        <CardContent>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  File Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(info.uploadImages).map(([fileName, fileData]) => (
                <tr key={fileName}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getImageSizeFormat(fileData.size)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </Mainwrapper>
  );
};

export default memo(UploadGallery);
