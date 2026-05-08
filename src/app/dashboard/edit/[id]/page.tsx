import { EditorView } from "@/components/dashboard/EditorView";

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function EditEssayPage({ params }: { params: { id: string } }) {
  return <EditorView id={params.id} />;
}
