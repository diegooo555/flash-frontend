import { useState } from "react"
import { semesters } from "../lib/universityUPTC.js"

const calculateAverage = (subjects) => {
    let sum = 0;
    let numCredits = 0;
    for(let index = 0; index < subjects.length; index++){
        sum += (subjects[index].note) * subjects[index].credits;
        numCredits += subjects[index].credits;
    }

    const average = Math.round(sum / numCredits);
    return average;
}

const calculateAverageCareer = (allSemesters) => {
    let sum = 0;
    for(let index = 0; index < allSemesters.length; index++){
        sum += calculateAverage(allSemesters[index].subjects);
    }

    return Math.round(sum / allSemesters.length);
}

function Projects() {

    const [stateSemester, setStateSemester] = useState(1)

  return (
    <main>
        <h1>Semestre {stateSemester + 1}</h1>
        <h1>Promedio Semestre Actual {calculateAverage(semesters[stateSemester].subjects)}</h1>
        <h1>Promedio Carrera { calculateAverageCareer(semesters)}</h1>
        <table className="table-auto border-collapse border-[1px] border-gray-400 w-full">
            <caption>Diego Armando Sánchez Munévar Ingeniería de Sistemas y Computación</caption>
            <thead className="text-center border-collapse border-[1px] border-gray-400 w-full">
                <tr className="text-center border-collapse border-[1px] border-gray-400 w-full">
                    <th className="text-center border-collapse border-[1px] border-gray-400 ">Código</th>
                    <th className="text-center border-collapse border-[1px] border-gray-400 ">Asignatura</th>
                    <th className="text-center border-collapse border-[1px] border-gray-400 ">Créditos</th>
                    <th className="text-center border-collapse border-[1px] border-gray-400 ">Nota</th>
                    <th className="text-center border-collapse border-[1px] border-gray-400 ">PDF</th>
                </tr>
            </thead>
            <tbody>
                {semesters[stateSemester].subjects.map((subject, index) => {
                    return (
                        <tr key={index} className="text-center border-collapse border-[1px] border-gray-400 w-full">
                            <td className="text-center border-collapse border-[1px] border-gray-400 ">{subject.code}</td>
                            <td className="text-center border-collapse border-[1px] border-gray-400 ">{subject.name}</td>
                            <td className="text-center border-collapse border-[1px] border-gray-400 ">{subject.credits}</td>
                            <td className="text-center border-collapse border-[1px] border-gray-400 ">{subject.note}</td>
                            <td className="text-center border-collapse border-[1px] border-gray-400 "><a href={subject.pdf}>Link</a></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="flex">
            <button onClick={() => {if(stateSemester < semesters.length - 1){ setStateSemester(stateSemester + 1)}}}>Siguiente</button>
            <button onClick={() => {if(stateSemester > 0){setStateSemester(stateSemester - 1)}}}>Anterior</button>
        </div>
    </main>
  )
}

export default Projects