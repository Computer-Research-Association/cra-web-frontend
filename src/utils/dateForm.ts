export const dateFormat = (date: Date | string | undefined) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return '';

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  // TODO: 현재 나라 시간 가져와서 시간 설정하기 (지금은 한국시간 기준으로 억지로 맞춰놈)
  const hours = dateObj.getHours() + 9;
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  const period = hours < 12 ? '오전' : '오후';
  const hour12 = hours % 12 || 12;

  const space = '\u00A0'.repeat(2);
  return `${year}. ${month}. ${day}${space}${period} ${hour12}:${minutes}`;
};
