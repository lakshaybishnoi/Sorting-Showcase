export type AlgorithmType = "bubble" | "insertion" | "selection" | "quick";

export interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  bestCase: string;
  averageCase: string;
  worstCase: string;
  spaceComplexity: string;
  comparisonComplexity: string;
  swapComplexity: string;
  description: string;
  pseudocode: string;
}

export const algorithmData: Record<AlgorithmType, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    timeComplexity: "O(n²)",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    comparisonComplexity: "O(n²)",
    swapComplexity: "O(n²)",
    description: "Bubble Sort is a simple comparison-based algorithm. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    pseudocode: `procedure bubbleSort(A: list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`
  },
  insertion: {
    name: "Insertion Sort",
    timeComplexity: "O(n²)",
    bestCase: "O(n)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    comparisonComplexity: "O(n²)",
    swapComplexity: "O(n²)",
    description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.",
    pseudocode: `procedure insertionSort(A: list of sortable items)
    n := length(A)
    for i := 1 to n-1 inclusive do
        x := A[i]
        j := i-1
        while j >= 0 and A[j] > x do
            A[j+1] := A[j]
            j := j-1
        end while
        A[j+1] := x
    end for
end procedure`
  },
  selection: {
    name: "Selection Sort",
    timeComplexity: "O(n²)",
    bestCase: "O(n²)",
    averageCase: "O(n²)",
    worstCase: "O(n²)",
    spaceComplexity: "O(1)",
    comparisonComplexity: "O(n²)",
    swapComplexity: "O(n)",
    description: "Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: the sorted sublist and the unsorted sublist. It repeatedly finds the minimum element from the unsorted sublist and puts it at the end of the sorted sublist.",
    pseudocode: `procedure selectionSort(A: list of sortable items)
    n := length(A)
    for i := 0 to n-2 inclusive do
        minIndex := i
        for j := i+1 to n-1 inclusive do
            if A[j] < A[minIndex] then
                minIndex := j
            end if
        end for
        if minIndex ≠ i then
            swap(A[i], A[minIndex])
        end if
    end for
end procedure`
  },
  quick: {
    name: "Quick Sort",
    timeComplexity: "O(n log n)",
    bestCase: "O(n log n)",
    averageCase: "O(n log n)",
    worstCase: "O(n²)",
    spaceComplexity: "O(log n)",
    comparisonComplexity: "O(n log n)",
    swapComplexity: "O(n log n)",
    description: "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. It picks an element as a pivot and partitions the array around the pivot, then recursively sorts the sub-arrays.",
    pseudocode: `procedure quickSort(A: list of sortable items, lo: integer, hi: integer)
    if lo < hi then
        p := partition(A, lo, hi)
        quickSort(A, lo, p - 1)
        quickSort(A, p + 1, hi)
    end if
end procedure

procedure partition(A: list of sortable items, lo: integer, hi: integer) → integer
    pivot := A[hi]
    i := lo - 1
    for j := lo to hi - 1 do
        if A[j] ≤ pivot then
            i := i + 1
            swap A[i] with A[j]
        end if
    end for
    swap A[i + 1] with A[hi]
    return i + 1
end procedure`
  }
};
