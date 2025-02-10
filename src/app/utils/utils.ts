// Helper function to format dates
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString();
};

export const getYear = (date: Date): number => {
  return new Date(date).getFullYear();
};
