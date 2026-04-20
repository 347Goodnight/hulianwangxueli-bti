// 互联网学历测试 - 21 种人格类型定义（学历梗强化版）
// 当前只保留更贴近学历出身、升学路径和学历包装语境的人格

const personalityTypes = [
  // ===== 名校光环系（3种） =====
  {
    code: 'QINGJIU',
    name: '985圣体',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '还没张嘴，学校名就已经替他说完了',
    description: '985圣体最离谱的地方，不是他一定多强，而是这张学历皮先天就带免喷属性。别人简历要靠经历撑版面，他把校名挂上去，气氛就已经不一样了。',
    traits: ['名校滤镜', '默认高配', '简历免检', '天然牌面'],
    rarity: 'SSR',
    image: '985shengti.png'
  },
  {
    code: 'ERYIYI',
    name: '211守门员',
    pattern: {
      L1: 'H', L2: 'H', L3: 'M',
      E1: 'H', E2: 'M', E3: 'M',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'H', B2: 'M', B3: 'L'
    },
    slogan: '够不上顶配名校，但也不是谁都能踩的',
    description: '211守门员的人生状态很像卡在一条微妙分界线上。往上冲不了天龙人，往下看又确实还占着点优势，所以最常见的姿态就是稳住体面，不让自己掉档。',
    traits: ['卡位成功', '学历过线', '体面保底', '中坚选手'],
    rarity: 'SR',
    image: '211shoumenyuan.png'
  },
  {
    code: 'YIBENYI',
    name: '一本遗老',
    pattern: {
      L1: 'M', L2: 'H', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'M', S2: 'L', S3: 'L',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '时代都变了，他还在拿一本线讲资历',
    description: '一本遗老最爱干的事，就是把旧版本学历体系反复拿出来追忆。现在都在看双一流和就业去向了，他还在强调自己当年可是正经一本，主打一个旧荣誉反复续费。',
    traits: ['旧制执念', '学历怀旧', '老黄历专家', '资历党'],
    rarity: 'R',
    image: 'yibenyilao.png'
  },

  // ===== 学历落差系（4种） =====
  {
    code: 'ERBENCI',
    name: '二本刺客',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'H', S2: 'H', S3: 'M',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '学校名一报出来，空气会先安静半秒',
    description: '二本刺客最懂那种微妙场面。自我介绍前一切都挺好，一聊到学校，现场就自动进入礼貌模式。不是完全没机会，但每次都得先穿过一层看不见的学历滤镜。',
    traits: ['学历尴尬带', '礼貌性低估', '解释型人生', '气氛突变'],
    rarity: 'R',
    image: 'erbencike.png'
  },
  {
    code: 'XIAOZH',
    name: '小镇做题家',
    pattern: {
      L1: 'M', L2: 'M', L3: 'H',
      E1: 'H', E2: 'M', E3: 'L',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'M', S2: 'L', S3: 'L',
      B1: 'H', B2: 'L', B3: 'L'
    },
    slogan: '会做题，但人生不只考题',
    description: '小镇做题家把卷子当梯子，一路往上爬得很认真，也很辛苦。他最怕的不是题难，而是走出应试体系以后才发现，原来世界里有些门压根不是靠做题开的。',
    traits: ['做题上岸', '出身焦虑', '努力攀升', '离卷失重'],
    rarity: 'SR',
    image: 'xiaozhenzuotijia.png'
  },
  {
    code: 'SHUANGF',
    name: '双非战神',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'M', S2: 'L', S3: 'M',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '能力还没展示，学校先被审判',
    description: '双非战神最熟悉的不是竞争，是预判。因为他知道很多时候自己还没开口，学历出身就先替他挨了一轮打。所以这类人往往特别能卷，不是爱证明，是不得不证明。',
    traits: ['被低估者', '自证成瘾', '背景普通', '硬卷逆袭'],
    rarity: 'SR',
    image: 'shuangfeizhanshen.png'
  },
  {
    code: 'JINGSH',
    name: '精神本科生',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '学历未必够硬，气势必须先拉满',
    description: '精神本科生的核心技能，就是把一般学历包装出重点院校的语气。学校也许普通，发言绝不能普通，主打一个牌面不够，态度来凑。',
    traits: ['气势包装', '精神升本', '嘴上冲塔', '牌面管理'],
    rarity: 'R',
    image: 'jingshenbenkesheng.png'
  },

  // ===== 升学补票系（5种） =====
  {
    code: 'FUDUS',
    name: '复读战神',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'M', E3: 'M',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'H', B2: 'M', B3: 'L'
    },
    slogan: '别人高考散场，他把人生读条重开',
    description: '复读战神不是简单地想再试一次，而是真的不服那张分数单。别人已经开始大学生活，他还在原地加时，主打一个成绩不满意就跟命运继续互殴。',
    traits: ['背水一战', '分数执念', '重开人生', '不服到底'],
    rarity: 'SR',
    image: 'fuduzhanshen.png'
  },
  {
    code: 'KAOYAN2',
    name: '考研二战狗',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'M', E2: 'M', E3: 'L',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '第一年叫追梦，第二年就成了跟命运拉扯',
    description: '考研二战狗的生活像一场没有观众的续杯加时赛。第一年还能说是冲刺理想，第二年基本就变成了不甘心，日子一久，整个人都活成了调剂系统的候选人。',
    traits: ['二战续命', '调剂焦虑', '不甘认输', '上岸执念'],
    rarity: 'SR',
    image: 'kaoyanerzhangou.png'
  },
  {
    code: 'BAOFOJ',
    name: '抱佛脚',
    pattern: {
      L1: 'M', L2: 'M', L3: 'L',
      E1: 'M', E2: 'H', E3: 'H',
      A1: 'L', A2: 'L', A3: 'M',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'L', B2: 'L', B3: 'L'
    },
    slogan: '平时查无此人，考前突然开始抢学历',
    description: '抱佛脚这一型平时像完全不参与竞争，越临近大考越像回光返照。别人提前一年铺路，他靠最后几天临时点火，主打一个平时不学，关键时刻猛补票。',
    traits: ['临时冲刺', '考前显灵', '短时爆发', '补票大师'],
    rarity: 'R',
    image: 'baofeijiao.png'
  },
  {
    code: 'ZHUANBS',
    name: '专升本逆袭怪',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'H', B2: 'M', B3: 'L'
    },
    slogan: '不是原装本科，但硬是把车补上了',
    description: '专升本逆袭怪最懂什么叫后天补票。明明已经自己狠狠干回来一张本科牌，还是总有人想用出身顺序压他一头。所以这类人通常嘴不一定最硬，但命是真的硬。',
    traits: ['后天补票', '逆袭上岸', '不服看轻', '命硬选手'],
    rarity: 'SR',
    image: 'zhuanshengben.png'
  },
  {
    code: 'HANSHOU',
    name: '函授战士',
    pattern: {
      L1: 'M', L2: 'M', L3: 'L',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'L',
      S1: 'L', S2: 'M', S3: 'L',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '牌总算补上了，至于含金量先别细问',
    description: '函授战士的人生重点不在学术，而在补齐那行学历栏。有没有认真学另说，最重要的是简历终于不用继续空着，主打一个先把门票买到手。',
    traits: ['学历补票', '证件优先', '简历修补', '先过门槛'],
    rarity: 'R',
    image: 'hanshouzhanshi.png'
  },

  // ===== 学历资源系（3种） =====
  {
    code: 'CHAONL',
    name: '钞能力者',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'M', E2: 'M', E3: 'H',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'H', S2: 'H', S3: 'M',
      B1: 'H', B2: 'M', B3: 'H'
    },
    slogan: '分数不一定够，路子反正不会少',
    description: '钞能力者对学历的理解和普通人不太一样。别人盯录取线，他盯可操作空间；别人担心没书读，他更担心选哪条路显得体面。学习可以一般，资源不能断。',
    traits: ['资源开路', '学历捷径', '家底加成', '操作空间'],
    rarity: 'SR',
    image: 'chaonenglizhe.png'
  },
  {
    code: 'LIUSHUI',
    name: '留学水硕',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'H',
      A1: 'L', A2: 'L', A3: 'M',
      S1: 'H', S2: 'H', S3: 'M',
      B1: 'M', B2: 'M', B3: 'M'
    },
    slogan: '专业学没学明白不好说，英文校名肯定背熟了',
    description: '留学水硕最擅长的不是读书，而是把履历修成国际版。项目水不水先不讨论，先把学校英文名写满，再靠海归滤镜撑起一半气场，主打一个学历出海包装。',
    traits: ['海归滤镜', '国际包装', '英文牌面', '履历抛光'],
    rarity: 'SR',
    image: 'liuxueshuishuo.png'
  },
  {
    code: 'MINBAN',
    name: '民办贵族',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'M', B2: 'M', B3: 'M'
    },
    slogan: '学费交得很响，学历落地时却还是轻飘飘',
    description: '民办贵族最微妙的地方，是花了正经钱，买到的却不一定是正经尊重。环境可以很新，宿舍可以很好，但只要一聊学校性质，气场就容易当场回调。',
    traits: ['学费战士', '牌面浮动', '环境不错', '认可度摇摆'],
    rarity: 'R',
    image: 'minbanguizu.png'
  },

  // ===== 学历风险系（3种） =====
  {
    code: 'YEJIZH',
    name: '野鸡院校受害者',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'L', B2: 'M', B3: 'L'
    },
    slogan: '校名听着像联合国，查起来像写字楼二层',
    description: '野鸡院校受害者的人生尴尬在于，介绍学校时还有点派头，一旦别人认真查，就轮到自己沉默了。人还没正式社死，校名已经先替他翻车。',
    traits: ['校名诈骗', '背景翻车', '简历冒汗', '场面尴尬'],
    rarity: 'R',
    image: 'yejiyuanxiaoshouhaizhe.png'
  },
  {
    code: 'DAZHUAN',
    name: '大专战狼',
    pattern: {
      L1: 'L', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'L',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'M', B3: 'L'
    },
    slogan: '学历可以矮一头，嘴上绝对不能输半句',
    description: '大专战狼最擅长的不是解释学历，而是现场反打鄙视链。你敢拿学校压他，他就敢拿社会经验、实操能力和现实收入狠狠干回来，主打一个学历不够，气势来凑。',
    traits: ['嘴硬反打', '实操挂帅', '社会课代表', '气势补伤'],
    rarity: 'R',
    image: 'dazhuanzhanlang.png'
  },
  {
    code: 'WENMANG',
    name: '文盲',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'L', E2: 'L', E3: 'L',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'L', B2: 'L', B3: 'L'
    },
    slogan: '学历栏看着像空的，认知栏也没好到哪去',
    description: '文盲这一型不一定真的没上过学，但在互联网语境里，通常指的是既没学历意识，也没基本认知自觉。别人讨论路径和门槛，他连规则都懒得理解，主打一个完全不在系统里。',
    traits: ['认知断线', '规则绝缘', '学习缺席', '全程掉线'],
    rarity: 'N',
    image: 'wenmang.png'
  },

  // ===== 下沉学历系（3种） =====
  {
    code: 'ZHONGZWH',
    name: '中专文豪',
    pattern: {
      L1: 'L', L2: 'M', L3: 'L',
      E1: 'L', E2: 'M', E3: 'M',
      A1: 'L', A2: 'L', A3: 'H',
      S1: 'M', S2: 'H', S3: 'H',
      B1: 'M', B2: 'L', B3: 'L'
    },
    slogan: '书没读明白，人生感悟倒先写了三大段',
    description: '中专文豪最擅长的不是学习，而是输出。课本没翻几页，评论区哲学已经写得像年度总结，主打一个学历不高，语气一定要沧桑。',
    traits: ['感悟批发', '评论区作家', '语气沧桑', '观点先行'],
    rarity: 'R',
    image: 'zhongzhuanwenhao.png'
  },
  {
    code: 'BAILAN',
    name: '摆烂王',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'L', E2: 'L', E3: 'L',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'M', S2: 'H', S3: 'H',
      B1: 'L', B2: 'L', B3: 'L'
    },
    slogan: '学历上不去这件事，他很早就接受了',
    description: '摆烂王在学历这条路上的状态非常明确，就是不救了。别人还在焦虑专升本、考研、刷证，他已经熟练地跟失败共处，主打一个能躺着绝不补票。',
    traits: ['彻底躺平', '放弃治疗', '不上不补', '心态稳定'],
    rarity: 'N',
    image: 'bailanwang.png'
  },
  {
    code: 'CHANGG',
    name: '厂狗预备役',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'L', E2: 'L', E3: 'L',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '别人谈学历跃迁，他先看毕业后包不包住',
    description: '厂狗预备役对学历讨论最大的反应，往往是实用主义。你们在聊院校层级和平台差距，他已经开始算毕业以后能去哪儿干、包不包住、交不交社保，主打一个先活下去。',
    traits: ['就业优先', '现实主义', '务实到底', '生存先行'],
    rarity: 'N',
    image: 'changgouyubeiyi.png'
  }
];

// 兜底人格
const fallbackType = {
  code: 'UNKNOWN',
  name: '未定义人格',
  pattern: {},
  slogan: '你太独特了，无法被现有类型定义',
  description: '你的学历画像非常独特，不在我们现有的 21 种人格范畴内。也许你属于还没被互联网命名的新型学历人设。',
  traits: ['独一无二', '打破常规', '特立独行'],
  rarity: 'UR',
  image: 'unknown.png'
};

// 稀有度说明
const rarityGuide = {
  'N': { label: '普通', color: '#95A5A6', chance: '30%' },
  'R': { label: '稀有', color: '#3498DB', chance: '25%' },
  'SR': { label: '超稀有', color: '#9B59B6', chance: '20%' },
  'SSR': { label: '超级稀有', color: '#F39C12', chance: '15%' },
  'UR': { label: '传说', color: '#E74C3C', chance: '10%' }
};

// 导出（用于模块化，但这里直接在全局）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { personalityTypes, fallbackType, rarityGuide };
}
