import { useState, useCallback, useRef, useEffect } from "react";
import { AlgorithmType } from "@/lib/algorithmData";
import { 
  bubbleSort, 
  insertionSort, 
  selectionSort, 
  quickSort,
  SortFrame
} from "@/lib/sortingAlgorithms";

// This hook is provided as an alternative to the context approach
// It encapsulates all the sorting visualization logic in a reusable hook
export function useSortVisualizer() {
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

  // Get delay based on speed setting
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

  // Generate sort frames based on selected algorithm
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

  // Initialize with a random array
  useEffect(() => {
    generateNewArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  return {
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
    
    // Actions
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetSorting,
    setArraySize,
    setSpeed,
    setAlgorithm: setSortingAlgorithm
  };
}
