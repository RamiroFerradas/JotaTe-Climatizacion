export default function SkeletonFeatured() {
  return (
    <div className="relative flex items-center justify-center flex-col text-center w-full">
      <div>
        <div className="animate-pulse bg-gray-200 h-6 w-48"></div>
      </div>

      <div className="flex flex-col items-center justify-center my-6 h-72 overflow-hidden">
        <div className="animate-pulse bg-gray-200 rounded-md h-72 w-72"></div>
      </div>

      <div>
        <div className="animate-pulse bg-gray-200 h-6 w-24"></div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="animate-pulse bg-gray-200 h-6 w-24"></div>
      </div>
    </div>
  );
}
