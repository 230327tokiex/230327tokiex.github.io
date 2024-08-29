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
let rabbitInterval;
let backgroundInterval;
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
    'img/gamebg11.png',
    'img/gamebg12.png',
    'img/gamebg13.png',
    'img/gamebg14.png',
    'img/gamebg15.png',
    'img/gamebg16.png',
    'img/gamebg17.png',
    'img/gamebg18.png',
    'img/gamebg19.png',
    'img/gamebg21.png',
    'img/gamebg22.png',
    'img/gamebg23.png',
    'img/gamebg24.png',
    'img/gamebg25.png',
    'img/gamebg26.png',
    'img/gamebg27.png',
    'img/gamebg28.png',
    'img/gamebg29.png',
    'img/gamebg30.png',
    'img/gamebg31.png',
    'img/gamebg32.png',

];

function setInitialBackground() {
    const gameArea = document.querySelector('.game-area');
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    gameArea.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
}

function changeBackgroundImage() {
    const gameArea = document.querySelector('.game-area');
    const overlay = document.getElementById('background-overlay');
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);

    overlay.style.opacity = '1';

    setTimeout(() => {
        gameArea.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;

        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 500);
    }, 500);
}

// 初期背景をランダムに設定
//changeBackgroundImage();


//うさぎ画像


const rabbitEmojis = [
    'img/usagi1.png', 'img/usagi2.png', 'img/usagi3.png', 'img/usagi4.png',
    'img/usagi5.png', 'img/usagi6.png', 'img/usagi7.png', 'img/usagi8.png',
    'img/usagi11.png', 'img/usagi12.png', 'img/usagi14.png', 'img/usagi15.png',
    'img/usagi16.png', 'img/usagi17.png', 'img/usagi18.png',
];


// うさぎ画像をランダムに変更し、初期位置に配置する関数
function initializeRabbit() {
    const rabbitContainer = document.getElementById('rabbit-container');
    changeRabbitEmoji();
    moveRabbitToInitialPosition();
}

// うさぎ画像をランダムに変更する関数
function changeRabbitEmoji() {
    const randomEmoji = rabbitEmojis[Math.floor(Math.random() * rabbitEmojis.length)];
    rabbitContainer.innerHTML = `<img src="${randomEmoji}" alt="🐰" width="70%" height="70%">`;
}

// うさぎを初期位置に配置する関数
function moveRabbitToInitialPosition() {
    const rabbitContainer = document.getElementById('rabbit-container');
    rabbitContainer.style.transform = 'translate(150px, 100px)';
}

// ランダムな位置にうさぎを移動させる関数
function moveRabbit() {
    const gameArea = document.querySelector('.game-area');
    const rabbitContainer = document.getElementById('rabbit-container');

    // ゲームエリアの範囲
    const maxX = gameArea.clientWidth * 0.95;
    const maxY = gameArea.clientHeight * 0.80;
    const x = Math.random() * maxX - maxX * 0.01; // -1%から101%の範囲
    const y = Math.random() * maxY - maxY * 0.01; // -1%から101%の範囲

    // うさぎの位置を更新
    rabbitContainer.style.transform = `translate(${x}px, ${y}px)`;
}

// うさぎの動きを制御する新しい関数
function updateRabbit() {
    moveRabbit();
    changeRabbitEmoji();
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
    "強化学習（Reinforcement Learning）では、試行錯誤が成功の鍵です。失敗を恐れずに、挑戦を続けましょう。",
    "報酬（Reward）を受け取るたびに、人工知能（AI）はその行動を強化します。うまくいった行動を繰り返すことで、AIは賢くなります。",
    "学習率（Learning Rate）が高すぎると、AIはすぐに結論に飛びついてしまうことがあります。適切なバランスが重要です。",
    "エピソード（Episode）数が多いほど、AIは豊富な経験を積み、より正確な意思決定が可能になります。",
    "Q学習（Q-Learning）では、状態（State）と行動（Action）のペアに対して価値を割り当てます。最高の価値を見つけることが目標です。",
    "探索（Exploration）と利用（Exploitation）のバランスを取ることが、最適な学習結果を得るためのポイントです。",
    "環境（Environment）からのフィードバックが、AIの学習を支えます。適切な報酬設計が成功のカギとなります。",
    "割引率（Discount Factor）は、未来の報酬の重要度を決定します。長期的な視点を持たせるために使用します。",
    "強化学習は、どんな行動が最も効果的かを試行錯誤しながら見つけていく学習方法です。",
    "罰（Penalty）、つまり負の報酬は、望ましくない行動を減らすために使われます。適切な使い方が重要です。",
    "バッチ学習（Batch Learning）は、複数のエピソードを一度に処理して学習します。これにより、計算効率が向上します。",
    "AIは、目標（Goal）を達成するためにどの行動が最適かを学びます。これが強化学習の基本的な考え方です。",
    "エージェント（Agent）が新しい環境に適応するには、初期の探索が重要です。探索を怠らないようにしましょう。",
    "AIがすべての行動を試すまでに時間がかかります。初期の探索フェーズでは、広く浅く試すのがコツです。",
    "報酬関数（Reward Function）は、AIの行動を導くコンパスです。適切に設計することで、望ましい結果を導けます。",
    "試行錯誤は進化の証です。AIはその過程で成長し、最適な戦略を見つけていきます。",
    "探索の幅を広げると、新しい解決策を発見できるかもしれません。常に新しい可能性を模索しましょう。",
    "学習のスピードは、環境と報酬設定によって大きく影響を受けます。慎重に設定しましょう。",
    "強化学習では、適切なタイミングでのフィードバックが成功のカギです。遅すぎず早すぎずがポイントです。",
    "AIは過去の経験を活かして未来を予測します。過去のデータは、未来の行動を導く重要な資産です。",

    // 用語集に関するTips
    "Q値（Q-value）とは、ある状態で特定の行動をとったときに得られる総報酬の予測値です。",
    "方策（Policy）は、エージェントがどの行動をとるかを決定するルールや戦略です。",
    "報酬（Reward）とは、エージェントが行動の結果として得られるフィードバックです。",
    "割引率（Discount Factor）は、将来の報酬の価値を現在の報酬と比較するための係数です。",
    "利用（Exploit）は、既に学習した知識を活用して、報酬を最大化する行動を選ぶことです。",
    "探索（Explore）は、新しい知識を得るために、まだ試していない行動を選ぶことです。",
    "エージェント（Agent）とは、強化学習で学習を行う主体のことです。環境と相互作用します。",
    "状態（State）とは、エージェントが置かれている状況や条件を指します。",
    "環境（Environment）は、エージェントが行動を取り、報酬を受け取る場です。エージェントと相互作用します。",
    "バッチ学習（Batch Learning）とは、データを一括して学習する方法で、複数のエピソードをまとめて処理します。",

    // 歴史に関するTips
    "Q学習アルゴリズムは、1989年にクリス・ワトキンス（Chris Watkins）によって提案されました。",
    "強化学習の基礎は、20世紀初頭の心理学者エドワード・ソーンダイク（Edward Thorndike）の試行錯誤学習にまで遡ります。",
    "深層強化学習（Deep Reinforcement Learning）は、2015年にGoogle DeepMindによってブレイクスルーを達成し、一気に注目を集めました。",
    "モンテカルロ法（Monte Carlo Method）は、強化学習の歴史の中で重要な位置を占める手法で、報酬の期待値を推定します。",
    "SARSA（State-Action-Reward-State-Action）は、Q学習の一種です。",
    "TD学習（時間差分学習、Temporal Difference Learning）は、1980年代にリチャード・サットン（Richard Sutton）によって開発されました。",
    "方策勾配法（Policy Gradient Method）は、強化学習で直接方策を最適化する手法です。1980年代から研究が進められています。",
    "アンドリュー・バルト（Andrew Barto）とリチャード・サットン（Richard Sutton）は、強化学習の分野で多くの基礎研究を行い、著書も多数出版しています。",

    // パラメーター設定のコツに関するTips
    "学習率（Learning Rate）を高く設定すると、エージェントは新しい経験に素早く適応しますが、最適解から外れるリスクも高まります。",
    "学習率を低く設定すると、安定した学習ができますが、適応に時間がかかる場合があります。",
    "割引率（Discount Factor）を高く設定すると、長期的な報酬を重視するようになります。",
    "割引率を低く設定すると、短期的な報酬に重点を置くようになります。",
    "エピソード（Episode）数を増やすと、エージェントはより多くの経験を積むことができ、より洗練された行動が期待できます。",
    "利用（Exploit）率を上げると、既に学んだ知識を活かして、安定した結果を狙いやすくなります。",
    "探索（Explore）率を上げると、新しい戦略や行動を探索する機会が増え、未知の最適解を見つけやすくなります。",
    "報酬（Reward）の設定を工夫することで、エージェントの行動を目的に合わせて誘導できます。",
    "バッチサイズ（Batch Size）を大きくすると、エージェントはまとめて多くの情報を処理できますが、計算コストが増加します。",
    "方策（Policy）の更新頻度を高くすると、エージェントは頻繁に新しい行動戦略を試すことができますが、安定性が低下する可能性があります。",
    // 基本概念
    "マルコフ決定過程（Markov Decision Process, MDP）は、強化学習の数学的基礎となる枠組みです。",
    "価値関数（Value Function）は、特定の状態や行動の長期的な価値を表します。",
    "方策反復（Policy Iteration）と価値反復（Value Iteration）は、最適な方策を見つけるための重要なアルゴリズムです。",

    // 高度な手法
    "アクター・クリティック法（Actor-Critic Method）は、方策勾配法とQ学習の利点を組み合わせた手法です。",
    "近接方策最適化（Proximal Policy Optimization, PPO）は、安定性と性能のバランスが取れた人気の高い強化学習アルゴリズムです。",
    "ソフトQ学習（Soft Q-Learning）は、探索と利用のバランスを自動的に調整する手法です。",

    // 実装のコツ
    "経験再生（Experience Replay）を使用すると、過去の経験から効率的に学習でき、データの相関を減らせます。",
    "ε-グリーディ法（ε-greedy Method）は、探索と利用のバランスを取るための簡単かつ効果的な戦略です。",
    "関数近似（Function Approximation）を使用すると、大規模な状態空間でも効率的に学習できます。",

    // 応用分野
    "転移学習（Transfer Learning）を活用すると、一つのタスクで学んだ知識を別のタスクに応用できます。",
    "マルチエージェント強化学習（Multi-Agent Reinforcement Learning）は、複数のエージェントが同時に学習する環境を扱います。",
    "逆強化学習（Inverse Reinforcement Learning）は、エージェントの行動から報酬関数を推定する手法です。",

    // 問題と解決策
    "報酬の遅延（Reward Delay）は強化学習の課題の一つで、長期的な結果を適切に評価する必要があります。",
    "部分観測性マルコフ決定過程（Partially Observable Markov Decision Process, POMDP）は、エージェントが環境の全ての情報を観測できない状況を扱います。",
    "カリキュラム学習（Curriculum Learning）は、簡単なタスクから徐々に難しいタスクへと学習を進める方法です。",

    // ツールと環境
    "OpenAI Gymは、強化学習のアルゴリズムをテストするための標準的な環境を提供するライブラリです。",
    "TensorFlow-Agentsは、TensorFlowを使用して強化学習を実装するためのライブラリです。",
    "PyTorch-RLは、PyTorchベースの強化学習実装のためのツールキットです。",

    // 最新のトレンド
    "メタ強化学習（Meta Reinforcement Learning）は、新しいタスクに迅速に適応できるエージェントを訓練する手法です。",
    "自己対戦強化学習（Self-Play Reinforcement Learning）は、エージェントが自身とプレイすることで学習を進める手法です。",
    "モデルベース強化学習（Model-Based Reinforcement Learning）は、環境のモデルを学習し、それを活用して効率的に方策を改善します。",

    // 理論的観点
    "ベルマン方程式（Bellman Equation）は、強化学習の基礎となる重要な数学的概念です。",
    "方策勾配定理（Policy Gradient Theorem）は、方策勾配法の理論的基礎を提供します。",
    "探索vs利用のジレンマ（Exploration-Exploitation Dilemma）は、強化学習における中心的な課題の一つです。",

    // 評価と分析
    "学習曲線（Learning Curve）は、エージェントの性能が時間とともにどのように変化するかを示す重要な指標です。",
    "サンプル効率（Sample Efficiency）は、エージェントが少ない経験からどれだけ効率的に学習できるかを表します。",
    "ロバスト性（Robustness）は、エージェントが環境の変化や外乱に対してどれだけ耐性があるかを示します。",
    //ボルツマン探索
    "ボルツマン探索（Boltzmann Exploration）は、行動選択の確率を各行動のQ値に基づいて決定する探索戦略です。",
    "ボルツマン分布（Boltzmann Distribution）を用いることで、高いQ値を持つ行動がより高い確率で選ばれます。",
    "温度パラメータ（Temperature Parameter）は、ボルツマン探索における探索と利用のバランスを制御します。",
    "温度が高いほど、行動選択はよりランダムになり（探索が促進される）、温度が低いほど、最良の行動が選ばれやすくなります（利用が促進される）。",
    "ボルツマン探索は、ε-グリーディ法よりも滑らかな確率分布で行動を選択するため、より洗練された探索が可能です。",
    // 基礎理論の補強
    "TD(λ)（TD Lambda）は、多段階のブートストラップを行う手法で、短期と長期の報酬のバランスを取ります。",
    "適格度トレース（Eligibility Traces）は、過去の状態や行動の貢献度を追跡し、クレジット割当問題に対処します。",

    // 高度なアルゴリズム
    "決定的方策勾配（Deterministic Policy Gradient, DPG）は、連続行動空間で効率的に学習を行うアルゴリズムです。",
    "分散強化学習（Distributed Reinforcement Learning）は、複数のエージェントや計算機を用いて並列的に学習を行う手法です。",

    // 深層強化学習の具体的手法
    "深層Q学習（Deep Q-Network, DQN）は、Q学習にニューラルネットワークを組み合わせた画期的な手法です。",
    "二重深層Q学習（Double DQN）は、DQNのQ値の過大評価問題を軽減する改良版アルゴリズムです。",
    "優先経験再生（Prioritized Experience Replay）は、重要なサンプルをより頻繁に再生することで学習効率を向上させます。",

    // 実世界応用に向けた技術
    "模倣学習（Imitation Learning）は、エキスパートの行動を模倣することで学習を効率化する手法です。",
    "階層的強化学習（Hierarchical Reinforcement Learning）は、複雑なタスクを階層的に分解して学習する手法です。",
    "安全な強化学習（Safe Reinforcement Learning）は、学習中や実行中の安全性を確保するための手法です。",

    // 理論的アプローチ
    "情報幾何学的アプローチ（Information Geometric Approach）は、方策空間の幾何学的構造を利用して学習を行います。",
    "エントロピー正則化（Entropy Regularization）は、方策のエントロピーを制御することで探索と利用のバランスを取ります。",

    // 評価と解析
    "感度分析（Sensitivity Analysis）は、パラメータの変化が学習結果に与える影響を調査する手法です。",
    "可解釈性（Interpretability）は、学習したモデルの決定過程を人間が理解できるようにする重要な課題です。",

    // 最新のトレンドと将来の方向性
    "オフライン強化学習（Offline Reinforcement Learning）は、事前に収集されたデータのみを用いて学習を行う手法です。",
    "目標条件付き強化学習（Goal-Conditioned Reinforcement Learning）は、様々な目標に対して汎化可能な方策を学習します。",
    "言語モデルと強化学習の統合（Integration of Language Models and RL）は、自然言語処理と強化学習を組み合わせた新しいアプローチです。",

    // 実装と最適化
    "自動ハイパーパラメータ最適化（Automated Hyperparameter Optimization）は、強化学習アルゴリズムの性能を自動的に向上させる技術です。",
    "勾配クリッピング（Gradient Clipping）は、学習の安定性を向上させるために大きな勾配を制限する技術です。",
    //SuperELIZAの思考の補足
    "学習率（Learning Rate）は、モデルが各ステップでどれだけ大きく重みを更新するかを制御するパラメータです。",
    "エピソード（Episode）は、強化学習タスクにおける一連の状態、行動、報酬の連続を指します。",
    "学習曲線（Learning Curve）は、モデルの性能が時間やエピソード数とともにどのように変化するかを示すグラフです。",
    "エラー率（Error Rate）は、モデルが誤った予測や決定を行う頻度を示す指標です。",
    "データ分布（Data Distribution）は、データセット内の値の分布パターンを指し、学習結果に大きな影響を与えます。",
    "パラメータ空間（Parameter Space）は、モデルの全てのパラメータが取り得る値の集合を表す概念的な空間です。",
    "最適化アルゴリズム（Optimization Algorithm）は、モデルの性能を向上させるためにパラメータを調整する手法です。",
    "収束（Convergence）は、学習プロセスが安定し、性能が改善しなくなる状態を指します。",
    "バッチサイズ（Batch Size）は、一度の重み更新で使用するデータサンプルの数を指します。",
    "過学習（Overfitting）は、モデルが訓練データに過度に適合し、汎化性能が低下する現象です。",
    "正則化（Regularization）は、過学習を防ぐためにモデルの複雑さにペナルティを与える技術です。",
    "ハイパーパラメータ（Hyperparameter）は、学習アルゴリズムの動作を制御する、手動で設定するパラメータです。",
    "勾配爆発（Gradient Explosion）は、誤差逆伝播時に勾配が急激に大きくなり、学習が不安定になる問題です。",


];


// ランダムなTIPSを表示する関数
function displayRandomTip() {
    const tipsElement = document.getElementById('tips');
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipsElement.innerHTML = "<span class='tips-label'>TIPS:</span> " + tips[randomIndex];
}

// 定期的にTIPSを更新（オプション）
setInterval(displayRandomTip, 15000); // 15秒ごとに更新


// ちらつき効果の制御
function toggleFlicker() {
    isFlickering = !isFlickering;
    gameContainer.classList.toggle('flicker-effect', isFlickering);
}

// 学習のシミュレーション
// gamescript.js

// SuperELIZAの思考を生成する関数（既存のまま）
function generateThought(params) {
    const thoughts = [
        `学習率${params.learningRate}で頑張ってます！`,
        `探索率${params.epsilon}、ちょっと冒険しすぎかな？`,
        `割引率${params.discountRate}、未来のことも考えないとね。`,
        `${params.episodeCount}エピソード、長い道のりだ...`,
        `${params.algorithm}アルゴリズム、私の得意技です！`,
        'うーん、この状況は難しいな...',
        'やった！いい報酬が得られたよ！',
        'エラー率が高すぎるかも。調整が必要だ...',
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

// SuperELIZAのアルゴリズムをシミュレートする関数
function superElizaAlgorithm(params, episodeNumber) {
    const baseProbability = 0.3; // 基本成功確率を下げる
    const learningProgress = Math.min(episodeNumber / params.episodeCount, 1);

    // パラメータの影響を計算
    const learningRateEffect = params.learningRate * 0.1;
    const epsilonEffect = (1 - params.epsilon) * 0.1;
    const discountRateEffect = params.discountRate * 0.05;

    // 進歩による基本確率の向上（より緩やかに）
    let successProbability = baseProbability + (learningProgress * 0.2);

    // パラメータの影響を加える
    successProbability += learningRateEffect + epsilonEffect + discountRateEffect;

    // 確率に基づいて成功か失敗かを決定
    const isSuccess = Math.random() < successProbability;

    // 報酬とエラーを計算
    let reward, error;
    if (isSuccess) {
        reward = 60 + (Math.random() * 40); // 成功時は60-100の範囲
        error = Math.random() * 3; // 成功時は0-3の範囲
    } else {
        reward = Math.random() * 60; // 失敗時は0-60の範囲
        error = 3 + (Math.random() * 4); // 失敗時は3-7の範囲
    }

    // 時々、予期せぬ結果を生成
    if (Math.random() < 0.1) { // 10%の確率で
        reward = Math.random() * 100; // 完全にランダムな報酬
        error = Math.random() * 10; // 完全にランダムなエラー
    }

    return { reward, error };
}



// 学習をシミュレートする関数
function simulateLearning(params) {
    const { reward, error } = superElizaAlgorithm(params, learningData.length + 1);

    learningData.push({
        episode: learningData.length + 1,
        reward: reward,
        error: error
    });

    // SuperELIZAの思考生成
    const { thought, emoji } = generateThought(params);
    thoughtContent.innerHTML += `<p>${emoji} ${thought}</p>`;
    thoughtContent.scrollTop = thoughtContent.scrollHeight;
}


// パラメータボタンとモーダル関連の要素を取得
const parameterButton = document.getElementById('parameter-button');
const parameterModal = document.getElementById('parameter-modal');
const closeModal = document.getElementById('close-modal');

// パラメータボタンクリックでモーダルを表示
parameterButton.addEventListener('click', () => {
    parameterModal.style.display = 'block';
});

// モーダルを閉じる
closeModal.addEventListener('click', () => {
    parameterModal.style.display = 'none';
});

// モーダル外クリックでも閉じる
window.addEventListener('click', (event) => {
    if (event.target == parameterModal) {
        parameterModal.style.display = 'none';
    }
});


// スタートラーニングボタン　※学習の開始/停止を切り替える関数
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

        // 背景の定期的な変更を開始
        backgroundInterval = setInterval(changeBackgroundImage, 30000);
        // うさぎの動きを開始
        rabbitInterval = setInterval(updateRabbit, 1000);

        learningInterval = setInterval(() => {
            simulateLearning(params);
            if (learningData.length >= params.episodeCount) {
                toggleLearning(); // 学習を停止
                showResults(learningData); // results.jsの関数を呼び出し
            }
        }, 3000);

    } else {
        toggleLearningBtn.textContent = 'START LEARNING';
        clearInterval(learningInterval);
        clearInterval(rabbitInterval);
        clearInterval(backgroundInterval);
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



    // BGM関連の要素
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgm = new Audio('media/bgm_aiva1.mp3');
    bgm.loop = true;

    bgmToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            bgmToggle.textContent = 'BGM OFF';
            bgmToggle.classList.remove('off');
        } else {
            bgm.pause();
            bgmToggle.textContent = 'BGM ON';
            bgmToggle.classList.add('off');
        }
    });

    // BGMの初期状態を設定
    bgm.volume = 0.5; // 音量を50%に設定
    bgmToggle.textContent = 'BGM ON';
    bgmToggle.classList.add('off');



    // DOMContentLoaded イベントリスナー内の startGameBtn のイベントハンドラを修正
    startGameBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initializeGame();

        // BGMの再生（既存のコード）
        if (!bgm.paused) {
            bgm.play();
        }
    });

    toggleLearningBtn.addEventListener('click', toggleLearning);

    restartGameBtn.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        resetGame();

        // ゲームリスタート時にBGMを再開（トグルがONの場合）
        if (!bgm.paused) {
            bgm.play();
        }
    });

    // その他の初期化処理
    initializeParameters();
    changeBackgroundImage(); // 初期背景設定
});

// 既存の関数はそのまま維持
function initializeGame() {
    // ゲーム開始時の初期化処理
    moveRabbitToInitialPosition();
    initializeRabbit();  // この行を追加
    changeRabbitEmoji();
    displayRandomTip();
    thoughtContent.innerHTML = '';
    learningData = [];

    // 初期背景を設定
    setInitialBackground();

    // 背景の定期的な変更を開始　ここだとゲームスタートしなくても切り替わるからやめ
    //backgroundInterval = setInterval(changeBackgroundImage, 30000);
}

function resetGame() {
    // ゲームリセット時の処理
    isLearning = false;
    toggleLearningBtn.textContent = 'START LEARNING';
    clearInterval(learningInterval);
    clearInterval(rabbitInterval);
    clearInterval(backgroundInterval);
    initializeGame();
}


