type ProgressBarProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
};

export default function ProgressBar({
  searchValue = "",
  onSearchChange,
  showSearch = true,
}: ProgressBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-300 px-4 py-3 shadow-md sm:px-6 sm:py-4 lg:px-8 lg:py-4">
      <div className="flex w-[240px] shrink-0 items-center gap-3">
        <img src="/images/appLogo.png" alt="App logo" className="h-9 w-auto sm:h-10" />
        <h1 className="text-2xl font-medium text-black font-oswald sm:text-3xl lg:text-4xl">
          Progress
        </h1>
      </div>

      {showSearch ? (
        <div className="flex flex-1 justify-center px-4">
          <div className="relative h-[48px] w-full max-w-[550px]">
            <img
              src="/images/searchLogo.png"
              alt="Search logo"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="h-full w-full rounded-[15px] border-[1.5px] border-gray-300 bg-white pl-14 pr-4 font-heebo text-lg text-gray-700 outline-none placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex w-[200px] shrink-0 justify-end" />
    </header>
  );
}
