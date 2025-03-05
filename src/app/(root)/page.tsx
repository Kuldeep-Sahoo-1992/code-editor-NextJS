import Header from "./_components/Header";
import EditorPanel from "./_components/EditorPanel";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="p-4 mx-auto max-w-[1900px]">
        <Header />

        {/* Mobile: Stack | Desktop: Side-by-Side */}
        <div className="flex flex-col lg:flex-row h-[85vh]">
          {/* Left Panel (Resizable only on Desktop) */}
          <div className="bg-gray-900 overflow-hidden lg:resize-x min-w-[600px] lg:max-w-[70%] lg:w-1/2 w-full h-full">
            <EditorPanel />
          </div>

          {/* Right Panel (Always Flexible) */}
          <div className="bg-gray-800 overflow-auto flex-1">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
