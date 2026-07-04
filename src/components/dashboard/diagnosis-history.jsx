import { heart, respiratory, temperature } from "@/assets";
import { ChevronDown } from "lucide-react";
import { DiagnosisChart } from "./chart";
import { usePatientStore } from "@/store/use-patient-store";

const data = [
  {
    color: "#E0F3FA",
    title: "Respiratory Rate",
    value: "20 bpm",
    subTitle: "Normal",
    img: respiratory,
  },
  {
    color: "#FFE6E9",
    title: "Temperature",
    value: "98.6°F",
    subTitle: "Normal",
    img: temperature,
  },
  {
    color: "#FFE6F1",
    title: "Heart Rate",
    value: "78 bpm",
    subTitle: "Lower than Average",
    img: heart,
  },
];

export const DiagnosisHistory = () => {
  const selectedPatient = usePatientStore((state) => state.selectedPatient);

  if (!selectedPatient) return null;

  const history = selectedPatient.diagnosis_history;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-7">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Diagnosis History</h2>
        <DiagnosisChart data={history} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 p-5 rounded-xl"
              style={{ backgroundColor: item.color }}
            >
              <div className="p-3 rounded-full bg-white w-[96px] h-[96px] flex items-center justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <p className="font-semibold text-base">{item.title}</p>
                <p className="font-black text-xl">{item.value}</p>
              </div>
              <div className="flex gap-2 items-center">
                <ChevronDown
                  size={16}
                  className={`${idx === 2 ? "mt-0.5" : "hidden"}`}
                />
                <p className="font-medium text-sm">{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
