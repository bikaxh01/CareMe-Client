"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { userBaseUrl } from "@/config/EnvConfig";
import * as Progress from "@radix-ui/react-progress";
import { UploadIcon } from "lucide-react";

function DropZone({ sendDocumentURL }: any) {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedDocumentURL, setUploadedDocumentURL] = useState(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    try {
      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        fileUploader(formData);
      }
    } catch (error) {
      console.log("🚀 ~ onDrop ~ error:", error);
    }
  }, []);

  // Handle File Uploading
  const fileUploader = async (fileData: FormData) => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const response = await axios.post(
        `${userBaseUrl}/user/upload-document`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent?.total
            );
            setUploadProgress(progress);
          },
        }
      );
      const docURL = await response.data.data.documentUrl;
     
      sendDocumentURL(docURL)
      setUploadedDocumentURL(docURL);
      
    } catch (error) {
      console.log("🚀 ~ fileUploader ~ error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex justify-center items-center flex-col h-64 border-2 border-dashed rounded-lg shadow-lg p-5 transition-colors duration-300 ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-100"
      } hover:bg-gray-200`}
    >
      <input {...getInputProps()}  />
      {isUploading ? (
        <>
          <Progress.Root
            className="relative overflow-hidden bg-gray-200 rounded-full w-full h-4"
            style={{ transform: "translateZ(0)" }}
            value={uploadProgress}
          >
            <Progress.Indicator
              className="bg-blue-500 h-full w-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${100 - uploadProgress}%)` }}
            />
          </Progress.Root>
          <p className="text-gray-700 font-medium mt-2">
            {uploadProgress}% uploaded
          </p>
        </>
      ) : isDragActive ? (
        <p className="text-blue-500 font-semibold">Drop the file here ...</p>
      ) : (
        <>
          <UploadIcon size={48}   className="text-gray-500 mb-3" />
          <p className="text-gray-700 font-medium text-center">
            Drag &apos;n&apos; drop a file here, or click to select a file
          </p>
        </>
      )}
    </div>
  );
}

export default DropZone;
