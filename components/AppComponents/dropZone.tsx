"use client";
import { log } from "console";
import { PlusIcon, UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function DropZone() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        
      console.log(acceptedFiles);
      //Implement File uploader
      
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div
        {...getRootProps()}
        className={`flex justify-center items-center h-64 border-2 border-dashed rounded-lg shadow-lg p-5 transition-colors duration-300 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'
        } hover:bg-gray-200`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 font-semibold">Drop the files here ...</p>
        ) : (
          <p className="text-gray-700 font-medium">
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
    );
  }
  
export default DropZone;