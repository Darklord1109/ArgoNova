import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Download } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  metadata?: any;
  errors?: string[];
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, uploadedFile]);

      // Simulate file processing
      simulateFileProcessing(uploadedFile.id);
    });
  };

  const simulateFileProcessing = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (progress >= 100) {
            clearInterval(interval);
            
            // Simulate random success/error
            const isSuccess = Math.random() > 0.2;
            
            return {
              ...file,
              progress: 100,
              status: isSuccess ? 'completed' : 'error',
              metadata: isSuccess ? {
                profiles: Math.floor(Math.random() * 200) + 50,
                variables: ['PRES', 'TEMP', 'PSAL', 'DOXY'],
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                floatId: 'WMO_' + Math.floor(Math.random() * 1000000)
              } : undefined,
              errors: isSuccess ? undefined : ['Invalid NetCDF format', 'Missing required variables']
            };
          }
          return { ...file, progress: Math.min(progress, 100) };
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload NetCDF Files</h1>
          <p className="text-slate-600">
            Upload Argo NetCDF files for processing and analysis. Supported formats: .nc, .netcdf
          </p>
        </div>

        {/* Upload Area */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Drop NetCDF files here
            </h3>
            <p className="text-slate-600 mb-4">
              or click to browse your files
            </p>
            <input
              type="file"
              multiple
              accept=".nc,.netcdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose Files
            </label>
            <p className="text-sm text-slate-500 mt-3">
              Maximum file size: 500MB per file
            </p>
          </div>

          {/* Upload Guidelines */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Upload Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Supported Formats</p>
                  <p className="text-sm text-slate-600">NetCDF (.nc, .netcdf) files from Argo floats</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Required Variables</p>
                  <p className="text-sm text-slate-600">PRES, TEMP, PSAL (minimum) + optional BGC</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Quality Control</p>
                  <p className="text-sm text-slate-600">QC flags will be automatically validated</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800">Processing</p>
                  <p className="text-sm text-slate-600">Automatic profile extraction and indexing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Processing List */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Processing Queue</h3>
            </div>
            
            <div className="divide-y divide-slate-200">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-slate-400" />
                      <div>
                        <h4 className="font-medium text-slate-900">{file.name}</h4>
                        <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {file.status === 'completed' && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {file.status !== 'completed' && file.status !== 'error' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-slate-600 capitalize">{file.status}</span>
                        <span className="text-sm text-slate-600">{Math.round(file.progress)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Metadata Display */}
                  {file.status === 'completed' && file.metadata && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-medium text-green-800 mb-2">Processing Complete</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-green-700 font-medium">Float ID:</span>
                          <span className="text-green-800 ml-1">{file.metadata.floatId}</span>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Profiles:</span>
                          <span className="text-green-800 ml-1">{file.metadata.profiles}</span>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Variables:</span>
                          <span className="text-green-800 ml-1">{file.metadata.variables.length}</span>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Date Range:</span>
                          <span className="text-green-800 ml-1">{file.metadata.startDate}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Export</span>
                        </button>
                        <button className="bg-white text-green-700 border border-green-300 px-3 py-1 rounded text-sm hover:bg-green-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {file.status === 'error' && file.errors && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-medium text-red-800 mb-2">Processing Failed</h5>
                      <ul className="text-sm text-red-700 space-y-1">
                        {file.errors.map((error, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span>•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                        Retry Processing
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}