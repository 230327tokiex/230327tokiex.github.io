const luckyColors = [
    'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Teal',
    'Gold', 'Silver', 'White', 'Black', 'Brown', 'Lavender', 'Turquoise',
    'Crimson', 'Indigo', 'Maroon', 'Navy', 'Olive'
];

const fortunes = ['S - Super Lucky!', 'A - Very Lucky!', 'B - Lucky!', 'C - Average Luck', 'D - Not So Lucky... Be Careful!'];

const luckyItems = [
    '🍀 Four-leaf clover', '🔔 Bell', '🌟 Star', '🐱 Cat', '🦋 Butterfly', 
    '🌈 Rainbow', '🔑 Key', '🎁 Gift', '🐘 Elephant', '🦉 Owl', 
    '🍎 Apple', '🌺 Flower', '📚 Book', '🎨 Palette', '🎵 Musical Note',
    '⚓ Anchor', '🔮 Crystal Ball', '🧲 Magnet', '🕯️ Candle', '🧭 Compass',
    '🦄 Unicorn', '🍯 Honey Pot', '🎭 Theater Masks', '🧿 Evil Eye Amulet', '🗝️ Antique Key'
];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateDailyMessage() {
    const today = new Date();
    const color = getRandomItem(luckyColors);
    const fortune = getRandomItem(fortunes);
    const item = getRandomItem(luckyItems);
    
    const dailyMessageElement = document.getElementById('daily-message');
    if (dailyMessageElement) {
        dailyMessageElement.innerHTML = `
            <strong>${today.toDateString()}</strong><br>
            Your Today's Lucky Color: ${color}<br>
            Your Fortune: ${fortune}<br>
            Your Lucky Item: ${item}
        `;
    } else {
        console.error('Element with id "daily-message" not found');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDailyMessage();
});