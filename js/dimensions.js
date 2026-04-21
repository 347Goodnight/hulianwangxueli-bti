// 互联网冲浪人格测试 - 判定维度定义

const dimensionMeta = {
  RADAR: {
    name: '梗速雷达',
    model: '热梗反应',
    icon: '📡',
    description: '你接梗、识别语境和闻出“味”的速度'
  },
  FIRE: {
    name: '对线火力',
    model: '热梗反应',
    icon: '⚔️',
    description: '你在评论区和群聊里抬杠、补刀、开喷的冲动'
  },
  AURA: {
    name: '营业腔调',
    model: '在线姿态',
    icon: '🎤',
    description: '你有多在意自己的气口、包装和镜头感'
  },
  ONLINE: {
    name: '赛博浓度',
    model: '在线姿态',
    icon: '🌃',
    description: '你一天里有多少时间和精神泡在平台、热搜和夜间冲浪里'
  },
  CIRCLE: {
    name: '圈层代入',
    model: '在线姿态',
    icon: '🎮',
    description: '你对赛区、二次元、角色设定和圈内黑话的沉浸程度'
  },
  DRAMA: {
    name: '加戏指数',
    model: '情绪脚本',
    icon: '🎭',
    description: '你会不会把普通场面自动脑补成剧情和名场面'
  },
  MOOD: {
    name: '情绪底噪',
    model: '情绪脚本',
    icon: '🌧️',
    description: '你有多容易被互联网内容戳到、带走或沉进去'
  },
  RELATE: {
    name: '关系脑',
    model: '情绪脚本',
    icon: '💞',
    description: '你有多容易把注意力放在暧昧、真心、拿捏和关系流向上'
  },
  PROJECTION: {
    name: '投射欲',
    model: '投射镜头',
    icon: '🪞',
    description: '你会不会把房车、阶层、链接、性张力和高位叙事套进现实'
  }
};

const modelMeta = {
  '热梗反应': {
    icon: '🔥',
    color: '#ff7a59',
    description: '你识梗、接梗和开火时的第一反应'
  },
  '在线姿态': {
    icon: '📱',
    color: '#3a86ff',
    description: '你是怎么泡在平台里、又怎么把自己放进平台里的'
  },
  '情绪脚本': {
    icon: '🫧',
    color: '#ff4d6d',
    description: '你会不会对号入座、越想越多、把小事演成剧情'
  },
  '投射镜头': {
    icon: '🕶️',
    color: '#c9722b',
    description: '你会不会把高位、欲望、关系秩序和现实脚本当默认阅读方式'
  }
};

const dimensionGuide = {
  L: {
    label: '收着刷',
    description: '你偏冷处理，不轻易代入，也不太容易被带节奏',
    color: '#64748b'
  },
  M: {
    label: '半入戏',
    description: '你在线但没彻底上头，看语境决定自己下不下场',
    color: '#f59e0b'
  },
  H: {
    label: '已上头',
    description: '你很多反应已经平台化、梗化、人格化，容易直接进戏',
    color: '#ef4444'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dimensionMeta, modelMeta, dimensionGuide };
}
