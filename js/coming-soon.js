const emojis = ['⛏️', '🚧', '🏗️', '🔨', '🔧', '🔩', '🪛', '🪚', '🧱', '🏭', '🚜', '🦺'];

function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function updateEmoji() {
    const emojiElement = document.getElementById('random-emoji');
    emojiElement.textContent = getRandomEmoji();
}

// 初期化時に絵文字を設定
document.addEventListener('DOMContentLoaded', () => {
    updateEmoji();
    // 3秒ごとに絵文字を更新
    setInterval(updateEmoji, 3000);
});