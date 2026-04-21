// 互联网冲浪人格测试 - 抖音热梗场景题

const questions = [
  // M1 热梗雷达
  {
    id: 'q1',
    dim: 'M1',
    text: '新梗刚冒头，你一般？',
    options: [
      { text: '过两天才知道大家在笑什么', value: 1 },
      { text: '先潜水补课，再决定跟不跟', value: 2 },
      { text: '当天就能接上，顺手还能魔改', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'M1',
    text: '刷到“性压抑、苹果人、力工”连招，你？',
    options: [
      { text: '像在听天书，直接划走', value: 1 },
      { text: '先看评论区补背景', value: 2 },
      { text: '秒懂，还能补两句户学', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'M1',
    text: '评论区突然刷满“嘉豪、嘉欣、瓦学弟”，你？',
    options: [
      { text: '看不懂，懒得深究', value: 1 },
      { text: '先摸出处，再决定要不要跟', value: 2 },
      { text: '当场接梗，甚至想复读', value: 3 }
    ]
  },

  // M2 对线火力
  {
    id: 'q4',
    dim: 'M2',
    text: '评论区有人说你“这味太安卓了”，你？',
    options: [
      { text: '随他讲，我懒得回', value: 1 },
      { text: '回一句，意思意思', value: 2 },
      { text: '今天必须狠狠干到他闭嘴', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'M2',
    text: '两拨人在“胖猫、龟男、捞女”话题里狠狠干，你？',
    options: [
      { text: '围观，不下场', value: 1 },
      { text: '挑一句顺眼的回', value: 2 },
      { text: '直接加入战场，语气拉满', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'M2',
    text: 'GO 学长和瓦学弟又对上了，你？',
    options: [
      { text: '不站，纯路过', value: 1 },
      { text: '看形势选边', value: 2 },
      { text: '立刻入场，顺手点火', value: 3 }
    ]
  },

  // M3 阴阳段位
  {
    id: 'q7',
    dim: 'M3',
    text: '朋友又晒苹果、山姆、特斯拉，你？',
    options: [
      { text: '恭喜，真心的', value: 1 },
      { text: '可以啊，日子过起来了', value: 2 },
      { text: '越来越苹果了哈', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'M3',
    text: '有人强装懂梗，但明显只学了个皮，你？',
    options: [
      { text: '懒得拆穿', value: 1 },
      { text: '轻轻点一句', value: 2 },
      { text: '先夸后刀，让他自己破防', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M3',
    text: '你说话最常见的状态是？',
    options: [
      { text: '有啥说啥，不拐弯', value: 1 },
      { text: '看人看场合，偶尔带点味', value: 2 },
      { text: '不阴阳两句浑身难受', value: 3 }
    ]
  },

  // M4 冲浪浓度
  {
    id: 'q10',
    dim: 'M4',
    text: '你睁眼第一件事一般是？',
    options: [
      { text: '起床，先不看手机', value: 1 },
      { text: '扫一眼消息和热搜', value: 2 },
      { text: '先巡逻抖音评论区', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'M4',
    text: '凌晨一点的你，更像？',
    options: [
      { text: '已经睡了', value: 1 },
      { text: '补两眼更新就撤', value: 2 },
      { text: '吃着拼好饭继续刷', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'M4',
    text: '两小时没刷任何平台，你？',
    options: [
      { text: '挺好，难得清净', value: 1 },
      { text: '有点空，但还能忍', value: 2 },
      { text: '像魂被踢下线', value: 3 }
    ]
  },

  // M5 整活欲望
  {
    id: 'q13',
    dim: 'M5',
    text: '群聊突然冷场，你会？',
    options: [
      { text: '那就让它冷着', value: 1 },
      { text: '发个图或者表情包续命', value: 2 },
      { text: '起锅烧油，必须整点动静', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'M5',
    text: '朋友发了条很适合抽象化的视频，你？',
    options: [
      { text: '点个赞就走', value: 1 },
      { text: '补一句轻梗', value: 2 },
      { text: '直接给他做成名场面', value: 3 }
    ]
  },
  {
    id: 'q15',
    dim: 'M5',
    text: '线下突然尴尬三秒，你？',
    options: [
      { text: '沉默扛过去', value: 1 },
      { text: '讲句冷话圆一下', value: 2 },
      { text: '立刻整活把场子拧歪', value: 3 }
    ]
  },

  // M6 复读扩散
  {
    id: 'q16',
    dim: 'M6',
    text: '一句热梗火了以后，你？',
    options: [
      { text: '嫌土，不跟', value: 1 },
      { text: '熟了才偶尔来一句', value: 2 },
      { text: '逮谁跟谁复读', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'M6',
    text: '刷到“巡视领地”那类抽象模板，你？',
    options: [
      { text: '看完就算了', value: 1 },
      { text: '转给熟人乐一下', value: 2 },
      { text: '评论区、群聊全铺开', value: 3 }
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
    text: '有人说你“这不就是龟男/鼠鼠味”，你？',
    options: [
      { text: '无所谓，继续刷', value: 1 },
      { text: '有点不爽，但还能忍', value: 2 },
      { text: '别说，还真被戳到了', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'M7',
    text: '刷到别人晒苹果、山姆、offer、对象，你？',
    options: [
      { text: '划走，关我屁事', value: 1 },
      { text: '酸两秒，继续过日子', value: 2 },
      { text: '心态直接被狠狠干了一下', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'M7',
    text: '你发的抽象内容被群嘲时，你通常？',
    options: [
      { text: '爱笑笑，不解释', value: 1 },
      { text: '嘴上没事，心里记账', value: 2 },
      { text: '开始长篇自证，越写越急', value: 3 }
    ]
  },

  // M8 吃瓜参与
  {
    id: 'q22',
    dim: 'M8',
    text: '一个瓜开始往反转方向滚，你？',
    options: [
      { text: '不想跟，撤了', value: 1 },
      { text: '补一下前情再说', value: 2 },
      { text: '彻底来精神，今晚追全套', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'M8',
    text: '看见明显钓鱼帖，你一般？',
    options: [
      { text: '无视，不上当', value: 1 },
      { text: '先看看别人怎么回', value: 2 },
      { text: '故意陪演，等他翻车', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'M8',
    text: '两拨人狠狠干时，你最像哪种？',
    options: [
      { text: '吃两口就走', value: 1 },
      { text: '边看边补时间线', value: 2 },
      { text: '全程围观，还想再拱一下', value: 3 }
    ]
  },

  // M9 人设表演
  {
    id: 'q25',
    dim: 'M9',
    text: '你网上和现实里像吗？',
    options: [
      { text: '差不多，没必要演', value: 1 },
      { text: '会开一点滤镜', value: 2 },
      { text: '号里那个更完整也更会演', value: 3 }
    ]
  },
  {
    id: 'q26',
    dim: 'M9',
    text: '发视频/发动态前，你最在意什么？',
    options: [
      { text: '想发就发', value: 1 },
      { text: '顺眼、顺口、别太糙', value: 2 },
      { text: '必须有号感、有姿势、有味', value: 3 }
    ]
  },
  {
    id: 'q27',
    dim: 'M9',
    text: '别人说你“太像嘉豪/嘉欣了”，你会？',
    options: [
      { text: '我就正常发一下', value: 1 },
      { text: '可能多少带点吧', value: 2 },
      { text: '谢谢认可，我就是有这味', value: 3 }
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
      { text: '找充电口像在抢救自己', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'M10',
    text: '今天彻底断网，你会？',
    options: [
      { text: '当放假，挺好', value: 1 },
      { text: '不习惯，但能活', value: 2 },
      { text: '像被整个人踢出世界', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'M10',
    text: '周末完全不刷平台，对你来说？',
    options: [
      { text: '挺舒服，脑子能静一下', value: 1 },
      { text: '能做到，但会手痒', value: 2 },
      { text: '不可能，完全不可能', value: 3 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
