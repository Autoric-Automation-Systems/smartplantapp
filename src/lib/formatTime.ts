export function timeToDecimal(time: string | null | undefined) {
  if (!time) {
    return 0; // Retorna 0 se o valor for null ou undefined
  }
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours + minutes / 60 + (seconds || 0) / 3600;
}

export const formatDateToLocal = (
  dateStr: string | null | undefined,
  locale: string = 'pt-BR',
) => {
  if (!dateStr) {
    return '';
  }

  const date = new Date(dateStr);

  // Ajuste para garantir que a data esteja correta
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (time: string | null | undefined) => {
  if (!time) {
    return '';
  }
  // Remove the seconds part
  return time.slice(0, -3);
};

export const formatDateTimeDb = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateToTimeDb = (dateStr: string | null | undefined) => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const FullDateToDateTime = (dateStr: String | null | undefined) => {
const date = new Date();
// Output: "2026-03-17T11:51:30.000Z" (UTC time)
const isoString = date.toISOString(); 

// To get just the date part (YYYY-MM-DD):
const isoDateOnly = date.toISOString().split('T')[0]; // Output: "2026-03-17"
return isoDateOnly
}
