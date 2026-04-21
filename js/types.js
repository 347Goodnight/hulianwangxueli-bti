// 互联网冲浪人格测试 - 热梗人格池

const personalityTypes = [
  {
    code: 'XYY',
    name: '性压抑派',
    category: '理论话术系',
    icon: '🧠',
    accent: '#ff6f7c',
    rarity: 'SSR',
    profile: {
      RADAR: 2,
      FIRE: 1,
      AURA: -1,
      ONLINE: 0,
      CIRCLE: 0,
      DRAMA: 0,
      MOOD: -1,
      RELATE: 1,
      PROJECTION: 2
    },
    weights: {
      RADAR: 1.15,
      AURA: 1.05,
      RELATE: 1.15,
      PROJECTION: 1.6
    },
    bias: 1,
    slogan: '别人看观点，你已经默认一切的根本都是链接。',
    description: '你刷到任何一本正经的人类学、关系学、情感学，最后都会被你导回到“本质上还是那点欲望和链接”。越正经的论述，你越爱往暧昧、性张力、男女博弈上面套，主打一个万物皆可往那边解释。',
    roast: '你不是理解能力强，你是已经把“链接”发展成了万能钥匙。',
    traits: ['峰学重度用户', '万物归链', '性张力雷达', '正经话题跑偏']
  },
  {
    code: 'APPLE',
    name: '苹果人',
    category: '理论话术系',
    icon: '🍎',
    accent: '#8f98a7',
    rarity: 'SR',
    profile: {
      RADAR: 0,
      FIRE: 0,
      AURA: 2,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: -1,
      MOOD: -1,
      RELATE: -1,
      PROJECTION: 0
    },
    weights: {
      AURA: 1.5,
      PROJECTION: 1
    },
    bias: -2,
    slogan: '你买的不是设备，是一整套看起来就很高级的生活。',
    description: '你对苹果味最敏感的地方从来不是参数，是气质。手机只是入口，后面可以一路延伸到桌搭、审美、消费和“我这人有品”的整体叙事，主打一个你不一定真贵，但你得看起来很会选。',
    roast: '你不是普通消费者，你是把生态活成了人格外设。',
    traits: ['质感优先', '生态叙事', '轻奢自觉', '审美带货']
  },
  {
    code: 'ANDROID',
    name: '安卓人',
    category: '理论话术系',
    icon: '🤖',
    accent: '#58a86b',
    rarity: 'N',
    profile: {
      RADAR: -1,
      FIRE: 1,
      AURA: -1,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: -2,
      MOOD: -1,
      RELATE: -1,
      PROJECTION: -1
    },
    weights: {
      FIRE: 1.5,
      AURA: 1.25,
      PROJECTION: 1.15
    },
    bias: 0,
    slogan: '你的人设不是被系统定义的，是靠反苹果完成的。',
    description: '你对苹果味的天然反应不是羡慕，是烦。你信参数、讲自由度、尊重功能性，也特别擅长用一句“这就很苹果”把对面那点优越感顶回去，主打一个务实到底，顺手再拆两句装杯话术。',
    roast: '你不是单纯务实，你是把反苹果也做成了完整人格工程。',
    traits: ['参数挂帅', '实用主义', '反苹果本能', '对线待机']
  },
  {
    code: 'LIGONG',
    name: '力工圣体',
    category: '现实投射系',
    icon: '🧱',
    accent: '#926b4f',
    rarity: 'R',
    profile: {
      RADAR: -1,
      FIRE: 1,
      AURA: -2,
      ONLINE: -2,
      CIRCLE: -2,
      DRAMA: -2,
      MOOD: -2,
      RELATE: 0,
      PROJECTION: 2
    },
    weights: {
      ONLINE: 1.1,
      PROJECTION: 1.5
    },
    bias: 1,
    slogan: '你的人生规划很简单，房车老婆孩子，少整虚的。',
    description: '你最烦那种飘着的人生叙事。什么情绪价值、什么精神世界、什么高级感，在你这都不如房子、车子、结婚、生娃和把日子过硬来得实在。你不是不懂浪漫，你是觉得先把现实配置拉满，别的都是后话。',
    roast: '你不是讨厌空话，你是恨不得把所有人都送去工地统一校正人生观。',
    traits: ['房车优先', '老婆孩子热炕头', '现实压过情绪', '结果导向']
  },
  {
    code: 'MONEY',
    name: 'Old Money',
    category: '现实投射系',
    icon: '🕶️',
    accent: '#9c7e4f',
    rarity: 'SSR',
    profile: {
      RADAR: 0,
      FIRE: -1,
      AURA: 1,
      ONLINE: -1,
      CIRCLE: 0,
      DRAMA: -1,
      MOOD: -1,
      RELATE: 2,
      PROJECTION: 2
    },
    weights: {
      AURA: 1.05,
      RELATE: 1.35,
      PROJECTION: 1.55
    },
    bias: 1,
    slogan: '你迷恋的不是钱本身，是那种老、稳、贵、女孩还围着转的秩序感。',
    description: '你对老钱味最上头的点，不只是有钱，而是那种从容、老练、背景厚、永远不缺年轻女孩环绕的高位秩序。你未必真懂上流社会，但你特别懂怎么把自己想象成那种喝一口酒就能让全场安静的男人。',
    roast: '你不是想有钱，你是想把钱、女人和阶层一起打包成天选气质。',
    traits: ['老钱幻觉', '高位秩序', '女孩环绕滤镜', '阶层想象']
  },
  {
    code: 'KOUHAI',
    name: '口嗨哥',
    category: '理论话术系',
    icon: '🗣️',
    accent: '#ff7b54',
    rarity: 'N',
    profile: {
      RADAR: 2,
      FIRE: 2,
      AURA: 1,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: 2,
      MOOD: -1,
      RELATE: -1,
      PROJECTION: -1
    },
    weights: {
      FIRE: 1.45,
      AURA: 1.2,
      DRAMA: 1.35
    },
    bias: 0,
    slogan: '你嘴上的战绩比现实履历厚，气势一开像已经赢完了。',
    description: '你最擅长的不是做成事，是把一件还没发生的事先说出八成成色。局势再一般，气口也不能怂；证据可以稍后补，态度必须先顶满，主打一个先把狠话放这儿。',
    roast: '你不是自信，你是太会把嘴上预告片当正式上映。',
    traits: ['气势先行', '嘴硬高配', '预判式装杯', '现实延迟到账']
  },
  {
    code: 'JIAHAO',
    name: '嘉豪',
    category: '抽象镜头系',
    icon: '😉',
    accent: '#7c4dff',
    rarity: 'R',
    profile: {
      RADAR: 1,
      FIRE: 0,
      AURA: 2,
      ONLINE: 1,
      CIRCLE: 0,
      DRAMA: 2,
      MOOD: 0,
      RELATE: -1,
      PROJECTION: -1
    },
    weights: {
      AURA: 1.7,
      DRAMA: 1.35,
      ONLINE: 1
    },
    bias: 1,
    slogan: '你还没说重点，气口和造型已经先赢了。',
    description: '你自带一种“让我来给你们说句实话”的口播男主气质，哪怕讲的是鸡毛蒜皮，也能讲出场域观察的味。你上网最强的从来不是内容，是主角感和压镜头能力。',
    roast: '你不是自信，你是太会把空气讲成自己的主场。',
    traits: ['主角感重', 'A+W气质', '口播腔', '镜头侵略性']
  },
  {
    code: 'HAIWANG',
    name: '海王',
    category: '抽象镜头系',
    icon: '🌊',
    accent: '#4f8dff',
    rarity: 'SR',
    profile: {
      RADAR: 0,
      FIRE: 0,
      AURA: 2,
      ONLINE: 2,
      CIRCLE: -1,
      DRAMA: 0,
      MOOD: -2,
      RELATE: 2,
      PROJECTION: 0
    },
    weights: {
      AURA: 1.2,
      ONLINE: 1.2,
      RELATE: 1.65,
      MOOD: 1.1
    },
    bias: 1,
    slogan: '你不一定真的爱很多人，但你绝不舍得把任何一条线彻底断掉。',
    description: '你最擅长的不是表白，是留口子。聊天框可以不火热，但绝不能熄火；关系可以不负责，但一定要保持暧昧流动，主打一个谁都没真正拥有你，谁又都觉得自己还剩点机会。',
    roast: '你不是情感丰富，你是太会给每个人留一截钩子。',
    traits: ['暧昧续杯', '关系留口', '不爱定性', '消息分层管理']
  },
  {
    code: 'LAOSHU',
    name: '老鼠人',
    category: '抽象镜头系',
    icon: '🐭',
    accent: '#7a6057',
    rarity: 'N',
    profile: {
      RADAR: -1,
      FIRE: -2,
      AURA: -1,
      ONLINE: 2,
      CIRCLE: 0,
      DRAMA: 0,
      MOOD: -1,
      RELATE: -2,
      PROJECTION: -2
    },
    weights: {
      ONLINE: 1.65,
      AURA: 1.05
    },
    bias: -1,
    slogan: '白天像待机，夜里才像真正上线。',
    description: '你这挂最典型的配置就是夜里刷到发亮，白天像没插电。房间暗一点，外卖近一点，社交少一点，整个人都像在低电量模式里勉强续命。',
    roast: '你不是朴素，你是把活着做成了省电设置。',
    traits: ['低能量续命', '夜间上线', '房间常暗', '外卖共生']
  },
  {
    code: 'CLOWN',
    name: '小丑',
    category: '抽象镜头系',
    icon: '🤡',
    accent: '#ff5f45',
    rarity: 'R',
    profile: {
      RADAR: 0,
      FIRE: -1,
      AURA: 0,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: 2,
      MOOD: 1,
      RELATE: 0,
      PROJECTION: -1
    },
    weights: {
      DRAMA: 1.75,
      MOOD: 1.1,
      RELATE: 0.95
    },
    bias: 2,
    slogan: '每次都说下次不这样了，下次还是第一时间对号入座。',
    description: '你最擅长的事，就是在还没搞清情况的时候先把自己代进去。别人一句模糊的话，你能脑补十集剧情；嘴上说算了，心里已经把自己演成了受害者、反派和观众三合一。',
    roast: '你不是共情能力强，你是太会主动给自己加戏。',
    traits: ['自我代入', '戏精复盘', '嘴硬心碎', '情绪加戏']
  },
  {
    code: 'DANREN',
    name: '淡人',
    category: '情绪文学系',
    icon: '😶',
    accent: '#8b98a8',
    rarity: 'N',
    profile: {
      RADAR: -1,
      FIRE: -2,
      AURA: -2,
      ONLINE: -1,
      CIRCLE: -2,
      DRAMA: -2,
      MOOD: -2,
      RELATE: -2,
      PROJECTION: -2
    },
    weights: {
      FIRE: 1.15,
      DRAMA: 1.15,
      MOOD: 1.15
    },
    bias: -2,
    slogan: '你不是没情绪，你只是懒得把每件破事都办成情绪公文。',
    description: '你刷到天塌热梗也只是“哦”一声，群里狠狠干起来你也能淡淡划走。不是你真超脱，是你懒得把有限电量浪费在每一场互联网事故上，能不表态就不表态，能摆就摆。',
    roast: '你不是佛，你是把“无所谓”练成了默认系统设置。',
    traits: ['低耗待机', '淡淡路过', '懒得破防', '摆烂有理']
  },
  {
    code: 'DOOM',
    name: 'Doomer',
    category: '情绪文学系',
    icon: '🌧️',
    accent: '#5c6370',
    rarity: 'R',
    profile: {
      RADAR: -2,
      FIRE: -2,
      AURA: -2,
      ONLINE: 0,
      CIRCLE: -2,
      DRAMA: 0,
      MOOD: 2,
      RELATE: -1,
      PROJECTION: -1
    },
    weights: {
      DRAMA: 1,
      MOOD: 1.65,
      ONLINE: 1.05
    },
    bias: 1,
    slogan: '梗你能看懂，但心情永远像阴天缓存。',
    description: '你刷网不是为了快乐，是为了给自己的低气压找点背景音。你很会在一条条热梗下面看出虚无、疲惫和“算了就这样吧”的底色，情绪像旧楼道，一进去就有回声。',
    roast: '你不是清醒，你是已经把悲观调成了默认主题。',
    traits: ['低气压常驻', '负面共鸣', '夜间沉底', '虚无感强']
  },
  {
    code: 'PURE',
    name: '纯爱战士',
    category: '现实投射系',
    icon: '💞',
    accent: '#ff8f8f',
    rarity: 'R',
    profile: {
      RADAR: -2,
      FIRE: -2,
      AURA: 0,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: 0,
      MOOD: 0,
      RELATE: 2,
      PROJECTION: 0
    },
    weights: {
      MOOD: 1,
      RELATE: 1.55,
      PROJECTION: 1
    },
    bias: 1,
    slogan: '你相信真心换真心，哪怕互联网天天拿这个打你脸。',
    description: '你在这个全员玩梗的互联网里，偏偏还保留着一点正经感情观。你对套路、算计和关系博弈都有本能反感，总觉得认真一点没什么不好，只是常常被现实教育。',
    roast: '你不是不懂套路，你是每次都决定再相信一次。',
    traits: ['真心主义', '厌恶算计', '婚恋认真', '容易心软']
  },
  {
    code: 'VALO',
    name: '瓦学弟',
    category: '赛区圈层系',
    icon: '🎮',
    accent: '#ff5d5d',
    rarity: 'SR',
    profile: {
      RADAR: 2,
      FIRE: 2,
      AURA: -1,
      ONLINE: 2,
      CIRCLE: 1,
      DRAMA: 1,
      MOOD: 0,
      RELATE: -1,
      PROJECTION: -1
    },
    weights: {
      FIRE: 1.45,
      ONLINE: 1.15,
      CIRCLE: 1.25
    },
    bias: 1,
    slogan: '房间还没进，你的语音情绪已经先热身了。',
    description: '你最适合把竞技游戏打成情绪综艺，一开麦就像有人替你按下节目开始。输赢、队友、枪法和面子都是绑定的，路人局也能被你打出兄弟局和家门口火并的氛围。',
    roast: '你不是在打瓦，你是在拿排位练人格硬度。',
    traits: ['开麦上头', '兄弟局气质', '输赢挂脸', '语音人格']
  },
  {
    code: 'FEI',
    name: '沸羊羊',
    category: '现实投射系',
    icon: '🐏',
    accent: '#ffa24c',
    rarity: 'SR',
    profile: {
      RADAR: -1,
      FIRE: -1,
      AURA: -1,
      ONLINE: -1,
      CIRCLE: -1,
      DRAMA: 1,
      MOOD: 2,
      RELATE: 2,
      PROJECTION: 2
    },
    weights: {
      DRAMA: 1.05,
      MOOD: 1.35,
      RELATE: 1.5,
      PROJECTION: 1.4
    },
    bias: 1,
    slogan: '你不是单纯深情，你是能把服从、付出和自我感动一条龙做完。',
    description: '你这挂最典型的症状，就是永远在为女神跑前跑后，嘴上说我自愿，心里还是盼着哪天能被回头看一眼。你很会牺牲、很会脑补、也很会把自己的吃亏包装成真爱，主打一个龟得体面，舔得认真。',
    roast: '你不是恋爱脑，你是把被吊着走也过成了英雄叙事。',
    traits: ['舔狗叙事', '女神优先', '自我感动', '被拿捏体质']
  },
  {
    code: 'GENSHIN',
    name: '原批',
    category: '赛区圈层系',
    icon: '✨',
    accent: '#5d8fff',
    rarity: 'SSR',
    profile: {
      RADAR: 2,
      FIRE: 0,
      AURA: 1,
      ONLINE: 2,
      CIRCLE: 2,
      DRAMA: 0,
      MOOD: 1,
      RELATE: 0,
      PROJECTION: 0
    },
    weights: {
      ONLINE: 1.1,
      CIRCLE: 1.8,
      AURA: 1.05
    },
    bias: 1,
    slogan: '你不一定在谈恋爱，但你的生活里一定住着纸片人。',
    description: '你这挂最明显的特征不是玩得多，是代入得深。角色、设定、剧情、厨力、CP、语音、立绘，全都能成为你日常生活的精神供给。现实对象可以没有，纸片人必须有；三次元再烦，也不耽误你把二次元当生活重心。',
    roast: '你不是单纯喜欢，你是已经把纸片人供成了日常精神主粮。',
    traits: ['纸片人优先', '角色代入', '厨力常驻', '二次元本体']
  },
  {
    code: 'GANG',
    name: '杠精',
    category: '理论话术系',
    icon: '🪓',
    accent: '#d95f59',
    rarity: 'SR',
    profile: {
      RADAR: 2,
      FIRE: 2,
      AURA: -1,
      ONLINE: 0,
      CIRCLE: -1,
      DRAMA: -2,
      MOOD: 0,
      RELATE: -2,
      PROJECTION: -2
    },
    weights: {
      RADAR: 1.25,
      FIRE: 1.55,
      RELATE: 1.15
    },
    bias: 2,
    slogan: '别人想交流，你先想找他哪句不严谨。',
    description: '你看内容最自然的反应不是共鸣，是挑刺。一个词不准、一句太满、一个逻辑链没扣严，你都能立刻进入工作状态，哪怕原本只是随手刷到的小视频，也能被你打成辩论赛海选。',
    roast: '你不是追求真理，你是太享受把别人话头拧正那一下。',
    traits: ['抬杠本能', '语病雷达', '逻辑洁癖', '评论区磨刀']
  }
];

const fallbackType = {
  code: 'WILD',
  name: '互联网野人',
  category: '未归档样本',
  icon: '🪶',
  accent: '#475569',
  rarity: 'UR',
  profile: {},
  weights: {},
  bias: 0,
  slogan: '现有这套图鉴，还没把你彻底装进去。',
  description: '你这挂不像一个稳定样本，更像东沾一点、西蹭一点的野生冲浪体。你有梗感，但不彻底；你懂语境，但不死守；你什么都沾一点，平台一时半会儿都没法给你精准归类。',
  roast: '别人是标准模板，你像算法半夜随机掉出来的隐藏账号。',
  traits: ['未被命名', '混搭味重', '野生冲浪', '难以归档']
};

const rarityGuide = {
  N: { label: '普通款', color: '#7f7b7a', chance: '常见' },
  R: { label: '稀有款', color: '#2f7f87', chance: '偏常见' },
  SR: { label: '高能款', color: '#b45c2b', chance: '少见' },
  SSR: { label: '名场面', color: '#df8b1d', chance: '很少见' },
  UR: { label: '传说皮肤', color: '#b72222', chance: '极少见' }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { personalityTypes, fallbackType, rarityGuide };
}
