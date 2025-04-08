import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useSorting } from "@/context/SortingContext";
import { AlgorithmType } from "@/lib/algorithmData";

export default function ControlPanel() {
  const {
    array,
    arraySize,
    speed,
    isSorting,
    isPaused,
    sortingAlgorithm,
    setArraySize,
    setSpeed,
    setAlgorithm,
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
  } = useSorting();

  const speedLabels = ["Very Slow", "Slow", "Normal", "Fast", "Very Fast"];

  const handleAlgorithmClick = (algorithm: AlgorithmType) => {
    if (!isSorting) {
      setAlgorithm(algorithm);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center justify-between">
        {/* Algorithm Selection */}
        <div className="flex flex-col w-full md:w-auto">
          <label htmlFor="algorithm" className="text-sm font-medium text-gray-700 mb-1">
            Algorithm
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2" id="algorithm-buttons">
            {["bubble", "insertion", "selection", "quick"].map((algo) => (
              <Button
                key={algo}
                variant={sortingAlgorithm === algo ? "default" : "outline"}
                className={sortingAlgorithm === algo ? "" : "text-gray-800 bg-gray-200 hover:bg-gray-300"}
                onClick={() => handleAlgorithmClick(algo as AlgorithmType)}
                disabled={isSorting}
                data-algorithm={algo}
              >
                {algo.charAt(0).toUpperCase() + algo.slice(1)} Sort
              </Button>
            ))}
          </div>
        </div>

        {/* Array Size Control */}
        <div className="flex flex-col w-full md:w-auto">
          <label htmlFor="arraySize" className="text-sm font-medium text-gray-700 mb-1">
            Array Size: <span id="arraySizeValue">{arraySize}</span>
          </label>
          <Slider
            id="arraySize"
            min={10}
            max={100}
            step={1}
            value={[arraySize]}
            onValueChange={(value) => setArraySize(value[0])}
            disabled={isSorting}
            className="w-full md:w-48"
          />
        </div>

        {/* Animation Speed */}
        <div className="flex flex-col w-full md:w-auto">
          <label htmlFor="speed" className="text-sm font-medium text-gray-700 mb-1">
            Animation Speed: <span id="speedValue">{speedLabels[speed - 1]}</span>
          </label>
          <Slider
            id="speed"
            min={1}
            max={5}
            step={1}
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            className="w-full md:w-48"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col w-full md:w-auto">
          <span className="text-sm font-medium text-gray-700 mb-1">Controls</span>
          <div className="flex gap-2">
            <Button
              id="generateBtn"
              variant="destructive"
              className="bg-gray-700 hover:bg-gray-800"
              onClick={generateNewArray}
              disabled={isSorting}
            >
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </span>
              Generate
            </Button>

            <Button
              id="startBtn"
              onClick={isPaused ? resumeSorting : startSorting}
              disabled={isSorting && !isPaused}
            >
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </span>
              {isPaused ? "Resume" : "Start"}
            </Button>

            <Button
              id="pauseBtn"
              variant="outline"
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={pauseSorting}
              disabled={!isSorting || isPaused}
            >
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              </span>
              Pause
            </Button>

            <Button
              id="resetBtn"
              variant="outline"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={resetSorting}
              disabled={!isSorting && array.length === 0}
            >
              <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </span>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
