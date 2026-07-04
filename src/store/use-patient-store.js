import { create } from "zustand";

export const usePatientStore = create((set) => ({
  selectedPatient: null,
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
}));
