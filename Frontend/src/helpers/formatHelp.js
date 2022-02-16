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

export { durationFormat, dateFormat };
