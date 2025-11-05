import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SubmitModelUpdateDialogProps {
  projectId: string;
  participantId: string;
  currentRound: number;
  onSuccess?: () => void;
}

export const SubmitModelUpdateDialog = ({
  projectId,
  participantId,
  currentRound,
  onSuccess
}: SubmitModelUpdateDialogProps) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [accuracy, setAccuracy] = useState("");
  const [loss, setLoss] = useState("");
  const [trainingSamples, setTrainingSamples] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (100MB limit)
      if (selectedFile.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Model weights must be under 100MB",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      const validExtensions = ['.pkl', '.h5', '.pt', '.pth', '.onnx'];
      const fileExt = selectedFile.name.toLowerCase().substring(selectedFile.name.lastIndexOf('.'));
      if (!validExtensions.includes(fileExt)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload .pkl, .h5, .pt, .pth, or .onnx files",
          variant: "destructive"
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a model weights file",
        variant: "destructive"
      });
      return;
    }

    const accuracyNum = parseFloat(accuracy);
    const lossNum = parseFloat(loss);
    const samplesNum = parseInt(trainingSamples);

    if (isNaN(accuracyNum) || accuracyNum < 0 || accuracyNum > 1) {
      toast({
        title: "Invalid Accuracy",
        description: "Accuracy must be between 0 and 1",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(lossNum) || lossNum < 0) {
      toast({
        title: "Invalid Loss",
        description: "Loss must be a positive number",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(samplesNum) || samplesNum <= 0) {
      toast({
        title: "Invalid Training Samples",
        description: "Training samples must be a positive integer",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Upload file to storage
      const fileName = `${participantId}/round_${currentRound}_${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('fl-model-weights')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('fl-model-weights')
        .getPublicUrl(fileName);

      // Generate hash (simple approach using file name and timestamp)
      const hash = `${participantId}_${currentRound}_${Date.now()}`;

      // Insert model update record
      const { error: insertError } = await supabase
        .from('federated_model_updates')
        .insert({
          project_id: projectId,
          participant_id: participantId,
          round_number: currentRound,
          model_weights_url: publicUrl,
          model_weights_hash: hash,
          accuracy: accuracyNum,
          loss: lossNum,
          training_samples: samplesNum
        });

      if (insertError) throw insertError;

      toast({
        title: "Model Update Submitted",
        description: `Successfully submitted update for round ${currentRound}`
      });

      setOpen(false);
      setFile(null);
      setAccuracy("");
      setLoss("");
      setTrainingSamples("");
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting model update:", error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit model update",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Submit Model Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Model Update - Round {currentRound}</DialogTitle>
          <DialogDescription>
            Upload your trained model weights and training metrics for this round.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model-file">Model Weights File</Label>
            <Input
              id="model-file"
              type="file"
              accept=".pkl,.h5,.pt,.pth,.onnx"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accuracy">Model Accuracy (0-1)</Label>
            <Input
              id="accuracy"
              type="number"
              step="0.0001"
              min="0"
              max="1"
              value={accuracy}
              onChange={(e) => setAccuracy(e.target.value)}
              placeholder="e.g., 0.8542"
              required
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loss">Model Loss</Label>
            <Input
              id="loss"
              type="number"
              step="0.0001"
              min="0"
              value={loss}
              onChange={(e) => setLoss(e.target.value)}
              placeholder="e.g., 0.3421"
              required
              disabled={uploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="samples">Training Samples</Label>
            <Input
              id="samples"
              type="number"
              min="1"
              value={trainingSamples}
              onChange={(e) => setTrainingSamples(e.target.value)}
              placeholder="e.g., 1000"
              required
              disabled={uploading}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading || !file}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Submit Update"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
