// 互联网冲浪人格测试 - 30 道短场景题
const questions = [
  {
    id: 'q1',
    dim: 'RADAR',
    text: '新梗刚冒头，你？',
    options: [
      { text: '两天后才知道大家在笑什么', score: -2, types: {} },
      { text: '先潜水补课，再决定跟不跟', score: 0, types: {} },
      { text: '当天就能接上，还能顺手变体', score: 2, types: { KOUHAI: 1, GANG: 1, JIAHAO: 1, VALO: 1, GENSHIN: 1 } }
    ]
  },
  {
    id: 'q2',
    dim: 'RADAR',
    text: '评论区飘过一串黑话，你？',
    options: [
      { text: '看不懂，也懒得问', score: -2, types: {} },
      { text: '靠语境能猜个大概', score: 0, types: {} },
      { text: '不用解释，我还能接着补刀', score: 2, types: { GANG: 2, VALO: 1, GENSHIN: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q3',
    dim: 'RADAR',
    text: '朋友只发一句“这人味太重了”，你？',
    options: [
      { text: '没听懂他说哪挂', score: -2, types: {} },
      { text: '能大概猜到他在阴阳谁', score: 0, types: {} },
      { text: '不用展开，我已经懂完了', score: 2, types: { JIAHAO: 1, XYY: 1, GANG: 1 } }
    ]
  },
  {
    id: 'q4',
    dim: 'RADAR',
    text: '一个梗被全网复读三天，你？',
    options: [
      { text: '第三遍就烦了', score: -2, types: { DANREN: 1 } },
      { text: '看语境，真好笑就留', score: 0, types: {} },
      { text: '越烂越爱拿来改造', score: 2, types: { JIAHAO: 2, KOUHAI: 1, VALO: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q5',
    dim: 'FIRE',
    text: '看到明显逻辑漏洞，你？',
    options: [
      { text: '懒得回', score: -2, types: {} },
      { text: '心里吐槽一下就算了', score: 0, types: {} },
      { text: '不回两句浑身难受', score: 2, types: { GANG: 2, ANDROID: 2, KOUHAI: 1, VALO: 1 } }
    ]
  },
  {
    id: 'q6',
    dim: 'FIRE',
    text: '评论区又在吵手机阵营，你？',
    options: [
      { text: '懒得吵，能用就行', score: -2, types: {} },
      { text: '先看谁装得更狠', score: 0, types: { APPLE: 1, MONEY: 1 } },
      { text: '参数和生态这局我能吵到收摊', score: 2, types: { ANDROID: 2, GANG: 1, KOUHAI: 1 } }
    ]
  },
  {
    id: 'q7',
    dim: 'FIRE',
    text: '别人阴阳你一句，你？',
    options: [
      { text: '当没看见', score: -2, types: {} },
      { text: '回个表情，意思一下', score: 0, types: {} },
      { text: '今天必须补刀补满', score: 2, types: { GANG: 2, KOUHAI: 1, VALO: 1, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q8',
    dim: 'FIRE',
    text: '朋友开吹一件还没成的事，你？',
    options: [
      { text: '先别吹太早', score: -2, types: { GANG: 1 } },
      { text: '成了再庆祝', score: 0, types: { LIGONG: 1 } },
      { text: '我比他还能往大了吹', score: 2, types: { KOUHAI: 2, JIAHAO: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q9',
    dim: 'AURA',
    text: '发动态前你最在意？',
    options: [
      { text: '能发出去就行', score: -2, types: {} },
      { text: '别太尴尬', score: 0, types: {} },
      { text: '语气、排版、那股味都得对', score: 2, types: { APPLE: 2, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q10',
    dim: 'AURA',
    text: '换设备这事，你更看重？',
    options: [
      { text: '能打能扛最重要', score: -2, types: { ANDROID: 2, LIGONG: 1 } },
      { text: '别太丑，顺手就行', score: 0, types: {} },
      { text: '质感、生态、拿出来的气口', score: 2, types: { APPLE: 2, MONEY: 1 } }
    ]
  },
  {
    id: 'q11',
    dim: 'AURA',
    text: '你最想别人觉得你？',
    options: [
      { text: '别烦我就行', score: -2, types: { DANREN: 1 } },
      { text: '正常人一个', score: 0, types: {} },
      { text: '这人一看就有自己的味', score: 2, types: { JIAHAO: 1, APPLE: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q12',
    dim: 'ONLINE',
    text: '凌晨一点的你更像？',
    options: [
      { text: '早睡型选手', score: -2, types: {} },
      { text: '看两眼更新就撤', score: 0, types: {} },
      { text: '夜生活刚开机', score: 2, types: { LAOSHU: 2, DOOM: 1, VALO: 1, GENSHIN: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q13',
    dim: 'ONLINE',
    text: '两小时没刷任何平台，你？',
    options: [
      { text: '挺好，终于清净', score: -2, types: { DANREN: 1 } },
      { text: '有点空，但还能忍', score: 0, types: {} },
      { text: '像整个人掉线了', score: 2, types: { LAOSHU: 2, DOOM: 1, GENSHIN: 1, VALO: 1, HAIWANG: 1 } }
    ]
  },
  {
    id: 'q14',
    dim: 'ONLINE',
    text: '醒来第一件事通常是？',
    options: [
      { text: '先活人，不碰手机', score: -2, types: {} },
      { text: '扫一眼消息和热搜', score: 0, types: {} },
      { text: '直接开刷，像回工位', score: 2, types: { LAOSHU: 2, XYY: 1, VALO: 1, GENSHIN: 1 } }
    ]
  },
  {
    id: 'q15',
    dim: 'CIRCLE',
    text: '群里突然聊游戏资讯、版本改动、赛区黑话，你？',
    options: [
      { text: '没兴趣，直接划走', score: -2, types: {} },
      { text: '先看两眼大家在吵啥', score: 0, types: {} },
      { text: '我不仅听懂还能接梗', score: 2, types: { VALO: 2, GENSHIN: 2, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q16',
    dim: 'CIRCLE',
    text: '哪类内容最容易把你留住？',
    options: [
      { text: '实用信息和干货', score: -2, types: { LIGONG: 1, ANDROID: 1 } },
      { text: '人间抓马和评论区吵架', score: 0, types: { GANG: 1, KOUHAI: 1 } },
      { text: '角色、设定、赛区、圈内黑话', score: 2, types: { GENSHIN: 2, VALO: 2, XYY: 1 } }
    ]
  },
  {
    id: 'q17',
    dim: 'CIRCLE',
    text: '你喜欢的圈子被路人踩了一脚，你？',
    options: [
      { text: '懒得护', score: -2, types: {} },
      { text: '回一句差不多得了', score: 0, types: {} },
      { text: '立刻代入，像踩到我脸上', score: 2, types: { GENSHIN: 2, VALO: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q18',
    dim: 'DRAMA',
    text: '群里突然冷场，你？',
    options: [
      { text: '那就冷着', score: -2, types: { DANREN: 1 } },
      { text: '丢个表情续命', score: 0, types: {} },
      { text: '我来整一句把场子点着', score: 2, types: { JIAHAO: 1, KOUHAI: 1, VALO: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q19',
    dim: 'DRAMA',
    text: '朋友甩来逆天聊天记录，你？',
    options: [
      { text: '看完就完了', score: -2, types: {} },
      { text: '回一句太离谱了', score: 0, types: {} },
      { text: '我已经开始给它配旁白了', score: 2, types: { JIAHAO: 1, KOUHAI: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q20',
    dim: 'DRAMA',
    text: '别人一句模糊的话，你最容易？',
    options: [
      { text: '当他没说', score: -2, types: { DANREN: 1 } },
      { text: '琢磨两秒就算了', score: 0, types: {} },
      { text: '自己先脑补十集剧情', score: 2, types: { CLOWN: 2, FEI: 1, DOOM: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q21',
    dim: 'MOOD',
    text: '刷到别人晒对象、offer、生活，你？',
    options: [
      { text: '关我屁事', score: -2, types: { DANREN: 1 } },
      { text: '酸两秒，接着刷', score: 0, types: {} },
      { text: '一下被干成静音模式', score: 2, types: { DOOM: 2, FEI: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q22',
    dim: 'MOOD',
    text: '半夜翻到旧聊天记录，你？',
    options: [
      { text: '看见就关', score: -2, types: { DANREN: 1 } },
      { text: '停一下，但不多', score: 0, types: {} },
      { text: '越翻越上头，还要做精修', score: 2, types: { CLOWN: 2, FEI: 1, DOOM: 1 } }
    ]
  },
  {
    id: 'q23',
    dim: 'MOOD',
    text: '有人一句话戳到你痛处，你？',
    options: [
      { text: '没感觉', score: -2, types: { DANREN: 1 } },
      { text: '会不爽一下', score: 0, types: {} },
      { text: '表面没事，回去越想越多', score: 2, types: { DOOM: 2, CLOWN: 1, FEI: 1 } }
    ]
  },
  {
    id: 'q24',
    dim: 'RELATE',
    text: '喜欢的人回你一个“哦”，你？',
    options: [
      { text: '哦就哦，我继续过日子', score: -2, types: {} },
      { text: '会琢磨一下他啥意思', score: 0, types: { PURE: 1, CLOWN: 1 } },
      { text: '当晚开始复盘自己哪句说错了', score: 2, types: { FEI: 2, CLOWN: 1 } }
    ]
  },
  {
    id: 'q25',
    dim: 'RELATE',
    text: '同时和几个人都留着聊天口子，你？',
    options: [
      { text: '麻烦，断干净最好', score: -2, types: { PURE: 2 } },
      { text: '看情况，留一两个也正常', score: 0, types: {} },
      { text: '口子不能断，哪条线活了都不亏', score: 2, types: { HAIWANG: 2, MONEY: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q26',
    dim: 'RELATE',
    text: '“真心换真心”和“关系就是博弈”，你更信？',
    options: [
      { text: '真心至少得是真的', score: -2, types: { PURE: 2 } },
      { text: '分人，也分局', score: 0, types: {} },
      { text: '关系从来就是算位置和拿捏', score: 2, types: { HAIWANG: 1, XYY: 1, FEI: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q27',
    dim: 'PROJECTION',
    text: '刷到“男人没房没车别谈以后”，你？',
    options: [
      { text: '老土话术', score: -2, types: {} },
      { text: '难听，但现实', score: 0, types: { LIGONG: 1 } },
      { text: '这本来就是主线配置', score: 2, types: { LIGONG: 2, FEI: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q28',
    dim: 'PROJECTION',
    text: '女生突然主动跟你多说两句，你？',
    options: [
      { text: '正常接话，没啥波动', score: -2, types: { HAIWANG: 1 } },
      { text: '会多想一秒，但先装正常', score: 0, types: {} },
      { text: '人先红温，回家还能复盘半天', score: 2, types: { FEI: 2, XYY: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q29',
    dim: 'PROJECTION',
    text: '刷到西装、酒局、名表、身边总有人围着转那类视频，你？',
    options: [
      { text: '当段子看', score: -2, types: {} },
      { text: '会觉得这人挺会包装', score: 0, types: { MONEY: 1, APPLE: 1 } },
      { text: '这味儿才像站在高位的人', score: 2, types: { MONEY: 3, HAIWANG: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q30',
    dim: 'PROJECTION',
    text: '刷到把一切都往欲望、拿捏、服从、链接上讲的话，你？',
    options: [
      { text: '又来了，土得发亮', score: -2, types: { GANG: 1, ANDROID: 1, PURE: 1 } },
      { text: '当乐子看，偶尔也能听两句', score: 0, types: {} },
      { text: '别说，还真能解释很多事', score: 2, types: { XYY: 3, FEI: 1, HAIWANG: 1 } }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
