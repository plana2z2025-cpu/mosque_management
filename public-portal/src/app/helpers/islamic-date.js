// import moment from "moment";
// import "moment-hijri";
import moment from "moment-hijri";
// moment.locale("en");
// Function to get current Islamic date
export const getIslamicDate = () => {
  return moment().locale("en").format("iDD iMMMM iYYYY");
};

// Function to get Islamic date from a specific date
export const convertToIslamicDate = (date) => {
  return moment(date).format("iDD iMMMM iYYYY");
};

// Function to get Islamic date with more detailed formatting
export const getDetailedIslamicDate = () => {
  const date = moment();
  return {
    day: date.format("iDD"), // Day of month (numeric)
    month: date.format("iMMMM"), // Month name
    year: date.format("iYYYY"), // Year
    weekday: date.format("dddd"), // Day of week
    shortFormat: date.format("iD/iM/iYYYY"), // Short date format
    longFormat: date.format("iDD iMMMM iYYYY"), // Long date format
  };
};

// Example usage:
// console.log('Current Islamic date:', getIslamicDate());

// // Convert a specific date
// const specificDate = '2024-02-24';
// console.log('Converted date:', convertToIslamicDate(specificDate));

// // Get detailed Islamic date
// const detailed = getDetailedIslamicDate();
// console.log('Detailed Islamic date:', detailed);
