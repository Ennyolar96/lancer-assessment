import { Calendar, Phone, Shield, Venus } from "lucide-react";
import { LabResult } from "./lab-result";
import { usePatientStore } from "@/store/use-patient-store";
import { cn } from "@/lib/utils";

export const Profile = ({ className = "" }) => {
  const selectedPatient = usePatientStore((state) => state.selectedPatient);

  if (!selectedPatient) return null;

  const info = [
    {
      name: "Date Of Birth",
      icon: Calendar,
      value: selectedPatient.date_of_birth,
    },
    {
      name: "Gender",
      icon: Venus,
      value: selectedPatient.gender,
    },
    {
      name: "Contact",
      icon: Phone,
      value: selectedPatient.phone_number,
    },
    {
      name: "Emergency Contact",
      icon: Phone,
      value: selectedPatient.emergency_contact,
    },
    {
      name: "Insurance Provider",
      icon: Shield,
      value: selectedPatient.insurance_type,
    },
  ];
  return (
    <div className="space-y-5">
      <div className={cn("rounded-xl bg-white p-4 shadow-sm", className)}>
        <div className="flex flex-col gap-4 space-y-5">
          <img
            src={selectedPatient.profile_picture || ""}
            alt={selectedPatient.name || "Unknown"}
            className="mx-auto flex h-36 w-36 items-center justify-center sm:h-[200px] sm:w-[200px]"
          />
          <div className="space-y-5">
            <h3 className="font-semibold text-[20px] text-center">
              {selectedPatient.name || "Unknown"}
            </h3>

            {info.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-[#F4F0FE] p-2 rounded-full w-[48px] h-[48px] flex items-center justify-center">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500">
                    {item.name || "Unknown"}
                  </p>
                  <h4 className="font-semibold">{item.value || "Unknown"}</h4>
                </div>
              </div>
            ))}

            <button className="bg-[#01F0D0] border-none cursor-pointer font-bold px-4 py-2 rounded-full w-full">
              Show All Information
            </button>
          </div>
        </div>
      </div>

      <LabResult />
    </div>
  );
};
