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

export default function trainingLogsCard( {title, date, month, year, userName, animalName, animalBreed, hours, 
    description}: TrainingLogsCardProps ) {

    return (
        <div className= "flex gap-4 rounded-[20px] max-w-291 h-40.5 shadow-lg ml-10 mt-4">
            <div id="date" className="flex flex-col items-center justify-center font-medium bg-[#070A52D9] p-4 rounded-tl-[20px] rounded-bl-[20px] text-white justify-center align-items font-oswald">
                <div className="text-[48px]">{date}</div>
                <div>
                    {month} - {year}
                </div>
            </div>
            <div id="info" className="font-heebo">
                <div id="header" className = "flex gap-4 items-center">
                    <div className="text-[30px] font-bold">{title}</div>
                    <div className="text-[#999999] text-[20px] bold-medium">{hours} hours</div>
                </div>

                <div id="identifier" className = "flex gap-6 text-[#999999] font-medium text-[20px]">
                    {userName} - {animalBreed} - {animalName}          
                </div>

                <div id="description" className="text-[20px] mt-4">
                    {description}
                </div>

            </div>

            <div id="image" className="flex ml-auto p-8">
                    <img src="/images/trainingLogCardEditButton.png"></img>
            </div>
        </div>
    )
}