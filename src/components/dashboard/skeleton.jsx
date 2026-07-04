const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-[#EDEDED] ${className}`} />
);

export const DashboardSkeleton = () => (
  <main className="flex flex-col gap-10 lg:flex-row lg:items-start">
    <div className="hidden w-full rounded-xl bg-white p-4 shadow-sm lg:block lg:w-[25%]">
      <div className="mb-6 flex items-center justify-between">
        <SkeletonBlock className="h-8 w-32" />
        <SkeletonBlock className="h-6 w-6 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full space-y-5 lg:w-[50%]">
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <SkeletonBlock className="mb-6 h-7 w-48" />
        <div className="rounded-2xl bg-[#F4F0FE] p-4">
          <div className="mb-5 flex items-center justify-between">
            <SkeletonBlock className="h-5 w-32 bg-[#D8D2E8]" />
            <SkeletonBlock className="h-5 w-24 bg-[#D8D2E8]" />
          </div>
          <SkeletonBlock className="h-48 w-full bg-[#D8D2E8]" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-40" />
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <SkeletonBlock className="mb-5 h-7 w-40" />
        <SkeletonBlock className="h-48 w-full" />
      </div>
    </div>

    <div className="hidden w-full space-y-5 lg:block lg:w-[25%]">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SkeletonBlock className="mx-auto h-36 w-36 rounded-full" />
        <SkeletonBlock className="mx-auto mt-5 h-6 w-40" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <SkeletonBlock className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-3 w-24" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <SkeletonBlock className="mb-5 h-6 w-32" />
        <SkeletonBlock className="h-44 w-full" />
      </div>
    </div>
  </main>
);
