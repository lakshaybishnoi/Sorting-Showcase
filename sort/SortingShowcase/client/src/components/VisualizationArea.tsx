import { useSorting } from "@/context/SortingContext";
import { useEffect, useState } from "react";
import { algorithmData } from "@/lib/algorithmData";

export default function VisualizationArea() {
  const {
    array,
    sortingAlgorithm,
    isSorting,
    isPaused,
    sortedIndices,
    currentlyComparing,
    currentlySwapping,
    timeComplexity,
  } = useSorting();

  const [barWidth, setBarWidth] = useState(8);

  // Recalculate bar width when array length changes
  useEffect(() => {
    const calculateBarWidth = () => {
      const containerWidth = document.getElementById("bars-container")?.clientWidth || 800;
      const margin = 2; // 1px margin on each side
      const calculatedWidth = Math.max(1, Math.floor((containerWidth / array.length) - margin));
      setBarWidth(calculatedWidth);
    };

    calculateBarWidth();
    window.addEventListener("resize", calculateBarWidth);
    return () => window.removeEventListener("resize", calculateBarWidth);
  }, [array.length]);

  const getBarColor = (index: number) => {
    if (sortedIndices.includes(index)) return "bg-sorted";
    if (currentlyComparing.includes(index)) return "bg-compared";
    if (currentlySwapping.includes(index)) return "bg-swapped";
    return "bg-unsorted";
  };

  // Get the max value in the array for scaling bars
  const maxValue = array.length > 0 ? Math.max(...array) : 100;

  const getAlgorithmStatus = () => {
    if (!isSorting && sortedIndices.length === array.length && array.length > 0) {
      return `${algorithmData[sortingAlgorithm].name} - Completed`;
    } else if (isSorting && isPaused) {
      return `${algorithmData[sortingAlgorithm].name} - Paused`;
    } else if (isSorting) {
      return `${algorithmData[sortingAlgorithm].name} - Sorting...`;
    }
    return `${algorithmData[sortingAlgorithm].name} - Ready to start`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Visualization</h2>
          <p 
            className={`text-gray-600 text-sm ${sortedIndices.length === array.length && array.length > 0 ? "text-green-600 font-medium" : ""}`} 
            id="algorithmStatus"
          >
            {getAlgorithmStatus()}
          </p>
        </div>
        <div className="bg-gray-100 px-3 py-1 rounded-md">
          <span className="text-xs font-medium text-gray-500">Time Complexity:</span>
          <span className="text-sm font-mono" id="timeComplexity">{timeComplexity}</span>
        </div>
      </div>

      {/* Bars Container */}
      <div 
        className="h-64 md:h-80 w-full flex items-end justify-center border-b border-gray-300 relative" 
        id="bars-container"
      >
        {array.map((value, index) => (
          <div
            key={index}
            className={`bar ${getBarColor(index)} mx-[1px] transition-all duration-100 relative`}
            style={{
              height: `${(value / maxValue) * 100}%`,
              width: `${barWidth}px`,
            }}
          >
            {barWidth >= 5 && (
              <span className="absolute bottom-0 left-0 right-0 text-base text-center text-white font-bold drop-shadow-md transform -translate-y-5">
                {value}
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Current Array Display */}
      <div className="mt-4 overflow-x-auto">
        <div className="bg-gray-100 p-2 rounded">
          <h3 className="text-md font-medium mb-1">Current Array:</h3>
          <div className="flex flex-wrap gap-1 text-sm font-mono">
            {array.map((value, index) => (
              <span 
                key={index} 
                className={`inline-block px-2 py-1 rounded ${
                  sortedIndices.includes(index) 
                    ? 'bg-green-100 text-green-800' 
                    : currentlyComparing.includes(index)
                    ? 'bg-blue-100 text-blue-800'
                    : currentlySwapping.includes(index)
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-unsorted rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Unsorted</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-compared rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Comparing</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-swapped rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Swapping</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-sorted rounded-sm mr-2"></div>
          <span className="text-sm text-gray-700">Sorted</span>
        </div>
      </div>
    </div>
  );
}
