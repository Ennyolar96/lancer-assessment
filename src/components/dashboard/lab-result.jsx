import { Download } from "lucide-react";
import { useState } from "react";
import { usePatientStore } from "@/store/use-patient-store";

export const LabResult = () => {
  const [selected, setSelected] = useState(null);
  const selectedPatient = usePatientStore((state) => state.selectedPatient);

  if (!selectedPatient) return null;

  const result = selectedPatient.lab_results;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex flex-col gap-4 space-y-2">
        <h3 className="font-semibold text-[20px]">Lab Results</h3>

        <div
          className="h-[180px] overflow-y-auto pr-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          {result && result.length > 0 ? (
            result.map((result, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(result)}
                className={`w-full flex items-center justify-between gap-2 border-none cursor-pointer p-3 ${selected === result ? "bg-[#F6F7F8]" : "bg-transparent"}`}
              >
                <p className="text-[16px] text-black line-clamp-1">{result}</p>
                <Download size={20} />
              </button>
            ))
          ) : (
            <p className="text-[16px] text-black line-clamp-1">
              No lab results available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
