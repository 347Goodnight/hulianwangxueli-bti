// 互联网学历测试 - 主应用逻辑

let currentQuestionIndex = 0;
let answers = [];
let currentResultCode = '';
const appName = document.querySelector('meta[name="application-name"]')?.content || '互联网学历测试';
const configuredSiteUrl = document.querySelector('meta[name="site-url"]')?.content || '';

const pages = {
  home: document.getElementById('home-page'),
  test: document.getElementById('test-page'),
  result: document.getElementById('result-page'),
  loading: document.getElementById('loading-page')
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(`${appName} 已加载`);
  document.getElementById('total-questions').textContent = questions.length;
  renderPersonalityLibrary();
  updateProgressBar();
});

function startTest() {
  currentQuestionIndex = 0;
  answers = new Array(questions.length).fill(null);
  showPage('test');
  renderQuestion();
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => {
    page.classList.remove('active');
  });
  pages[pageName].classList.add('active');
}

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const currentNum = document.getElementById('current-question');
  const totalNum = document.getElementById('total-questions');
  const savedAnswer = answers[currentQuestionIndex];

  currentNum.textContent = currentQuestionIndex + 1;
  totalNum.textContent = questions.length;
  updateProgressBar();

  questionText.textContent = question.text;
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option';
    optionBtn.textContent = option.text;

    if (savedAnswer && savedAnswer.optionIndex === index) {
      optionBtn.classList.add('selected');
    }

    optionBtn.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionBtn);
  });

  updateQuestionActions();
}

function updateProgressBar() {
  const progressFill = document.getElementById('progress-fill');
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function selectOption(optionIndex) {
  const question = questions[currentQuestionIndex];
  const selectedValue = question.options[optionIndex].value;

  answers[currentQuestionIndex] = {
    questionId: question.id,
    dimension: question.dim,
    value: selectedValue,
    optionIndex
  };

  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    option.classList.toggle('selected', index === optionIndex);
  });

  updateQuestionActions();
}

function updateQuestionActions() {
  const prevButton = document.getElementById('prev-question-btn');
  const nextButton = document.getElementById('next-question-btn');
  const hasAnswer = Boolean(answers[currentQuestionIndex]);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = !hasAnswer;
  nextButton.textContent = isLastQuestion ? '查看结果' : '下一题';
}

function goToPreviousQuestion() {
  if (currentQuestionIndex === 0) {
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
}

function goToNextQuestion() {
  if (!answers[currentQuestionIndex]) {
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  finishTest();
}

function finishTest() {
  showPage('loading');

  setTimeout(() => {
    const result = calculateResult();
    showResult(result);
  }, 1500);
}

function calculateResult() {
  const dimensionScores = {};

  Object.keys(dimensionMeta).forEach((dim) => {
    dimensionScores[dim] = 0;
  });

  answers.filter(Boolean).forEach((answer) => {
    dimensionScores[answer.dimension] += answer.value;
  });

  const userPattern = {};
  Object.keys(dimensionScores).forEach((dim) => {
    const score = dimensionScores[dim];
    if (score <= 3) {
      userPattern[dim] = 'L';
    } else if (score === 4) {
      userPattern[dim] = 'M';
    } else {
      userPattern[dim] = 'H';
    }
  });

  let minDistance = Infinity;
  let matchedType = null;

  personalityTypes.forEach((type) => {
    const distance = calculateManhattanDistance(userPattern, type.pattern);
    if (distance < minDistance) {
      minDistance = distance;
      matchedType = type;
    }
  });

  const maxDistance = 30;
  const similarity = ((1 - minDistance / maxDistance) * 100).toFixed(1);

  if (similarity < 60) {
    matchedType = fallbackType;
  }

  return {
    personality: matchedType,
    similarity,
    dimensionScores,
    userPattern
  };
}

function calculateManhattanDistance(pattern1, pattern2) {
  const valueMap = { L: 1, M: 2, H: 3 };
  let distance = 0;

  Object.keys(pattern1).forEach((dim) => {
    const val1 = valueMap[pattern1[dim]];
    const val2 = valueMap[pattern2[dim]];
    distance += Math.abs(val1 - val2);
  });

  return distance;
}

function showResult(result) {
  showPage('result');

  const personality = result.personality;
  currentResultCode = personality.code;
  const rarityBadge = document.getElementById('rarity-badge');
  rarityBadge.textContent = personality.rarity;
  rarityBadge.setAttribute('data-rarity', personality.rarity);

  document.getElementById('personality-name').textContent = personality.name;
  document.getElementById('personality-slogan').textContent = personality.slogan;
  document.getElementById('personality-desc').textContent = personality.description;

  const traitsContainer = document.getElementById('personality-traits');
  traitsContainer.innerHTML = '';
  personality.traits.forEach((trait) => {
    const traitSpan = document.createElement('span');
    traitSpan.className = 'trait';
    traitSpan.textContent = trait;
    traitsContainer.appendChild(traitSpan);
  });

  document.getElementById('similarity-percent').textContent = `${result.similarity}%`;

  const imageContainer = document.getElementById('personality-image');
  imageContainer.innerHTML = '';

  const img = new Image();
  img.onload = () => {
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);
  };
  img.onerror = () => {
    imageContainer.innerHTML = '<span class="placeholder-img">🎓</span>';
  };
  img.src = `image/${personality.image}`;
  img.alt = personality.name;

  renderDimensionRadar(result.dimensionScores);
  renderPersonalityLibrary();
}

function renderDimensionRadar(scores) {
  const radarContainer = document.getElementById('radar-chart');
  radarContainer.innerHTML = '';

  Object.keys(scores).forEach((dim) => {
    const score = scores[dim];
    const meta = dimensionMeta[dim];
    const level = score <= 3 ? 'L' : score === 4 ? 'M' : 'H';
    const levelColor = level === 'L' ? '#FF6B6B' : level === 'M' ? '#FDCB6E' : '#6C5CE7';

    const item = document.createElement('div');
    item.className = 'dimension-item';
    item.innerHTML = `
      <span class="dimension-label">${meta.icon} ${meta.name}</span>
      <span class="dimension-value" style="color: ${levelColor}">${level} (${score})</span>
    `;
    radarContainer.appendChild(item);
  });
}

function restartTest() {
  currentQuestionIndex = 0;
  answers = [];
  currentResultCode = '';
  showPage('home');
}

function renderPersonalityLibrary() {
  const grid = document.getElementById('personality-library-grid');
  if (!grid) {
    return;
  }

  grid.innerHTML = '';

  personalityTypes.forEach((personality) => {
    const card = document.createElement('article');
    card.className = 'library-card';

    if (personality.code === currentResultCode) {
      card.classList.add('active');
    }

    const traits = personality.traits
      .map((trait) => `<span>${trait}</span>`)
      .join('');

    card.innerHTML = `
      <div class="library-card-header">
        <div>
          <h3>${personality.name}</h3>
          <p class="library-card-code">${personality.code}</p>
        </div>
        <span class="library-card-rarity" data-rarity="${personality.rarity}">${personality.rarity}</span>
      </div>
      <p class="library-card-slogan">${personality.slogan}</p>
      <p class="library-card-desc">${personality.description}</p>
      <div class="library-card-traits">${traits}</div>
    `;

    grid.appendChild(card);
  });
}

function togglePersonalityLibrary(forceOpen) {
  const overlay = document.getElementById('personality-library-overlay');
  if (!overlay) {
    return;
  }

  const shouldOpen = typeof forceOpen === 'boolean'
    ? forceOpen
    : overlay.hasAttribute('hidden');

  if (shouldOpen) {
    renderPersonalityLibrary();
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    return;
  }

  overlay.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function getShareUrl() {
  if (window.location.protocol === 'file:' && configuredSiteUrl) {
    return configuredSiteUrl;
  }

  if (window.location.href.startsWith('http')) {
    return window.location.href.split('#')[0];
  }

  return configuredSiteUrl || window.location.href;
}

function shareResult() {
  const personalityName = document.getElementById('personality-name').textContent;
  const personalitySlogan = document.getElementById('personality-slogan').textContent;
  const similarity = document.getElementById('similarity-percent').textContent;
  const shareUrl = getShareUrl();

  const shareText = `我在${appName}里测出了【${personalityName}】人格，匹配度${similarity}！\n${personalitySlogan}\n\n快来测测你的学历人设：${shareUrl}`;

  if (navigator.share) {
    navigator.share({
      title: `我的${appName}结果`,
      text: shareText,
      url: shareUrl
    }).catch((err) => console.log('分享失败:', err));
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('结果已复制到剪贴板，快去分享给朋友吧！');
    }).catch(() => {
      alert('分享功能暂不可用，请手动截图分享');
    });
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    togglePersonalityLibrary(false);
  }

  if (!pages.test.classList.contains('active')) {
    return;
  }

  const key = parseInt(e.key, 10);
  if (key >= 1 && key <= 3) {
    const options = document.querySelectorAll('.option');
    if (options[key - 1]) {
      options[key - 1].click();
    }
    return;
  }

  if (e.key === 'ArrowLeft') {
    goToPreviousQuestion();
    return;
  }

  if (e.key === 'ArrowRight' || e.key === 'Enter') {
    goToNextQuestion();
  }
});
