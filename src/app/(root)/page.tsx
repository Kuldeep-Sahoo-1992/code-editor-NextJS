import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="p-4 mx-auto max-w-[1900px]">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
