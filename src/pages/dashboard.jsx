import { DiagnosisHistory } from "@/components/dashboard/diagnosis-history";
import { DiagnosticList } from "@/components/dashboard/diagnostic";
import { Patients } from "@/components/dashboard/patients";
import { Profile } from "@/components/dashboard/profile";
import { DashboardSkeleton } from "@/components/dashboard/skeleton";
import { Header } from "@/components/layout/header";
import { DashboardError } from "@/components/ui/error";
import { http } from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { UserRound, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePatientStore } from "@/store/use-patient-store";
import { BottomDrawer } from "@/components/ui/bottom-drawer";

export const Dashboard = () => {
  const [activeMobilePanel, setActiveMobilePanel] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleMobilePanel = (panel) => {
    setDrawerOpen(true);
    setActiveMobilePanel((activePanel) =>
      activePanel === panel ? null : panel,
    );
  };

  const closeMobilePanel = () => {
    setDrawerOpen(false);
    setActiveMobilePanel(null);
  };

  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const auth = btoa(`${username}:${password}`);

  const {
    data: patients = [],
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await http.get("/", {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });

      return response.data;
    },
  });

  const { selectedPatient, setSelectedPatient } = usePatientStore();

  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient, setSelectedPatient]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(false);
    setActiveMobilePanel(null);
  };

  return (
    <div className="container mx-auto p-2 sm:p-6 lg:p-8 space-y-8 mb-20 sm:mb-0">
      <Header />

      <div className="lg:hidden">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => toggleMobilePanel("patients")}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-semibold transition-colors ${
              activeMobilePanel === "patients"
                ? "bg-[#01F0D0] text-black"
                : "text-[#072635] hover:bg-[#F6F7F8]"
            }`}
            aria-expanded={activeMobilePanel === "patients"}
            aria-controls="mobile-dashboard-panel"
          >
            <Users size={20} />
            <span>Patients</span>
          </button>

          <button
            type="button"
            onClick={() => toggleMobilePanel("profile")}
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 font-semibold transition-colors ${
              activeMobilePanel === "profile"
                ? "bg-[#01F0D0] text-black"
                : "text-[#072635] hover:bg-[#F6F7F8]"
            }`}
            aria-expanded={activeMobilePanel === "profile"}
            aria-controls="mobile-dashboard-panel"
          >
            <UserRound size={20} />
            <span>Profile</span>
          </button>
        </div>

        <BottomDrawer
          open={drawerOpen}
          onOpenChange={closeMobilePanel}
          className="bg-white"
        >
          {activeMobilePanel === "patients" ? (
            <Patients
              patients={patients}
              handler={handleSelectPatient}
              className="w-full rounded-none shadow-none border-0"
            />
          ) : selectedPatient ? (
            <Profile className="w-full rounded-none shadow-none border-0" />
          ) : (
            <p className="p-4 text-sm font-semibold text-[#707070]">
              Loading profile...
            </p>
          )}
        </BottomDrawer>
      </div>

      {isPending && <DashboardSkeleton />}

      {error && (
        <DashboardError
          isRetrying={isRefetching}
          onRetry={() => {
            void refetch();
          }}
        />
      )}

      {!isPending && !error && selectedPatient && (
        <main className="flex flex-col lg:flex-row items-center gap-10">
          <div className="hidden w-full lg:block lg:w-[25%]">
            <Patients patients={patients} handler={handleSelectPatient} />
          </div>
          <div className="w-full lg:w-[50%]">
            <div className="space-y-5">
              <DiagnosisHistory />
              <DiagnosticList />
            </div>
          </div>
          <div className="hidden w-full lg:block lg:w-[25%]">
            <Profile />
          </div>
        </main>
      )}
    </div>
  );
};
