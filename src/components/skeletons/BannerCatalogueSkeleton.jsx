import { Skeleton } from "../ui/skeleton";

function BannerCatalogueSkeleton() {
  return (
    <section className="px-6 py-4">
        <Skeleton className="h-4 w-32 mb-4"/>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-40 w-24 shrink-0 rounded-lg"/>
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-4 w-full"/>
                  <Skeleton className="h-3 w-1/2"/>
                </div>
              </div>
            ))}            
            </div>

            <div className="flex flex-col gap-4">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-40 w-24 shrink-0 rounded-lg"/>
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-3 w-1/2"/>
                  </div>
                </div>
              ))}
          </div>
        </div>
    </section>
  );
}

export default BannerCatalogueSkeleton;