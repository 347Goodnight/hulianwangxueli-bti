// 互联网冲浪人格测试 - 主应用逻辑

let currentQuestionIndex = 0;
let answers = [];
let currentResultCode = '';
let activeLibraryCategory = '全部';
let activeLibraryCode = '';
let librarySearchQuery = '';
let autoAdvanceTimer = null;

const AUTO_ADVANCE_DELAY = 90;

const appName =
  document.querySelector('meta[name="application-name"]')?.content ||
  '互联网冲浪人格测试';
const configuredSiteUrl =
  document.querySelector('meta[name="site-url"]')?.content || '';

const pages = {
  home: document.getElementById('home-page'),
  test: document.getElementById('test-page'),
  result: document.getElementById('result-page'),
  loading: document.getElementById('loading-page')
};

const questionCountByDimension = questions.reduce((acc, question) => {
  acc[question.dim] = (acc[question.dim] || 0) + 1;
  return acc;
}, {});

document.addEventListener('DOMContentLoaded', () => {
  activeLibraryCode = personalityTypes[0]?.code || '';

  const searchInput = document.getElementById('personality-library-search');
  searchInput.value = librarySearchQuery;
  searchInput.addEventListener('input', (event) => {
    librarySearchQuery = event.target.value.trim().toLowerCase();
    renderPersonalityLibrary();
  });

  syncStats();
  renderPersonalityLibrary();
  updateProgressBar();
});

function syncStats() {
  syncNumber('[data-question-count]', questions.length);
  syncNumber('[data-dimension-count]', Object.keys(dimensionMeta).length);
  syncNumber('[data-personality-count]', personalityTypes.length);
  updateRemainingPersonalityCount(currentResultCode);
}

function syncNumber(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = String(value);
  });
}

function startTest() {
  clearAutoAdvance();
  togglePersonalityLibrary(false);
  currentQuestionIndex = 0;
  answers = new Array(questions.length).fill(null);
  showPage('test');
  renderQuestion();
}

function restartTest() {
  startTest();
}

function returnHome() {
  const hasProgress = answers.some(Boolean);
  if (
    hasProgress &&
    !window.confirm('返回首页会丢掉这次答题进度，确定返回吗？')
  ) {
    return;
  }

  clearAutoAdvance();
  togglePersonalityLibrary(false);
  showPage('home');
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => {
    page.classList.remove('active');
  });
  pages[pageName].classList.add('active');
  window.scrollTo(0, 0);
}

function renderQuestion() {
  clearAutoAdvance();

  const question = questions[currentQuestionIndex];
  const savedAnswer = answers[currentQuestionIndex];
  const optionsContainer = document.getElementById('options');

  document.getElementById('current-question').textContent = String(
    currentQuestionIndex + 1
  );
  document.getElementById('total-questions').textContent = String(
    questions.length
  );
  document.getElementById('question-text').textContent = question.text;

  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionButton = document.createElement('button');
    optionButton.type = 'button';
    optionButton.className = 'option';

    if (savedAnswer?.optionIndex === index) {
      optionButton.classList.add('selected');
    }

    optionButton.innerHTML = `
      <span class="option-index">${index + 1}</span>
      <span class="option-text">${option.text}</span>
    `;
    optionButton.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionButton);
  });

  updateProgressBar();
  updateQuestionActions();
}

function selectOption(optionIndex) {
  const question = questions[currentQuestionIndex];
  const selectedQuestionIndex = currentQuestionIndex;

  answers[currentQuestionIndex] = {
    questionId: question.id,
    dimension: question.dim,
    value: question.options[optionIndex].value,
    optionIndex
  };

  document.querySelectorAll('.option').forEach((option, index) => {
    option.classList.toggle('selected', index === optionIndex);
  });

  updateQuestionActions();

  clearAutoAdvance();
  autoAdvanceTimer = window.setTimeout(() => {
    if (selectedQuestionIndex !== currentQuestionIndex) {
      return;
    }

    if (!answers[selectedQuestionIndex]) {
      return;
    }

    goToNextQuestion();
  }, AUTO_ADVANCE_DELAY);
}

function clearAutoAdvance() {
  if (!autoAdvanceTimer) {
    return;
  }

  window.clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = null;
}

function updateProgressBar() {
  const progressFill = document.getElementById('progress-fill');
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function updateQuestionActions() {
  const hasAnswer = Boolean(answers[currentQuestionIndex]);
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const nextText = isLastQuestion ? '查看结果' : '下一题';

  setButtonState('prev-question-btn', isFirstQuestion, '上一题');
  setButtonState('prev-question-btn-bottom', isFirstQuestion, '上一题');
  setButtonState('next-question-btn', !hasAnswer, nextText);
  setButtonState('next-question-btn-bottom', !hasAnswer, nextText);
}

function setButtonState(id, disabled, text) {
  const button = document.getElementById(id);
  if (!button) {
    return;
  }

  button.disabled = disabled;
  button.textContent = text;
}

function goToPreviousQuestion() {
  clearAutoAdvance();
  if (currentQuestionIndex === 0) {
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
}

function goToNextQuestion() {
  clearAutoAdvance();
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
  clearAutoAdvance();
  showPage('loading');

  window.setTimeout(() => {
    const result = calculateResult();
    showResult(result);
  }, 700);
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
    userPattern[dim] = scoreToLevel(dim, dimensionScores[dim]);
  });

  let bestMatch = fallbackType;
  let minDistance = Number.POSITIVE_INFINITY;

  personalityTypes.forEach((type) => {
    const distance = calculatePatternDistance(userPattern, type.pattern);
    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = type;
    }
  });

  const maxDistance = Object.keys(userPattern).length * 2;
  const similarity = Math.max(
    0,
    Math.round((1 - minDistance / maxDistance) * 100)
  );

  return {
    personality: similarity >= 50 ? bestMatch : fallbackType,
    similarity,
    dimensionScores,
    userPattern
  };
}

function scoreToLevel(dim, score) {
  const questionCount = questionCountByDimension[dim] || 1;
  const minScore = questionCount;
  const maxScore = questionCount * 3;
  const ratio = (score - minScore) / Math.max(1, maxScore - minScore);

  if (ratio < 0.34) {
    return 'L';
  }
  if (ratio < 0.67) {
    return 'M';
  }
  return 'H';
}

function calculatePatternDistance(patternA, patternB) {
  const valueMap = { L: 1, M: 2, H: 3 };

  return Object.keys(patternA).reduce((distance, dim) => {
    return distance + Math.abs(valueMap[patternA[dim]] - valueMap[patternB[dim]]);
  }, 0);
}

function showResult(result) {
  const personality = result.personality;
  const rarity = getRarityMeta(personality.rarity);
  const personalityCard = document.getElementById('personality-card');
  const roastElement = document.getElementById('personality-roast');
  const imageContainer = document.getElementById('personality-image');
  const traitsContainer = document.getElementById('personality-traits');

  currentResultCode = personality.code;
  activeLibraryCode = personality.code;

  showPage('result');

  personalityCard.setAttribute('data-rarity', personality.rarity);
  personalityCard.style.setProperty(
    '--card-accent',
    personality.accent || '#ff6b4a'
  );

  document.getElementById('rarity-badge').textContent = personality.rarity;
  document
    .getElementById('rarity-badge')
    .setAttribute('data-rarity', personality.rarity);
  document.getElementById('personality-series').textContent =
    '互联网冲浪人格图鉴';
  document.getElementById('personality-code').textContent = personality.code;
  document.getElementById('personality-rank-label').textContent = rarity.label;
  document.getElementById('personality-category').textContent =
    personality.category;
  document.getElementById(
    'personality-rarity-text'
  ).textContent = `${personality.rarity} · ${rarity.label}`;
  document.getElementById('personality-name').textContent = personality.name;
  document.getElementById('personality-slogan').textContent =
    personality.slogan;
  document.getElementById('personality-desc').textContent =
    personality.description;
  document.getElementById(
    'personality-image-caption'
  ).textContent = `${personality.category} · ${personality.name}`;

  if (personality.roast) {
    roastElement.textContent = personality.roast;
    roastElement.hidden = false;
  } else {
    roastElement.textContent = '';
    roastElement.hidden = true;
  }

  imageContainer.innerHTML = `
    <div class="personality-emblem" style="--emblem-accent: ${
      personality.accent || '#ff6b4a'
    }">
      <span>${personality.icon || '🧩'}</span>
    </div>
  `;

  traitsContainer.innerHTML = '';
  personality.traits.forEach((trait) => {
    const chip = document.createElement('span');
    chip.className = 'trait';
    chip.textContent = trait;
    traitsContainer.appendChild(chip);
  });

  document.getElementById('similarity-percent').textContent =
    `${result.similarity}%`;

  renderHighlights(result.dimensionScores, result.userPattern);
  renderRadarChart(result.dimensionScores);
  updateRemainingPersonalityCount(personality.code);
  renderPersonalityLibrary();
}

function renderHighlights(dimensionScores, userPattern) {
  const container = document.getElementById('personality-highlights');
  const highlightList = Object.keys(dimensionMeta)
    .map((dim) => {
      const count = questionCountByDimension[dim] || 1;
      const score = dimensionScores[dim] || count;
      const midpoint = count * 2;

      return {
        dim,
        name: dimensionMeta[dim].name,
        level: userPattern[dim],
        label: dimensionGuide[userPattern[dim]].label,
        score,
        emphasis: Math.abs(score - midpoint)
      };
    })
    .sort((a, b) => b.emphasis - a.emphasis || b.score - a.score)
    .slice(0, 6);

  container.innerHTML = '';
  highlightList.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.innerHTML = `
      <span class="highlight-value" data-value="${item.level}">${item.label}</span>
      <span class="highlight-name">${item.name}</span>
    `;
    container.appendChild(card);
  });
}

function renderRadarChart(dimensionScores) {
  const container = document.getElementById('radar-chart');
  const groupedModels = {};

  Object.keys(dimensionMeta).forEach((dim) => {
    const meta = dimensionMeta[dim];
    if (!groupedModels[meta.model]) {
      groupedModels[meta.model] = [];
    }
    groupedModels[meta.model].push({
      dim,
      name: meta.name,
      icon: meta.icon,
      score: dimensionScores[dim] || 0,
      maxScore: (questionCountByDimension[dim] || 1) * 3
    });
  });

  container.innerHTML = '';

  Object.entries(groupedModels).forEach(([modelName, items]) => {
    const modelInfo = modelMeta[modelName];
    const section = document.createElement('section');
    section.className = 'radar-model-section';

    section.innerHTML = `
      <div class="radar-model-head">
        <h5>${modelInfo?.icon || '🧭'} ${modelName}</h5>
        <p>${modelInfo?.description || ''}</p>
      </div>
    `;

    const dims = document.createElement('div');
    dims.className = 'radar-dims';

    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'radar-dim-row';
      const percentage = Math.round((item.score / item.maxScore) * 100);

      row.innerHTML = `
        <span class="radar-dim-name">${item.icon} ${item.name}</span>
        <div class="radar-dim-bar">
          <div class="radar-dim-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="radar-dim-score">${item.score}/${item.maxScore}</span>
      `;

      dims.appendChild(row);
    });

    section.appendChild(dims);
    container.appendChild(section);
  });
}

function getRarityMeta(rarity) {
  return rarityGuide[rarity] || { label: '未定义', color: '#999999' };
}

function shareResult() {
  const personality =
    personalityTypes.find((item) => item.code === currentResultCode) ||
    fallbackType;
  const shareText = `我在${appName}测出了【${personality.name}】。${personality.slogan}`;
  const shareUrl = configuredSiteUrl || window.location.href;

  if (navigator.share) {
    navigator
      .share({
        title: `${appName} · ${personality.name}`,
        text: shareText,
        url: shareUrl
      })
      .catch(() => {
        copyToClipboard(`${shareText} ${shareUrl}`);
      });
    return;
  }

  copyToClipboard(`${shareText} ${shareUrl}`);
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      window.alert('分享文案已经复制到剪贴板。');
    });
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  window.alert('分享文案已经复制到剪贴板。');
}

function updateRemainingPersonalityCount(currentCode) {
  const remaining = Math.max(0, personalityTypes.length - (currentCode ? 1 : 0));
  syncNumber('[data-remaining-personality-count]', remaining);
}

function togglePersonalityLibrary(show) {
  const overlay = document.getElementById('personality-library-overlay');
  if (!overlay) {
    return;
  }
  const shouldShow = show === undefined ? overlay.hidden : show;

  overlay.hidden = !shouldShow;
  document.body.style.overflow = shouldShow ? 'hidden' : '';

  if (shouldShow) {
    renderPersonalityLibrary();
  }
}

function renderPersonalityLibrary() {
  const grid = document.getElementById('personality-library-grid');
  const filters = document.getElementById('personality-library-filters');
  const summary = document.getElementById('personality-library-summary');
  const searchInput = document.getElementById('personality-library-search');
  const categories = ['全部', ...new Set(personalityTypes.map((item) => item.category))];

  searchInput.value = librarySearchQuery;

  filters.innerHTML = '';
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `library-filter-chip ${
      activeLibraryCategory === category ? 'active' : ''
    }`;
    button.innerHTML = `
      <span>${category}</span>
      <strong>${
        category === '全部'
          ? personalityTypes.length
          : personalityTypes.filter((item) => item.category === category).length
      }</strong>
    `;
    button.addEventListener('click', () => {
      activeLibraryCategory = category;
      renderPersonalityLibrary();
    });
    filters.appendChild(button);
  });

  const filteredTypes = personalityTypes.filter((type) => {
    const categoryMatch =
      activeLibraryCategory === '全部' || type.category === activeLibraryCategory;
    const searchSpace = [
      type.name,
      type.code,
      type.category,
      type.slogan,
      ...type.traits
    ]
      .join(' ')
      .toLowerCase();
    const searchMatch =
      !librarySearchQuery || searchSpace.includes(librarySearchQuery);

    return categoryMatch && searchMatch;
  });

  if (!filteredTypes.some((type) => type.code === activeLibraryCode)) {
    activeLibraryCode = filteredTypes[0]?.code || personalityTypes[0]?.code || '';
  }

  const featuredPersonality =
    filteredTypes.find((type) => type.code === activeLibraryCode) ||
    personalityTypes.find((type) => type.code === activeLibraryCode) ||
    personalityTypes[0];

  summary.innerHTML = `
    <div class="library-summary-card">
      <span class="library-summary-label">当前图鉴</span>
      <strong>${filteredTypes.length} 种人格</strong>
      <span class="library-summary-text">这里可以直接看完整人格池，不用重新做题也能先逛一圈。</span>
    </div>
    <div class="library-summary-card">
      <span class="library-summary-label">当前筛选</span>
      <strong>${activeLibraryCategory}</strong>
      <span class="library-summary-text">${
        librarySearchQuery ? `关键词：${librarySearchQuery}` : '还没输入关键词，先随便逛。'
      }</span>
    </div>
  `;

  if (featuredPersonality) {
    const featuredCard = document.createElement('div');
    featuredCard.className = 'library-featured-card';
    featuredCard.style.setProperty(
      '--featured-accent',
      featuredPersonality.accent || '#ff6b4a'
    );
    featuredCard.innerHTML = `
      <div class="library-featured-icon">${featuredPersonality.icon || '🧩'}</div>
      <div class="library-featured-body">
        <div class="library-featured-top">
          <span class="library-card-rarity" data-rarity="${featuredPersonality.rarity}">
            ${featuredPersonality.rarity}
          </span>
          <span class="library-card-category light-tag">${featuredPersonality.category}</span>
        </div>
        <h4>${featuredPersonality.name}</h4>
        <p class="library-card-slogan">${featuredPersonality.slogan}</p>
        <p class="library-card-desc">${featuredPersonality.description}</p>
        <div class="library-card-traits">
          ${featuredPersonality.traits
            .map((trait) => `<span>${trait}</span>`)
            .join('')}
        </div>
      </div>
    `;
    summary.appendChild(featuredCard);
  }

  grid.innerHTML = '';

  if (filteredTypes.length === 0) {
    grid.innerHTML = `
      <div class="library-empty">
        没搜到对应人格。可能关键词太偏，也可能这味太新，图鉴还没收录。
      </div>
    `;
    return;
  }

  filteredTypes.forEach((type, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `library-card ${
      activeLibraryCode === type.code ? 'active' : ''
    }`;
    card.style.setProperty('--library-accent', type.accent || '#ff6b4a');

    const currentTag =
      currentResultCode === type.code
        ? '<span class="library-card-current">本次结果</span>'
        : '';

    card.innerHTML = `
      <div class="library-card-cover">
        <div class="library-card-cover-top">
          <span class="library-card-index">${String(index + 1).padStart(2, '0')}</span>
          <span class="library-card-mini-tag">${type.rarity}</span>
        </div>
        <div class="library-card-avatar">
          <span class="library-card-avatar-fallback">${type.icon || '🧩'}</span>
        </div>
      </div>
      <div class="library-card-header">
        <div>
          <h3>${type.name}</h3>
          <span class="library-card-code">${type.code}</span>
        </div>
        <span class="library-card-rarity" data-rarity="${type.rarity}">${type.rarity}</span>
      </div>
      <div class="library-card-meta">
        <span class="library-card-category">${type.category}</span>
        ${currentTag}
      </div>
      <p class="library-card-slogan">${type.slogan}</p>
      <p class="library-card-desc">${type.description}</p>
      <div class="library-card-traits">
        ${type.traits.slice(0, 4).map((trait) => `<span>${trait}</span>`).join('')}
      </div>
    `;

    card.addEventListener('click', () => {
      activeLibraryCode = type.code;
      renderPersonalityLibrary();
    });

    grid.appendChild(card);
  });
}

document.addEventListener('keydown', (event) => {
  if (!pages.test.classList.contains('active')) {
    return;
  }

  if (event.key >= '1' && event.key <= '3') {
    selectOption(Number(event.key) - 1);
    return;
  }

  if (event.key === 'ArrowLeft') {
    goToPreviousQuestion();
    return;
  }

  if (event.key === 'ArrowRight') {
    goToNextQuestion();
  }
});
