import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { useModalStore } from "@/features"

export function ModalProvider() {
  const { current, closeModal } = useModalStore();

  return (
    <Dialog  open={!!current} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent>
          {current?.header && (
            <DialogHeader>
              {current.header.title && (
                <DialogTitle>
                  {current.header.title}
                </DialogTitle>
              )}

              {current.header.description && (
                <DialogDescription>
                  {current.header.description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          {current?.content}

          {current?.footer && (
            <DialogFooter>
              {current.footer}
            </DialogFooter>
          )}
        </DialogContent>
    </Dialog>
  )
}
