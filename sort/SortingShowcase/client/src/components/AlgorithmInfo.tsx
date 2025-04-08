import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSorting } from "@/context/SortingContext";
import { algorithmData, AlgorithmType } from "@/lib/algorithmData";

export default function AlgorithmInfo() {
  const { sortingAlgorithm, setAlgorithm, isSorting } = useSorting();
  
  const handleTabChange = (value: string) => {
    if (!isSorting) {
      setAlgorithm(value as AlgorithmType);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Algorithm Information</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4" id="algorithmDescription">
        <h3 className="font-medium text-lg text-primary mb-2">{algorithmData[sortingAlgorithm].name}</h3>
        <p className="text-gray-700">{algorithmData[sortingAlgorithm].description}</p>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-gray-100 p-2 rounded">
            <span className="text-xs font-medium text-gray-500">Time Complexity (Best):</span>
            <span className="block font-mono">{algorithmData[sortingAlgorithm].bestCase}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="text-xs font-medium text-gray-500">Time Complexity (Average):</span>
            <span className="block font-mono">{algorithmData[sortingAlgorithm].averageCase}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="text-xs font-medium text-gray-500">Time Complexity (Worst):</span>
            <span className="block font-mono">{algorithmData[sortingAlgorithm].worstCase}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="text-xs font-medium text-gray-500">Space Complexity:</span>
            <span className="block font-mono">{algorithmData[sortingAlgorithm].spaceComplexity}</span>
          </div>
        </div>
      </div>
      
      {/* Algorithm Tabs */}
      <Tabs value={sortingAlgorithm} onValueChange={handleTabChange}>
        <TabsList className="flex border-b border-gray-200 w-full justify-start">
          <TabsTrigger 
            value="bubble"
            disabled={isSorting}
            className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-medium data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
          >
            Bubble Sort
          </TabsTrigger>
          <TabsTrigger 
            value="insertion"
            disabled={isSorting}
            className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-medium data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
          >
            Insertion Sort
          </TabsTrigger>
          <TabsTrigger 
            value="selection"
            disabled={isSorting}
            className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-medium data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
          >
            Selection Sort
          </TabsTrigger>
          <TabsTrigger 
            value="quick"
            disabled={isSorting}
            className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-medium data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
          >
            Quick Sort
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bubble">
          <PseudocodeDisplay code={algorithmData.bubble.pseudocode} />
        </TabsContent>
        
        <TabsContent value="insertion">
          <PseudocodeDisplay code={algorithmData.insertion.pseudocode} />
        </TabsContent>
        
        <TabsContent value="selection">
          <PseudocodeDisplay code={algorithmData.selection.pseudocode} />
        </TabsContent>
        
        <TabsContent value="quick">
          <PseudocodeDisplay code={algorithmData.quick.pseudocode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface PseudocodeDisplayProps {
  code: string;
}

function PseudocodeDisplay({ code }: PseudocodeDisplayProps) {
  return (
    <div className="mt-4">
      <h4 className="font-medium text-gray-800 mb-2">Pseudocode</h4>
      <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
        <code className="text-gray-800 font-mono">{code}</code>
      </pre>
    </div>
  );
}
