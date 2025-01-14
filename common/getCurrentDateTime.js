const options = {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

function getCurrentFormattedDate() {
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(new Date());

  const day = parts.find(p => p.type === 'day').value;
  const month = parts.find(p => p.type === 'month').value;
  const year = parts.find(p => p.type === 'year').value;
  let hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const second = parts.find(p => p.type === 'second').value;

  // Correcting the hour if it is 24 to be 00
  hour = hour === '24' ? '00' : hour.padStart(2, '0');

  return `${day}th ${month}, ${year} at ${hour}:${minute}:${second} IST`;
}

module.exports = getCurrentFormattedDate;