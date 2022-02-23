/* 
###############################################################
## Función para conversión de milisegundos a duración normal ##
###############################################################
*/

import { format } from 'date-fns';

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
function writeDuration(ISOformat) {
  const timeToFormat = ISOformat.split('PT')[1];
  console.log('pasa por aqui');
  if (timeToFormat.split('H' && 'M')) {
    console.log('Pero porqúe pasa por aquí ?');
    const hour = timeToFormat.split('H')[0];
    const minutes = timeToFormat.split('H')[1].split('M')[0];
    const s = Number(hour) > 1 ? 's' : '';
    const sMin = Number(minutes) ? 's' : '';

    return `${hour} hora${s} y ${minutes} minuto${sMin}`;
  }
  if (!timeToFormat.split('').includes('M')) {
    console.log('También por aquí');
    const hour = timeToFormat.split('H')[0];
    const s = Number(hour) > 1 ? 's' : '';

    return `${hour}${s}`;
  }
  if (!timeToFormat.split('').includes('H')) {
    console.log('PEro tambiçén por aquyí');
    const minutes = timeToFormat.split('M')[0];
    console.log('Hola');

    const s = Number(minutes) > 1 ? 's' : '';

    return `${minutes} minuto${s}`;
  }

  return ISOformat;
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
  return format(date, 'hh:mm');
}

export { durationFormat, dateFormat, writeDuration, hourFormat };
