import React from 'react'

interface cardProps{
    label:string
    patientNumber: number
    date: Date;
    bgColor?: string
}

const Card:React.FC<cardProps> = ({patientNumber,label,date,bgColor}) => {

const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })

const dayName = date.toLocaleDateString("en-US", {
    weekday: "long",
  })

  return (
    <div className='card-container'>

      <div className={`card hover-zoom h-30 w-full rounded-lg flex flex-col justify-center gap-2 ${bgColor}`}>
        <h1 className="text-sm text-white px-5">{label}</h1>
        <p className='text-white text-2xl font-semibold px-5'>{patientNumber}</p>
        <span className='text-white px-5 text-sm'>
            {formattedDate}, {dayName}
        </span>
      </div>

    </div>
  )
}

export default Card
