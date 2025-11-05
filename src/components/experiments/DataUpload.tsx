import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2, X, Download } from 'lucide-react';
import { useUploadDataFile, useDataUploads } from '@/hooks/useExperiments';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DataUploadProps {
  experimentId: string;
}

export const DataUpload = ({ experimentId }: DataUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFile = useUploadDataFile();
  const { data: uploadsResponse, isLoading } = useDataUploads(experimentId);
  const uploads = uploadsResponse?.data || [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        alert('File size must be less than 20MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadFile.mutateAsync({
      experimentId,
      file: selectedFile,
    });

    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Data Files
        </CardTitle>
        <CardDescription>
          Upload experiment data, results, and supporting files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Section */}
        <div className="border-2 border-dashed rounded-lg p-6">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".csv,.xlsx,.xls,.json,.txt,.pdf,.png,.jpg,.jpeg"
          />
          
          {!selectedFile ? (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                Select File
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Max 20MB • CSV, Excel, JSON, TXT, PDF, Images
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-muted p-3 rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {formatFileSize(selectedFile.size)}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={uploadFile.isPending}
                  className="flex-1"
                >
                  {uploadFile.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Upload File
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Different
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Uploaded Files List */}
        {isLoading ? (
          <div className="text-center text-sm text-muted-foreground py-4">
            Loading files...
          </div>
        ) : uploads.length > 0 ? (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Uploaded Files</h4>
            {uploads.map((upload: any) => (
              <div
                key={upload.id}
                className="flex items-center justify-between bg-muted/50 p-3 rounded"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{upload.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(upload.file_size_bytes)} • {' '}
                      {new Date(upload.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                >
                  <a href={upload.file_url} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertDescription className="text-sm">
              No files uploaded yet. Upload data files to document your experiment results.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
