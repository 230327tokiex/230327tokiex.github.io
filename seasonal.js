// Seasonal events
const seasonalEvents = [
    { start: '10-29', end: '10-31', message: ['Happy Halloween!', 'Trick or treat!', 'Boo! Have a spooky Halloween!'], emoji: '🎃' },
    { start: '12-23', end: '12-25', message: ['Merry Christmas!', 'Happy Holidays!', 'Seasons Greetings!'], emoji: '🎅' },
    { start: '12-31', end: '01-02', message: ['Happy New Year!', 'Cheers to a new beginning!', 'New year, new adventures!'], emoji: '🥂' },
    { start: '02-13', end: '02-15', message: ['Happy Valentine\'s Day!', 'Spread the love!', 'Wishing you a day filled with love!'], emoji: '🍫' }
];

function checkSeasonalEvent() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${month}-${day}`;

    for (const event of seasonalEvents) {
        if (isDateInRange(currentDate, event.start, event.end)) {
            const message = event.message[Math.floor(Math.random() * event.message.length)];
            document.getElementById('seasonal-message').textContent = message;
            return event.emoji;
        }
    }
    return '🛸'; // デフォルトのUFO
}

function isDateInRange(date, start, end) {
    const [startMonth, startDay] = start.split('-').map(Number);
    const [endMonth, endDay] = end.split('-').map(Number);
    const [month, day] = date.split('-').map(Number);

    if (startMonth <= endMonth) {
        return (month > startMonth || (month === startMonth && day >= startDay)) &&
               (month < endMonth || (month === endMonth && day <= endDay));
    } else {
        return (month > startMonth || (month === startMonth && day >= startDay)) ||
               (month < endMonth || (month === endMonth && day <= endDay));
    }
}

// Initialize seasonal message
checkSeasonalEvent();

// Test date links
function changeDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const newDate = new Date(year, month - 1, day);
    Date.prototype.getReal = Date.prototype.getDate;
    Date.prototype.getDate = function() { return newDate.getReal(); };
    Date.prototype.getMonth = function() { return newDate.getMonth(); };
    Date.prototype.getFullYear = function() { return newDate.getFullYear(); };
    
    checkSeasonalEvent();
}

// Add test links
const testDates = ['2023-10-30', '2023-12-24', '2023-12-31', '2024-02-14'];
const testContainer = document.createElement('div');
testContainer.id = 'test-container';
testContainer.innerHTML = '<h3>Test Date Links:</h3>';
testDates.forEach(date => {
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'test-link';
    link.textContent = date;
    link.onclick = (e) => {
        e.preventDefault();
        changeDate(date);
    };
    testContainer.appendChild(link);
});
document.body.appendChild(testContainer);