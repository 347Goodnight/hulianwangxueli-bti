// 互联网冲浪人格测试 - 10 维度定义

const dimensionMeta = {
  M1: {
    name: '梗感雷达',
    model: '热梗感应',
    icon: '📗',
    description: '你接新梗和识别语境的速度'
  },
  M2: {
    name: '对线火力',
    model: '热梗感应',
    icon: '⚔️',
    description: '你在评论区抬杠和还嘴的强度'
  },
  M3: {
    name: '人设腔调',
    model: '话术镜头',
    icon: '🎙',
    description: '你说话和发内容时有多讲究“那味”'
  },
  M4: {
    name: '网瘾浓度',
    model: '冲浪习惯',
    icon: '📫',
    description: '你一天里有多少时间泡在平台上'
  },
  M5: {
    name: '圈层执念',
    model: '冲浪习惯',
    icon: '🪢',
    description: '你对赛区黑话和圈层认同的黏度'
  },
  M6: {
    name: '整活欲望',
    model: '话术镜头',
    icon: '🎭',
    description: '你有多想把平淡场面整出节目效果'
  },
  M7: {
    name: '破防阈值',
    model: '情绪波动',
    icon: '💢',
    description: '你被点名或被戳到时的耐受度'
  },
  M8: {
    name: '情绪底色',
    model: '情绪波动',
    icon: '🫥',
    description: '你冲浪时更偏乐观、钝感还是内耗'
  },
  M9: {
    name: '精神消费',
    model: '人设资产',
    icon: '🛍',
    description: '你买单的是功能，还是叙事和身份感'
  },
  M10: {
    name: '性压抑指数',
    model: '欲望投射',
    icon: '🔥',
    description: '你多容易把暧昧、服从和性张力脑补成主线剧情'
  }
};

const modelMeta = {
  '热梗感应': {
    icon: '🧭',
    color: '#ff7a59',
    description: '你闻梗、接梗、对线时的原生反应'
  },
  '话术镜头': {
    icon: '🎬',
    color: '#7c5cff',
    description: '你说话有没有戏、有没有人设、有没有“味”'
  },
  '冲浪习惯': {
    icon: '🌊',
    color: '#3a86ff',
    description: '你上网的时长、圈层投入和活跃程度'
  },
  '情绪波动': {
    icon: '💗',
    color: '#ff4d6d',
    description: '你会不会被互联网轻易拿捏心态'
  },
  '人设资产': {
    icon: '🦮',
    color: '#c9722b',
    description: '你在网上消费什么，又想把自己活成什么'
  },
  '欲望投射': {
    icon: '🔥',
    color: '#ff6b6b',
    description: '你会不会把男女关系、暧昧空气和性张力当成默认阅读方式'
  }
};

const dimensionGuide = {
  L: {
    label: '低',
    description: '偏冷静，没那么容易上头',
    color: '#64748b'
  },
  M: {
    label: '中',
    description: '正常冲浪，还没完全入魔',
    color: '#f59e0b'
  },
  H: {
    label: '高',
    description: '重度在线，很多反应已经平台化了',
    color: '#ef4444'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dimensionMeta, modelMeta, dimensionGuide };
}
