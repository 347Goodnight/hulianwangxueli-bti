// 互联网冲浪人格测试 - 10 维度定义

const dimensionMeta = {
  M1: {
    name: '梗感雷达',
    model: '热梗感应',
    icon: '📡',
    description: '你接热梗、懂黑话、闻到语境的速度'
  },
  M2: {
    name: '对线火力',
    model: '热梗感应',
    icon: '⚔️',
    description: '你在评论区抬杠、阴阳和补刀的强度'
  },
  M3: {
    name: '人设腔调',
    model: '话术镜头',
    icon: '🎙️',
    description: '你有多爱把自己说成一个“有味道的人”'
  },
  M4: {
    name: '网瘾浓度',
    model: '冲浪习惯',
    icon: '📱',
    description: '你一天有多少时间泡在平台和评论区里'
  },
  M5: {
    name: '圈层执念',
    model: '冲浪习惯',
    icon: '🧿',
    description: '你对赛区、纸片人、设定和圈内身份的投入度'
  },
  M6: {
    name: '整活欲望',
    model: '话术镜头',
    icon: '🎭',
    description: '你有多想把一个普通场面整成节目效果'
  },
  M7: {
    name: '破防阈值',
    model: '情绪波动',
    icon: '💥',
    description: '你被点名、被比较、被戳中时有多容易破防'
  },
  M8: {
    name: '情绪底色',
    model: '情绪波动',
    icon: '🌫️',
    description: '你上网时整体更偏冷淡、厌世、敏感还是低耗'
  },
  M9: {
    name: '婚恋脚本',
    model: '现实投射',
    icon: '💍',
    description: '你有多信房车、结婚、生娃、拿下高配对象这套剧本'
  },
  M10: {
    name: '性压抑指数',
    model: '欲望投射',
    icon: '🔥',
    description: '你多容易把暧昧、服从、链接和性张力脑补成主线'
  }
};

const modelMeta = {
  '热梗感应': {
    icon: '🧭',
    color: '#ff7a59',
    description: '你闻梗、接梗、对线时的第一反应'
  },
  '话术镜头': {
    icon: '🎬',
    color: '#7c5cff',
    description: '你说话有没有戏、有没有镜头感、有没有“那味”'
  },
  '冲浪习惯': {
    icon: '🌊',
    color: '#3a86ff',
    description: '你对平台、圈子和赛区的日常沉浸程度'
  },
  '情绪波动': {
    icon: '💗',
    color: '#ff4d6d',
    description: '互联网到底是在逗你笑，还是在拿捏你心态'
  },
  '现实投射': {
    icon: '🏠',
    color: '#c9722b',
    description: '你会不会把房车婚育、阶层和对象当成人生主线'
  },
  '欲望投射': {
    icon: '🔥',
    color: '#ff6b6b',
    description: '你会不会把暧昧空气、慕强和链接当成默认阅读方式'
  }
};

const dimensionGuide = {
  L: {
    label: '低',
    description: '偏冷静，不太爱代入，也不容易上头',
    color: '#64748b'
  },
  M: {
    label: '中',
    description: '正常冲浪，该懂的懂一点，但还没彻底入魔',
    color: '#f59e0b'
  },
  H: {
    label: '高',
    description: '重度在线，很多反应已经梗化、平台化、人格化了',
    color: '#ef4444'
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { dimensionMeta, modelMeta, dimensionGuide };
}
