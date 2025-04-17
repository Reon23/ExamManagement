
export function formatDate(inputString) {
  const inputDate = new Date(inputString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(inputDate, today)) {
    return 'Today';
  } else if (isSameDay(inputDate, yesterday)) {
    return 'Yesterday';
  } else {
    const options = { day: 'numeric', month: 'short' };
    return inputDate.toLocaleDateString('en-US', options);
  }
}