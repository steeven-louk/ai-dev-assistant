import { Loader2, LoaderPinwheelIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

export function AnalysisModal({ isPending }: { isPending: boolean }) {
  return (
    <Dialog open={isPending}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-neon-cyan" />
            Analyse en cours...
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <LoaderPinwheelIcon className="w-12 h-12 text-neon-cyan mx-auto animate-spin" />
          <p className="text-center text-sm text-zinc-400">
            Nous analysons votre code pour détecter les problèmes de performance, de sécurité et de maintenabilité. Cela peut prendre quelques instants.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}