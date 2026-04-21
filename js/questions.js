// 互联网冲浪人格测试 - 30 道场景题

const questions = [
  // M1 热梗雷达
  {
    id: 'q1',
    dim: 'M1',
    text: '新梗刚冒头，你一般？',
    options: [
      { text: '过两天才知道大家在笑什么', value: 1 },
      { text: '先看评论补课，再决定跟不跟', value: 2 },
      { text: '当天就能接上，顺手还能魔改', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'M1',
    text: '评论区突然刷满“嘉豪”“瓦学弟”，你？',
    options: [
      { text: '看不懂，直接划走', value: 1 },
      { text: '先潜水摸背景，再决定站哪边', value: 2 },
      { text: '秒懂出处，顺手跟一句', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'M1',
    text: '刷到峰哥、户晨风那种抽象视频，你？',
    options: [
      { text: '划走，不做阅读理解', value: 1 },
      { text: '先存着，回头再慢慢懂', value: 2 },
      { text: '当场切评论区狠狠干梗', value: 3 }
    ]
  },

  // M2 对线火力
  {
    id: 'q4',
    dim: 'M2',
    text: '评论区有人嘴你没网感，你？',
    options: [
      { text: '懒得理，随他讲', value: 1 },
      { text: '回一句，意思意思', value: 2 },
      { text: '今天必须狠狠干到他静音', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'M2',
    text: '群里有人硬装懂哥，你？',
    options: [
      { text: '看戏，不下场', value: 1 },
      { text: '轻轻戳一句，提醒到位', value: 2 },
      { text: '接管现场，给他上强度', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'M2',
    text: '直播间钓鱼怪开始带节奏，你？',
    options: [
      { text: '退出，不陪玩', value: 1 },
      { text: '试探两句，看他多能演', value: 2 },
      { text: '直接开麦，当弹幕总教头', value: 3 }
    ]
  },

  // M3 阴阳段位
  {
    id: 'q7',
    dim: 'M3',
    text: '朋友又晒新手机，你通常？',
    options: [
      { text: '恭喜，真心的', value: 1 },
      { text: '可以啊，挺会买', value: 2 },
      { text: '哇，苹果人味已经溢出屏幕了', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'M3',
    text: '有人发言离谱，但你懒得明骂，你会？',
    options: [
      { text: '懒得回，算了', value: 1 },
      { text: '委婉提醒一句', value: 2 },
      { text: '先捧后刀，让他回家复盘', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M3',
    text: '你最常用的说话方式是？',
    options: [
      { text: '有话直说，不拐弯', value: 1 },
      { text: '看人下菜碟，适度来点味', value: 2 },
      { text: '正常说话太亏，必须拐着扎', value: 3 }
    ]
  },

  // M4 冲浪浓度
  {
    id: 'q10',
    dim: 'M4',
    text: '睁眼第一件事通常是？',
    options: [
      { text: '先起床，不碰手机', value: 1 },
      { text: '看眼消息再说', value: 2 },
      { text: '先把抖音和热搜巡逻一遍', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'M4',
    text: '凌晨一点的你，更像？',
    options: [
      { text: '已经睡了，明天再冲浪', value: 1 },
      { text: '补两眼更新就撤', value: 2 },
      { text: '吃着拼好饭，在评论区巡逻', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'M4',
    text: '周末没网两小时，你？',
    options: [
      { text: '正好清净一下', value: 1 },
      { text: '有点空，但还能忍', value: 2 },
      { text: '像被拔了氧气管', value: 3 }
    ]
  },

  // M5 整活欲望
  {
    id: 'q13',
    dim: 'M5',
    text: '群聊突然冷场了，你会？',
    options: [
      { text: '让它死，不救', value: 1 },
      { text: '发个表情包续命', value: 2 },
      { text: '起锅烧油，必须把场子炸热', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'M5',
    text: '朋友发自拍，你评论区通常？',
    options: [
      { text: '点赞路过', value: 1 },
      { text: '夸一句，顺手玩个梗', value: 2 },
      { text: '直接写口播文案带节奏', value: 3 }
    ]
  },
  {
    id: 'q15',
    dim: 'M5',
    text: '现实里突然尴尬三秒，你？',
    options: [
      { text: '沉默混过去', value: 1 },
      { text: '讲个冷笑话补一下', value: 2 },
      { text: '当场把自己做成节目效果', value: 3 }
    ]
  },

  // M6 复读扩散
  {
    id: 'q16',
    dim: 'M6',
    text: '一句热梗火了以后，你？',
    options: [
      { text: '嫌土，不跟', value: 1 },
      { text: '熟了才偶尔用一下', value: 2 },
      { text: '逮谁跟谁复读', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'M6',
    text: '朋友发来爆款模板，你？',
    options: [
      { text: '看完算了', value: 1 },
      { text: '转给熟人试试水', value: 2 },
      { text: '群聊评论区一起铺开', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'M6',
    text: '你表达观点更像？',
    options: [
      { text: '自己慢慢组织语言', value: 1 },
      { text: '原创和套梗一半一半', value: 2 },
      { text: '拿现成热句往上一盖', value: 3 }
    ]
  },

  // M7 破防系数
  {
    id: 'q19',
    dim: 'M7',
    text: '有人回你一句“急了”，你？',
    options: [
      { text: '没感觉，继续吃饭', value: 1 },
      { text: '有点不爽，但能忍', value: 2 },
      { text: '别说，还真被点着了', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'M7',
    text: '刷到别人晒工资、对象、offer，你？',
    options: [
      { text: '划走，关我屁事', value: 1 },
      { text: '酸两秒，继续活', value: 2 },
      { text: '不装了，心态直接裂开', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'M7',
    text: '你发的内容被群嘲时，你通常？',
    options: [
      { text: '爱笑笑，不解释', value: 1 },
      { text: '嘴上没事，心里记账', value: 2 },
      { text: '开始长篇自证，越写越上头', value: 3 }
    ]
  },

  // M8 吃瓜参与
  {
    id: 'q22',
    dim: 'M8',
    text: '热搜两拨人狠狠干起来了，你？',
    options: [
      { text: '看标题就走', value: 1 },
      { text: '先进评论区补前情', value: 2 },
      { text: '全链路追更，顺手拱火', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'M8',
    text: '碰到明显钓鱼帖，你一般？',
    options: [
      { text: '无视，不上钩', value: 1 },
      { text: '先看别人怎么翻车', value: 2 },
      { text: '故意陪演，等他露馅', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'M8',
    text: '一个瓜开始反转，你第一反应？',
    options: [
      { text: '爱咋咋地，和我无关', value: 1 },
      { text: '回去补一下时间线', value: 2 },
      { text: '太香了，今晚必须吃全套', value: 3 }
    ]
  },

  // M9 人设表演
  {
    id: 'q25',
    dim: 'M9',
    text: '你网上和现实里像吗？',
    options: [
      { text: '差不多，没必要演', value: 1 },
      { text: '会调一点滤镜，但不离谱', value: 2 },
      { text: '两个人，号里这个更会演', value: 3 }
    ]
  },
  {
    id: 'q26',
    dim: 'M9',
    text: '发动态前你最在意什么？',
    options: [
      { text: '想发就发，不排练', value: 1 },
      { text: '顺眼就行，别太糙', value: 2 },
      { text: '必须有氛围、有站位、有号感', value: 3 }
    ]
  },
  {
    id: 'q27',
    dim: 'M9',
    text: '别人说你“这味太冲浪了”，你会？',
    options: [
      { text: '我就正常上网', value: 1 },
      { text: '多少带点吧', value: 2 },
      { text: '谢谢认可，这就是我精修过的人设', value: 3 }
    ]
  },

  // M10 断网反应
  {
    id: 'q28',
    dim: 'M10',
    text: '手机只剩 5% 电时，你？',
    options: [
      { text: '没电就没电', value: 1 },
      { text: '先省着回消息', value: 2 },
      { text: '满世界找充电口，像在抢救自己', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'M10',
    text: '如果今天彻底断网，你会？',
    options: [
      { text: '当休假，挺好', value: 1 },
      { text: '不习惯，但能活', value: 2 },
      { text: '整个人像被踢出世界', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'M10',
    text: '周末完全不刷平台，对你来说？',
    options: [
      { text: '挺舒服，脑子终于能静一静', value: 1 },
      { text: '能做到，但会手痒', value: 2 },
      { text: '不可能，根本不可能', value: 3 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
