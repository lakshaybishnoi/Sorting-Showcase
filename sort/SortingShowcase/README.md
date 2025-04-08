# Sorting Algorithm Visualizer

An interactive web-based application that visualizes various sorting algorithms with step-by-step animation. This educational tool helps users understand how different sorting algorithms work by providing visual representation of the sorting process.

## Features

- Interactive visualization of multiple sorting algorithms:
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Quick Sort
- Customizable array size and sorting speed
- Real-time metrics tracking (comparisons, swaps, elapsed time)
- Color-coded visualization to track array changes
- Algorithm information section with time complexity details
- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Context API for state management

### Backend
- Express.js
- Node.js

### Build Tools
- Vite
- TSX

## Getting Started

### Prerequisites
- Node.js (v16 or newer)
- npm (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/sorting-algorithm-visualizer.git
   cd sorting-algorithm-visualizer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:5000

## How It Works

- The application generates a random array of numbers
- Select a sorting algorithm from the dropdown menu
- Adjust the array size and sorting speed as needed
- Click the "Start" button to begin the visualization
- The bars represent the values in the array, with their heights proportional to the values
- Color coding indicates the current state of each element:
  - Gray: Unsorted
  - Blue: Currently being compared
  - Orange: Currently being swapped
  - Green: Sorted and in final position

## Future Enhancements

- Additional sorting algorithms (Merge Sort, Heap Sort, Radix Sort)
- Comparison mode to visualize two algorithms side by side
- Sound effects based on array operations
- Custom input arrays
- Step-by-step execution mode

## License

[MIT License](LICENSE)

## Acknowledgments

- Created as an educational tool for algorithm visualization
- Inspired by various sorting algorithm visualizers and computer science education resources