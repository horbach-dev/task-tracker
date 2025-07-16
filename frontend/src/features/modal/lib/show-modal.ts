import { useModalStore } from "../model/store";

interface IParams {
  content: React.ReactNode
  header?: {
    title?: string
    description?: string
  }
  footer?: React.ReactNode
}

export function showModal({ content, header, footer }: IParams) {
  useModalStore.getState().openModal({
    id: crypto.randomUUID(),
    ...(header ? { header } : {}),
    content: content,
    footer: footer,
  });
}