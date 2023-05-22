function convertDateFormat(dateString: string): string {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (dateRegex.test(dateString)) {
    const [day, month, year] = dateString.split('/');
    return `${month}/${day}/${year}`;
  }
  return dateString;
}

export const toISOString = (date: string) => {
  const newDate = convertDateFormat(date);
  return new Date(newDate).toISOString();
};

export const splitISOToUsualDate = (date: string) => date.split('T')[0];

export function isValidDate(dateString: any): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateString);
}
