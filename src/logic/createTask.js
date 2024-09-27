import { getComponentsFullDate, generateDaysMonths} from "./calendar.js";


const getHoursDay = (date) => {
    const hours = date.substring(11, 17);  
    return hours;
};

const getComponentsDate = (date) => {
    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(5, 7));
    const day = Number(date.substring(8, 10));
    return {year, month, day};
};

const generateDatesIntervalTask = (dateTaskS, dateTaskE, dateInterval) => {
    const datesInterval = [];
    const componentsDateTaskS = getComponentsFullDate(dateTaskS);
    const componentsDateInterval = getComponentsDate(dateInterval);
    const hoursStart = getHoursDay(dateTaskS);
    const hoursEnd = getHoursDay(dateTaskE);
    let dayActual = componentsDateTaskS.day;
    let monthActual = componentsDateTaskS.month;
    let yearActual = componentsDateTaskS.year;
    let condition = yearActual <= componentsDateInterval.year;

    while (condition) {
        const daysMonthActual = generateDaysMonths(yearActual)[monthActual - 1];
        if(monthActual === componentsDateInterval.month && yearActual === componentsDateInterval.year){
            for (dayActual; dayActual <= daysMonthActual; dayActual++) {
                const formatMonth = monthActual < 10 ? `0${monthActual}` : monthActual;
                const formatDay = dayActual < 10 ? `0${dayActual}` : dayActual;
                const newDate = [`${yearActual}-${formatMonth}-${formatDay}T${hoursStart}`, `${yearActual}-${formatMonth}-${formatDay}T${hoursEnd}`];
                datesInterval.push(newDate);
                if(dayActual === componentsDateInterval.day){
                    condition = false;
                    break;
                }
            }
        }else{
            for (dayActual; dayActual <= daysMonthActual; dayActual++) {
                const formatMonth = monthActual < 10 ? `0${monthActual}` : monthActual;
                const formatDay = dayActual < 10 ? `0${dayActual}` : dayActual;
                const newDate = [`${yearActual}-${formatMonth}-${formatDay}T${hoursStart}`, `${yearActual}-${formatMonth}-${formatDay}T${hoursEnd}`];
                datesInterval.push(newDate);
            }
        }
        if (monthActual === 12) {
            monthActual = 1;
            yearActual++;
        }else{
            monthActual++;
        }
        dayActual = 1;
    }
    console.log(datesInterval);
    return datesInterval;
}



export const createTaskDaily = (data, frequency) => {
    let datesInterval = [];
    if(frequency === "week"){
        datesInterval = generateWeekIntervalsDates(data.dateStart, data.dateEnd, data.dateRepeat);
    }else if(frequency === "month"){
        datesInterval = generateMonthIntervalsDates(data.dateStart, data.dateEnd, data.dateRepeat);
    }else if(frequency === "daily"){
        datesInterval = generateDatesIntervalTask(data.dateStart, data.dateEnd, data.dateRepeat);
    }else{
        console.log("Year")
    }
    
    let tasks = [];
    delete data.dateRepeat;
    for (let index = 0; index < datesInterval.length; index++) {
        const newTask = {...data, dateStart: datesInterval[index][0], dateEnd: datesInterval[index][1]};
        tasks.push(newTask);
        
    }
    return tasks;
};

//WEEKLY


/* export const createTaskWeekly = (data) => {

} */

const generateWeekIntervalsDates = (dateTaskS, dateTaskE, dateInterval) => {
    const componentsDateInterval = getComponentsDate(dateInterval);
    const componentsDateTaskS = getComponentsFullDate(dateTaskS);
    const hoursStart = getHoursDay(dateTaskS);
    const hoursEnd = getHoursDay(dateTaskE);
    const weekIntervalsDates = [];
    let dayActual = componentsDateTaskS.day;
    let monthActual = componentsDateTaskS.month;
    let yearActual = componentsDateTaskS.year;
    while (monthActual <= componentsDateInterval.month && yearActual === componentsDateInterval.year) {

        const daysMonthActual = generateDaysMonths(yearActual)[monthActual - 1];
        const formatMonth = monthActual < 10 ? `0${monthActual}` : monthActual;
        const formatDay = dayActual < 10 ? `0${dayActual}` : dayActual;
        let nextDayWeek = dayActual + 7;
        weekIntervalsDates.push([`${yearActual}-${formatMonth}-${formatDay}T${hoursStart}`, `${yearActual}-${formatMonth}-${formatDay}T${hoursEnd}`]);   

        console.log(monthActual)
        if(nextDayWeek > daysMonthActual){  
            nextDayWeek = nextDayWeek - daysMonthActual;
            if(monthActual === 12){
                monthActual = 1;
                yearActual++;
            }else{
                monthActual++;
            }
        }
        
        dayActual = nextDayWeek;
        
    }
    return validateWeekIntervalDAtes(weekIntervalsDates, dateInterval);

}

const validateWeekIntervalDAtes = (arr, dateInterval) => {

    const componentsDateInterval = getComponentsDate(dateInterval);
    for (let index = arr.length; index > 0; index--) {
        const componentsDate = getComponentsFullDate(arr[index-1][1]);
        if(componentsDate.month === componentsDateInterval.month){
            if(componentsDate.day > componentsDateInterval.day){
                arr.pop();
            }
        }else{
            break;
        }
    }
    return arr;
}

const generateMonthIntervalsDates = (dateTaskS, dateTaskE, dateInterval) => {
    const { year: startYear, month: startMonth, day: startDay } = getComponentsFullDate(dateTaskS);
    const { year: endYear, month: endMonth, day: endDay } = getComponentsDate(dateInterval);
    const hoursStart = getHoursDay(dateTaskS);
    const hoursEnd = getHoursDay(dateTaskE);
    const arrDates = [];

    let currentYear = startYear;
    let currentMonth = startMonth;
    let currentDay = startDay;

    let addLastMonth = true;

    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth) && addLastMonth) {
        const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
        const daysNextMonth = generateDaysMonths(currentYear)[currentMonth];
        const formattedDay = currentDay < 10 ? `0${currentDay}` : currentDay;

        arrDates.push([
            `${currentYear}-${formattedMonth}-${formattedDay}T${hoursStart}`,
            `${currentYear}-${formattedMonth}-${formattedDay}T${hoursEnd}`
        ]);

        if(daysNextMonth < startDay){
            currentDay = daysNextMonth;
        }else{
            currentDay = startDay;
        }

        if (currentMonth === 12) {
            currentMonth = 1;
            currentYear++;
        } else {
            currentMonth++;
        }
        if (currentYear === endYear && currentMonth === endMonth && startDay > endDay) {
            addLastMonth = false;
        }
    }
    return arrDates;
};