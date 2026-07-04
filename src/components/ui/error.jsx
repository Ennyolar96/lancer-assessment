import { AlertCircle, RefreshCw } from "lucide-react";

export const DashboardError = ({ isRetrying, onRetry }) => (
  <section className="mx-auto flex max-w-xl flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
      <AlertCircle size={28} />
    </div>
    <h2 className="text-xl font-bold text-[#072635]">Dashboard unavailable</h2>
    <p className="mt-2 text-sm font-medium leading-6 text-[#707070]">
      We could not load the patient records. Check your connection and try the
      request again.
    </p>
    <button
      type="button"
      onClick={onRetry}
      disabled={isRetrying}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#01F0D0] px-5 py-3 text-sm font-bold text-[#072635] transition-colors hover:bg-[#0bd984] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <RefreshCw size={18} className={isRetrying ? "animate-spin" : ""} />
      {isRetrying ? "Retrying..." : "Try again"}
    </button>
  </section>
);
