import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Code, Database, Lock, Upload } from "lucide-react";

interface TrainingInstructionsProps {
  modelType: string;
  privacyBudget: number;
}

export const TrainingInstructions = ({ modelType, privacyBudget }: TrainingInstructionsProps) => {
  const steps = [
    {
      number: 1,
      title: "Prepare Your Local Data",
      description: "Ensure your data is properly formatted and stored locally. Never share raw data with others.",
      icon: Database,
      details: [
        "Keep data on your local machine",
        "Split into training/validation sets",
        "Verify data quality and consistency",
        "Document any preprocessing steps"
      ]
    },
    {
      number: 2,
      title: "Train Your Model Locally",
      description: "Use the project's model architecture to train on your private dataset.",
      icon: Code,
      details: [
        `Use ${modelType} architecture`,
        "Train for recommended epochs",
        "Monitor accuracy and loss metrics",
        "Save checkpoints periodically"
      ]
    },
    {
      number: 3,
      title: "Apply Privacy Protection",
      description: "Add differential privacy noise to protect sensitive information in your model.",
      icon: Lock,
      details: [
        `Privacy budget (ε): ${privacyBudget}`,
        "Add noise to gradients/weights",
        "Use secure aggregation if available",
        "Track privacy budget consumption"
      ]
    },
    {
      number: 4,
      title: "Export Model Weights",
      description: "Save your trained model weights in a supported format for upload.",
      icon: Upload,
      details: [
        "Supported formats: .pkl, .h5, .pt, .onnx",
        "Maximum file size: 100MB",
        "Include only weights, not data",
        "Verify file integrity before upload"
      ]
    }
  ];

  const codeExamples = {
    pytorch: `# PyTorch Example
import torch
from opacus import PrivacyEngine

# Load your model
model = YourModel()
optimizer = torch.optim.Adam(model.parameters())

# Add differential privacy
privacy_engine = PrivacyEngine()
model, optimizer, train_loader = privacy_engine.make_private(
    module=model,
    optimizer=optimizer,
    data_loader=train_loader,
    noise_multiplier=1.1,
    max_grad_norm=1.0,
)

# Train locally
for epoch in range(num_epochs):
    for batch in train_loader:
        # Training loop
        ...

# Save weights
torch.save(model.state_dict(), 'model_weights.pt')`,
    
    tensorflow: `# TensorFlow Example
import tensorflow as tf
from tensorflow_privacy import DPKerasSGDOptimizer

# Load your model
model = tf.keras.Sequential([...])

# Add differential privacy
optimizer = DPKerasSGDOptimizer(
    l2_norm_clip=1.0,
    noise_multiplier=1.1,
    num_microbatches=1,
    learning_rate=0.01
)

model.compile(optimizer=optimizer, loss='categorical_crossentropy')

# Train locally
model.fit(x_train, y_train, epochs=10, batch_size=32)

# Save weights
model.save_weights('model_weights.h5')`
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Instructions</CardTitle>
          <CardDescription>
            Follow these steps to train your model locally and contribute to the federated learning project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Step {step.number}</Badge>
                      <h3 className="font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <ul className="space-y-1 text-sm">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
          <CardDescription>
            Sample code for implementing differential privacy in your training
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Badge>PyTorch</Badge>
            </h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              <code>{codeExamples.pytorch}</code>
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Badge>TensorFlow</Badge>
            </h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
              <code>{codeExamples.tensorflow}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-600 dark:text-amber-400">Important Privacy Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Never upload raw data - only trained model weights</p>
          <p>• Always apply differential privacy with the specified budget</p>
          <p>• Verify your model doesn't memorize individual data points</p>
          <p>• Report accurate metrics to help with quality assessment</p>
          <p>• Contact project owners if you have privacy concerns</p>
        </CardContent>
      </Card>
    </div>
  );
};
