import { Ellipsis, Search, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

export const Patients = ({ patients, handler, className = "" }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  const filtered = debouncedQuery
    ? patients.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      )
    : patients;

  return (
    <div
      className={cn("rounded-lg bg-white p-4 shadow-sm space-y-5", className)}
    >
      <div className="flex items-center justify-between">
        {isSearching ? (
          <div className="flex items-center gap-2 w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patients..."
              className="w-full border-none outline-none text-lg font-semibold bg-transparent"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsSearching(false);
                  setQuery("");
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                setIsSearching(false);
                setQuery("");
              }}
              className="shrink-0"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold">Patients</h2>
            <button type="button" onClick={() => setIsSearching(true)}>
              <Search size={20} className="text-gray-500" />
            </button>
          </>
        )}
      </div>

      {filtered.length > 0 ? (
        <div
          className="h-[60vh] space-y-3 overflow-y-auto pr-4 lg:h-[900px]"
          style={{
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          {filtered.map((patient) => (
            <button
              type="button"
              onClick={() => handler(patient)}
              key={patient.name}
              className="flex cursor-pointer items-center justify-between py-2 w-full bg-transparent border-none outline-none"
            >
              <div className="flex min-w-0 items-center gap-4">
                {patient.profile_picture ? (
                  <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#01F0D0] text-white">
                    <Users size={20} />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="truncate text-[16px] font-semibold">
                    {patient.name}
                  </h4>
                  <p className="text-[12px] text-gray-500">
                    {[patient.gender, patient.age && `${patient.age} years`]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <Ellipsis className="shrink-0" />
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 py-4 text-center">
          No patients found.
        </p>
      )}
    </div>
  );
};
