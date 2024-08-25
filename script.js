// Emoji icons
const emojis = ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤', 
    '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'];
const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#a707f7', '#FF0000', '#00FF00'];
const emojiContainer = document.getElementById('emoji-icon');

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function createEmojiIcon() {
    const randomEmoji = getRandomItem(emojis);
    const randomColor = getRandomItem(colors);
    return `<div class="emoji-icon" style="background-color: ${randomColor}">${randomEmoji}</div>`;
}

// 3つのアイコンを生成
let emojiIcons = '';
for (let i = 0; i < 3; i++) {
    emojiIcons += createEmojiIcon();
}

emojiContainer.innerHTML = emojiIcons;

// Daily message
const luckyColors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Teal'];
const fortunes = ['Great luck!', 'Good luck!', 'Average luck', 'Bad luck... Be careful!'];
const luckyItems = ['🍀 Four-leaf clover', '🔔 Bell', '🌟 Star', '🐱 Cat', '🦋 Butterfly', '🌈 Rainbow', '🔑 Key', '🎁 Gift'];
function updateDailyMessage() {
    const today = new Date();
    const color = luckyColors[today.getDate() % luckyColors.length];
    const fortune = fortunes[today.getDate() % fortunes.length];
    const item = luckyItems[today.getDate() % luckyItems.length];
    document.getElementById('daily-message').innerHTML = `
        <strong>${today.toDateString()}</strong><br>
        Your Today's Lucky Color: ${color}<br>
        Your Fortune: ${fortune}<br>
        Your Lucky Item: ${item}
    `;
}
updateDailyMessage();

// Visitor counter
function updateVisitorCount() {
    const count = Math.floor(Math.random() * 10000) + 1;
    document.getElementById('visitorCount').textContent = count;
}
setInterval(updateVisitorCount, 10000);

// What's New section
const newsItems = [
    'Added SUPER ELIZA Chat!',
    'Updated portfolio with latest projects',
    'New retro-style background',
    'Added this What\'s New section!'
];
const newsList = document.getElementById('whats-new-list');
newsItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    newsList.appendChild(li);
});

// Diary entry
const diaryEntries = [
    'Today I learned about CSS Grid. It\'s so much easier than tables!',
    'Spent the whole day debugging a JavaScript error. It was a missing semicolon...',
    'Started working on a new web app. Can\'t wait to share it!',
    'Discovered a cool new VS Code extension. My productivity is skyrocketing!'
];
document.getElementById('diary-entry').textContent = diaryEntries[Math.floor(Math.random() * diaryEntries.length)];

// Confetti effect (simplified version)



// 紙吹雪エフェクト（四角形、色を調整）
let confettiInterval;

function toggleConfetti() {
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
        document.getElementById('confetti-badge').style.backgroundColor = '#FF00FF';
        document.getElementById('confetti-badge').style.color = '#FFFF00';
    } else {
        confettiInterval = setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createConfetti();
            }
        }, 50);
        document.getElementById('confetti-badge').style.backgroundColor = '#FFFF00';
        document.getElementById('confetti-badge').style.color = '#FF00FF';
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.width = '15px';
    confetti.style.height = '15px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-15px';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);
    
    let angle = Math.random() * 2 * Math.PI;
    let velocity = 2 + Math.random() * 2;
    let x = 0;
    let y = 0;
    let rotation = 0;
    
    function frame() {
        if (y > window.innerHeight) {
            document.body.removeChild(confetti);
        } else {
            y += velocity * Math.sin(angle);
            x += velocity * Math.cos(angle) * 0.5;
            rotation += 5;
            confetti.style.top = y + 'px';
            confetti.style.left = `calc(${confetti.style.left} + ${x}px)`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

// UFOエフェクト（サイズ大きく、動きをランダムに）
let ufoInterval;

function createUFO() {
    const ufo = document.createElement('div');
    ufo.textContent = '🛸';
    ufo.style.position = 'fixed';
    ufo.style.fontSize = '120px';
    ufo.style.left = '-150px';
    ufo.style.top = Math.random() * (window.innerHeight - 150) + 'px';
    ufo.style.pointerEvents = 'none';
    document.body.appendChild(ufo);

    let position = -150;
    const speed = 8 + Math.random() * 5; // 速度を大幅に上げる
    const waveAmplitude = 10 + Math.random() * 20;
    const waveFrequency = 0.05 + Math.random() * 0.05; // 波の頻度も上げる
    const initialY = parseInt(ufo.style.top);

    function animate() {
        if (position > window.innerWidth) {
            document.body.removeChild(ufo);
        } else {
            position += speed;
            const waveY = Math.sin(position * waveFrequency) * waveAmplitude;
            ufo.style.left = position + 'px';
            ufo.style.top = (initialY + waveY) + 'px';
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function toggleUFO() {
    if (ufoInterval) {
        clearInterval(ufoInterval);
        ufoInterval = null;
        document.getElementById('ufo-badge').style.backgroundColor = '#00FFFF';
        document.getElementById('ufo-badge').style.color = '#FF00FF';
    } else {
        ufoInterval = setInterval(() => {
            createUFO();
        }, 3000); // UFOの出現頻度も上げる（3秒ごと）
        document.getElementById('ufo-badge').style.backgroundColor = '#FFFF00';
        document.getElementById('ufo-badge').style.color = '#FF00FF';
    }
}


// イベントリスナーの設定
document.getElementById('confetti-badge').addEventListener('click', toggleConfetti);
document.getElementById('ufo-badge').addEventListener('click', toggleUFO);


// 既存のコードはそのままで、以下を追加

// 季節イベントメッセージとUFO
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

// UFO関数の修正
function createUFO() {
    const ufo = document.createElement('div');
    const seasonalEmoji = checkSeasonalEvent();
    ufo.textContent = seasonalEmoji;
    // 残りのコードは変更なし
}

// テスト用の日付変更関数
function changeDate(dateString) {
    const [year, month, day] = dateString.split('-');
    const newDate = new Date(year, month - 1, day);
    Date.prototype.getReal = Date.prototype.getDate;
    Date.prototype.getDate = function() { return newDate.getReal(); };
    Date.prototype.getMonth = function() { return newDate.getMonth(); };
    Date.prototype.getFullYear = function() { return newDate.getFullYear(); };
    
    checkSeasonalEvent();
    if (ufoInterval) {
        clearInterval(ufoInterval);
        ufoInterval = null;
    }
    createUFO();
}

// ページ読み込み時に実行
window.addEventListener('load', () => {
    checkSeasonalEvent();
    
    // テストリンクの追加
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
});