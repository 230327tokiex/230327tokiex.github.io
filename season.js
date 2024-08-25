// 季節イベントの定義
const seasonalEvents = [
    { start: '10-29', end: '10-31', messages: ['🎃Happy Halloween!🍭', '🎃Trick or treat!🍬', '🎃Boo! Have a spooky Halloween!👻'] },
    { start: '12-23', end: '12-25', messages: ['🎄Merry Christmas!', '🎄Happy Holidays!', '🎄Seasons Greetings!'] },
    { start: '12-31', end: '01-02', messages: ['🥂Happy New Year!', '🥂Cheers to a new beginning!', '🥂New year, new adventures!'] },
    { start: '02-13', end: '02-15', messages: ['🍫Happy Valentine\'s Day!🖤', '🍫Spread the love!🖤', '🍫Wishing you a day filled with love!🖤'] }
];

// 日付が範囲内にあるかチェックする関数
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

// 季節メッセージを更新する関数
function updateSeasonalMessage(dateString = null) {
    const seasonalMessageElement = document.getElementById('seasonal-message');
    if (!seasonalMessageElement) return;

    let currentDate;
    if (dateString) {
        const [year, month, day] = dateString.split('-');
        currentDate = `${month}-${day}`;
    } else {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        currentDate = `${month}-${day}`;
    }

    for (const event of seasonalEvents) {
        if (isDateInRange(currentDate, event.start, event.end)) {
            const message = event.messages[Math.floor(Math.random() * event.messages.length)];
            seasonalMessageElement.textContent = message;
            seasonalMessageElement.style.display = 'block';
            return;
        }
    }

    // イベントがない場合は要素を非表示にする
    seasonalMessageElement.style.display = 'none';
    seasonalMessageElement.textContent = '';
}

// テストボタンを作成する関数
function createTestButtons() {
    const testContainer = document.getElementById('test-container');
    if (!testContainer) return;

    const testDates = ['2023-10-30', '2023-12-24', '2023-12-31', '2024-02-14', '2023-07-15'];
    
    const heading = document.createElement('h3');
    heading.textContent = 'Test Date Links:';
    testContainer.appendChild(heading);

    testDates.forEach(date => {
        const button = document.createElement('button');
        button.textContent = date;
        button.onclick = () => updateSeasonalMessage(date);
        button.style.margin = '5px';
        testContainer.appendChild(button);
    });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', () => {
    updateSeasonalMessage();
    //createTestButtons();  //  テストボタンは通常非表示にする
});