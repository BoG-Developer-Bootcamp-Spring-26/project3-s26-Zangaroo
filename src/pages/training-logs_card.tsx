type TrainingLogsCardProps = {
  title: string;
  date: string;
  month: string;
  year: string;
  userName: string;
  animalName: string;
  animalBreed: string;
  hours: number;
  description: string;
};

export default function TrainingLogsCard({
  title,
  date,
  month,
  year,
  userName,
  animalName,
  animalBreed,
  hours,
  description,
}: TrainingLogsCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-lg">
      <div className="flex items-stretch">
        <div
          id="date"
          className="flex w-24 shrink-0 flex-col items-center justify-center bg-[#070A52D9] px-3 py-3 text-white font-oswald lg:w-28"
        >
          <div className="text-3xl leading-none lg:text-4xl">{date}</div>
          <div className="mt-1 text-center text-xs lg:text-sm">
            {month} - {year}
          </div>
        </div>

        <div id="info" className="min-w-0 flex-1 p-3 font-heebo lg:p-4">
          <div
            id="header"
            className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-4"
          >
            <div className="break-words text-xl font-bold lg:text-2xl">{title}</div>
            <div className="text-sm font-medium text-[#999999] lg:text-base">
              {hours} hours
            </div>
          </div>

          <div
            id="identifier"
            className="mt-1 break-words text-sm font-medium text-[#999999] lg:text-base"
          >
            {userName} - {animalBreed} - {animalName}
          </div>

          <div id="description" className="mt-2 break-words text-sm lg:text-base">
            {description}
          </div>
        </div>

        <div id="image" className="flex shrink-0 items-start justify-end p-3 lg:p-4">
          <img
            src="/images/trainingLogCardEditButton.png"
            alt="Edit training log"
            className="h-7 w-7 lg:h-8 lg:w-8"
          />
        </div>
      </div>
    </div>
  );
}
