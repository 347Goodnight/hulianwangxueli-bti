// 互联网冲浪人格测试 - 10 维度定义

const dimensionMeta = {
  M1: {
    name: '热梗雷达',
    model: '梗感系统',
    icon: '📡',
    description: '你刷到新梗时反应有多快'
  },
  M2: {
    name: '对线火力',
    model: '梗感系统',
    icon: '🔥',
    description: '你在评论区抬杠和反击的强度'
  },
  M3: {
    name: '阴阳段位',
    model: '梗感系统',
    icon: '🗡️',
    description: '你说话有多会拐弯扎人'
  },
  M4: {
    name: '冲浪浓度',
    model: '冲浪强度',
    icon: '🌊',
    description: '你一天有多少时间泡在网上'
  },
  M5: {
    name: '整活欲望',
    model: '冲浪强度',
    icon: '🎬',
    description: '你有多想把平静场面搞出节目效果'
  },
  M6: {
    name: '复读扩散',
    model: '冲浪强度',
    icon: '📣',
    description: '你转发复读热梗的积极程度'
  },
  M7: {
    name: '破防系数',
    model: '情绪波动',
    icon: '💥',
    description: '你被戳到之后会不会当场急眼'
  },
  M8: {
    name: '吃瓜参与',
    model: '情绪波动',
    icon: '🍉',
    description: '你面对热搜反转时的围观和拱火欲'
  },
  M9: {
    name: '人设表演',
    model: '人设运营',
    icon: '🎭',
    description: '你在网上经营自己人设的力度'
  },
  M10: {
    name: '断网反应',
    model: '人设运营',
    icon: '📵',
    description: '你离开网络后会不会浑身难受'
  }
};

const modelMeta = {
  '梗感系统': {
    icon: '🧠',
    color: '#ff7a59',
    description: '看梗、接梗、回怼时的原生反应'
  },
  '冲浪强度': {
    icon: '🌊',
    color: '#3a86ff',
    description: '你刷手机、造梗、复读的投入程度'
  },
  '情绪波动': {
    icon: '⚡',
    color: '#ff4d6d',
    description: '你看热搜和被点名时的情绪起伏'
  },
  '人设运营': {
    icon: '🪞',
    color: '#7c5cff',
    description: '你在网上扮演谁，以及离不开谁'
  }
};

const dimensionGuide = {
  L: {
    label: '低',
    description: '偏冷静，没那么上头',
    color: '#64748b'
  },
  M: {
    label: '中',
    description: '正常冲浪，还没完全入戏',
    color: '#f59e0b'
  },
  H: {
    label: '高',
    description: '重度在线，已经长在网里了',
    color: '#ef4444'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dimensionMeta, modelMeta, dimensionGuide };
}
