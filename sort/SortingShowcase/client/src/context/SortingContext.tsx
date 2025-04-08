import { 
  createContext, 
  useContext, 
  useState, 
  useRef, 
  useCallback, 
  ReactNode,
  useEffect
} from "react";
import { algorithmData, AlgorithmType } from "@/lib/algorithmData";
import { 
  bubbleSort, 
  insertionSort, 
  selectionSort, 
  quickSort,
  SortFrame
} from "@/lib/sortingAlgorithms";

interface SortingContextType {
  // State
  array: number[];
  sortingAlgorithm: AlgorithmType;
  arraySize: number;
  speed: number;
  isSorting: boolean;
  isPaused: boolean;
  comparisons: number;
  swaps: number;
  elapsedTime: number;
  sortedIndices: number[];
  currentlyComparing: number[];
  currentlySwapping: number[];
  timeComplexity: string;
  
  // Actions
  generateNewArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  resetSorting: () => void;
  setArraySize: (size: number) => void;
  setSpeed: (speed: number) => void;
  setAlgorithm: (algorithm: AlgorithmType) => void;
}

const SortingContext = createContext<SortingContextType | undefined>(undefined);

export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error("useSorting must be used within a SortingProvider");
  }
  return context;
};

interface SortingProviderProps {
  children: ReactNode;
}

export const SortingProvider = ({ children }: SortingProviderProps) => {
  // Basic state
  const [array, setArray] = useState<number[]>([]);
  const [sortingAlgorithm, setSortingAlgorithm] = useState<AlgorithmType>("bubble");
  const [arraySize, setArraySize] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(3);
  
  // Sorting state
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [currentlyComparing, setCurrentlyComparing] = useState<number[]>([]);
  const [currentlySwapping, setCurrentlySwapping] = useState<number[]>([]);

  // References
  const sortingTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pauseTimeRef = useRef<number>(0);
  const sortFramesRef = useRef<SortFrame[]>([]);
  const currentFrameIndexRef = useRef<number>(0);

  // Compute time complexity based on selected algorithm
  const timeComplexity = algorithmData[sortingAlgorithm].timeComplexity;

  // Generate a new random array
  const generateNewArray = useCallback(() => {
    const minValue = 5;
    const maxValue = 100;
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );
    setArray(newArray);
    resetSortingState();
  }, [arraySize]);

  // Reset sorting state
  const resetSortingState = () => {
    setComparisons(0);
    setSwaps(0);
    setElapsedTime(0);
    setSortedIndices([]);
    setCurrentlyComparing([]);
    setCurrentlySwapping([]);
    clearTimeouts();
  };

  // Clear all timeouts
  const clearTimeouts = () => {
    if (sortingTimeoutId.current) {
      clearTimeout(sortingTimeoutId.current);
      sortingTimeoutId.current = null;
    }
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
      timerIntervalId.current = null;
    }
  };

  // Get the current delay based on speed setting
  const getDelay = useCallback(() => {
    const delays = [300, 200, 100, 50, 10]; // Very Slow to Very Fast
    return delays[speed - 1];
  }, [speed]);

  // Start the timer
  const startTimer = useCallback(() => {
    if (timerIntervalId.current) {
      clearInterval(timerIntervalId.current);
    }
    
    const startTime = isPaused 
      ? Date.now() - (pauseTimeRef.current - startTimeRef.current)
      : Date.now();
    
    startTimeRef.current = startTime;
    
    timerIntervalId.current = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
  }, [isPaused]);

  // Generate the sort frames for the selected algorithm
  const generateSortFrames = useCallback(() => {
    let frames: SortFrame[] = [];
    
    switch (sortingAlgorithm) {
      case "bubble":
        frames = bubbleSort([...array]);
        break;
      case "insertion":
        frames = insertionSort([...array]);
        break;
      case "selection":
        frames = selectionSort([...array]);
        break;
      case "quick":
        frames = quickSort([...array]);
        break;
      default:
        frames = bubbleSort([...array]);
    }
    
    return frames;
  }, [array, sortingAlgorithm]);

  // Animate the sorting process
  const animateSorting = useCallback(() => {
    if (isPaused || currentFrameIndexRef.current >= sortFramesRef.current.length) {
      return;
    }

    const frame = sortFramesRef.current[currentFrameIndexRef.current];
    const delay = getDelay();

    // Update state based on the current frame
    if (frame.type === "compare") {
      setCurrentlyComparing(frame.indices);
      setCurrentlySwapping([]);
      setComparisons(prev => prev + 1);
    } else if (frame.type === "swap") {
      setCurrentlyComparing([]);
      setCurrentlySwapping(frame.indices);
      setSwaps(prev => prev + 1);
      setArray(frame.array);
    } else if (frame.type === "sorted") {
      setSortedIndices(prev => [...prev, ...frame.indices]);
      setCurrentlyComparing([]);
      setCurrentlySwapping([]);
      setArray(frame.array);
    }

    currentFrameIndexRef.current++;

    // Check if sorting is complete
    if (currentFrameIndexRef.current >= sortFramesRef.current.length) {
      finishSorting();
      return;
    }

    // Schedule next frame
    sortingTimeoutId.current = setTimeout(() => {
      animateSorting();
    }, delay);
  }, [isPaused, getDelay]);

  // Finish the sorting process
  const finishSorting = useCallback(() => {
    clearTimeouts();
    setIsSorting(false);
    setIsPaused(false);
    setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
    setCurrentlyComparing([]);
    setCurrentlySwapping([]);
  }, [array.length]);

  // Start sorting
  const startSorting = useCallback(() => {
    if (isSorting) return;
    
    setIsSorting(true);
    setIsPaused(false);
    resetSortingState();
    
    // Generate and store sort frames
    sortFramesRef.current = generateSortFrames();
    currentFrameIndexRef.current = 0;
    
    startTimer();
    animateSorting();
  }, [isSorting, generateSortFrames, startTimer, animateSorting]);

  // Pause sorting
  const pauseSorting = useCallback(() => {
    if (!isSorting || isPaused) return;
    
    setIsPaused(true);
    pauseTimeRef.current = Date.now();
    clearTimeouts();
  }, [isSorting, isPaused]);

  // Resume sorting
  const resumeSorting = useCallback(() => {
    if (!isSorting || !isPaused) return;
    
    setIsPaused(false);
    startTimer();
    animateSorting();
  }, [isSorting, isPaused, startTimer, animateSorting]);

  // Reset sorting
  const resetSorting = useCallback(() => {
    setIsSorting(false);
    setIsPaused(false);
    clearTimeouts();
    resetSortingState();
    generateNewArray();
  }, [generateNewArray]);

  // Handle array size change
  const handleArraySizeChange = useCallback((size: number) => {
    if (isSorting) return;
    setArraySize(size);
  }, [isSorting]);

  // Handle algorithm change
  const handleAlgorithmChange = useCallback((algorithm: AlgorithmType) => {
    if (isSorting) return;
    setSortingAlgorithm(algorithm);
    resetSortingState();
  }, [isSorting]);

  // Initial array generation
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  const value: SortingContextType = {
    // State
    array,
    sortingAlgorithm,
    arraySize,
    speed,
    isSorting,
    isPaused,
    comparisons,
    swaps,
    elapsedTime,
    sortedIndices,
    currentlyComparing,
    currentlySwapping,
    timeComplexity,
    
    // Actions
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    setArraySize: handleArraySizeChange,
    setSpeed,
    setAlgorithm: handleAlgorithmChange
  };

  return (
    <SortingContext.Provider value={value}>
      {children}
    </SortingContext.Provider>
  );
};
