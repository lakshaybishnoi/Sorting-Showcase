// Defines the type of each animation frame
export type SortFrame = {
  type: "compare" | "swap" | "sorted";
  indices: number[];
  array: number[];
};

// Utility function to create a deep copy of an array
const copyArray = (arr: number[]): number[] => [...arr];

// Utility function to swap two elements in an array
const swap = (arr: number[], i: number, j: number): void => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// Bubble Sort implementation
export function bubbleSort(array: number[]): SortFrame[] {
  const frames: SortFrame[] = [];
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  let swapped;
  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison frame
      frames.push({
        type: "compare",
        indices: [j, j + 1],
        array: copyArray(arrayCopy)
      });
      
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        // Add swap frame
        swap(arrayCopy, j, j + 1);
        frames.push({
          type: "swap",
          indices: [j, j + 1],
          array: copyArray(arrayCopy)
        });
        swapped = true;
      }
    }
    
    // Mark element as sorted
    frames.push({
      type: "sorted",
      indices: [n - i - 1],
      array: copyArray(arrayCopy)
    });
    
    if (!swapped) break;
  }
  
  // Mark any remaining elements as sorted (in case we broke early)
  for (let i = 0; i < n; i++) {
    if (!frames.some(frame => frame.type === "sorted" && frame.indices.includes(i))) {
      frames.push({
        type: "sorted",
        indices: [i],
        array: copyArray(arrayCopy)
      });
    }
  }
  
  return frames;
}

// Insertion Sort implementation
export function insertionSort(array: number[]): SortFrame[] {
  const frames: SortFrame[] = [];
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Mark first element as sorted initially
  frames.push({
    type: "sorted",
    indices: [0],
    array: copyArray(arrayCopy)
  });
  
  for (let i = 1; i < n; i++) {
    const key = arrayCopy[i];
    let j = i - 1;
    
    // Compare with each element in the sorted array until we find the right position
    while (j >= 0) {
      frames.push({
        type: "compare",
        indices: [j, i],
        array: copyArray(arrayCopy)
      });
      
      if (arrayCopy[j] > key) {
        arrayCopy[j + 1] = arrayCopy[j];
        frames.push({
          type: "swap",
          indices: [j, j + 1],
          array: copyArray(arrayCopy)
        });
        j--;
      } else {
        break;
      }
    }
    
    arrayCopy[j + 1] = key;
    
    // Add a swap frame for the final position
    if (j + 1 !== i) {
      frames.push({
        type: "swap",
        indices: [j + 1, i],
        array: copyArray(arrayCopy)
      });
    }
    
    // Mark element as sorted
    frames.push({
      type: "sorted",
      indices: [j + 1],
      array: copyArray(arrayCopy)
    });
  }
  
  return frames;
}

// Selection Sort implementation
export function selectionSort(array: number[]): SortFrame[] {
  const frames: SortFrame[] = [];
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find the minimum element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      frames.push({
        type: "compare",
        indices: [minIdx, j],
        array: copyArray(arrayCopy)
      });
      
      if (arrayCopy[j] < arrayCopy[minIdx]) {
        minIdx = j;
      }
    }
    
    // Swap the minimum element with the first element of the unsorted part
    if (minIdx !== i) {
      swap(arrayCopy, i, minIdx);
      frames.push({
        type: "swap",
        indices: [i, minIdx],
        array: copyArray(arrayCopy)
      });
    }
    
    // Mark element as sorted
    frames.push({
      type: "sorted",
      indices: [i],
      array: copyArray(arrayCopy)
    });
  }
  
  // Mark the last element as sorted
  frames.push({
    type: "sorted",
    indices: [n - 1],
    array: copyArray(arrayCopy)
  });
  
  return frames;
}

// Quick Sort implementation
export function quickSort(array: number[]): SortFrame[] {
  const frames: SortFrame[] = [];
  const arrayCopy = copyArray(array);
  
  // Helper function to perform quick sort recursively
  function quickSortHelper(arr: number[], low: number, high: number, sortedIndices: Set<number>) {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, sortedIndices);
      quickSortHelper(arr, low, pivotIndex - 1, sortedIndices);
      quickSortHelper(arr, pivotIndex + 1, high, sortedIndices);
    } else if (low >= 0 && high >= 0 && low === high && !sortedIndices.has(low)) {
      // Single element sub-array is sorted
      sortedIndices.add(low);
      frames.push({
        type: "sorted",
        indices: [low],
        array: copyArray(arr)
      });
    }
  }
  
  // Helper function to partition the array
  function partition(arr: number[], low: number, high: number, sortedIndices: Set<number>): number {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      frames.push({
        type: "compare",
        indices: [j, high], // Compare current element with pivot
        array: copyArray(arr)
      });
      
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          swap(arr, i, j);
          frames.push({
            type: "swap",
            indices: [i, j],
            array: copyArray(arr)
          });
        }
      }
    }
    
    // Place pivot in the correct position
    if (i + 1 !== high) {
      swap(arr, i + 1, high);
      frames.push({
        type: "swap",
        indices: [i + 1, high],
        array: copyArray(arr)
      });
    }
    
    // Mark pivot as sorted
    sortedIndices.add(i + 1);
    frames.push({
      type: "sorted",
      indices: [i + 1],
      array: copyArray(arr)
    });
    
    return i + 1;
  }
  
  const sortedIndices = new Set<number>();
  quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, sortedIndices);
  
  // Ensure all elements are marked as sorted
  for (let i = 0; i < arrayCopy.length; i++) {
    if (!sortedIndices.has(i)) {
      frames.push({
        type: "sorted",
        indices: [i],
        array: copyArray(arrayCopy)
      });
    }
  }
  
  return frames;
}
