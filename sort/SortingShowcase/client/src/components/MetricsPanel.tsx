import { useSorting } from "@/context/SortingContext";
import { algorithmData } from "@/lib/algorithmData";

export default function MetricsPanel() {
  const { comparisons, swaps, elapsedTime, sortingAlgorithm } = useSorting();
  
  // Format elapsed time to display in seconds with one decimal place
  const formattedTime = (elapsedTime / 1000).toFixed(1) + 's';
  
  // Get algorithm complexity information
  const { comparisonComplexity, swapComplexity } = algorithmData[sortingAlgorithm];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center">
          <span className="text-primary mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 10 20 15 15 20"></polyline>
              <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
            </svg>
          </span>
          Comparisons
        </h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-mono font-semibold text-gray-800" id="comparisonCount">
            {comparisons}
          </span>
          <span className="ml-2 text-sm text-gray-500" id="comparisonComplexity">
            {comparisonComplexity}
          </span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center">
          <span className="text-primary mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </span>
          Swaps
        </h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-mono font-semibold text-gray-800" id="swapCount">
            {swaps}
          </span>
          <span className="ml-2 text-sm text-gray-500" id="swapComplexity">
            {swapComplexity}
          </span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-gray-800 mb-2 flex items-center">
          <span className="text-primary mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          Time Elapsed
        </h3>
        <span className="text-3xl font-mono font-semibold text-gray-800" id="timeElapsed">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
