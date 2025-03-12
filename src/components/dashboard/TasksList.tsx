
import { CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Review research data", completed: false },
    { id: 2, title: "Prepare protocol documentation", completed: false },
    { id: 3, title: "Connect lab equipment", completed: true },
    { id: 4, title: "Schedule team meeting", completed: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          Tasks
          {pendingTasks > 0 && (
            <span className="ml-auto text-sm bg-muted rounded-full px-2 py-0.5">
              {pendingTasks} pending
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors",
                task.completed && "text-muted-foreground"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </Button>
              <span className={cn(task.completed && "line-through")}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full text-sm">
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  );
};
