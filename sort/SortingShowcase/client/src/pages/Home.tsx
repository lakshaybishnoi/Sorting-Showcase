import ControlPanel from "@/components/ControlPanel";
import VisualizationArea from "@/components/VisualizationArea";
import MetricsPanel from "@/components/MetricsPanel";
import AlgorithmInfo from "@/components/AlgorithmInfo";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Visualize and compare different sorting algorithms in real-time
          </p>
        </header>

        {/* Main components */}
        <ControlPanel />
        <VisualizationArea />
        <MetricsPanel />
        <AlgorithmInfo />
      </div>
    </div>
  );
}
