import { usePatientStore } from "@/store/use-patient-store";

export const DiagnosticList = () => {
  const selectedPatient = usePatientStore((state) => state.selectedPatient);

  if (!selectedPatient) return null;

  const list = selectedPatient.diagnostic_list;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-7">
      <h2 className="text-2xl font-semibold">Diagnostic List</h2>

      <div
        className="relative overflow-x-auto h-[230px] overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarGutter: "stable",
        }}
      >
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-[#F6F7F8]">
            <tr>
              <th className="font-bold text-[#072635] py-3 px-6">
                Problem/Diagnosis
              </th>
              <th className="font-bold text-[#072635] py-3 px-6">
                Description
              </th>
              <th className="font-bold text-[#072635] py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ? (
              list.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-medium text-[#072635] py-4 px-6">
                    {item.name}
                  </td>
                  <td className="font-medium text-[#072635] py-4 px-6">
                    {item.description}
                  </td>
                  <td className="font-medium text-[#072635] py-4 px-6">
                    {item.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center text-[#072635] py-4 px-6"
                >
                  No diagnostic data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
