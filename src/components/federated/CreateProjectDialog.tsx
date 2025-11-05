import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useFederatedLearning } from "@/hooks/useFederatedLearning";

export const CreateProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelType, setModelType] = useState("");
  const [learningObjective, setLearningObjective] = useState("");
  const [totalRounds, setTotalRounds] = useState("10");
  const [minParticipants, setMinParticipants] = useState("3");
  const [privacyBudget, setPrivacyBudget] = useState("1.0");

  const { createProject } = useFederatedLearning();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await createProject.mutateAsync({
      name,
      description,
      model_type: modelType,
      learning_objective: learningObjective,
      total_rounds: parseInt(totalRounds),
      min_participants: parseInt(minParticipants),
      privacy_budget: parseFloat(privacyBudget),
      aggregation_method: 'federated_averaging',
      status: 'recruiting'
    });

    setOpen(false);
    setName("");
    setDescription("");
    setModelType("");
    setLearningObjective("");
    setTotalRounds("10");
    setMinParticipants("3");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create FL Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Federated Learning Project</DialogTitle>
          <DialogDescription>
            Set up a new collaborative AI model training project with privacy-preserving techniques
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., COVID-19 Drug Discovery Model"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the research objective and expected outcomes..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelType">Model Type</Label>
              <Select value={modelType} onValueChange={setModelType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neural_network">Neural Network</SelectItem>
                  <SelectItem value="random_forest">Random Forest</SelectItem>
                  <SelectItem value="svm">Support Vector Machine</SelectItem>
                  <SelectItem value="logistic_regression">Logistic Regression</SelectItem>
                  <SelectItem value="transformer">Transformer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningObjective">Learning Objective</Label>
              <Select value={learningObjective} onValueChange={setLearningObjective} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="regression">Regression</SelectItem>
                  <SelectItem value="clustering">Clustering</SelectItem>
                  <SelectItem value="anomaly_detection">Anomaly Detection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalRounds">Training Rounds</Label>
              <Input
                id="totalRounds"
                type="number"
                value={totalRounds}
                onChange={(e) => setTotalRounds(e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minParticipants">Min Participants</Label>
              <Input
                id="minParticipants"
                type="number"
                value={minParticipants}
                onChange={(e) => setMinParticipants(e.target.value)}
                min="2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacyBudget">Privacy Budget (ε)</Label>
              <Input
                id="privacyBudget"
                type="number"
                step="0.1"
                value={privacyBudget}
                onChange={(e) => setPrivacyBudget(e.target.value)}
                min="0.1"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createProject.isPending}>
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
