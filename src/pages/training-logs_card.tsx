import Link from "next/link";

type TrainingLogsCardProps = {
  id: string;
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

export default function TrainingLogsCard( {id, title, date, month, year, userName, animalName, animalBreed, hours, description}: TrainingLogsCardProps ) {

    return (
      <div className="w-full overflow-hidden rounded-[20px] bg-white shadow-lg">
        <div className="flex flex-col items-stretch sm:flex-row">
          <div
            id="date"
            className="flex shrink-0 flex-row items-center justify-center gap-2 bg-[#070A52D9] px-4 py-3 font-oswald text-white sm:w-24 sm:flex-col sm:gap-0 lg:w-28"
          >
            <div className="text-3xl leading-none lg:text-4xl">{date}</div>
            <div className="text-center text-xs sm:mt-1 lg:text-sm">
              {month} - {year}
            </div>
          </div>

          <div id="info" className="min-w-0 flex-1 p-4 font-heebo lg:p-5">
            <div
              id="header"
              className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-4"
            >
              <div className="break-words text-lg font-bold sm:text-xl lg:text-2xl">{title}</div>
              <div className="text-sm font-medium text-[#999999] lg:text-base">
                • {hours} hours
              </div>
            </div>

            <div
              id="identifier"
              className="mt-1 break-words text-sm font-medium text-[#999999] lg:text-base"
            >
              {userName} - {animalBreed} - {animalName}
            </div>

            <div id="description" className="mt-2 break-words text-sm leading-6 lg:text-base">
              {description}
            </div>
          </div>

          <div
            id="image"
            className="flex shrink-0 items-center justify-end border-t border-gray-100 px-4 py-3 sm:border-t-0 sm:pl-0 sm:pr-4 sm:pt-4"
          >
            <Link href={`/edit_training-log/${id}`}>
              <img
                src="/images/trainingLogCardEditButton.png"
                alt="Edit training log"
                className="h-7 w-7 lg:h-8 lg:w-8"
              />
            </Link>
          </div>
        </div>
      </div>
  );
}
