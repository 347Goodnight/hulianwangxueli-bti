// 学历BTI - 主应用程序

// 全局状态
let currentQuestionIndex = 0;
let answers = []; // 存储用户的答案

// DOM 元素
const pages = {
  home: document.getElementById('home-page'),
  test: document.getElementById('test-page'),
  result: document.getElementById('result-page'),
  loading: document.getElementById('loading-page')
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('学历BTI 已加载');
  updateProgressBar();
});

// 开始测试
function startTest() {
  currentQuestionIndex = 0;
  answers = [];
  showPage('test');
  renderQuestion();
}

// 显示页面
function showPage(pageName) {
  Object.values(pages).forEach(page => {
    page.classList.remove('active');
  });
  pages[pageName].classList.add('active');
}

// 渲染题目
function renderQuestion() {
  const question = questions[currentQuestionIndex];
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options');
  const currentNum = document.getElementById('current-question');
  const totalNum = document.getElementById('total-questions');
  
  // 更新题号
  currentNum.textContent = currentQuestionIndex + 1;
  totalNum.textContent = questions.length;
  
  // 更新进度条
  updateProgressBar();
  
  // 渲染题目文本
  questionText.textContent = question.text;
  
  // 渲染选项
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.className = 'option';
    optionBtn.textContent = option.text;
    optionBtn.onclick = () => selectOption(index);
    optionsContainer.appendChild(optionBtn);
  });
}

// 更新进度条
function updateProgressBar() {
  const progressFill = document.getElementById('progress-fill');
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  progressFill.style.width = progress + '%';
}

// 选择选项
function selectOption(optionIndex) {
  const question = questions[currentQuestionIndex];
  const selectedValue = question.options[optionIndex].value;
  
  // 保存答案
  answers.push({
    questionId: question.id,
    dimension: question.dim,
    value: selectedValue
  });
  
  // 添加选中效果
  const options = document.querySelectorAll('.option');
  options.forEach((opt, idx) => {
    if (idx === optionIndex) {
      opt.classList.add('selected');
    }
  });
  
  // 延迟进入下一题
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      finishTest();
    }
  }, 300);
}

// 完成测试
function finishTest() {
  showPage('loading');
  
  // 模拟计算延迟
  setTimeout(() => {
    const result = calculateResult();
    showResult(result);
  }, 1500);
}

// 计算结果
function calculateResult() {
  // 1. 按维度汇总得分
  const dimensionScores = {};
  
  // 初始化所有维度
  Object.keys(dimensionMeta).forEach(dim => {
    dimensionScores[dim] = 0;
  });
  
  // 累加各维度得分
  answers.forEach(answer => {
    dimensionScores[answer.dimension] += answer.value;
  });
  
  // 2. 将分数映射为 L/M/H
  const userPattern = {};
  Object.keys(dimensionScores).forEach(dim => {
    const score = dimensionScores[dim];
    if (score <= 3) {
      userPattern[dim] = 'L';
    } else if (score === 4) {
      userPattern[dim] = 'M';
    } else {
      userPattern[dim] = 'H';
    }
  });
  
  // 3. 计算与每种人格的曼哈顿距离
  let minDistance = Infinity;
  let matchedType = null;
  
  personalityTypes.forEach(type => {
    const distance = calculateManhattanDistance(userPattern, type.pattern);
    if (distance < minDistance) {
      minDistance = distance;
      matchedType = type;
    }
  });
  
  // 4. 计算相似度
  const maxDistance = 30; // 15维度 * 最大差值2
  const similarity = ((1 - minDistance / maxDistance) * 100).toFixed(1);
  
  // 5. 如果相似度低于60%，使用兜底人格
  if (similarity < 60) {
    matchedType = fallbackType;
  }
  
  return {
    personality: matchedType,
    similarity: similarity,
    dimensionScores: dimensionScores,
    userPattern: userPattern
  };
}

// 计算曼哈顿距离
function calculateManhattanDistance(pattern1, pattern2) {
  const valueMap = { 'L': 1, 'M': 2, 'H': 3 };
  let distance = 0;
  
  Object.keys(pattern1).forEach(dim => {
    const val1 = valueMap[pattern1[dim]];
    const val2 = valueMap[pattern2[dim]];
    distance += Math.abs(val1 - val2);
  });
  
  return distance;
}

// 显示结果
function showResult(result) {
  showPage('result');
  
  const personality = result.personality;
  
  // 更新稀有度徽章
  const rarityBadge = document.getElementById('rarity-badge');
  rarityBadge.textContent = personality.rarity;
  rarityBadge.setAttribute('data-rarity', personality.rarity);
  
  // 更新人格信息
  document.getElementById('personality-name').textContent = personality.name;
  document.getElementById('personality-slogan').textContent = personality.slogan;
  document.getElementById('personality-desc').textContent = personality.description;
  
  // 更新特质标签
  const traitsContainer = document.getElementById('personality-traits');
  traitsContainer.innerHTML = '';
  personality.traits.forEach(trait => {
    const traitSpan = document.createElement('span');
    traitSpan.className = 'trait';
    traitSpan.textContent = trait;
    traitsContainer.appendChild(traitSpan);
  });
  
  // 更新匹配度
  document.getElementById('similarity-percent').textContent = result.similarity + '%';
  
  // 更新人格图片
  const imageContainer = document.getElementById('personality-image');
  imageContainer.innerHTML = '';
  
  // 尝试加载图片，如果失败则显示emoji占位
  const img = new Image();
  img.onload = () => {
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);
  };
  img.onerror = () => {
    imageContainer.innerHTML = '<span class="placeholder-img">🎭</span>';
  };
  img.src = 'image/' + personality.image;
  img.alt = personality.name;
  
  // 渲染维度分布
  renderDimensionRadar(result.dimensionScores);
}

// 渲染维度雷达图（简化为维度列表）
function renderDimensionRadar(scores) {
  const radarContainer = document.getElementById('radar-chart');
  radarContainer.innerHTML = '';
  
  Object.keys(scores).forEach(dim => {
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

// 重新开始测试
function restartTest() {
  currentQuestionIndex = 0;
  answers = [];
  showPage('home');
}

// 分享结果
function shareResult() {
  const personalityName = document.getElementById('personality-name').textContent;
  const personalitySlogan = document.getElementById('personality-slogan').textContent;
  const similarity = document.getElementById('similarity-percent').textContent;
  
  const shareText = `我在学历BTI测试中测出了【${personalityName}】人格，匹配度${similarity}！\n${personalitySlogan}\n\n快来测测你的学历人格：https://xueli-bti.example.com`;
  
  // 尝试使用Web Share API
  if (navigator.share) {
    navigator.share({
      title: '我的学历BTI测试结果',
      text: shareText,
      url: window.location.href
    }).catch(err => console.log('分享失败:', err));
  } else {
    // 复制到剪贴板
    navigator.clipboard.writeText(shareText).then(() => {
      alert('结果已复制到剪贴板，快去分享给朋友吧！');
    }).catch(() => {
      alert('分享功能暂不可用，请手动截图分享');
    });
  }
}

// 键盘导航支持
document.addEventListener('keydown', (e) => {
  if (!pages.test.classList.contains('active')) return;
  
  const key = parseInt(e.key);
  if (key >= 1 && key <= 3) {
    const options = document.querySelectorAll('.option');
    if (options[key - 1]) {
      options[key - 1].click();
    }
  }
});
