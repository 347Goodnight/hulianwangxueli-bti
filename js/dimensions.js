// 学历 BTI - 15 维度定义
// 分为 5 个模型，每个模型包含 3 个子维度

const dimensionMeta = {
  // 学习能力模型
  L1: { name: '记忆力', model: '学习能力', icon: '🧠' },
  L2: { name: '理解力', model: '学习能力', icon: '💡' },
  L3: { name: '专注力', model: '学习能力', icon: '🎯' },
  
  // 考试能力模型
  E1: { name: '应试技巧', model: '考试能力', icon: '📝' },
  E2: { name: '临场发挥', model: '考试能力', icon: '⚡' },
  E3: { name: '运气成分', model: '考试能力', icon: '🍀' },
  
  // 学习态度模型
  A1: { name: '自觉性', model: '学习态度', icon: '📚' },
  A2: { name: '勤奋度', model: '学习态度', icon: '💪' },
  A3: { name: '求知欲', model: '学习态度', icon: '🔍' },
  
  // 社交能力模型
  S1: { name: '师生关系', model: '社交能力', icon: '👨‍🏫' },
  S2: { name: '同学关系', model: '社交能力', icon: '👥' },
  S3: { name: '团队协作', model: '社交能力', icon: '🤝' },
  
  // 生存策略模型
  B1: { name: '抗压能力', model: '生存策略', icon: '🛡️' },
  B2: { name: '时间管理', model: '生存策略', icon: '⏰' },
  B3: { name: '作弊倾向', model: '生存策略', icon: '🎲' }
};

// 5 个模型的元信息
const modelMeta = {
  '学习能力': { icon: '🧠', color: '#FF6B6B' },
  '考试能力': { icon: '📝', color: '#4ECDC4' },
  '学习态度': { icon: '📚', color: '#45B7D1' },
  '社交能力': { icon: '👥', color: '#96CEB4' },
  '生存策略': { icon: '🛡️', color: '#FFEAA7' }
};

// 维度分值说明
const dimensionGuide = {
  'L': { label: '低', description: '2-3分', color: '#FF6B6B' },
  'M': { label: '中', description: '4分', color: '#FDCB6E' },
  'H': { label: '高', description: '5-6分', color: '#6C5CE7' }
};

// 导出（用于模块化，但这里直接在全局）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dimensionMeta, modelMeta, dimensionGuide };
}
