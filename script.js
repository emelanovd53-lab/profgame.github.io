const tg = window.Telegram.WebApp;
tg.expand();

const QUESTS = [
    {
        text: "1. Утро понедельника. Как вы начинаете свой день?",
        options: [
            { text: "📱 Проверка новостей и кода", cat: "tech" },
            { text: "🧘 Зарядка и завтрак", cat: "bio" },
            { text: "🎨 Наброски и вдохновение", cat: "creativ" },
            { text: "📅 План задач команды", cat: "mgmt" }
        ]
    },
    {
        text: "2. В университете предлагают факультатив. Что выберете?",
        options: [
            { text: "🤖 Основы ИИ и алгоритмы", cat: "tech" },
            { text: "🧬 Современная генетика", cat: "bio" },
            { text: "🎭 Сценическое искусство", cat: "creativ" },
            { text: "📈 Основы предпринимательства", cat: "mgmt" }
        ]
    },
    // Добавьте остальные 13 вопросов по аналогии для полной версии...
    // Для демо здесь 3 вопроса
    {
        text: "3. Проблема с экологией в городе. Ваше решение?",
        options: [
            { text: "♻️ Умная сортировка", cat: "tech" },
            { text: "🌳 Высадка лесов", cat: "bio" },
            { text: "🎨 Арт-перформанс", cat: "creativ" },
            { text: "📋 Новый закон", cat: "mgmt" }
        ]
    }
];

let currentStep = 0;
let scores = { tech: 0, bio: 0, creativ: 0, mgmt: 0 };

const qText = document.getElementById('question-text');
const optionsCont = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const gameCont = document.getElementById('game-container');
const finishCont = document.getElementById('finish-container');
const sendBtn = document.getElementById('send-data-btn');

function loadQuest() {
    const quest = QUESTS[currentStep];
    qText.innerText = quest.text;
    optionsCont.innerHTML = '';
    
    progressBar.style.width = `${(currentStep / QUESTS.length) * 100}%`;

    quest.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleChoice(opt.cat);
        optionsCont.appendChild(btn);
    });
}

function handleChoice(cat) {
    scores[cat]++;
    currentStep++;
    
    if (currentStep < QUESTS.length) {
        loadQuest();
    } else {
        finishGame();
    }
}

function finishGame() {
    progressBar.style.width = '100%';
    gameCont.classList.add('hidden');
    finishCont.classList.remove('hidden');
}

sendBtn.onclick = () => {
    tg.sendData(JSON.stringify(scores));
};

loadQuest();
