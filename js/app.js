// 互联网学历测试 - 主应用逻辑

let currentQuestionIndex = 0;
let answers = [];
let currentResultCode = '';
let autoAdvanceTimer = null;
let activeLibraryCategory = '全部';
let librarySearchQuery = '';
const appName = document.querySelector('meta[name="application-name"]')?.content || '互联网学历测试';
const configuredSiteUrl = document.querySelector('meta[name="site-url"]')?.content || '';
const availablePersonaImages = new Set([
  'juanwang.png',
  'piankeguai.png',
  'tiancai.png',
  'xiaozhenzuotijia.png'
]);
const personalityTaxonomy = {
  QINGJIU: { category: '名校光环系', keywords: ['985', '名校', '光环', '牌面'] },
  ERYIYI: { category: '名校光环系', keywords: ['211', '守门员', '保底', '卡位'] },
  YIBENYI: { category: '名校光环系', keywords: ['一本', '旧制', '老黄历', '资历'] },
  ERBENCI: { category: '学历落差系', keywords: ['二本', '尴尬', '落差', '滤镜'] },
  XIAOXUE: { category: '学历落差系', keywords: ['小学毕业', '低学历', '基础款', '起步'] },
  ZHUANBS: { category: '学历落差系', keywords: ['专升本', '逆袭', '本科', '补票'] },
  DAZHUAN: { category: '学历落差系', keywords: ['大专', '反打', '学历', '战狼'] },
  ZHONGZWH: { category: '学历落差系', keywords: ['中专', '文豪', '评论区', '感悟'] },
  CHUZHONG: { category: '学历落差系', keywords: ['初中毕业', '义务教育', '社会大学', '门槛'] },
  GAOZHONG: { category: '学历落差系', keywords: ['高中毕业', '高三', '差一点', '门票'] },
  ZHIGAO: { category: '学历落差系', keywords: ['职高', '分流', '技能', '现实'] },
  SHEHUI: { category: '学历落差系', keywords: ['社会大学', '荣誉校友', '现实', '阅历补票'] },
  LIUSHUI: { category: '学历包装系', keywords: ['留学', '水硕', '海归', '包装'] },
  MINBAN: { category: '学历包装系', keywords: ['民办', '考研上岸', '翻盘', '研究生洗牌'] },
  WENMANG: { category: '学历包装系', keywords: ['文盲', '认知', '规则', '掉线'] },
  SHUOSHI: { category: '学位进阶系', keywords: ['保研', '提前上岸', '锁位', '免战'] },
  BOSHI: { category: '学位进阶系', keywords: ['博士', '论文', '深造', '头发'] },
  BENSHBO: { category: '学位进阶系', keywords: ['本硕博', '连读', '直通车', '丝滑'] },
  YUANSH: { category: '学术神坛系', keywords: ['院士', '封神', '天花板', '学界'] },
  NUOJIA: { category: '学术神坛系', keywords: ['诺奖', '教材', '传说', '得主'] },
  XUEFAS: { category: '学术神坛系', keywords: ['学阀', '世家', '家学', '资源'] }
};
const libraryCategoryMeta = {
  全部: { icon: '总', label: '完整图鉴' },
  名校光环系: { icon: '名', label: '光环牌桌' },
  学历落差系: { icon: '差', label: '落差现场' },
  学历包装系: { icon: '包', label: '包装翻新' },
  学位进阶系: { icon: '学', label: '学位升级' },
  学术神坛系: { icon: '神', label: '学界神坛' },
  未分类: { icon: '册', label: '图鉴卡' }
};

const pages = {
  home: document.getElementById('home-page'),
  test: document.getElementById('test-page'),
  result: document.getElementById('result-page'),
  loading: document.getElementById('loading-page')
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(`${appName} 已加载`);
  document.getElementById('total-questions').textContent = questions.length;
  syncPersonalityCount();
  renderPersonalityLibrary();
  updateProgressBar();
});

function startTest() {
  clearAutoAdvanceTimer();
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
  clearAutoAdvanceTimer();
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
  scheduleAutoAdvance();
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
  clearAutoAdvanceTimer();
  if (currentQuestionIndex === 0) {
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
}

function goToNextQuestion() {
  clearAutoAdvanceTimer();
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
  clearAutoAdvanceTimer();
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
  const meta = getPersonalityMeta(personality);
  const rarityMeta = getRarityMeta(personality.rarity);
  currentResultCode = personality.code;
  const rarityBadge = document.getElementById('rarity-badge');
  rarityBadge.textContent = personality.rarity;
  rarityBadge.setAttribute('data-rarity', personality.rarity);
  const personalityCard = document.getElementById('personality-card');
  personalityCard.setAttribute('data-rarity', personality.rarity);

  document.getElementById('personality-series').textContent = '互联网学历头衔卡';
  document.getElementById('personality-code').textContent = personality.code;
  document.getElementById('personality-rank-label').textContent = rarityMeta.label;
  document.getElementById('personality-image-caption').textContent = meta.label;
  document.getElementById('personality-category').textContent = meta.category;
  document.getElementById('personality-rarity-text').textContent = `${personality.rarity} · ${rarityMeta.label}`;
  document.getElementById('personality-name').textContent = personality.name;
  document.getElementById('personality-slogan').textContent = personality.slogan;
  document.getElementById('personality-desc').textContent = personality.description;
  const roastElement = document.getElementById('personality-roast');
  if (personality.roast) {
    roastElement.textContent = personality.roast;
    roastElement.removeAttribute('hidden');
  } else {
    roastElement.textContent = '';
    roastElement.setAttribute('hidden', '');
  }

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

  if (hasBundledPersonaImage(personality)) {
    const img = new Image();
    img.onload = () => {
      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);
    };
    img.onerror = () => {
      imageContainer.innerHTML = `<span class="placeholder-img personality-initials">${getPersonalityInitials(personality)}</span>`;
    };
    img.src = `image/${personality.image}`;
    img.alt = personality.name;
  } else {
    imageContainer.innerHTML = `<span class="placeholder-img personality-initials">${getPersonalityInitials(personality)}</span>`;
  }

  renderResultHighlights(personality, meta, rarityMeta);
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
  clearAutoAdvanceTimer();
  currentQuestionIndex = 0;
  answers = [];
  currentResultCode = '';
  showPage('home');
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function scheduleAutoAdvance() {
  clearAutoAdvanceTimer();
  autoAdvanceTimer = setTimeout(() => {
    autoAdvanceTimer = null;
    goToNextQuestion();
  }, 240);
}

function syncPersonalityCount() {
  const count = personalityTypes.length;
  document.querySelectorAll('[data-personality-count]').forEach((node) => {
    node.textContent = count;
  });
  document.querySelectorAll('[data-remaining-personality-count]').forEach((node) => {
    node.textContent = Math.max(count - 1, 0);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getPersonalityMeta(personality) {
  const taxonomy = personalityTaxonomy[personality.code] || {
    category: '未分类',
    keywords: []
  };
  const categoryMeta = libraryCategoryMeta[taxonomy.category] || libraryCategoryMeta.未分类;
  return {
    ...taxonomy,
    ...categoryMeta
  };
}

function getRarityMeta(rarity) {
  return rarityGuide[rarity] || {
    label: '未定级',
    chance: '--'
  };
}

function renderResultHighlights(personality, meta, rarityMeta) {
  const highlightGrid = document.getElementById('personality-highlights');
  if (!highlightGrid) {
    return;
  }

  const items = [
    { label: '人格代号', value: personality.code },
    { label: '图鉴分区', value: meta.label },
    { label: '分类归属', value: meta.category },
    { label: '稀有评级', value: `${personality.rarity} · ${rarityMeta.label}` }
  ];

  highlightGrid.innerHTML = items.map((item) => `
    <div class="personality-highlight-item">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');
}

function getPersonalityInitials(personality) {
  return personality.name.slice(0, 2);
}

function hasBundledPersonaImage(personality) {
  return Boolean(personality.image && availablePersonaImages.has(personality.image));
}

function getLibraryImageMarkup(personality, meta, serialLabel) {
  const initials = getPersonalityInitials(personality);
  const avatarContent = hasBundledPersonaImage(personality)
    ? `<img src="image/${personality.image}" alt="${personality.name}" loading="lazy">`
    : `<span class="library-card-avatar-fallback">${initials}</span>`;
  return `
    <div class="library-card-cover">
      <div class="library-card-cover-top">
        <span class="library-card-index">${serialLabel}</span>
        <span class="library-card-mini-tag">${meta.icon} ${meta.label}</span>
      </div>
      <div class="library-card-avatar">
        ${avatarContent}
      </div>
    </div>
  `;
}

function renderLibraryFilters() {
  const filterContainer = document.getElementById('personality-library-filters');
  if (!filterContainer) {
    return;
  }

  const categories = ['全部', ...new Set(personalityTypes.map((personality) => getPersonalityMeta(personality).category))];

  filterContainer.innerHTML = '';
  categories.forEach((category) => {
    const count = category === '全部'
      ? personalityTypes.length
      : personalityTypes.filter((personality) => getPersonalityMeta(personality).category === category).length;
    const button = document.createElement('button');
    button.className = 'library-filter-chip';
    if (category === activeLibraryCategory) {
      button.classList.add('active');
    }
    button.innerHTML = `<span>${category}</span><strong>${count}</strong>`;
    button.onclick = () => {
      activeLibraryCategory = category;
      renderLibraryFilters();
      renderPersonalityLibrary();
    };
    filterContainer.appendChild(button);
  });
}

function renderLibrarySummary(filteredCount) {
  const summary = document.getElementById('personality-library-summary');
  if (!summary) {
    return;
  }

  const totalCount = personalityTypes.length;
  const categoryLabel = activeLibraryCategory === '全部' ? '全部分类' : activeLibraryCategory;
  const queryLabel = librarySearchQuery.trim();

  summary.innerHTML = `
    <div class="library-summary-card">
      <span class="library-summary-label">当前图鉴</span>
      <strong>${filteredCount}</strong>
      <span class="library-summary-text">共 ${totalCount} 种</span>
    </div>
    <div class="library-summary-card">
      <span class="library-summary-label">筛选范围</span>
      <strong>${categoryLabel}</strong>
      <span class="library-summary-text">${queryLabel ? `关键词：${escapeHtml(queryLabel)}` : '未输入关键词'}</span>
    </div>
  `;
}

function renderPersonalityLibrary() {
  const grid = document.getElementById('personality-library-grid');
  if (!grid) {
    return;
  }

  const normalizedQuery = librarySearchQuery.trim().toLowerCase();
  const filteredPersonalities = personalityTypes.filter((personality) => {
    const meta = getPersonalityMeta(personality);
    const matchesCategory = activeLibraryCategory === '全部' || meta.category === activeLibraryCategory;
    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      personality.name,
      personality.code,
      personality.slogan,
      personality.description,
      personality.traits.join(' '),
      meta.category,
      meta.keywords.join(' ')
    ].join(' ').toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  grid.innerHTML = '';
  renderLibrarySummary(filteredPersonalities.length);

  filteredPersonalities.forEach((personality, index) => {
    const meta = getPersonalityMeta(personality);
    const card = document.createElement('article');
    card.className = 'library-card';
    card.dataset.category = meta.category;

    if (personality.code === currentResultCode) {
      card.classList.add('active');
    }

    const serialLabel = `No.${String(index + 1).padStart(2, '0')}`;
    const traits = personality.traits
      .map((trait) => `<span>${trait}</span>`)
      .join('');

    card.innerHTML = `
      ${getLibraryImageMarkup(personality, meta, serialLabel)}
      <div class="library-card-header">
        <div class="library-card-title-row">
          <div>
            <h3>${personality.name}</h3>
            <p class="library-card-code">${personality.code}</p>
          </div>
        </div>
        <span class="library-card-rarity" data-rarity="${personality.rarity}">${personality.rarity}</span>
      </div>
      <div class="library-card-meta">
        <span class="library-card-category">${meta.category}</span>
        <span class="library-card-category light-tag">${meta.label}</span>
        ${personality.code === currentResultCode ? '<span class="library-card-current">你的结果</span>' : ''}
      </div>
      <p class="library-card-slogan">${personality.slogan}</p>
      <p class="library-card-desc">${personality.description}</p>
      <div class="library-card-traits">${traits}</div>
    `;

    grid.appendChild(card);
  });

  if (filteredPersonalities.length === 0) {
    renderLibrarySummary(0);
    grid.innerHTML = '<div class="library-empty">没有搜到匹配的人格，换个关键词试试。</div>';
  }
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
    renderLibraryFilters();
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
  const personality = personalityTypes.find((item) => item.code === currentResultCode) || fallbackType;
  const customShareText = Array.isArray(personality.shareText) && personality.shareText.length > 0
    ? personality.shareText[Math.floor(Math.random() * personality.shareText.length)]
    : '';

  const shareText = customShareText
    ? `${customShareText}\n匹配度：${similarity}\n${shareUrl}`
    : `我在${appName}里测出了【${personalityName}】人格，匹配度${similarity}！\n${personalitySlogan}\n\n快来测测你的学历人设：${shareUrl}`;

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

document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'personality-library-search') {
    librarySearchQuery = e.target.value;
    renderPersonalityLibrary();
  }
});
