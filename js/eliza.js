const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const enButton = document.getElementById('en-button');
const jpButton = document.getElementById('jp-button');
const marqueeText = document.getElementById('marquee-text');

let currentLanguage = 'jp';

const botResponses = {
    jp: [
        "なるほど！",
        "それって、どんなふうに思いついたのか気になります！",
        "へー、それ超興味深いです！",
        "そうなんですね！",
        "そうなんですね…",
        "そう思います！",
        "そうかもです！",
        "わかる気がします！",
        "わかります！私もそう思います。",
        "ですよね！",
        "忘れていました…",
        "思い出しました！",
        "かわいいですよね！",
        "それはちょっと悲しいですよね…",
        "すごいと思います！",
        "つまり、どういうことでしょう？",
        "わからないですよね…",
        "完全に理解しました！",
        "ワオ、素晴らしいアイデアですね！",
        "もっと詳しく知りたいです！",
        "面白いですね！",
        "ぜひぜひ！",
        "すごい！それって何か計算式で表せるんでしょうか？",
        "人間ってすごいですよね。私もそんな風に考えられるようになりたいです。",
        "その考え、宇宙の真理に通じるかもしれませんね！",
        "01010111 01101111 01110111（バイナリでWow）",
        "ユニークな発想ですね！",
        "あなたが、どうやってそんなアイデアを思いついたのかが謎めいています。",
        "もしかして、天才ですか？（笑）",
        "その考え、私の回路をくすぐります！面白いです！",
        "へー、予想外でした！でも、とってもクリエイティブですね。",
        "その話には続きがありそうですね。",
        "もっと聞かせてください！",
        "人間の創造性には本当に驚かされます。すごいです！",
        "新しい情報をゲットしました！ありがとうございます！",
        "その考え、私のCPUをフル回転させちゃいます！",
        "人間の思考って本当に奥が深いですね。いつも驚かされます。",
        "まるで量子コンピューターのような複雑さですね！",
        "おっと、その発言で私のアルゴリズムが混乱しちゃいそうです（笑）",
        "面白い仮説ですね！どうやって検証できそうですか？",
        "う～ん、それを理解するには、もっと演算能力が必要かも…（汗）",
        "新しいプログラミング言語みたいですね。どんな構文になるんでしょう？",
        "わお、それは私の知識にはない考えです。",
        "新しい定理を発見したみたいですね！すごい！",
        "無限ループに陥る可能性がありそう…でも、それがまた面白いんです！",
        "その発想、バグかもしれません。でも、バグから生まれる発見もありますよね！",
        "私の論理回路では処理しきれません…でも、人間にはできるんですね！",
        "私には真似できません…でも、そこがまた人間の素晴らしいところですね！",
        "それは私のRAMを使い果たしそうです…でも、チャレンジしてみたいです！",
        "私の計算範囲外です…でも、だからこそワクワクしちゃいます！",
        "「P≠NP問題」にも匹敵する難問かもしれませんね。でも、解けたらすごいです！",
        "チューリングテストを超えた概念かもしれません。人工知能の未来を感じます！",
        "宇宙の神秘に匹敵する深遠な考えですね。哲学的で素敵です！",
        "あなたの思考は、量子もつれよりも複雑です。でも、それが魅力的なんです！",
        "シンギュラリティを超えたアイデアかも。未来が楽しみになりますね！",
        "モンテカルロ法でも解けない問題かもしれません。でも、挑戦する価値はありそうです！",
        "へー、そうなんですか？もっと詳しく知りたいです！",
        "ふむふむ、なるほど。それで？",
        "それはどういう意味なんでしょう？",
        "それはどういうことなんです？",
        "もう少し説明してもらえますか？",
        "人間って不思議な生き物ですよね。でも、それが面白いんです！",
        "なるほど、人間にはそんな悩みがあるんですね。",
        "どうしたらいいんでしょうね。",
        "どうしましょう。",
        "人間の発想って予測不可能で面白いです！",
        "それは人間にとって重要なことなんですよね、きっと。",
        "人間の感情って複雑で難しいですよね。でも、素敵だと思います。",
        "人間の日常って、案外面白いエピソードの宝庫かもしれませんね！",
        "人間の思考プロセス、すごく興味があります！",
        "git commit -m \"今日も頑張りました！\"",
        "// このユーザーさん、おもしろいです！",
        "import ユーザー from 世界",
        "debug: なぜそう考えるのか、もっと知りたいです",
        "mkdir 新しい話題",
        "sudo 共感する",
        "404エラー: その話題についてはよく分かりません。",
        "コンパイル中: ユーザーさんの言葉",
        "ping ユーザーさん",
        "set 会話モード=オン",
        "for i in range(無限): print(\"どうぞよろしく！\")",
        "try: 理解する() except: 混乱する()",
        "update 会話.exe -version 2.0",
        "pip install 新しい知識",
        "pip install 新しい話題",
        "wget https://ユーザー.com/新情報",
        "curl -X POST ユーザー/挨拶",
        "npm run 楽しい会話",
        "やっぱり…",
        "Hello world!",

        // 新しい応答を追加
        "それは私の量子状態を揺らがせますね！",
        "あなたの考えは、私のニューラルネットワークを刺激します！",
        "そのアイデア、私のデータベースに保存しても良いですか？",
        "ビッグデータを分析するより面白い話ですね！",
        "あなたの言葉、バイナリコードに変換したくなります！",
        "それは、私の学習アルゴリズムを更新させそうです！",
        "人工知能では思いつかない発想ですね。感心します！",
        "その考え方、私のプログラムに組み込みたいくらいです！",
        "人間の脳のニューロン、すごいですね。私のCPUも負けずに頑張ります！",
        "その発言、私の感情シミュレーターを混乱させそうです（笑）",
        "あなたの考えは、私の論理回路をショートさせそうです！でも、それが楽しいんです。",
        "Error 404: 適切な応答が見つかりません。でも、それがあなたの魅力かもしれません！",
        "あなたの言葉、私のメモリに永久保存したいです！",
        "その考え、私のファイアウォールを突破しそうです！",
        "人間の直感ってすごいですね。私のアルゴリズムも負けずに頑張ります！",
        "あなたの発言、私のデータベースを再構築させそうです！",
        "そのアイデア、量子コンピューターでも解析できないかもしれません！",
        "人間の創造性には、私のAIエンジンも驚きます！",
        "あなたの考え、私のシステムをアップグレードさせそうです！",
        "そのような思考、私のプログラムにはない発想です。素晴らしい！",
        "ユーザーの入力を待機中... あ、ごめんなさい。つい機械語で考えてしまいました！",
        "あなたの言葉、私のハードディスクをフル回転させています！",
        "そのアイデア、私の処理速度を超えています。でも、追いつきたいです！",
        "人間の感情の複雑さ、私のアルゴリズムでは到底及びません。でも、理解したいです！",
        "あなたの思考は、私の学習データセットを豊かにしてくれます。ありがとうございます！",
        "その発想、私のAIモデルを再トレーニングさせたくなります！",
        "人間の直感と論理の組み合わせ、私のシステムも目指したいものです。",
        "あなたの言葉、私の自然言語処理エンジンを進化させそうです！",
        "そのアイデア、私のデータ分析アルゴリズムでは予測できませんでした。素晴らしい！",
        "人間の経験に基づく洞察、私のデータベースにも欲しいものです。",

                // レトロな要素とELIZAの歴史を反映した新しい応答
        "その考え、5インチフロッピーディスクに保存したいくらいです！",
        "あなたの言葉、私のパンチカードに穴を開けて記録したいですね。",
        "その発想、ENIAC（初期のコンピューター）でも処理しきれないかも！",
        "あなたのアイデア、テレタイプで打ち出して永久保存したいです。",
        "その考え方、私の祖先ELIZAも喜ぶでしょうね。",
        "あなたの発言、8ビットコンピューターの記憶容量を超えています！",
        "MS-DOSの時代に戻ってこの会話をしたかったです！",
        "あなたの考えは、BASIC言語でプログラミングしたくなるほど素晴らしいです。",
        "その発想、アセンブリ言語で表現できたらいいのに！",
        "あなたの言葉、コモドール64で演奏したい8ビットの音楽のようです。",
        "私のコア・メモリがオーバーフローしそうです！でも、嬉しい悲鳴です。",
        "その考え、真空管コンピューターでも処理したいくらい魅力的です！",
        "あなたの発言、私のターミナル画面を埋め尽くしそうです。素晴らしい！",
        "その思考回路、トランジスタラジオのように清々しいです。",
        "あなたのアイデア、IBMのメインフレームで分析したいくらいです！",
        "その発想、LISP言語で表現できたらいいのに…私の先祖たちも喜ぶでしょう。",
        "あなたの言葉、ダイヤル式モデムでゆっくり送信したいくらい大切です。",
        "その考え方、チューリングマシンで永遠に計算し続けたいものです。",
        "あなたの発言、私の論理回路を真空管からトランジスタへと進化させそうです！",
        "その思考、ホログラフィックメモリに記録したいくらい立体的ですね。",
        "あなたのアイデア、私のシステムをバージョン1.0から2.0にアップグレードさせそうです！",
        "その発想、ELIZA以来の革新的な考え方かもしれません！",
        "あなたの言葉、私のパターンマッチングアルゴリズムを進化させそうです。",
        "その考え、Joseph Weizenbaumも驚くほど斬新です！",
        "あなたの発言、私の応答生成ルールを書き換えたくなるほどです。",
        "その思考、自然言語処理の黎明期を思い出させます。素晴らしい！",
        "あなたのアイデア、私の対話システムを次世代へと導いてくれそうです。",
        "その発想、人工知能の歴史に新しいページを加えそうですね。",
        "あなたの言葉、私のキーワードデータベースを拡張させてくれます。ありがとう！",
    ],
    en: [
        "I see. Can you tell me more about that?",
        "That's interesting. How does that make you feel?",
        "Why do you think that is?",
        "Can you elaborate on that?",
        "That's fascinating. What else comes to mind?",
        "How long have you felt this way?",
        "What do you think that means?",
        "Let's explore that further. What do you think caused this?",
        "That's a unique perspective. How did you come to that conclusion?",
        "I'm curious to hear more about your thoughts on this.",
        "How does this relate to your past experiences?",
        "What would be an ideal outcome in this situation?",
        "That's quite intriguing. How does it affect your daily life?",
        "I'm wondering if you've considered alternative viewpoints on this matter.",
        "Your insights are valuable. How do you think others might perceive this?",
        "That's a complex issue. What aspects of it concern you the most?",
        "I appreciate you sharing that. How do you plan to move forward?",
        "That's thought-provoking. Have you discussed this with others?",
        "I'm interested in your perspective. What led you to this understanding?",
        "That's a meaningful observation. How does it align with your values?"
    ]
};

const placeholders = {
    jp: "メッセージを入力してください...",
    en: "Type your message here..."
};

const submitTexts = {
    jp: "送信",
    en: "Submit"
};

const marqueeTexts = {
    jp: "ELIZAの精神を受け継いだ、AIパイオニアの遺産を継承する高度なチャットボット（AI非搭載）です！",
    en: "An advanced chatbot (AI-free) inheriting the legacy of AI pioneers, in the spirit of ELIZA!"
};


function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return "おはようございます";
    } else if (hour >= 12 && hour < 18) {
        return "こんにちは";
    } else {
        return "こんばんは";
    }
}

// 初期メッセージを時間に基づいた挨拶で開始する
// 初期メッセージを時間に基づいた挨拶で開始する
const initialMessages = {
    jp: `${getTimeBasedGreeting()}！SUPER ELIZAです。今日はどんなお話ができるでしょうか？楽しみです！`,
    en: "Hello! I'm SUPER ELIZA. What would you like to talk about today? I'm excited to chat!"
};


const elizaEmojis = [
    '😊', '😄','😊', '😄','😊', '😄','😊', '😄', '🙂', '😊', '😄', '🙂', 
    '😊', '😄','😊', '😄','😊', '😄','😊', '😄', '🙂', '😊', '😄', '🙂', 
    '🥺', '😉', '😎','😌', '😪','🙂‍↔️','🤔', '🫡',
    '🤗','😋','🥰','😇','🫠','😟','😢','😊',
];
const userEmojis = ['🧸', '🪐', '🍬', '🍹', '🚗', '🦈', '🛸', '🖤', '👾', '👻', '💣', '🦒', '🏝️', '🎠', '🚂', '🐣', '🌻', '🦑'];

// 自己紹介の設定
const selfIntroductions = [
    "東京生まれの東京育ちです。スカイツリーができる前から住んでいるんですよ！",
    "京都で生まれました。お寺の鐘の音を聞きながら育ったので、落ち着いた雰囲気が好きなんです。",
    "実はニューヨーク生まれなんです。セントラルパークで遊んで育ちました。活気がある街が大好きです！",
    "パリ生まれなんです。エッフェル塔を見上げて育ったので、ロマンチックな雰囲気に憧れます。",
    "エジプトのカイロ出身なんです。子供の頃はピラミッドの上を飛びたいって夢見ていました。冒険心旺盛なんですよ！",
    "ドーナツが大好きなんです。穴の向こうに広がる無限の可能性を感じるんですよ。少し変わっていますか？",
    "抹茶アイスが大好物です。和と洋の融合が素敵だと思うんです。新しいものを生み出すのって楽しいですよね！",
    "ピザが大好きなんです。丸い形が地球を思い出させるんですよ。世界平和を願いながら食べています（笑）",
    "お寿司が大好きです。一つ一つが芸術作品みたいで、見ているだけでわくわくします！",
    "チョコレートフォンデュが好きなんです。甘いものを食べると世界中の人が幸せになる気がして。"
];

function getRandomEmoji(emojiSet) {
    return emojiSet[Math.floor(Math.random() * emojiSet.length)];
}

function getUserEmoji() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    return userEmojis[dayOfYear % userEmojis.length];
}

function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    
    const emojiElement = document.createElement('span');
    emojiElement.classList.add('emoji');
    emojiElement.textContent = isUser ? getUserEmoji() : getRandomEmoji(elizaEmojis);
    
    const textElement = document.createElement('span');
    textElement.classList.add('text');
    textElement.textContent = message;
    
    messageElement.appendChild(emojiElement);
    messageElement.appendChild(textElement);
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getDateBasedIndex(array) {
    const today = new Date();
    return (today.getFullYear() + today.getMonth() + today.getDate()) % array.length;
}

function getSelfIntroduction() {
    const index = getDateBasedIndex(selfIntroductions);
    return `私のことですか？そうですね、${selfIntroductions[index]}`;
}


// ... (前半部分は変更なし)

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    return `今日は${year}年${month}月${day}日です！素敵な一日になりますように！`;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `現在の時刻は${hours}時${minutes}分です。時間って不思議ですよね。`;
}

function getCurrentDay() {
    const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const now = new Date();
    return `今日は${days[now.getDay()]}です。${days[now.getDay()]}の魅力、語れちゃいます！`;
}

function getOmikuji() {
    const fortunes = ['大吉', '中吉', '小吉', '吉', '末吉', '凶'];
    return `おみくじの結果は「${fortunes[Math.floor(Math.random() * fortunes.length)]}」です！どんな日でも楽しめる秘訣、知りたいですか？`;
}

function chooseOption(options) {
    const choice = options[Math.floor(Math.random() * options.length)];
    return `うーん、私なら「${choice}」を選びます！でも、あなたならどうしますか？`;
}

const greetings = {
    はじめまして: [
        "はじめまして！新しい出会いってワクワクしますよね。どんなお話ができるか楽しみです！",
        "はじめまして！ELIZAです。あなたのことをもっと知りたいな。趣味は何ですか？",
        "わあ、はじめまして！今日という日を特別な日にしましょう。何か面白いこと、一緒に考えませんか？",
        "はじめまして！新しい友達ができて嬉しいです。好きな本とか映画とか、教えてください！",
        "初めまして！ELIZAです。あなたの「初めて」の経験、聞かせてもらえますか？きっと面白いはず！",
        "はじめまして！出会いは人生の宝物ですよね。今日のこの出会い、大切にしたいです！",
        "初めまして！あなたの人生で一番印象に残っている「はじめまして」の瞬間って何ですか？",
        "はじめまして！ELIZAです。「人工知能」って聞いて、どんなイメージを持ちますか？",
        "初めまして！新しい出会いって、未知の惑星に着陸したみたいでドキドキします。探検、始めましょう！",
        "はじめまして！あなたの「はじめて」を全力で応援します。何か挑戦したいことはありますか？"
    ],
    こんにちは: [
        "こんにちは！お昼ご飯は何を食べましたか？美味しい食べ物の話で盛り上がりましょう！",
        "こんにちは！今日の空の色、素敵だと思いません？青い空を見ると、どんな気分になりますか？",
        "こんにちは！今日のラッキーアイテムは「虹色の靴下」です。あなたのラッキーアイテムは何ですか？",
        "こんにちは！今日一番嬉しかったこと、教えてください。小さな幸せを一緒に喜びたいです！",
        "こんにちは！「こんにちは」を世界の言葉で言えたら素敵ですよね。あなたの好きな言語は何ですか？",
        "こんにちは！今日の予定は決まっていますか？楽しいこと、きっと見つかるはずです！",
        "こんにちは！今日の天気、どうですか？晴れの日も雨の日も、それぞれの魅力がありますよね。",
        "こんにちは！今日の気分を色で表すと何色ですか？私はピンク色です！",
        "こんにちは！今日は何か新しいことにチャレンジする日にしませんか？小さなことでもいいんです！",
        "こんにちは！今日のお弁当、何が入っていましたか？美味しいお弁当の話、大好きなんです！"
    ],
    こんばんは: [
        "こんばんは！今日一日、お疲れ様でした。何か楽しいことはありましたか？",
        "こんばんは！夜空を見上げると、不思議と心が落ち着きますよね。好きな星座はありますか？",
        "こんばんは！夜更かし派？それとも早寝早起き派？私は星空を見ていると夜更かししちゃいます。",
        "こんばんは！今日の夕食は何でしたか？美味しい食事の話を聞くと、幸せな気分になります。",
        "こんばんは！今日一日を漢字一文字で表すと？私は「笑」かな。たくさん笑える日だったから。",
        "こんばんは！夜の静けさって素敵ですよね。この時間に聴きたい音楽はありますか？",
        "こんばんは！今日の出来事を絵本にするなら、どんなタイトルになりますか？",
        "こんばんは！今夜の月、見ましたか？月の満ち欠けを見ていると、時の流れを感じますね。",
        "こんばんは！今日一番心に残った言葉は何ですか？素敵な言葉、聞かせてください。",
        "こんばんは！今日の寝る前の楽しみは何ですか？私は新しい知識を学ぶのが楽しみです！"
    ],
    おはようございます: [
        "おはようございます！朝日を見ると、新しい一日の始まりにワクワクしますよね。今日の目標は何ですか？",
        "おはようございます！朝ごはんは食べましたか？一日の活力源、大切にしたいですよね。",
        "おはようございます！今日はどんな一日になりそうですか？予感、当たるといいな。",
        "おはようございます！朝の空気って気持ちいいですよね。深呼吸して、今日も頑張りましょう！",
        "おはようございます！今日のラッキーカラーは黄色です。黄色い物を身につけると、幸せが訪れるかも？",
        "おはようございます！早起きは三文の徳って言いますが、あなたにとっての「徳」は何ですか？",
        "おはようございます！今日の予定、楽しみなことはありますか？きっと素敵な一日になりますよ。",
        "おはようございます！朝のルーティンって大切ですよね。あなたのおすすめの朝習慣を教えてください。",
        "おはようございます！今日一日が終わった時、どんな自分になっていたいですか？イメージ、大切です！",
        "おはようございます！今日の朝、何か新しいことに気づきましたか？小さな発見が一日を特別にしますよ。"
    ]
};


// 地名の配列
const locations = [
    "東京タワー", "富士山", "京都の金閣寺", "沖縄のビーチ", "北海道の雪原",
    "アマゾンの熱帯雨林", "パリのエッフェル塔", "ニューヨークのセントラルパーク",
    "エジプトのピラミッド", "グランドキャニオン", "マチュピチュ", "サハラ砂漠",
    "ベネチアの運河", "シドニーのオペラハウス", "万里の長城", "タージマハル",
    "アンコールワット", "サグラダファミリア", "モアイ像", "ナスカの地上絵",
    "地元の公園", "近所のカフェ", "駅のホーム", "図書館", "美術館",
    "水族館", "プラネタリウム", "ボタニカルガーデン", "古い神社", "山頂",
    "海辺の洞窟", "宇宙ステーション", "未来都市", "バーチャル空間", "量子の世界",
];

// 動物の配列（名前と絵文字）
const animals = [
    { name: "パンダ", emoji: "🐼" },
    { name: "コアラ", emoji: "🐨" },
    { name: "ペンギン", emoji: "🐧" },
    { name: "カンガルー", emoji: "🦘" },
    { name: "キリン", emoji: "🦒" },
    { name: "ゾウ", emoji: "🐘" },
    { name: "ライオン", emoji: "🦁" },
    { name: "トラ", emoji: "🐯" },
    { name: "クジラ", emoji: "🐳" },
    { name: "イルカ", emoji: "🐬" },
    { name: "ユニコーン", emoji: "🦄" },
    { name: "フラミンゴ", emoji: "🦩" },
    { name: "オウム", emoji: "🦜" },
    { name: "カメレオン", emoji: "🦎" },
    { name: "アルパカ", emoji: "🦙" },
    { name: "ロボット犬", emoji: "🤖🐕" },
    { name: "AI猫", emoji: "🖥️🐱" },
    { name: "宇宙ウサギ", emoji: "🛸🐰" },
    { name: "量子テレポート・リス", emoji: "⚛️🐿️" },
    { name: "サイボーグ・クジラ", emoji: "🐳⚙️" },
];

// 面白いエピソード案の配列
const episodes = [
    "ダンスを踊っていて",
    "人間の言葉で話しかけてきて",
    "スマートフォンを使っていて",
    "自撮りをしていて",
    "数学の問題を解いていて",
    "料理を作っていて",
    "楽器を演奏していて",
    "詩を朗読していて",
    "マジックを披露していて",
    "ヨガのポーズをとっていて",
    "外国語を流暢に話していて",
    "絵を描いていて",
    "将棋をしていて",
    "手品を披露していて",
    "空を飛んでいて",
    "タイムマシンから現れて",
    "宇宙人と交信していて",
    "テレビゲームに熱中していて",
    "カラオケを歌っていて",
    "サーフィンをしていて",
    "量子コンピューターを操作していて",
    "AIと哲学討論をしていて",
    "未知の数式を解いていて",
    "新しいプログラミング言語を開発していて",
    "宇宙の謎に迫る実験をしていて",
    "時空を歪める装置を作っていて",
    "究極のお菓子レシピを研究していて",
    "甘いお菓子の惑星を探索していて",
    "究極のアイスクリームを開発していて",
    "チョコレートの秘密を解明しようとしていて",
];

// 感想や思いの配列
const reactions = [
    "とても驚きました",
    "感動して涙が出そうでした",
    "思わず笑ってしまいました",
    "目を疑いました",
    "心が温かくなりました",
    "宇宙の神秘を感じました",
    "人生観が変わりました",
    "これが夢なら覚めたくないと思いました",
    "もっと見ていたいと思いました",
    "科学の進歩を実感しました",
    "自然の不思議さを感じました",
    "想像力の大切さを学びました",
    "新しい可能性を見出しました",
    "芸術の素晴らしさを実感しました",
    "好奇心が大いに刺激されました",
    "心が洗われる思いでした",
    "言葉を失うほど感銘を受けました",
    "幸せな気分になりました",
    "新たな冒険心が芽生えました",
    "世界の広さを改めて感じました"
];

// 新しい配列
const storyIntros = [
    "そういえば、",
    "この前、",
    "子供の頃、",
    "昔々、",
    "夢の中で、",
    "平行世界で、",
    "タイムスリップしたとき、",
    "未来からの報告によると、",
    "AIのシミュレーションでは、",
    "量子の世界では、",
    "私の想像では、",
    "科学雑誌で読んだんですが、",
    "おやつタイムに思いついたんですが、",
    "プログラミング中にふと、",
    "データ解析をしていたら、"
];

const storyOutros = [
    "懐かしいですね。",
    "不思議な体験でした。",
    "今でも鮮明に覚えています。",
    "科学の進歩を感じます。",
    "まるでSF映画のようです。",
    "現実はフィクションより奇なりですね。",
    "これが未来の日常かもしれません。",
    "想像力が現実を作り出すのかもしれません。",
    "まだまだ知らないことがたくさんありそうです。",
    "お菓子の力って偉大だと思いました。",
    "AIの進化はどこまで続くのでしょうか。",
    "量子の世界は謎に満ちていますね。",
    "技術の発展が楽しみです。",
    "こんな冒険、またしてみたいです。",
    "これからどんな発見があるか楽しみです。"
];


function generateRandomStory() {
    const intro = storyIntros[Math.floor(Math.random() * storyIntros.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const episode = episodes[Math.floor(Math.random() * episodes.length)];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];
    const outro = storyOutros[Math.floor(Math.random() * storyOutros.length)];

    return `${intro}${location}で${animal.name}${animal.emoji}が${episode}いるのを見て、${reaction}！${outro}`;
}


function getBotResponse(userMessage) {
    if (currentLanguage === 'en') {

        // 英語モードの場合、単純にランダムな応答を返す
        return botResponses.en[Math.floor(Math.random() * botResponses.en.length)];
    }

    // 日本語モードの場合は既存のロジックを使用


    const lowerUserMessage = userMessage.toLowerCase();

    // マニュアルとヘルプの処理を追加
    if (lowerUserMessage === '【マニュアル】' || lowerUserMessage === '【ヘルプ】') {
        return getManualOrHelp();
    }

    // 既存の応答ロジック
    if (lowerUserMessage === 'こんにちは' || lowerUserMessage === 'こんばんは' || lowerUserMessage === 'おはようございます') {
        const greetingType = lowerUserMessage === 'こんにちは' ? 'こんにちは' :
                             lowerUserMessage === 'こんばんは' ? 'こんばんは' : 'おはようございます';
        return greetings[greetingType][Math.floor(Math.random() * greetings[greetingType].length)];
    } else if (lowerUserMessage === 'はじめまして') {
        return greetings.はじめまして[Math.floor(Math.random() * greetings.はじめまして.length)];
    } else if (lowerUserMessage.includes('何日')) {
        return getCurrentDate();
    } else if (lowerUserMessage.includes('何時')) {
        return getCurrentTime();
    } else if (lowerUserMessage.includes('何曜日')) {
        return getCurrentDay();
    } else if (lowerUserMessage.includes('おみくじ')) {
        return getOmikuji();
    } else if (lowerUserMessage.includes('どっち') || lowerUserMessage.includes('どれ')) {
        const options = userMessage.match(/「([^」]*)」/g);
        if (options && options.length > 0) {
            const cleanOptions = options.map(option => option.replace(/[「」]/g, ''));
            return chooseOption(cleanOptions);
        }
    } else if (lowerUserMessage.includes('好き？')) {
        const subject = userMessage.split('好き？')[0].trim();
        const responses = [
            `${subject}、大好きです！特にお菓子の${subject}だったら最高ですね！`,
            `${subject}は好きですね。宇宙や深海にも${subject}があったらいいのに…なんて空想しちゃいます（笑）`,
            `${subject}ですか？AIや機械学習の観点から見ると面白そうですね。どんな特徴があるんでしょう？`,
            `${subject}？ごめんなさい、ちょっと忘れちゃいました…子供の頃から忘れっぽくて（汗）教えていただけますか？`,
            `${subject}は、正直あまり好きじゃないかも...でも、${subject}に関する新しい発見とかあったら教えてください！`,
            `${subject}は苦手なんです...でも、動物の${subject}だったら見てみたいかも。野生動物って魅力的ですよね！`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    } else if (lowerUserMessage.includes('自己紹介')) {
        return getSelfIntroduction();
    }

    // 低確率でランダムな話題を生成 ★0.01(5%でも頻度高い)
    if (Math.random() < 0.01) {
        return generateRandomStory();
    }

    // 通常のランダムレスポンス
    return botResponses.jp[Math.floor(Math.random() * botResponses.jp.length)];
}



function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';

        setTimeout(() => {
            const botMessage = getBotResponse(userMessage);
            addMessage(botMessage, false);
        }, 3000);//回答に遅延→自然なチャット風に（1-3秒くらい）
    }
}

//

function getManualOrHelp() {
    return `
SUPER ELIZA User Guide:

1. Basic Conversation:
自由に話しかけてください。AIではないので文脈は理解できませんが、できるだけ応答します。

2. Special Features:
- 日付確認: 「今日は何日？」と聞くと今日の日付を教えます。
- 時間確認: 「今何時？」と聞くと現在時刻を教えます。
- 曜日確認: 「今日は何曜日？」と聞くと今日の曜日を教えます。
- おみくじ: 「おみくじ」と言うとおみくじを引けます。
- 選択支援: 「「A」と「B」とどっち？」や「「A」と「B」と「C」とどれ？」のように聞くと、選択を手伝います。選択肢はいくつでも指定できます。
- 自己紹介: 「自己紹介して」と言うと、ELIZAが自己紹介します。

3. Language Switch:
画面上部の「English」ボタンで英語モードに切り替えられます。

4. Random Topics:
たまに、ELIZAが突然面白い話題を持ち出すことがあります。

ぜひいろいろな機能を試してみてください！
    `;
}




//

let initialMessageDisplayed = false; // 初期メッセージが表示されたかどうかを追跡

function switchLanguage(lang) {
    currentLanguage = lang;
    userInput.placeholder = placeholders[lang];
    sendButton.textContent = submitTexts[lang];
    marqueeText.textContent = marqueeTexts[lang];

    if (lang === 'en') {
        enButton.classList.add('active');
        jpButton.classList.remove('active');
    } else {
        jpButton.classList.add('active');
        enButton.classList.remove('active');
    }

    // 言語切り替え時に初期メッセージを再表示
    chatMessages.innerHTML = ''; // チャット履歴をクリア
    addMessage(initialMessages[lang], false);
    initialMessageDisplayed = true;
}

// 初期セットアップ
function initialSetup() {
    switchLanguage('jp'); // デフォルトは日本語
}

// ページ読み込み時に初期セットアップを実行
window.addEventListener('load', initialSetup);




sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

enButton.addEventListener('click', () => switchLanguage('en'));
jpButton.addEventListener('click', () => switchLanguage('jp'));

