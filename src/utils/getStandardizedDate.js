const getStandardizedDate = (dateString = new Date()) => {
  const dateObject = new Date(dateString);
  // Set the time part to midnight
  dateObject.setHours(0, 0, 0, 0);

  return dateObject.toISOString().split('T')[0];
};

export default getStandardizedDate;
