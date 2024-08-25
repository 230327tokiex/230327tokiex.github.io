// main.js
import { createEmojiIcons } from './emojiIcons.js';
import { updateDailyMessage } from './dailyMessage.js';
import { updateVisitorCount } from './visitorCounter.js';
import { toggleConfetti } from './confettiEffect.js';
import { toggleUFO, checkSeasonalEvent } from './ufoEffect.js';
import { initializeTestLinks } from './seasonalTest.js';

document.addEventListener('DOMContentLoaded', () => {
    createEmojiIcons();
    updateDailyMessage();
    updateVisitorCount();
    checkSeasonalEvent();
    initializeTestLinks();

    document.getElementById('confetti-badge').addEventListener('click', toggleConfetti);
    document.getElementById('ufo-badge').addEventListener('click', toggleUFO);

    // Start visitor counter update
    setInterval(updateVisitorCount, 10000);
});