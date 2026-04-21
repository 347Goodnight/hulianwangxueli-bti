// 互联网冲浪人格测试 - 主应用逻辑

let currentQuestionIndex = 0;
let answers = [];
let currentResultCode = '';
let activeLibraryCategory = '全部';
let activeLibraryCode = '';
let librarySearchQuery = '';
let autoAdvanceTimer = null;
let sharePreviewObjectUrl = '';
let sharePreviewPayload = null;

const AUTO_ADVANCE_DELAY = 120;
const SHARE_QR_ASSET_PATH = 'assets/site-qr.svg?v=20260421-48';

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

const dimensionKeys = Object.keys(dimensionMeta);
const dimensionRangeByKey = dimensionKeys.reduce((acc, dim) => {
  const count = questionCountByDimension[dim] || 1;
  acc[dim] = {
    min: count * -2,
    max: count * 2
  };
  return acc;
}, {});

const SIGNAL_WEIGHT_MULTIPLIER = 10;
const SIGNAL_HIT_BONUS = 4;
const DIMENSION_MATCH_BASE = 7;
const DEFAULT_SIGNAL_FLOOR = 3;
const signalFloorByType = {
  APPLE: 2,
  CLOWN: 2,
  DANREN: 2,
  DOOM: 2,
  FEI: 4,
  HAIWANG: 3,
  LAOSHU: 2,
  LIGONG: 2,
  MONEY: 2,
  PURE: 2,
  KOUHAI: 4,
  VALO: 4,
  GANG: 4,
  XYY: 3
};
const signalScaleByType = {
  APPLE: 1.3,
  CLOWN: 0.92,
  DOOM: 1.28,
  HAIWANG: 1.08,
  LAOSHU: 1.28,
  LIGONG: 1.35,
  MONEY: 0.82,
  PURE: 1.14,
  VALO: 0.72,
  GANG: 0.9,
  XYY: 0.9,
  JIAHAO: 0.86,
  KOUHAI: 0.9,
  FEI: 1,
  ANDROID: 0.94,
  GENSHIN: 0.9
};
const typeSignatureRules = {
  ANDROID: [
    { dim: 'FIRE', mode: 'min', value: 64, bonus: 4 },
    { dim: 'AURA', mode: 'max', value: 48, bonus: 3 },
    { dim: 'PROJECTION', mode: 'max', value: 48, bonus: 2 }
  ],
  KOUHAI: [
    { dim: 'FIRE', mode: 'min', value: 60, bonus: 4 },
    { dim: 'DRAMA', mode: 'min', value: 58, bonus: 5 },
    { dim: 'AURA', mode: 'min', value: 52, bonus: 4 }
  ],
  GANG: [
    { dim: 'RADAR', mode: 'min', value: 66, bonus: 5 },
    { dim: 'FIRE', mode: 'min', value: 66, bonus: 5 },
    { dim: 'RELATE', mode: 'max', value: 42, bonus: 4 },
    { dim: 'AURA', mode: 'max', value: 56, bonus: 2 }
  ],
  CLOWN: [
    { dim: 'DRAMA', mode: 'min', value: 68, bonus: 4 },
    { dim: 'MOOD', mode: 'min', value: 58, bonus: 4 },
    { dim: 'RELATE', mode: 'between', min: 42, max: 70, bonus: 3 }
  ],
  FEI: [
    { dim: 'RELATE', mode: 'min', value: 72, bonus: 7 },
    { dim: 'PROJECTION', mode: 'min', value: 68, bonus: 5 },
    { dim: 'MOOD', mode: 'min', value: 66, bonus: 5 },
    { dim: 'AURA', mode: 'max', value: 52, bonus: 3 }
  ],
  HAIWANG: [
    { dim: 'AURA', mode: 'min', value: 68, bonus: 6 },
    { dim: 'ONLINE', mode: 'min', value: 58, bonus: 4 },
    { dim: 'RELATE', mode: 'min', value: 66, bonus: 6 },
    { dim: 'MOOD', mode: 'max', value: 46, bonus: 4 }
  ],
  XYY: [
    { dim: 'RADAR', mode: 'min', value: 66, bonus: 4 },
    { dim: 'PROJECTION', mode: 'min', value: 70, bonus: 6 },
    { dim: 'RELATE', mode: 'between', min: 48, max: 70, bonus: 4 },
    { dim: 'AURA', mode: 'max', value: 56, bonus: 3 }
  ],
  JIAHAO: [
    { dim: 'AURA', mode: 'min', value: 68, bonus: 5 },
    { dim: 'DRAMA', mode: 'min', value: 66, bonus: 5 },
    { dim: 'RELATE', mode: 'max', value: 56, bonus: 3 },
    { dim: 'PROJECTION', mode: 'max', value: 60, bonus: 2 }
  ]
};

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
  const selectedOption = question.options[optionIndex];
  const selectedQuestionIndex = currentQuestionIndex;

  answers[currentQuestionIndex] = {
    questionId: question.id,
    dimension: question.dim,
    score: selectedOption.score,
    types: selectedOption.types || {},
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

  setButtonState('prev-question-btn', isFirstQuestion, '上一题');
  setButtonState('next-question-btn', !hasAnswer, isLastQuestion ? '查看结果' : '下一题');
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
  }, 520);
}

function calculateResult() {
  const dimensionScores = dimensionKeys.reduce((acc, dim) => {
    acc[dim] = 0;
    return acc;
  }, {});
  const typeSignalScores = {};
  const typeSignalHits = {};

  answers.filter(Boolean).forEach((answer) => {
    dimensionScores[answer.dimension] += answer.score;

    Object.entries(answer.types || {}).forEach(([code, weight]) => {
      typeSignalScores[code] = (typeSignalScores[code] || 0) + weight;
      typeSignalHits[code] = (typeSignalHits[code] || 0) + 1;
    });
  });

  const normalizedDimensions = {};
  const userPattern = {};

  dimensionKeys.forEach((dim) => {
    const normalized = normalizeDimensionScore(dim, dimensionScores[dim]);
    normalizedDimensions[dim] = normalized;
    userPattern[dim] = scoreToLevel(normalized);
  });

  const rankedTypes = personalityTypes
    .map((type) => {
      const dimensionScore = calculateDimensionMatch(type, normalizedDimensions);
      const rawSignalScore = typeSignalScores[type.code] || 0;
      const signalScale = signalScaleByType[type.code] || 1;
      const scaledSignalScore = rawSignalScore * signalScale;
      const signalScore = scaledSignalScore * SIGNAL_WEIGHT_MULTIPLIER;
      const hitBonus = (typeSignalHits[type.code] || 0) * SIGNAL_HIT_BONUS;
      const conflictPenalty = calculateConflictPenalty(type, normalizedDimensions);
      const signatureBonus = calculateSignatureBonus(
        type.code,
        normalizedDimensions
      );
      const signalFloor = signalFloorByType[type.code] || DEFAULT_SIGNAL_FLOOR;
      const floorPenalty =
        scaledSignalScore < signalFloor
          ? (signalFloor - scaledSignalScore) * 12
          : 0;
      const totalScore =
        dimensionScore +
        signalScore +
        hitBonus -
        conflictPenalty -
        floorPenalty +
        signatureBonus +
        (type.bias || 0);

      return {
        type,
        totalScore,
        dimensionScore,
        rawSignalScore,
        scaledSignalScore,
        signalScore,
        signalHits: typeSignalHits[type.code] || 0,
        conflictPenalty,
        floorPenalty,
        signatureBonus
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  const bestMatch = rankedTypes[0];
  const runnerUp = rankedTypes[1];
  const isFallback =
    !bestMatch ||
    (bestMatch.rawSignalScore < 2 &&
      bestMatch.signalHits < 2 &&
      bestMatch.totalScore - (runnerUp?.totalScore || 0) < 5);

  return {
    personality: isFallback ? fallbackType : bestMatch.type,
    similarity: calculateSimilarity(bestMatch, runnerUp, isFallback),
    dimensionScores,
    normalizedDimensions,
    groupedDimensions: calculateResultDimensionGroups(normalizedDimensions),
    userPattern,
    rankedTypes
  };
}

function normalizeDimensionScore(dim, score) {
  const range = dimensionRangeByKey[dim];
  if (!range) {
    return 50;
  }

  const normalized =
    ((score - range.min) / Math.max(1, range.max - range.min)) * 100;

  return clamp(Math.round(normalized), 0, 100);
}

function scoreToLevel(score) {
  if (score < 34) {
    return 'L';
  }
  if (score < 67) {
    return 'M';
  }
  return 'H';
}

function calculateDimensionMatch(type, normalizedDimensions) {
  return dimensionKeys.reduce((total, dim) => {
    const target = profileValueToPercent(type.profile?.[dim] ?? 0);
    const actual = normalizedDimensions[dim] ?? 50;
    const weight = type.weights?.[dim] || 1;
    const closeness = Math.max(0, 1 - Math.abs(actual - target) / 100);

    return total + closeness * DIMENSION_MATCH_BASE * weight;
  }, 0);
}

function calculateConflictPenalty(type, normalizedDimensions) {
  return dimensionKeys.reduce((total, dim) => {
    const target = profileValueToPercent(type.profile?.[dim] ?? 0);
    const actual = normalizedDimensions[dim] ?? 50;
    const weight = type.weights?.[dim] || 1;
    const distance = Math.abs(actual - target);

    if (distance < 55) {
      return total;
    }

    return total + ((distance - 55) / 7) * weight;
  }, 0);
}

function calculateSignatureBonus(typeCode, normalizedDimensions) {
  const rules = typeSignatureRules[typeCode];
  if (!rules?.length) {
    return 0;
  }

  return rules.reduce((total, rule) => {
    const score = normalizedDimensions[rule.dim] ?? 50;

    if (rule.mode === 'min' && score >= rule.value) {
      return total + rule.bonus;
    }

    if (rule.mode === 'max' && score <= rule.value) {
      return total + rule.bonus;
    }

    if (
      rule.mode === 'between' &&
      score >= rule.min &&
      score <= rule.max
    ) {
      return total + rule.bonus;
    }

    return total;
  }, 0);
}

function calculateSimilarity(bestMatch, runnerUp, isFallback) {
  if (isFallback || !bestMatch) {
    return 58;
  }

  const gap = bestMatch.totalScore - (runnerUp?.totalScore || 0);
  const signalBoost = bestMatch.signalHits * 4;
  const gapBoost = gap * 2;

  return clamp(Math.round(62 + signalBoost + gapBoost), 62, 99);
}

function profileValueToPercent(value) {
  return ((value + 2) / 4) * 100;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function calculateResultDimensionGroups(normalizedDimensions) {
  return resultDimensionGroups.map((group) => {
    const scores = group.dims.map((dim) => normalizedDimensions[dim] ?? 50);
    const score = Math.round(
      scores.reduce((total, value) => total + value, 0) / scores.length
    );

    return {
      ...group,
      score,
      level: scoreToLevel(score),
      parts: group.dims.map((dim) => dimensionMeta[dim].name)
    };
  });
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

  renderHighlights(result.normalizedDimensions, result.userPattern);
  renderRadarChart(result.groupedDimensions);
  updateRemainingPersonalityCount(personality.code);
  renderPersonalityLibrary();
}

function renderHighlights(normalizedDimensions, userPattern) {
  const container = document.getElementById('personality-highlights');
  const highlightList = dimensionKeys
    .map((dim) => {
      const score = normalizedDimensions[dim] ?? 50;

      return {
        dim,
        name: dimensionMeta[dim].name,
        level: userPattern[dim],
        label: dimensionGuide[userPattern[dim]].label,
        score,
        emphasis: Math.abs(score - 50)
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

function renderRadarChart(groupedDimensions) {
  const container = document.getElementById('radar-chart');
  if (!container) {
    return;
  }

  const chartSize = 320;
  const center = chartSize / 2;
  const radius = 116;
  const ringRatios = [0.2, 0.4, 0.6, 0.8, 1];
  const pointList = groupedDimensions.map((item, index) =>
    getRadarPoint(index, groupedDimensions.length, item.score / 100, center, radius)
  );
  const polygonPoints = pointList
    .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  container.innerHTML = '';
  container.className = 'radar-chart radar-chart-ready';

  const visual = document.createElement('div');
  visual.className = 'radar-visual';
  visual.innerHTML = `
    <svg class="radar-svg" viewBox="0 0 ${chartSize} ${chartSize}" aria-label="五维度雷达图">
      ${ringRatios
        .map((ratio) => {
          const ringPoints = groupedDimensions
            .map((_, index) =>
              getRadarPoint(index, groupedDimensions.length, ratio, center, radius)
            )
            .map(({ x, y }) => `${x.toFixed(1)},${y.toFixed(1)}`)
            .join(' ');

          return `<polygon class="radar-ring" points="${ringPoints}"></polygon>`;
        })
        .join('')}
      ${groupedDimensions
        .map((_, index) => {
          const { x, y } = getRadarPoint(
            index,
            groupedDimensions.length,
            1,
            center,
            radius
          );
          return `<line class="radar-axis-line" x1="${center}" y1="${center}" x2="${x.toFixed(
            1
          )}" y2="${y.toFixed(1)}"></line>`;
        })
        .join('')}
      <polygon class="radar-area" points="${polygonPoints}"></polygon>
      ${pointList
        .map(
          ({ x, y }) =>
            `<circle class="radar-point" cx="${x.toFixed(1)}" cy="${y.toFixed(
              1
            )}" r="5"></circle>`
        )
        .join('')}
    </svg>
  `;

  const labels = document.createElement('div');
  labels.className = 'radar-axis-labels';
  labels.innerHTML = groupedDimensions
    .map(
      (item) => `
        <div class="radar-axis-pill">
          <span>${item.icon} ${item.name}</span>
          <strong>${item.score}%</strong>
        </div>
      `
    )
    .join('');

  const detailGrid = document.createElement('div');
  detailGrid.className = 'radar-detail-grid';
  detailGrid.innerHTML = groupedDimensions
    .map((item) => {
      const guide = dimensionGuide[item.level];
      return `
        <article class="radar-detail-card" data-level="${item.level}">
          <div class="radar-detail-top">
            <span class="highlight-value" data-value="${item.level}">${guide.label}</span>
            <span class="radar-detail-score">${item.score}%</span>
          </div>
          <h5>${item.icon} ${item.name}</h5>
          <p>${item.description}</p>
          <span class="radar-detail-meta">由 ${item.parts.join(' + ')} 聚合</span>
        </article>
      `;
    })
    .join('');

  container.appendChild(visual);
  container.appendChild(labels);
  container.appendChild(detailGrid);
}

function getRadarPoint(index, total, ratio, center, radius) {
  const angle = (-Math.PI / 2) + (Math.PI * 2 * index) / total;
  const distance = radius * ratio;

  return {
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance
  };
}

function getRarityMeta(rarity) {
  return rarityGuide[rarity] || { label: '未定义', color: '#999999' };
}

async function shareResult() {
  const personality =
    personalityTypes.find((item) => item.code === currentResultCode) ||
    fallbackType;
  const shareText = `我在${appName}测出了【${personality.name}】。${personality.slogan}`;
  const shareUrl = configuredSiteUrl || window.location.href;
  let generatedBlob = null;
  const fileName = `${personality.code.toLowerCase()}-share-card.png`;

  try {
    generatedBlob = await generateShareCard(personality, shareUrl);
    const didShareImage = await tryShareImage(generatedBlob, fileName, shareText, personality.name);
    if (didShareImage) {
      return;
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      showSharePreview(generatedBlob, fileName, shareText, shareUrl);
      return;
    }

    downloadBlob(generatedBlob, fileName);
    copyToClipboard(`${shareText} ${shareUrl}`, {
      message: '当前设备不支持直接转发图片，已下载分享图并复制链接。'
    });
  } catch (error) {
    if (generatedBlob && window.matchMedia('(pointer: coarse)').matches) {
      showSharePreview(generatedBlob, fileName, shareText, shareUrl);
      return;
    }

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
}

async function tryShareImage(blob, fileName, shareText, personalityName) {
  if (!navigator.share || typeof File === 'undefined') {
    return false;
  }

  const file = new File([blob], fileName, { type: 'image/png' });
  if (navigator.canShare && !navigator.canShare({ files: [file] })) {
    return false;
  }

  await navigator.share({
    title: `${appName} · ${personalityName}`,
    text: shareText,
    files: [file]
  });
  return true;
}

function showSharePreview(blob, fileName, shareText, shareUrl) {
  const overlay = document.getElementById('share-preview-overlay');
  const image = document.getElementById('share-preview-image');
  const openLink = document.getElementById('share-preview-open');

  if (!overlay || !image || !openLink) {
    downloadBlob(blob, fileName);
    return;
  }

  if (sharePreviewObjectUrl) {
    URL.revokeObjectURL(sharePreviewObjectUrl);
  }

  sharePreviewObjectUrl = URL.createObjectURL(blob);
  sharePreviewPayload = { shareText, shareUrl };

  image.src = sharePreviewObjectUrl;
  openLink.href = sharePreviewObjectUrl;
  openLink.download = fileName;
  overlay.hidden = false;
  document.body.classList.add('library-open');
}

function closeSharePreview() {
  const overlay = document.getElementById('share-preview-overlay');
  const image = document.getElementById('share-preview-image');
  const libraryOverlay = document.getElementById('personality-library-overlay');

  if (overlay) {
    overlay.hidden = true;
  }

  if (image) {
    image.removeAttribute('src');
  }

  if (sharePreviewObjectUrl) {
    URL.revokeObjectURL(sharePreviewObjectUrl);
    sharePreviewObjectUrl = '';
  }

  sharePreviewPayload = null;
  document.body.classList.toggle('library-open', Boolean(libraryOverlay && !libraryOverlay.hidden));
}

function sharePreviewLink() {
  if (!sharePreviewPayload) {
    return;
  }

  if (navigator.share) {
    navigator
      .share({
        title: appName,
        text: sharePreviewPayload.shareText,
        url: sharePreviewPayload.shareUrl
      })
      .catch(() => {});
    return;
  }

  copySharePreviewLink();
}

function copySharePreviewLink() {
  if (!sharePreviewPayload) {
    return;
  }

  copyToClipboard(sharePreviewPayload.shareUrl, {
    message: '测试链接已经复制，发给别人也能直接打开。'
  });
}

function copyToClipboard(text, options = {}) {
  const message = options.message || '分享文案已经复制到剪贴板。';
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      window.alert(message);
    });
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  window.alert(message);
}

async function generateShareCard(personality, shareUrl) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 1080;
  canvas.height = 1440;

  const gradient = ctx.createLinearGradient(0, 0, 1080, 1440);
  gradient.addColorStop(0, '#fff8f2');
  gradient.addColorStop(1, '#f4eadf');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 122, 89, 0.14)';
  ctx.beginPath();
  ctx.arc(920, 140, 180, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(79, 99, 112, 0.08)';
  ctx.beginPath();
  ctx.arc(160, 1180, 220, 0, Math.PI * 2);
  ctx.fill();

  drawRoundedRect(ctx, 64, 64, 952, 1312, 40, '#ffffff', 'rgba(23, 18, 15, 0.06)');
  drawRoundedRect(ctx, 96, 110, 260, 68, 34, 'rgba(255, 122, 89, 0.12)');

  ctx.fillStyle = '#df5c3c';
  ctx.font = '700 28px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText('互联网冲浪人格测试', 128, 154);

  ctx.fillStyle = '#17120f';
  ctx.font = '900 86px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText(personality.name, 96, 292);

  ctx.fillStyle = '#5f5249';
  ctx.font = '600 34px "Microsoft YaHei", "PingFang SC", sans-serif';
  wrapText(ctx, personality.slogan, 96, 364, 760, 50, 2);

  drawRoundedRect(
    ctx,
    96,
    460,
    228,
    228,
    46,
    personality.accent || '#ff7d61'
  );
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 112px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(personality.icon || '🧩', 210, 574);
  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';

  ctx.fillStyle = '#17120f';
  ctx.font = '700 26px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText(`${personality.code} · ${personality.category}`, 356, 506);

  ctx.fillStyle = '#5f5249';
  ctx.font = '500 28px "Microsoft YaHei", "PingFang SC", sans-serif';
  wrapText(ctx, personality.description, 356, 560, 580, 42, 5);

  ctx.fillStyle = '#17120f';
  ctx.font = '700 28px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText('冲浪标签', 96, 786);

  let chipX = 96;
  let chipY = 826;
  personality.traits.slice(0, 4).forEach((trait) => {
    const chipWidth = Math.max(120, ctx.measureText(trait).width + 44);
    if (chipX + chipWidth > 984) {
      chipX = 96;
      chipY += 64;
    }
    drawRoundedRect(ctx, chipX, chipY, chipWidth, 44, 22, '#f8f3ee', 'rgba(23, 18, 15, 0.06)');
    ctx.fillStyle = '#5f5249';
    ctx.font = '600 22px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(trait, chipX + 22, chipY + 29);
    chipX += chipWidth + 12;
  });

  drawRoundedRect(ctx, 96, 1036, 888, 250, 34, '#17120f');
  ctx.fillStyle = '#fff8f2';
  ctx.font = '800 40px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText('扫码直接在线测试', 140, 1124);
  ctx.fillStyle = 'rgba(255, 248, 242, 0.76)';
  ctx.font = '500 24px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText('分享这张图，别人扫一扫就能进入测试。', 140, 1168);

  const qrImage = await loadQrImage();
  ctx.drawImage(qrImage, 736, 1060, 190, 190);

  ctx.fillStyle = 'rgba(255, 248, 242, 0.76)';
  ctx.font = '500 20px "Microsoft YaHei", "PingFang SC", sans-serif';
  ctx.fillText(stripUrlProtocol(shareUrl), 140, 1236);
  ctx.fillText('测测你号里常驻的是哪路互联网人格。', 140, 1270);

  return canvasToBlob(canvas);
}

async function loadQrImage(shareUrl) {
  return loadImageFromUrl(SHARE_QR_ASSET_PATH);
}

function loadImageFromUrl(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas export failed'));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}

function drawRoundedRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = text.split('');
  let line = '';
  let lineCount = 0;

  for (let i = 0; i < chars.length; i += 1) {
    const testLine = line + chars[i];
    const isLastChar = i === chars.length - 1;

    if (ctx.measureText(testLine).width > maxWidth && line) {
      lineCount += 1;
      if (lineCount === maxLines) {
        ctx.fillText(`${line.slice(0, -1)}…`, x, y);
        return;
      }
      ctx.fillText(line, x, y);
      line = chars[i];
      y += lineHeight;
      continue;
    }

    line = testLine;

    if (isLastChar) {
      ctx.fillText(line, x, y);
    }
  }
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function stripUrlProtocol(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
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
  document.body.classList.toggle('library-open', shouldShow);

  if (shouldShow) {
    overlay.scrollTop = 0;
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

  summary.innerHTML = `
    <div class="library-summary-card">
      <span class="library-summary-label">当前筛选</span>
      <strong>${activeLibraryCategory}</strong>
    </div>
    <div class="library-summary-card">
      <span class="library-summary-label">命中人格</span>
      <strong>${filteredTypes.length} 种</strong>
    </div>
    <div class="library-summary-card">
      <span class="library-summary-label">搜索状态</span>
      <strong>${librarySearchQuery ? `关键词：${librarySearchQuery}` : '未输入关键词'}</strong>
    </div>
  `;

  grid.innerHTML = '';

  if (filteredTypes.length === 0) {
    grid.innerHTML = `
      <div class="library-empty">
        没搜到对应人格。换个关键词，或者先把筛选放宽一点。
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
  const overlay = document.getElementById('personality-library-overlay');
  const shareOverlay = document.getElementById('share-preview-overlay');
  if (event.key === 'Escape' && shareOverlay && !shareOverlay.hidden) {
    closeSharePreview();
    return;
  }

  if (event.key === 'Escape' && overlay && !overlay.hidden) {
    togglePersonalityLibrary(false);
    return;
  }

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
