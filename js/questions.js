// 互联网冲浪人格测试 - 30 道场景题

const questions = [
  // M1 热梗雷达
  {
    id: 'q1',
    dim: 'M1',
    text: '新梗刚冒头，你一般？',
    options: [
      { text: '三天后才知道大家在笑什么', value: 1 },
      { text: '先存着看看，过两天再用', value: 2 },
      { text: '当天就能接上，还能顺手魔改', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'M1',
    text: '评论区突然满屏同一句怪话，你？',
    options: [
      { text: '看不懂，直接划走', value: 1 },
      { text: '先看两眼，慢慢猜意思', value: 2 },
      { text: '秒懂出处，甚至想跟一句', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'M1',
    text: '朋友发来一张抽象梗图，你会？',
    options: [
      { text: '问他这图到底在干吗', value: 1 },
      { text: '大概懂，但笑得不算痛快', value: 2 },
      { text: '立刻回敬三张同等级的', value: 3 }
    ]
  },

  // M2 对线火力
  {
    id: 'q4',
    dim: 'M2',
    text: '评论区有人阴阳你，你？',
    options: [
      { text: '算了，拉黑省事', value: 1 },
      { text: '回一句，点到为止', value: 2 },
      { text: '开战，今晚谁都别睡', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'M2',
    text: '群里有人硬杠一个离谱观点，你？',
    options: [
      { text: '看戏，不下场', value: 1 },
      { text: '提醒一句差不多得了', value: 2 },
      { text: '我来，让他知道什么叫加练', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'M2',
    text: '直播间钓鱼怪开始带节奏，你？',
    options: [
      { text: '退出，不陪玩', value: 1 },
      { text: '发个问号试探一下', value: 2 },
      { text: '当场接管弹幕，把他冲烂', value: 3 }
    ]
  },

  // M3 阴阳段位
  {
    id: 'q7',
    dim: 'M3',
    text: '朋友又来晒新手机，你一般？',
    options: [
      { text: '真不错，恭喜', value: 1 },
      { text: '可以啊，预算挺自由', value: 2 },
      { text: '不会吧，这年头还得特意晒这个', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'M3',
    text: '有人发言很蠢，但你懒得明说，你会？',
    options: [
      { text: '那就不说', value: 1 },
      { text: '委婉提醒一下', value: 2 },
      { text: '先夸一句，再把刀递进去', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M3',
    text: '你最常见的说话方式是？',
    options: [
      { text: '有啥说啥，不拐弯', value: 1 },
      { text: '看场合，偶尔夹点味', value: 2 },
      { text: '正常说话太亏，必须带刺', value: 3 }
    ]
  },

  // M4 冲浪浓度
  {
    id: 'q10',
    dim: 'M4',
    text: '你每天刷手机大概多久？',
    options: [
      { text: '碎片时间随便看看', value: 1 },
      { text: '有空就刷，挺稳定', value: 2 },
      { text: '除了睡觉基本都在线', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'M4',
    text: '早上睁眼第一件事通常是？',
    options: [
      { text: '先起床，不碰手机', value: 1 },
      { text: '看眼消息再说', value: 2 },
      { text: '先刷两轮热搜和抖音', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'M4',
    text: '凌晨一点的你，多半在？',
    options: [
      { text: '睡了，互联网明天再见', value: 1 },
      { text: '偶尔补两眼更新', value: 2 },
      { text: '在不同平台来回巡逻', value: 3 }
    ]
  },

  // M5 整活欲望
  {
    id: 'q13',
    dim: 'M5',
    text: '群聊突然冷场，你会？',
    options: [
      { text: '那就让它冷着', value: 1 },
      { text: '发个表情包续命', value: 2 },
      { text: '必须起锅烧油，整点动静', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'M5',
    text: '朋友发自拍，你评论区通常？',
    options: [
      { text: '点赞走人', value: 1 },
      { text: '夸一句顺便玩个轻梗', value: 2 },
      { text: '现场写台词，把楼带歪', value: 3 }
    ]
  },
  {
    id: 'q15',
    dim: 'M5',
    text: '现实里有点尴尬时，你第一反应？',
    options: [
      { text: '沉默糊过去', value: 1 },
      { text: '讲个冷笑话缓一下', value: 2 },
      { text: '直接把自己当节目做', value: 3 }
    ]
  },

  // M6 复读扩散
  {
    id: 'q16',
    dim: 'M6',
    text: '某句热梗火起来后，你？',
    options: [
      { text: '基本不用，嫌吵', value: 1 },
      { text: '熟了才偶尔跟一句', value: 2 },
      { text: '逮到谁都要复读一遍', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'M6',
    text: '朋友发了个爆款模板，你会？',
    options: [
      { text: '看过就算了', value: 1 },
      { text: '顺手转给一两个熟人', value: 2 },
      { text: '全平台扩散，生怕别人没看到', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'M6',
    text: '你表达观点更像？',
    options: [
      { text: '自己慢慢组织语言', value: 1 },
      { text: '原创和套梗一半一半', value: 2 },
      { text: '拿现成热句往上一套就完事', value: 3 }
    ]
  },

  // M7 破防系数
  {
    id: 'q19',
    dim: 'M7',
    text: '有人回你一句“急了”，你？',
    options: [
      { text: '无所谓，继续吃饭', value: 1 },
      { text: '有点烦，但还能忍', value: 2 },
      { text: '你别说，还真被点着了', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'M7',
    text: '刷到别人晒工资、对象、假期，你？',
    options: [
      { text: '划走，和我没关系', value: 1 },
      { text: '酸两秒，然后继续活', value: 2 },
      { text: '不装了，心态已经裂开', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'M7',
    text: '你发的内容被群嘲时，一般？',
    options: [
      { text: '爱笑笑，懒得删', value: 1 },
      { text: '嘴上没事，心里记账', value: 2 },
      { text: '开始解释，越解释越上头', value: 3 }
    ]
  },

  // M8 吃瓜参与
  {
    id: 'q22',
    dim: 'M8',
    text: '热搜上两拨人撕起来了，你？',
    options: [
      { text: '看个标题就走', value: 1 },
      { text: '蹲评论区，补补前情', value: 2 },
      { text: '全链路追更，顺手点火', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'M8',
    text: '遇到明显钓鱼帖，你通常？',
    options: [
      { text: '无视，不上当', value: 1 },
      { text: '先看看有没有人中招', value: 2 },
      { text: '故意陪他演，等着收网', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'M8',
    text: '一个瓜开始反转，你第一反应？',
    options: [
      { text: '行吧，和我无关', value: 1 },
      { text: '回去补一下时间线', value: 2 },
      { text: '太香了，今晚必须跟完整套', value: 3 }
    ]
  },

  // M9 人设表演
  {
    id: 'q25',
    dim: 'M9',
    text: '你网上和现实里的你，像吗？',
    options: [
      { text: '差不多，没必要演', value: 1 },
      { text: '会调一下滤镜，但不离谱', value: 2 },
      { text: '完全两个人，主打一个账号人格', value: 3 }
    ]
  },
  {
    id: 'q26',
    dim: 'M9',
    text: '发动态前你最在意什么？',
    options: [
      { text: '想发就发，不排练', value: 1 },
      { text: '文案顺一点就行', value: 2 },
      { text: '必须有氛围、有立场、有人设', value: 3 }
    ]
  },
  {
    id: 'q27',
    dim: 'M9',
    text: '别人说你“挺有号感”，你会？',
    options: [
      { text: '莫名其妙，我就是我', value: 1 },
      { text: '也许吧，多少会包装一下', value: 2 },
      { text: '谢谢认可，我的人设本来就很完整', value: 3 }
    ]
  },

  // M10 断网反应
  {
    id: 'q28',
    dim: 'M10',
    text: '如果今天彻底断网，你会？',
    options: [
      { text: '正好清净一天', value: 1 },
      { text: '不太习惯，但还能过', value: 2 },
      { text: '整个人像被拔了网线', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'M10',
    text: '手机只剩 5% 电时，你？',
    options: [
      { text: '随缘，没电就没电', value: 1 },
      { text: '先留着回消息', value: 2 },
      { text: '拼命找充电口，像在抢救自己', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'M10',
    text: '周末不刷任何平台，对你来说？',
    options: [
      { text: '挺好，脑子终于能静一静', value: 1 },
      { text: '能做到，但会手痒', value: 2 },
      { text: '不可能，完全不可能', value: 3 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
