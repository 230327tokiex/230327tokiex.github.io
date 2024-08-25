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


