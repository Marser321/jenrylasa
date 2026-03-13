export default function AdminLoading() {
    return (
        <div className="p-6 md:p-10 space-y-6 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-48 bg-white/5 rounded-lg" />
                <div className="h-4 w-72 bg-white/5 rounded" />
            </div>

            {/* Cards grid skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-32 rounded-xl bg-white/[0.03] border border-white/5"
                    />
                ))}
            </div>

            {/* Table skeleton */}
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-4 flex-1 bg-white/5 rounded" />
                        <div className="h-4 w-24 bg-white/5 rounded" />
                        <div className="h-4 w-16 bg-white/5 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
