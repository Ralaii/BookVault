import { Skeleton } from "../ui/skeleton";

function NewReleaseCatalogueSkeleton() {
  return(
    <section className="px-6 py-4 w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">New Release</h2>
        <h2 className="text-base font-light">More</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6}).map((_, i) => (
          <Skeleton key={i} className="h-60"/>
        ))}
      </div>
    </section>
  );
}

export default NewReleaseCatalogueSkeleton;