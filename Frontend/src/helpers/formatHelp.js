import { format } from 'date-fns';
import { parse } from 'iso8601-duration';
/* 
###############################################################
## Función para conversión de milisegundos a duración normal ##
###############################################################
*/

function durationFormat(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  if (hours === 0) {
    return `${minutes} minutos`;
  } else if (minutes === 0) {
    return `${hours} horas`;
  } else {
    return hours + ' horas y ' + minutes + ' minutos ';
  }
}

function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + ' Sec';
  else if (minutes < 60) return minutes + ' Min';
  else if (hours < 24) return hours + ' Hrs';
  else return days + ' Days';
}

function finalDurationFormat(duration) {
  // Parseamos la duración en formato ISO 8601
  const totalDigits = parse(duration);

  const horas = totalDigits.hours;
  const minutos = totalDigits.minutes;

  if (totalDigits.hours === 0) {
    return `${minutos} min`;
  }
  if (totalDigits.hours === 1) {
    return `${horas} hora ${minutos} min`;
  }
  return `${horas} horas y ${minutos} minutos `;
}

function dateFormat(date) {
  let newDate = new Date(date);

  let day = newDate.getDate();
  let weekDay = newDate.getDay();
  let month = newDate.getMonth();
  let year = newDate.getFullYear();

  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  let dia = days[weekDay],
    mes = months[month];

  return ` ${dia}, ${day} ${mes} de ${year}`;
}

function hourFormat(date) {
  return format(date, 'HH:mm');
}

export {
  durationFormat,
  dateFormat,
  // writeDuration,
  hourFormat,
  finalDurationFormat,
};
