export const days = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];

export const generateDaysMonths = (actualYear) => {
    const daysMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (actualYear % 4 === 0 || actualYear % 400 === 0) {
      daysMonths[1] = 29;
    }
  
    return daysMonths;
};

export const generateDaysWeek = (dayActual, monthActual, yearActual, dayStr, index) => {
    const arrDays = Array(7);
    const indexDay = days.indexOf(dayStr);
    const daysMonthActual = generateDaysMonths(yearActual)[monthActual - 1];
    const daysPrevMonth = monthActual !== 1 ? generateDaysMonths(yearActual)[monthActual - 2] : generateDaysMonths(yearActual - 1)[11];
  
    for (let index = 0; index < arrDays.length; index++) {
      let dayTogenerate;
      let monthActualDay = monthActual;
      let yearActualDay = yearActual;
  
      if (index > indexDay) {
        dayTogenerate = dayActual + (index - indexDay);
        if (dayTogenerate > daysMonthActual) {
          dayTogenerate -= daysMonthActual;
          monthActualDay++;
          if (monthActualDay > 12) {
            monthActualDay = 1;
            yearActualDay++;
          }
        }
      } else {
        dayTogenerate = dayActual - (indexDay - index);
        if (dayTogenerate <= 0) {
          dayTogenerate = daysPrevMonth + dayTogenerate;
          monthActualDay--;
          if (monthActualDay === 0) {
            monthActualDay = 12;
            yearActualDay--;
          }
        }
      }
  
      arrDays[index] = {
        day: dayTogenerate,
        month: monthActualDay,
        year: yearActualDay,
        dayStr: days[index],
        state: false,
      };
    }
  
    arrDays[indexDay] = {
      day: dayActual,
      month: monthActual,
      year: yearActual,
      dayStr: dayStr,
      state: (index === 0),
    };
  
    return arrDays;
  };

  export const getComponentsFullDate = (date) => {
    const year = Number(date.substring(0, 4));
    const month = Number(date.substring(5, 7));
    const day = Number(date.substring(8, 10));
    const hour = Number(date.substring(11, 13));
    const minutes = Number(date.substring(14, 17));
    const amPm = hour > 12 ? "pm" : "am";
    const components = { year, month, day, hour, minutes, amPm };
  
    return components;
  };

  export const getElementsTask = (dateStart, dateEnd, day) => {
    const cmpDateStart = getComponentsFullDate(dateStart);
    const cmpDateEnd = getComponentsFullDate(dateEnd);
    const sameFinishDay = cmpDateStart.day === cmpDateEnd.day;
    const sameRangeDays = day > cmpDateStart.day && day < cmpDateEnd.day;
    const hourStProv = cmpDateStart.hour + cmpDateStart.minutes / 60;
    const hourStart = sameFinishDay
      ? hourStProv
      : day > cmpDateStart.day
      ? 0
      : hourStProv;
    const defHourSt = sameRangeDays ? 0 : hourStart;
    const hourEndProv = cmpDateEnd.hour + cmpDateEnd.minutes / 60;
    const hourEnd = sameFinishDay
      ? hourEndProv
      : day < cmpDateEnd.day
      ? 24
      : hourEndProv;
    const defHourEnd = sameRangeDays ? 24 : hourEnd;
    const formatHourStart =
      cmpDateStart.hour > 12 ? cmpDateStart.hour - 12 : cmpDateStart.hour;
    const formatHourEnd =
      cmpDateEnd.hour > 12 ? cmpDateEnd.hour - 12 : cmpDateEnd.hour;
    const addZero = (time) => (time < 10 ? `0${time}` : time.toString());
    const strIntervalHour = `${formatHourStart}:${
      addZero(cmpDateStart.minutes) + cmpDateStart.amPm
    }-${formatHourEnd}:${addZero(cmpDateEnd.minutes) + cmpDateEnd.amPm}`;
    return { hourStart, defHourSt, defHourEnd, strIntervalHour };
  };



  export const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  export const arrSimpleDaysWeek = (day, dayFinal) => {
    const arrayDays = [];
  
    if (day < dayFinal) {
      // Llenar arrayDays con los días entre day y dayFinal
      for (let i = day; i <= dayFinal; i++) {
        arrayDays.push(i);
      }
    } else {
      // Llenar arrayDays con días desde 'day' hasta el final del mes y desde el inicio del próximo mes hasta 'dayFinal'
      const daysMonth = day + (7 - dayFinal);
      for (let i = day; i < daysMonth; i++) { // Suponiendo 31 días como límite máximo
        arrayDays.push(i);
      }
      for (let i = 1; i <= dayFinal; i++) {
        arrayDays.push(i);
      }
    }
    return arrayDays;
  }
  
  export const filterTaskByWeek = (day, month, year, dayFinal, monthFinal, yearFinal, tasks, arrDays) => {
  
    const tasksWeek = tasks.filter((task) => {
      const dateStart = getComponentsFullDate(task.dateStart);
      const conditionYear = (dateStart.year === year) || (dateStart.year === yearFinal);
      const conditionMonth = (dateStart.month === month) || (dateStart.month === monthFinal);
      //Las dos siguientes condiciones validan que la tarea este dentro de los rangos de fecha de la semana
      //si el dia es mayor a 24 se supone que la fecha de inicio de la tarea debe ser igual al mes inicial del rango de fecha de la semana actual
      const subDay = (dateStart.day >= 24) ? (dateStart.month === month) : true;
      //si el dia es menor a 7 se supone que todo el rango de fecha de la semana debe tener el mismo mes de inicio y mismo mes final
      //por lo que usamos esto para validar que la el mes de inicio de la tarea sea igual al mes final del rango de fecha de la semana actual
      const newCondition = (dateStart.day <=7) ? (dateStart.month === monthFinal) : true;
      const conditionDay = arrDays.includes(dateStart.day) && !(dateStart.day <= 7 && dateStart.month < monthFinal) && subDay && newCondition;
      return conditionDay && conditionYear && conditionMonth;
      
    });
  
    return tasksWeek;
  };