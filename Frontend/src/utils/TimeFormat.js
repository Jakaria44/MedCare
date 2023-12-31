const TimeFormat = (dateIn) => {
  const date = new Date(dateIn);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  
  hour = hour % 12 || 12; // Convert to 12-hour format
  hour = hour.toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hour}:${minute} ${amPm}`;
};
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export function TimeFormat2(dateIn) {
  const date = new Date(dateIn);
  const day = date.getDate().toString().padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

export default TimeFormat

/**
 * 
 * @param {'13:00:00'} dateIn 
 * @returns 1:00 PM
 */
export function TimeFormat3(dateIn) {
  const [hour, min, sec] = dateIn.split(':');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  
  return `${hour % 12 || 12}:${min} ${amPm}`;
}

/**
 * 
 * @param {"2023-09-29T14:00:00"} dateIn 
 * @returns 2:00 PM
 */
export function TimeFormat4(dateIn) {
  const date = new Date(dateIn);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour clock format
  };
  
  return date.toLocaleTimeString('en-US', options);
  
}
