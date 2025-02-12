export const dateFormat = (date: Date | undefined) => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // 오전/오후 구분 및 12시간제 변환
  const period = hours < 12 ? '오전' : '오후';
  const hour12 = hours % 12 || 12;

  const space = '\u00A0'.repeat(2); // 공백 10칸
  return `${year}. ${month}. ${day}${space}${period} ${hour12}:${minutes}`;
};
