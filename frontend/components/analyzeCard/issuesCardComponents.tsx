import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

type IssueCardProps ={
    issue:{
        type: string;
        message: string;
        severity: "low" | "medium" | "high";
    }
}
export const IssuesCard = ({ issue }: IssueCardProps) => {
  return (
    <>
      <div
        className={cn(
          "p-2 rounded-lg",
          issue.severity === "high"
            ? "bg-red-500/10 text-red-400"
            : issue.severity === "medium"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-blue-500/10 text-blue-400",
        )}
      >
        <AlertCircle className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            {issue.type}
          </span>
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.5 rounded border font-bold uppercase",
              issue.severity === "high"
                ? "border-red-500/20 text-red-400"
                : issue.severity === "medium"
                  ? "border-yellow-500/20 text-yellow-400"
                  : "border-blue-500/20 text-blue-400",
            )}
          >
            {issue.severity}
          </span>
        </div>
        <p className="text-sm text-zinc-300 mt-1">{issue.message}</p>
      </div>
    </>
  );
};
