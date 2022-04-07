import { format } from 'date-fns';
import { parse } from 'iso8601-duration';
/* 
###############################################################
## Función para conversión de milisegundos a duración normal ##
###############################################################
*/

function durationFormat(duration) {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor((duration / (1000 * 60 * 60 * 24)) % 365);

  if (days) {
    return `${days} día ${hours} horas ${minutes} minutos`;
  }
  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} horas`;
  } else {
    return hours + ' horas y ' + minutes + ' min ';
  }
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
  return `${horas} horas y ${minutos} min `;
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

export { durationFormat, dateFormat, hourFormat, finalDurationFormat };
