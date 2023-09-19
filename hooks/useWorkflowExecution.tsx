import { getWorkflowExecution } from "@/app/_actions";
import { WorkflowExecution } from "@/lib/types";
import { useEffect, useState } from "react";

// Paradym offers webhooks (https://docs.paradym.id/working-with-executions/using-webhooks) to listen
// for changes in your execution. This can be used together with third-party services, such as
// Pusher Channels (https://pusher.com/channels/), to integrate with the client. To keep this example
// simple we use polling on an interval to fetch workflow execution changes.
export default function useWorkflowExecution(id?: string) {
  const [execution, setExecution] = useState<WorkflowExecution>();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (id) {
        const res = await getWorkflowExecution(id);
        setExecution(res.result);
      } else {
        setExecution(undefined);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  return {
    execution,
  };
}
