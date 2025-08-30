import { Play, RotateCcw } from "lucide-react";

const ControlPanel = ({
  onStart,
  onReset,
  disabled,
}: {
  onStart: () => void;
  onReset: () => void;
  disabled: boolean;
}) => (
  <div className="flex items-center justify-center gap-6">
    <button
      onClick={onStart}
      className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-lg"
    >
      <Play size={24} />
      Start
    </button>
    <button
      onClick={onReset}
      disabled={disabled}
      className="flex items-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
    >
      <RotateCcw size={24} />
      Reset
    </button>
  </div>
);

export default ControlPanel;
