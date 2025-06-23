// Helper function to format dates
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString();
};

export const getYear = (date: Date): number => {
  return new Date(date).getFullYear();
};

export function formatDateRange(startDate: Date | string, endDate?: Date | string | null): string {
  // Helper to create a date object and check for validity
  const createDate = (dateInput: Date | string): Date | null => {
    const date = new Date(dateInput);
    // Check if the date is valid
    return isNaN(date.getTime()) ? null : date;
  };

  const start = createDate(startDate);
  const end = endDate ? createDate(endDate) : null;

  // Return an empty string or placeholder if the start date is invalid
  if (!start) {
    console.error("Invalid start date provided:", startDate);
    return "Invalid Date";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  // Format the start date
  const formattedStartDate = new Intl.DateTimeFormat("en-US", options).format(start);

  // Case 1: End date is not provided or is invalid, so the role is current.
  if (!end) {
    return `${formattedStartDate} - Present`;
  }

  // Case 2: Start and end dates are in the same month and year.
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return formattedStartDate;
  }

  // Case 3: A valid end date exists.
  const formattedEndDate = new Intl.DateTimeFormat("en-US", options).format(end);
  return `${formattedStartDate} - ${formattedEndDate}`;
}
