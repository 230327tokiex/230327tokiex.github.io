// DOM要素の取得
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const rabbitContainer = document.getElementById('rabbit-container');
const thoughtContent = document.getElementById('thought-content');
const toggleLearningBtn = document.getElementById('toggle-learning');
const parameterInputs = document.querySelectorAll('input[type="range"], input[type="number"], select');
const gameContainer = document.querySelector('.game-container');

let isLearning = false;
let learningInterval;
let learningData = [];
let isFlickering = true;

// パラメータ値の表示を更新する関数
function updateParameterValue(input) {
    const valueSpan = document.getElementById(`${input.id}-value`);
    if (valueSpan) {
        valueSpan.textContent = input.value;
    }
}

// パラメータ入力のイベントリスナー設定
parameterInputs.forEach(input => {
    input.addEventListener('input', () => updateParameterValue(input));
});

const elizaEmojis = [
    '😊', '😄', '🙂', '😉', '😎', '😌', '😪', '🙂‍↔️', '🤔', '🫡',
    '🤗', '😋', '🥰', '😇', '🫠', '😟', '😢', '🥺'
];


//背景画像

const backgroundImages = [
    'img/gamebg1.png',
    'img/gamebg2.png',
    'img/gamebg3.png',
    'img/gamebg4.png',
    'img/gamebg5.png',
    'img/gamebg6.png',
    'img/gamebg7.png',
    'img/gamebg8.png',
    'img/gamebg9.png',
    'img/gamebg10.png',

];

function changeBackgroundImage() {
    const gameArea = document.querySelector('.game-area');
    const overlay = document.getElementById('background-overlay');
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    
    // オーバーレイを表示
    overlay.style.opacity = '1';
    
    // 0.5秒後に背景画像を変更
    setTimeout(() => {
        gameArea.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
        
        // 背景画像変更後、オーバーレイを非表示
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 500);
    }, 500);
}

// 初期背景をランダムに設定
//changeBackgroundImage();

// 30秒ごとに背景画像をランダムに変更
setInterval(changeBackgroundImage, 30000);



//うさぎ画像


const rabbitEmojis = [
    'img/usagi1.png', 'img/usagi2.png', 'img/usagi3.png', 'img/usagi4.png', 
    'img/usagi5.png', 'img/usagi6.png', 'img/usagi7.png', 'img/usagi8.png', 
    'img/usagi11.png', 'img/usagi12.png', 'img/usagi14.png', 'img/usagi15.png', 
    'img/usagi16.png', 'img/usagi17.png', 'img/usagi18.png'
];


// うさぎ画像をランダムに変更する関数
function changeRabbitEmoji() {
    const randomEmoji = rabbitEmojis[Math.floor(Math.random() * rabbitEmojis.length)];
    rabbitContainer.innerHTML = `<img src="${randomEmoji}" alt="🐰"  width="70%" height="70%">`;
}

// うさぎを初期位置に配置する関数
function moveRabbitToInitialPosition() {
    const rabbitContainer = document.getElementById('rabbit-container');
    rabbitContainer.style.transform = 'translate(50px, 100px)';
}

// ランダムな位置にうさぎを移動させる関数
function moveRabbit() {
    const gameArea = document.querySelector('.game-area');
    const rabbitContainer = document.getElementById('rabbit-container');
    
    // ゲームエリアの範囲
    const maxX = gameArea.clientWidth * 0.95; // 
    const maxY = gameArea.clientHeight * 0.70; // 
    const x = Math.random() * maxX - maxX * 0.01; // -1%から101%の範囲
    const y = Math.random() * maxY - maxY * 0.01; // -1%から101%の範囲

    // うさぎの位置を更新
    rabbitContainer.style.transform = `translate(${x}px, ${y}px)`;
}




// SuperELIZAの思考を生成する関数
function generateThought(params) {
    const thoughts = [
        `学習率${params.learningRate}で頑張ってます！`,
        `探索率${params.epsilon}、ちょっと冒険しすぎかな？`,
        `割引率${params.discountRate}、未来のことも考えないとね。`,
        `${params.episodeCount}エピソード、長い道のりだ...`,
        `${params.algorithm}アルゴリズム、私の得意技です！`,
        'うーん、この状況は難しいな...',
        'やった！いい報酬が得られたよ！',
        'エラー率が高すぎるかも。調整が必要だな。',
        '学習曲線が安定してきた。良い兆候だ！',
        'この問題、人間より上手く解けるかも？',
        'データの分布が予想と違う。面白い！',
        'パラメータ空間を探索中。何か面白いものが見つかるかな。',
        '最適化アルゴリズムが収束しない。むむむ...',
        'バッチサイズを大きくしたら学習が速くなった！',
        '過学習の兆候が。正則化を強めるべきかな？',
        'ハイパーパラメータの調整、まるで魔法みたいだ。',
        '勾配爆発だ！もしかして私の感情が爆発しちゃったのかな？',
    ];
    const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
    const randomElizaEmoji = elizaEmojis[Math.floor(Math.random() * elizaEmojis.length)];
    return { thought: randomThought, emoji: randomElizaEmoji };
}



// TIPSの配列
const tips = [
    "強化学習では、試行錯誤が成功の鍵です。失敗を恐れずに、挑戦を続けましょう。",
    "報酬を受け取るたびに、AIはその行動を強化します。うまくいった行動を繰り返すことで、AIは賢くなります。",
    "学習率が高すぎると、AIはすぐに結論に飛びついてしまうことがあります。適切なバランスが重要です。",
    "エピソード数が多いほど、AIは豊富な経験を積み、より正確な意思決定が可能になります。",
    "Q学習では、状態と行動のペアに対して価値を割り当てます。最高の価値を見つけることが目標です。",
    "探索と利用のバランスを取ることが、最適な学習結果を得るためのポイントです。",
    "環境からのフィードバックが、AIの学習を支えます。適切な報酬設計が成功のカギとなります。",
    "ディスカウントファクターは、未来の報酬の重要度を決定します。長期的な視点を持たせるために使用します。",
    "強化学習は、どんな行動が最も効果的かを試行錯誤しながら見つけていく学習方法です。",
    "ペナルティ（負の報酬）は、望ましくない行動を減らすために使われます。適切な使い方が重要です。",
    "バッチ学習は、複数のエピソードを一度に処理して学習します。これにより、計算効率が向上します。",
    "AIは、ゴールを達成するためにどの行動が最適かを学びます。これが強化学習の基本的な考え方です。",
    "エージェントが新しい環境に適応するには、初期の探索が重要です。探索を怠らないようにしましょう。",
    "AIがすべての行動を試すまでに時間がかかります。初期の探索フェーズでは、広く浅く試すのがコツです。",
    "リワード関数は、AIの行動を導くコンパスです。適切に設計することで、望ましい結果を導けます。",
    "試行錯誤は進化の証。AIはその過程で成長し、最適な戦略を見つけていきます。",
    "探索の幅を広げると、新しい解決策を発見できるかもしれません。常に新しい可能性を模索しましょう。",
    "学習のスピードは、環境と報酬設定によって大きく影響を受けます。慎重に設定しましょう。",
    "強化学習では、適切なタイミングでのフィードバックが成功のカギです。遅すぎず早すぎずがポイントです。",
    "AIは過去の経験を活かして未来を予測します。過去のデータは、未来の行動を導く重要な資産です。",


    // 用語集に関するTips
    "Q値とは、ある状態で特定の行動をとったときに得られる総報酬の予測値です。",
    "ポリシーは、エージェントがどの行動をとるかを決定するルールや戦略です。",
    "リワードとは、エージェントが行動の結果として得られるフィードバックです。",
    "ディスカウントファクターは、将来の報酬の価値を現在の報酬と比較するための係数です。",
    "エクスプロイトは、既に学習した知識を活用して、報酬を最大化する行動を選ぶことです。",
    "エクスプロアは、新しい知識を得るために、まだ試していない行動を選ぶことです。",
    "エージェントとは、強化学習で学習を行う主体のことです。環境と相互作用します。",
    "ステートとは、エージェントが置かれている状況や条件を指します。",
    "環境は、エージェントが行動を取り、報酬を受け取る場です。エージェントと相互作用します。",
    "バッチ学習とは、データを一括して学習する方法で、複数のエピソードをまとめて処理します。",
    
    // 歴史に関するTips
    "Q学習アルゴリズムは、1989年にクリス・ワトキンスによって提案されました。",
    "強化学習の基礎は、20世紀初頭の心理学者エドワード・ソーンダイクの試行錯誤学習にまで遡ります。",
    "ディープ強化学習は、2015年にGoogle DeepMindによってブレイクスルーを達成し、一気に注目を集めました。",
    "モンテカルロ法は、強化学習の歴史の中で重要な位置を占める手法で、報酬の期待値を推定します。",
    "SARSAは、「State-Action-Reward-State-Action」の略で、Q学習の一種です。",
    "TD学習（Temporal Difference Learning）は、1980年代にリチャード・サットンによって開発されました。",
    "ポリシー勾配法は、強化学習で直接ポリシーを最適化する手法です。1980年代から研究が進められています。",
    "アンドリュー・バルトとリチャード・サットンは、強化学習の分野で多くの基礎研究を行い、著書も多数出版しています。",

    // パラメーター設定のコツに関するTips
    "学習率を高く設定すると、エージェントは新しい経験に素早く適応しますが、最適解から外れるリスクも高まります。",
    "学習率を低く設定すると、安定した学習ができますが、適応に時間がかかる場合があります。",
    "ディスカウントファクターを高く設定すると、長期的な報酬を重視するようになります。",
    "ディスカウントファクターを低く設定すると、短期的な報酬に重点を置くようになります。",
    "エピソード数を増やすと、エージェントはより多くの経験を積むことができ、より洗練された行動が期待できます。",
    "エクスプロイト率を上げると、既に学んだ知識を活かして、安定した結果を狙いやすくなります。",
    "エクスプロア率を上げると、新しい戦略や行動を探索する機会が増え、未知の最適解を見つけやすくなります。",
    "リワードの設定を工夫することで、エージェントの行動を目的に合わせて誘導できます。",
    "バッチサイズを大きくすると、エージェントはまとめて多くの情報を処理できますが、計算コストが増加します。",
    "ポリシーの更新頻度を高くすると、エージェントは頻繁に新しい行動戦略を試すことができますが、安定性が低下する可能性があります。",
];


// ランダムなTIPSを表示する関数
function displayRandomTip() {
    const tipsElement = document.getElementById('tips');
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipsElement.textContent = "TIPS: " + tips[randomIndex];
}

// 定期的にTIPSを更新（オプション）
setInterval(displayRandomTip, 15000); // 15秒ごとに更新


// ちらつき効果の制御
function toggleFlicker() {
    isFlickering = !isFlickering;
    gameContainer.classList.toggle('flicker-effect', isFlickering);
}

// 学習のシミュレーション
function simulateLearning(params) {
    moveRabbit();
    changeRabbitEmoji();
    const { thought, emoji } = generateThought(params);
    thoughtContent.innerHTML += `<p>${emoji} ${thought}</p>`;
    thoughtContent.scrollTop = thoughtContent.scrollHeight;

    // 学習データの記録
    const reward = Math.random() * (1 - params.epsilon) + params.epsilon * Math.random();
    const error = Math.abs(1 - reward) * params.learningRate;
    learningData.push({
        episode: learningData.length + 1,
        reward: reward * 100, // 0-100のスケールに変換
        error: error * 10 // 0-10のスケールに変換
    });
}

// 学習の開始/停止を切り替える関数
function toggleLearning() {
    isLearning = !isLearning;
    if (isLearning) {
        toggleLearningBtn.textContent = 'STOP';
        learningData = []; // 学習データをリセット
        const params = {
            learningRate: parseFloat(document.getElementById('learning-rate').value),
            epsilon: parseFloat(document.getElementById('epsilon').value),
            discountRate: parseFloat(document.getElementById('discount-rate').value),
            episodeCount: parseInt(document.getElementById('episode-count').value),
            algorithm: document.getElementById('algorithm').value
        };
        learningInterval = setInterval(() => {
            simulateLearning(params);
            if (learningData.length >= params.episodeCount) {
                toggleLearning(); // 学習を停止
                showResults(learningData); // results.jsの関数を呼び出し
            }
        }, 3000);//思考の表示時間
    } else {
        toggleLearningBtn.textContent = 'START';
        clearInterval(learningInterval);
        showResults(learningData);
    }
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startGameBtn = document.getElementById('start-game');
    const toggleLearningBtn = document.getElementById('toggle-learning');
    const restartGameBtn = document.getElementById('restart-game');

    startGameBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initializeGame();
    });

    toggleLearningBtn.addEventListener('click', toggleLearning);

    restartGameBtn.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        resetGame();
    });

    // その他の初期化処理
    initializeParameters();
    changeBackgroundImage(); // 初期背景設定
});

function initializeGame() {
    // ゲーム開始時の初期化処理
    
    moveRabbitToInitialPosition(); // 初期位置に配置
    //moveRabbit();
    changeRabbitEmoji();
    displayRandomTip(); // TIPSを表示
    thoughtContent.innerHTML = '';
    learningData = [];
}

function resetGame() {
    // ゲームリセット時の処理
    isLearning = false;
    toggleLearningBtn.textContent = '学習開始';
    clearInterval(learningInterval);
    initializeGame();
}

// 他の関数は変更なし

//test
