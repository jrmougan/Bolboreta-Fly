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
/* function writeDuration(ISOformat) {
  const timeToFormat = ISOformat.split('PT')[1];
  if (timeToFormat.split('H' && 'M')) {
    const hour = timeToFormat.split('H')[0];
    const minutes = timeToFormat.split('H')[1].split('M')[0];
    const s = Number(hour) > 1 ? 's' : '';
    const sMin = Number(minutes) ? 's' : '';

    return `${hour} hora${s} y ${minutes} minuto${sMin}`;
  }
  if (!timeToFormat.split('').includes('M')) {
    const hour = timeToFormat.split('H')[0];
    const s = Number(hour) > 1 ? 's' : '';

    return `${hour}${s}`;
  }
  if (!timeToFormat.split('').includes('H')) {
    const minutes = timeToFormat.split('M')[0];
    console.log('Hola');

    const s = Number(minutes) > 1 ? 's' : '';

    return `${minutes} minuto${s}`;
  }

  return ISOformat;
} */

function finalDurationFormat(duration) {
  // Parseamos la duración en formato ISO 8601
  const totalDigits = parse(duration);

  const horas = totalDigits.hours;
  const minutos = totalDigits.minutes;

  if (totalDigits.hours === 0) {
    return `${minutos} min`;
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
  return format(date, 'HH:MM');
}

export {
  durationFormat,
  dateFormat,
  // writeDuration,
  hourFormat,
  finalDurationFormat,
};
