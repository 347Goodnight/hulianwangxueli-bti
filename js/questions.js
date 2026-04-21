// 互联网冲浪人格测试 - 30 道短场景题

const questions = [
  {
    id: 'q1',
    dim: 'M1',
    text: '新梗刚冒头，你一般？',
    options: [
      { text: '过两天才知道大家在笑什么', value: 1 },
      { text: '先潜水补课，再决定跟不跟', value: 2 },
      { text: '当天就能接上，还能顺手魔改', value: 3 }
    ]
  },
  {
    id: 'q2',
    dim: 'M1',
    text: '刷到“海王、杠精、原批、沸羊羊”这些词，你？',
    options: [
      { text: '看不太懂，划走', value: 1 },
      { text: '先看评论区怎么用', value: 2 },
      { text: '秒懂，甚至已经想接一句', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'M1',
    text: '朋友突然甩来一句圈内黑话，你？',
    options: [
      { text: '回个问号', value: 1 },
      { text: '先套上下文', value: 2 },
      { text: '立刻接梗，顺手压他一头', value: 3 }
    ]
  },
  {
    id: 'q4',
    dim: 'M2',
    text: '有人说你这发言味太重了，你？',
    options: [
      { text: '不回，懒得搭理', value: 1 },
      { text: '阴阳一句意思意思', value: 2 },
      { text: '今天必须狠狠干到他闭嘴', value: 3 }
    ]
  },
  {
    id: 'q5',
    dim: 'M2',
    text: '评论区已经开始互咬，你更像？',
    options: [
      { text: '看两眼就撤', value: 1 },
      { text: '挑个顺眼的帮一句', value: 2 },
      { text: '不下场难受，必须补两脚', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'M2',
    text: '别人把你喜欢的东西说得像垃圾，你？',
    options: [
      { text: '算了，犯不着', value: 1 },
      { text: '回一句纠正下', value: 2 },
      { text: '上截图上链接上情绪', value: 3 }
    ]
  },
  {
    id: 'q7',
    dim: 'M3',
    text: '发动态前你最在意？',
    options: [
      { text: '能发出去就行', value: 1 },
      { text: '至少别太土', value: 2 },
      { text: '语气、排版、那味都得对', value: 3 }
    ]
  },
  {
    id: 'q8',
    dim: 'M3',
    text: '别人夸你“很有那味”，你？',
    options: [
      { text: '没什么感觉', value: 1 },
      { text: '会暗爽一下', value: 2 },
      { text: '这就是我要的效果', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M3',
    text: '你说话更接近？',
    options: [
      { text: '有啥说啥，不拐弯', value: 1 },
      { text: '看场合，偶尔带点味', value: 2 },
      { text: '不拐两下根本不像我', value: 3 }
    ]
  },
  {
    id: 'q10',
    dim: 'M4',
    text: '醒来第一件事通常是？',
    options: [
      { text: '先活人，不看手机', value: 1 },
      { text: '扫一眼消息和热搜', value: 2 },
      { text: '直接开刷，像回工位', value: 3 }
    ]
  },
  {
    id: 'q11',
    dim: 'M4',
    text: '凌晨一点的你更像？',
    options: [
      { text: '已经睡了', value: 1 },
      { text: '补两眼更新就撤', value: 2 },
      { text: '吃着夜宵继续冲浪', value: 3 }
    ]
  },
  {
    id: 'q12',
    dim: 'M4',
    text: '两小时没刷任何平台，你？',
    options: [
      { text: '挺舒服，难得清净', value: 1 },
      { text: '有点空，但还能忍', value: 2 },
      { text: '像整个人掉线了', value: 3 }
    ]
  },
  {
    id: 'q13',
    dim: 'M5',
    text: '别人一开口就是赛区黑话、角色厨、CP厨，你？',
    options: [
      { text: '懒得融入', value: 1 },
      { text: '先听听门道', value: 2 },
      { text: '立刻加入，不能显得外行', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'M5',
    text: '哪类内容最容易把你留住？',
    options: [
      { text: '实用信息', value: 1 },
      { text: '情绪和八卦', value: 2 },
      { text: '设定、角色和圈内黑话', value: 3 }
    ]
  },
  {
    id: 'q15',
    dim: 'M5',
    text: '你喜欢的圈子被外人踩了一脚，你？',
    options: [
      { text: '路过，不想沾', value: 1 },
      { text: '回一句护一下', value: 2 },
      { text: '直接代入，像自家着火', value: 3 }
    ]
  },
  {
    id: 'q16',
    dim: 'M6',
    text: '群里突然冷场，你会？',
    options: [
      { text: '那就让它冷着', value: 1 },
      { text: '发个表情续命', value: 2 },
      { text: '起锅烧油，必须整点动静', value: 3 }
    ]
  },
  {
    id: 'q17',
    dim: 'M6',
    text: '朋友甩来一张逆天聊天记录，你？',
    options: [
      { text: '点个赞就走', value: 1 },
      { text: '回一句损的', value: 2 },
      { text: '已经想好怎么挂三天热梗了', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'M6',
    text: '线下尬住三秒，你会？',
    options: [
      { text: '装没事', value: 1 },
      { text: '丢句冷笑话圆一下', value: 2 },
      { text: '立刻上小品把场子抬住', value: 3 }
    ]
  },
  {
    id: 'q19',
    dim: 'M7',
    text: '有人一句话点到你痛处，你？',
    options: [
      { text: '没感觉，继续刷', value: 1 },
      { text: '会不爽一会儿', value: 2 },
      { text: '表面没事，回去越想越炸', value: 3 }
    ]
  },
  {
    id: 'q20',
    dim: 'M7',
    text: '刷到别人晒对象、工资、旅行，你？',
    options: [
      { text: '关我屁事', value: 1 },
      { text: '酸两秒继续刷', value: 2 },
      { text: '一下就被狠狠干出静音感', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'M7',
    text: '你发的内容被群嘲时，你通常？',
    options: [
      { text: '爱笑笑，不解释', value: 1 },
      { text: '嘴上没事，心里记账', value: 2 },
      { text: '立刻开始长文自证', value: 3 }
    ]
  },
  {
    id: 'q22',
    dim: 'M8',
    text: '如果今天彻底断网，你第一反应？',
    options: [
      { text: '当休假，挺好', value: 1 },
      { text: '有点空，但能过', value: 2 },
      { text: '世界突然黑了一块', value: 3 }
    ]
  },
  {
    id: 'q23',
    dim: 'M8',
    text: '看完一条烂情绪视频后，你更常？',
    options: [
      { text: '划走，没后劲', value: 1 },
      { text: '会短暂代入一下', value: 2 },
      { text: '低气压直接跟到下一顿饭', value: 3 }
    ]
  },
  {
    id: 'q24',
    dim: 'M8',
    text: '你对“大家都在表演幸福”这话？',
    options: [
      { text: '太夸张了', value: 1 },
      { text: '有点道理', value: 2 },
      { text: '说到我心缝里了', value: 3 }
    ]
  },
  {
    id: 'q25',
    dim: 'M9',
    text: '刷到“没房没车谈什么结婚”，你？',
    options: [
      { text: '这套太老土', value: 1 },
      { text: '难听，但现实', value: 2 },
      { text: '本来就该先把这些配齐', value: 3 }
    ]
  },
  {
    id: 'q26',
    dim: 'M9',
    text: '刷到老钱、酒会、年轻女孩围着转那种视频，你？',
    options: [
      { text: '当抽象乐子看', value: 1 },
      { text: '挺会包装的', value: 2 },
      { text: '这才是男人该混成的样子', value: 3 }
    ]
  },
  {
    id: 'q27',
    dim: 'M9',
    text: '你更认同哪种人生主线？',
    options: [
      { text: '自己舒服最重要', value: 1 },
      { text: '稳定工作加普通生活', value: 2 },
      { text: '房车对象孩子一步都不能落', value: 3 }
    ]
  },
  {
    id: 'q28',
    dim: 'M10',
    text: '刷到“她就是在试探你”这种视频，你？',
    options: [
      { text: '土得发笑，划走', value: 1 },
      { text: '看眼评论区图一乐', value: 2 },
      { text: '越看越觉得人性确实就这套', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'M10',
    text: '两个人对视三秒，评论区全在嗑，你？',
    options: [
      { text: '这也能嗑？', value: 1 },
      { text: '有点那味，但不至于', value: 2 },
      { text: '我连暧昧线都脑补完了', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'M10',
    text: '看到“服从性测试、拿捏、慕强”这套词，你？',
    options: [
      { text: '又土又装', value: 1 },
      { text: '当抽象乐子看看', value: 2 },
      { text: '虽然难听，但感觉确实有点真', value: 3 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
