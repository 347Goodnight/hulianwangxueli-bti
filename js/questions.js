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
    text: '刷到“沸羊羊、原批、老钱、小处男”这些词，你？',
    options: [
      { text: '看不太懂，划走', value: 1 },
      { text: '先看评论区怎么用', value: 2 },
      { text: '秒懂，甚至已经想接一句', value: 3 }
    ]
  },
  {
    id: 'q3',
    dim: 'M1',
    text: '朋友甩来一句“这人苹果味太冲了”，你？',
    options: [
      { text: '完全没听懂', value: 1 },
      { text: '大概知道在阴阳什么', value: 2 },
      { text: '不用解释，我甚至能补十句', value: 3 }
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
    text: '评论区又在吵苹果安卓，你？',
    options: [
      { text: '路过，当没看见', value: 1 },
      { text: '看两眼，顺手点个赞', value: 2 },
      { text: '不下场难受，必须说两句', value: 3 }
    ]
  },
  {
    id: 'q6',
    dim: 'M2',
    text: '你最容易在哪种时刻开杠？',
    options: [
      { text: '基本不想杠', value: 1 },
      { text: '被说急了才回', value: 2 },
      { text: '看到逻辑漏洞就手痒', value: 3 }
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
    text: '换手机这事，你更看重？',
    options: [
      { text: '功能顺手最重要', value: 1 },
      { text: '别太难看，够用就行', value: 2 },
      { text: '生态、质感、拿出来的气口', value: 3 }
    ]
  },
  {
    id: 'q9',
    dim: 'M3',
    text: '你发一段话，最想别人觉得你？',
    options: [
      { text: '挺正常一人', value: 1 },
      { text: '有点东西', value: 2 },
      { text: '这人一看就很有那味', value: 3 }
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
    text: '群里开始聊游戏资讯、版本改动、赛区消息，你？',
    options: [
      { text: '没兴趣，直接划走', value: 1 },
      { text: '先看看大家在吵什么', value: 2 },
      { text: '立刻加入，强度和梗都得跟上', value: 3 }
    ]
  },
  {
    id: 'q14',
    dim: 'M5',
    text: '哪类内容最容易把你留住？',
    options: [
      { text: '实用信息和干货', value: 1 },
      { text: '情绪八卦和抓马', value: 2 },
      { text: '角色设定、纸片人、圈内黑话', value: 3 }
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
      { text: '已经想好怎么挂成名场面了', value: 3 }
    ]
  },
  {
    id: 'q18',
    dim: 'M6',
    text: '朋友聚会突然冷场三秒，你会？',
    options: [
      { text: '低头喝口水，等别人开口', value: 1 },
      { text: '顺手丢一句，先把场子接住', value: 2 },
      { text: '直接接管气氛，必须把场子抬起来', value: 3 }
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
      { text: '一下就被干出静音感', value: 3 }
    ]
  },
  {
    id: 'q21',
    dim: 'M7',
    text: '喜欢的人回你一个“哦”，你？',
    options: [
      { text: '哦就哦，继续过日子', value: 1 },
      { text: '会琢磨一下什么意思', value: 2 },
      { text: '当晚开始复盘自己哪句说错了', value: 3 }
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
    text: '半夜翻到旧聊天记录，你更像？',
    options: [
      { text: '翻到就关，没兴趣', value: 1 },
      { text: '会看两眼感慨一下', value: 2 },
      { text: '越看越上头，情绪直接返场', value: 3 }
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
    text: '你更信哪套人生模板？',
    options: [
      { text: '自己舒服就行，别给我上课', value: 1 },
      { text: '稳定工作，正常过日子', value: 2 },
      { text: '房车、老婆、孩子、体面，一样都不能少', value: 3 }
    ]
  },
  {
    id: 'q28',
    dim: 'M10',
    text: '女生突然主动跟你多说两句，你？',
    options: [
      { text: '正常聊两句就过了', value: 1 },
      { text: '会多想一秒，但尽量装正常', value: 2 },
      { text: '人已经红温，回家还要复盘半天', value: 3 }
    ]
  },
  {
    id: 'q29',
    dim: 'M10',
    text: '两个人对视三秒，评论区全在嗑，你？',
    options: [
      { text: '这也能嗑？', value: 1 },
      { text: '有点那味，但不至于', value: 2 },
      { text: '我连后续剧情都脑补完了', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'M10',
    text: '刷到“性压抑论、链接、拿捏、服从性测试”这套词，你？',
    options: [
      { text: '又土又装', value: 1 },
      { text: '当抽象乐子看看', value: 2 },
      { text: '虽然难听，但很多事真能往这上套', value: 3 }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
