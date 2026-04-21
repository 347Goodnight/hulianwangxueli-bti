// 互联网冲浪人格测试 - 30 道短场景题
const questions = [
  {
    id: 'q1',
    dim: 'RADAR',
    text: '新梗刚冒头时，你一般？',
    options: [
      { text: '过两天才知道大家在玩什么', score: -2, types: {} },
      { text: '先看看语境，再决定跟不跟', score: 0, types: {} },
      { text: '当天就能接上，顺手还能改一版', score: 2, types: { KOUHAI: 1, GANG: 1, JIAHAO: 1, VALO: 1, GENSHIN: 1 } }
    ]
  },
  {
    id: 'q2',
    dim: 'RADAR',
    text: '评论区突然刷过一串黑话，你？',
    options: [
      { text: '看不懂，也懒得去查', score: -2, types: {} },
      { text: '靠前后文能猜个差不多', score: 0, types: {} },
      { text: '不用解释，我甚至还能顺着说', score: 2, types: { GANG: 2, VALO: 1, GENSHIN: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q3',
    dim: 'RADAR',
    text: '朋友甩来一句“这人味太重了”，你？',
    options: [
      { text: '没太听懂他在说哪种人', score: -2, types: {} },
      { text: '能猜到他在点谁', score: 0, types: {} },
      { text: '不用展开，我已经脑补完了', score: 2, types: { JIAHAO: 1, XYY: 1, GANG: 1 } }
    ]
  },
  {
    id: 'q4',
    dim: 'RADAR',
    text: '一个梗被全网复读三天后，你？',
    options: [
      { text: '刷到第三遍就开始烦', score: -2, types: { DANREN: 1 } },
      { text: '看场合，真好笑就继续玩', score: 0, types: {} },
      { text: '越被玩烂，我越想拿来整活', score: 2, types: { JIAHAO: 2, KOUHAI: 1, VALO: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q5',
    dim: 'FIRE',
    text: '刷到明显逻辑漏洞，你？',
    options: [
      { text: '懒得搭理', score: -2, types: {} },
      { text: '心里吐槽两句就过去了', score: 0, types: {} },
      { text: '不回两句我真的难受', score: 2, types: { GANG: 2, ANDROID: 2, KOUHAI: 1, VALO: 1 } }
    ]
  },
  {
    id: 'q6',
    dim: 'FIRE',
    text: '评论区又在吵手机阵营，你？',
    options: [
      { text: '懒得吵，能用就行', score: -2, types: {} },
      { text: '先看看谁味儿更冲', score: 0, types: { APPLE: 1, MONEY: 1 } },
      { text: '参数和生态，我能跟他掰到底', score: 2, types: { ANDROID: 2, GANG: 1, KOUHAI: 1 } }
    ]
  },
  {
    id: 'q7',
    dim: 'FIRE',
    text: '别人阴阳你一句时，你？',
    options: [
      { text: '当没看见，直接划过', score: -2, types: {} },
      { text: '回个表情，点到为止', score: 0, types: {} },
      { text: '这口气我必须给他还回去', score: 2, types: { GANG: 2, KOUHAI: 1, VALO: 1, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q8',
    dim: 'FIRE',
    text: '朋友开始吹一件还没成的事，你？',
    options: [
      { text: '先别吹，成了再说', score: -2, types: { GANG: 1 } },
      { text: '真成了再庆祝也不迟', score: 0, types: { LIGONG: 1 } },
      { text: '这我熟，我能帮他吹得更大', score: 2, types: { KOUHAI: 2, JIAHAO: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q9',
    dim: 'AURA',
    text: '发动态前，你最在意什么？',
    options: [
      { text: '能发出去就行', score: -2, types: {} },
      { text: '别太尬就行', score: 0, types: {} },
      { text: '语气、排版、那股感觉都得对', score: 2, types: { APPLE: 2, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q10',
    dim: 'AURA',
    text: '换设备时，你更看重什么？',
    options: [
      { text: '耐用好使最重要', score: -2, types: { ANDROID: 2, LIGONG: 1 } },
      { text: '别太难看，顺手就行', score: 0, types: {} },
      { text: '质感、生态，还有拿出来那一下', score: 2, types: { APPLE: 2, MONEY: 1 } }
    ]
  },
  {
    id: 'q11',
    dim: 'AURA',
    text: '你最想别人怎么看你？',
    options: [
      { text: '别来烦我就行', score: -2, types: { DANREN: 1 } },
      { text: '普通正常人一个', score: 0, types: {} },
      { text: '这人一看就挺有自己那套', score: 2, types: { JIAHAO: 1, APPLE: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q12',
    dim: 'ONLINE',
    text: '凌晨一点的你，一般是什么状态？',
    options: [
      { text: '早就睡了', score: -2, types: {} },
      { text: '看两眼更新就准备撤', score: 0, types: {} },
      { text: '这才算正式上线', score: 2, types: { LAOSHU: 2, DOOM: 1, VALO: 1, GENSHIN: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q13',
    dim: 'ONLINE',
    text: '两小时没刷任何平台时，你会？',
    options: [
      { text: '挺好，难得清净', score: -2, types: { DANREN: 1 } },
      { text: '有点空，但还能忍住', score: 0, types: {} },
      { text: '像整个人突然断网了', score: 2, types: { LAOSHU: 2, DOOM: 1, GENSHIN: 1, VALO: 1, HAIWANG: 1 } }
    ]
  },
  {
    id: 'q14',
    dim: 'ONLINE',
    text: '你醒来第一件事通常是？',
    options: [
      { text: '先清醒一下，不碰手机', score: -2, types: {} },
      { text: '先扫一眼消息和热搜', score: 0, types: {} },
      { text: '直接开刷，像打卡上班', score: 2, types: { LAOSHU: 2, XYY: 1, VALO: 1, GENSHIN: 1 } }
    ]
  },
  {
    id: 'q15',
    dim: 'CIRCLE',
    text: '群里突然开始聊游戏资讯、版本改动、赛区黑话，你？',
    options: [
      { text: '没兴趣，直接划走', score: -2, types: {} },
      { text: '先看两眼大家到底在吵啥', score: 0, types: {} },
      { text: '不光听得懂，我还能马上接上', score: 2, types: { VALO: 2, GENSHIN: 2, JIAHAO: 1 } }
    ]
  },
  {
    id: 'q16',
    dim: 'CIRCLE',
    text: '哪类内容最容易让你停下来？',
    options: [
      { text: '实用信息和真干货', score: -2, types: { LIGONG: 1, ANDROID: 1 } },
      { text: '抓马和评论区对喷', score: 0, types: { GANG: 1, KOUHAI: 1 } },
      { text: '角色、设定、赛区、圈内黑话', score: 2, types: { GENSHIN: 2, VALO: 2, XYY: 1 } }
    ]
  },
  {
    id: 'q17',
    dim: 'CIRCLE',
    text: '你喜欢的圈子被路人踩了一脚时，你？',
    options: [
      { text: '懒得护，爱说说去', score: -2, types: {} },
      { text: '回一句差不多行了', score: 0, types: {} },
      { text: '一下就代入了，像在踩我', score: 2, types: { GENSHIN: 2, VALO: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q18',
    dim: 'DRAMA',
    text: '群里突然冷场时，你会？',
    options: [
      { text: '冷着就冷着吧', score: -2, types: { DANREN: 1 } },
      { text: '丢个表情把气氛续一下', score: 0, types: {} },
      { text: '我会来一句，把场子重新点起来', score: 2, types: { JIAHAO: 1, KOUHAI: 1, VALO: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q19',
    dim: 'DRAMA',
    text: '朋友甩来一段逆天聊天记录，你？',
    options: [
      { text: '看完笑一下就过去了', score: -2, types: {} },
      { text: '回一句太离谱了', score: 0, types: {} },
      { text: '我已经开始脑补配音和旁白了', score: 2, types: { JIAHAO: 1, KOUHAI: 1, CLOWN: 1 } }
    ]
  },
  {
    id: 'q20',
    dim: 'DRAMA',
    text: '别人丢下一句模糊的话，你最容易？',
    options: [
      { text: '当他没说，直接略过', score: -2, types: { DANREN: 1 } },
      { text: '琢磨两秒，也就过去了', score: 0, types: {} },
      { text: '我自己先脑补出一整部连续剧', score: 2, types: { CLOWN: 2, FEI: 1, DOOM: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q21',
    dim: 'MOOD',
    text: '刷到别人晒对象、offer、生活时，你？',
    options: [
      { text: '关我什么事，继续刷', score: -2, types: { DANREN: 1 } },
      { text: '酸两秒，然后划走', score: 0, types: {} },
      { text: '一下就被干沉默了', score: 2, types: { DOOM: 2, FEI: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q22',
    dim: 'MOOD',
    text: '半夜翻到旧聊天记录时，你？',
    options: [
      { text: '扫一眼就关掉', score: -2, types: { DANREN: 1 } },
      { text: '会停一下，但不会陷进去', score: 0, types: {} },
      { text: '越翻越上头，还想把细节全补齐', score: 2, types: { CLOWN: 2, FEI: 1, DOOM: 1 } }
    ]
  },
  {
    id: 'q23',
    dim: 'MOOD',
    text: '有人一句话戳到你痛处时，你？',
    options: [
      { text: '表面上真没啥感觉', score: -2, types: { DANREN: 1 } },
      { text: '会不爽一下，但很快过去', score: 0, types: {} },
      { text: '当下装没事，回去越想越多', score: 2, types: { DOOM: 2, CLOWN: 1, FEI: 1 } }
    ]
  },
  {
    id: 'q24',
    dim: 'RELATE',
    text: '喜欢的人只回你一个“哦”，你？',
    options: [
      { text: '哦就哦，我继续干我的', score: -2, types: {} },
      { text: '会琢磨一下他到底什么意思', score: 0, types: { PURE: 1, CLOWN: 1 } },
      { text: '晚上开始复盘自己是不是说错话了', score: 2, types: { FEI: 2, CLOWN: 1 } }
    ]
  },
  {
    id: 'q25',
    dim: 'RELATE',
    text: '同时和几个人都留着聊天窗口，你？',
    options: [
      { text: '太麻烦了，不如断干净', score: -2, types: { PURE: 2 } },
      { text: '看情况，留一两个也正常', score: 0, types: {} },
      { text: '先聊着再说，哪条线活了都不亏', score: 2, types: { HAIWANG: 2, MONEY: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q26',
    dim: 'RELATE',
    text: '“真心换真心”和“关系本来就是博弈”，你更信哪边？',
    options: [
      { text: '真心至少得是真的', score: -2, types: { PURE: 2 } },
      { text: '得看人，也得看情况', score: 0, types: {} },
      { text: '关系说到底就是位置和拿捏', score: 2, types: { HAIWANG: 1, XYY: 1, FEI: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q27',
    dim: 'PROJECTION',
    text: '刷到“男人没房没车别谈以后”这种话，你？',
    options: [
      { text: '这套说法也太老土了', score: -2, types: {} },
      { text: '虽然难听，但也不是没道理', score: 0, types: { LIGONG: 1 } },
      { text: '本来就该先把这些配齐', score: 2, types: { LIGONG: 2, FEI: 1, MONEY: 1 } }
    ]
  },
  {
    id: 'q28',
    dim: 'PROJECTION',
    text: '女生突然主动跟你多说两句时，你？',
    options: [
      { text: '正常接话，没什么波动', score: -2, types: { HAIWANG: 1 } },
      { text: '会多想一秒，但表面先装正常', score: 0, types: {} },
      { text: '当场就有点红温，回去还会复盘', score: 2, types: { FEI: 2, XYY: 1, PURE: 1 } }
    ]
  },
  {
    id: 'q29',
    dim: 'PROJECTION',
    text: '刷到西装、酒局、名表、身边总有人围着转那类视频，你？',
    options: [
      { text: '当个段子看完就算', score: -2, types: {} },
      { text: '会觉得这人确实挺会包装自己', score: 0, types: { MONEY: 1, APPLE: 1 } },
      { text: '这才像真有点高位那味儿', score: 2, types: { MONEY: 3, HAIWANG: 1, XYY: 1 } }
    ]
  },
  {
    id: 'q30',
    dim: 'PROJECTION',
    text: '刷到那种把一切都往欲望、拿捏、服从、链接上讲的话，你？',
    options: [
      { text: '又来了，这套我真听烦了', score: -2, types: { GANG: 1, ANDROID: 1, PURE: 1 } },
      { text: '当乐子看，偶尔听两句也行', score: 0, types: {} },
      { text: '别说，这套有时候还真解释得通', score: 2, types: { XYY: 3, FEI: 1, HAIWANG: 1 } }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
