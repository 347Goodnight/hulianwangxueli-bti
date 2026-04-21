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
const SHARE_QR_ASSET_PATH = 'assets/site-qr.svg?v=20260421-47';

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
  HAIWANG: 2,
  LAOSHU: 2,
  LIGONG: 2,
  MONEY: 2,
  PURE: 2,
  VALO: 4,
  GANG: 4,
  XYY: 4
};
const signalScaleByType = {
  APPLE: 1.3,
  CLOWN: 0.95,
  DOOM: 1.28,
  HAIWANG: 0.98,
  LAOSHU: 1.28,
  LIGONG: 1.35,
  MONEY: 0.82,
  PURE: 1.25,
  VALO: 0.72,
  GANG: 0.82,
  XYY: 0.82,
  JIAHAO: 0.72,
  KOUHAI: 1.04,
  GENSHIN: 0.9
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
        floorPenalty
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
  renderRadarChart(result.normalizedDimensions);
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

function renderRadarChart(normalizedDimensions) {
  const container = document.getElementById('radar-chart');
  const groupedModels = {};

  dimensionKeys.forEach((dim) => {
    const meta = dimensionMeta[dim];
    if (!groupedModels[meta.model]) {
      groupedModels[meta.model] = [];
    }
    groupedModels[meta.model].push({
      dim,
      name: meta.name,
      icon: meta.icon,
      score: normalizedDimensions[dim] ?? 50
    });
  });

  container.innerHTML = '';

  Object.entries(groupedModels).forEach(([modelName, items]) => {
    const modelInfo = modelMeta[modelName];
    const section = document.createElement('section');
    section.className = 'radar-model-section';

    section.innerHTML = `
      <div class="radar-model-head">
        <h5>${modelInfo?.icon || '🧠'} ${modelName}</h5>
        <p>${modelInfo?.description || ''}</p>
      </div>
    `;

    const dims = document.createElement('div');
    dims.className = 'radar-dims';

    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'radar-dim-row';
      const percentage = Math.round(item.score);

      row.innerHTML = `
        <span class="radar-dim-name">${item.icon} ${item.name}</span>
        <div class="radar-dim-bar">
          <div class="radar-dim-fill" style="width: ${percentage}%"></div>
        </div>
        <span class="radar-dim-score">${percentage}%</span>
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
