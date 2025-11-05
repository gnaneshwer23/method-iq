import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, Loader2, Shield, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePrivacyBudget, validatePrivacyBudget } from "@/hooks/usePrivacyBudget";

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
  const [epsilon, setEpsilon] = useState("0.1");
  const [delta, setDelta] = useState("0.00001");
  const { toast } = useToast();
  const privacyBudget = usePrivacyBudget(projectId);

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
    const epsilonNum = parseFloat(epsilon);
    const deltaNum = parseFloat(delta);

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

    if (isNaN(epsilonNum) || epsilonNum <= 0) {
      toast({
        title: "Invalid Epsilon",
        description: "Epsilon must be greater than 0",
        variant: "destructive"
      });
      return;
    }

    // Validate privacy budget
    const budgetValidation = validatePrivacyBudget(
      privacyBudget.remainingBudget || 0,
      epsilonNum
    );

    if (!budgetValidation.valid) {
      toast({
        title: "Privacy Budget Exceeded",
        description: budgetValidation.message,
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
          training_samples: samplesNum,
          epsilon_used: epsilonNum,
          delta_used: deltaNum,
          privacy_metrics: {
            epsilon: epsilonNum,
            delta: deltaNum,
            mechanism: 'gaussian'
          }
        });

      if (insertError) throw insertError;

      // Update participant's privacy budget
      const { error: budgetError } = await supabase
        .from('federated_learning_participants')
        .update({
          privacy_budget_used: (privacyBudget.usedBudget || 0) + epsilonNum
        })
        .eq('id', participantId);

      if (budgetError) throw budgetError;

      toast({
        title: "Model Update Submitted",
        description: `Successfully submitted update for round ${currentRound}`
      });

      setOpen(false);
      setFile(null);
      setAccuracy("");
      setLoss("");
      setTrainingSamples("");
      setEpsilon("0.1");
      setDelta("0.00001");
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
        <Button 
          className="w-full" 
          disabled={!privacyBudget.canSubmit}
        >
          <Upload className="mr-2 h-4 w-4" />
          {privacyBudget.canSubmit ? 'Submit Model Update' : 'Budget Exhausted'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Model Update - Round {currentRound}</DialogTitle>
          <DialogDescription>
            Upload your trained model weights and training metrics for this round.
          </DialogDescription>
        </DialogHeader>

        {/* Privacy Budget Warning */}
        {privacyBudget.warningLevel === 'critical' && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Privacy Budget</AlertTitle>
            <AlertDescription>
              Only {privacyBudget.remainingBudget?.toFixed(4)} ε remaining. This may be your last submission.
            </AlertDescription>
          </Alert>
        )}

        {privacyBudget.warningLevel === 'warning' && (
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertTitle>Privacy Budget Warning</AlertTitle>
            <AlertDescription>
              {privacyBudget.remainingBudget?.toFixed(4)} ε remaining. Plan your submissions carefully.
            </AlertDescription>
          </Alert>
        )}

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

          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Privacy Parameters</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="epsilon">Epsilon (ε)</Label>
                <Input
                  id="epsilon"
                  type="number"
                  step="0.001"
                  min="0.001"
                  max={privacyBudget.remainingBudget || 1.0}
                  value={epsilon}
                  onChange={(e) => setEpsilon(e.target.value)}
                  placeholder="e.g., 0.1"
                  required
                  disabled={uploading}
                />
                <p className="text-xs text-muted-foreground">
                  Max: {privacyBudget.remainingBudget?.toFixed(4) || '0'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delta">Delta (δ)</Label>
                <Input
                  id="delta"
                  type="number"
                  step="0.00001"
                  min="0.00001"
                  max="0.01"
                  value={delta}
                  onChange={(e) => setDelta(e.target.value)}
                  placeholder="e.g., 0.00001"
                  required
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="bg-muted/50 p-3 rounded-lg space-y-1">
              <p className="text-xs font-semibold">Privacy Budget Status</p>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Used:</span>
                <span>{privacyBudget.usedBudget?.toFixed(4) || '0'} ε</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Remaining:</span>
                <span className="font-medium">{privacyBudget.remainingBudget?.toFixed(4) || '0'} ε</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">After this submission:</span>
                <span className="font-medium">
                  {((privacyBudget.remainingBudget || 0) - parseFloat(epsilon || '0')).toFixed(4)} ε
                </span>
              </div>
            </div>
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
