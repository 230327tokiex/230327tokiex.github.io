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



