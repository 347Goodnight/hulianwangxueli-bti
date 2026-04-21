// 互联网学历测试 - 15 维度定义
// 分为 5 个模型，每个模型包含 3 个子维度

const dimensionMeta = {
  // 信息处理模型
  L1: { name: '信息留存', model: '信息处理', icon: '🧠' },
  L2: { name: '逻辑拆解', model: '信息处理', icon: '💡' },
  L3: { name: '注意稳定', model: '信息处理', icon: '🎯' },
  
  // 上岸博弈模型
  E1: { name: '策略判断', model: '上岸博弈', icon: '📝' },
  E2: { name: '现场应对', model: '上岸博弈', icon: '⚡' },
  E3: { name: '风向感应', model: '上岸博弈', icon: '🍀' },
  
  // 行动驱动模型
  A1: { name: '主动推进', model: '行动驱动', icon: '📚' },
  A2: { name: '执行密度', model: '行动驱动', icon: '💪' },
  A3: { name: '求证欲', model: '行动驱动', icon: '🔍' },
  
  // 互动能力模型
  S1: { name: '向上沟通', model: '互动能力', icon: '👨‍🏫' },
  S2: { name: '同辈交流', model: '互动能力', icon: '👥' },
  S3: { name: '协作输出', model: '互动能力', icon: '🤝' },
  
  // 生存策略模型
  B1: { name: '抗压能力', model: '生存策略', icon: '🛡️' },
  B2: { name: '节奏管理', model: '生存策略', icon: '⏰' },
  B3: { name: '包装边界', model: '生存策略', icon: '🎲' }
};

// 5 个模型的元信息
const modelMeta = {
  '信息处理': { icon: '🧠', color: '#FF6B6B' },
  '上岸博弈': { icon: '📝', color: '#4ECDC4' },
  '行动驱动': { icon: '📚', color: '#45B7D1' },
  '互动能力': { icon: '👥', color: '#96CEB4' },
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
