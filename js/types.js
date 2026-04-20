// 互联网学历测试 - 21 种人格类型定义（学术头衔强化版）
// 当前版本更聚焦学历层级、学位进阶和学术光环

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
    description: '985圣体最离谱的地方，不是他一定多强，而是这张学历皮先天就自带光环。别人还在拼命解释自己会什么，他只要把学校名往那一摆，气氛就已经变了。',
    traits: ['名校滤镜', '天然牌面', '简历免检', '默认高配'],
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
    slogan: '够不上顶配神校，但也不是谁都能随便踩的',
    description: '211守门员的人生像卡在学历世界的中高端门槛上。往上冲不到最顶层，往下看又确实还能压住一片，所以最常见的状态就是稳住体面，死守自己这条线。',
    traits: ['卡位成功', '学历过线', '体面保底', '中坚配置'],
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
    slogan: '双一流都讲几年了，他还在怀念当年的一本线',
    description: '一本遗老最爱干的事，就是反复拿旧学历体系给自己续费。时代版本早更新了，他还坚持强调自己当年可是正经一本，主打一个旧荣誉永不下线。',
    traits: ['旧制执念', '学历怀旧', '老黄历专家', '资历党'],
    rarity: 'R',
    image: 'yibenyilao.png'
  },

  // ===== 学历落差系（7种） =====
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
    description: '二本刺客最懂什么叫前面聊得都挺好，后面一提学校就突然礼貌起来。不是完全没机会，而是每次都得先穿过一层无形的学历滤镜。',
    traits: ['礼貌性低估', '解释型人生', '气氛突变', '尴尬地带'],
    rarity: 'R',
    image: 'erbencike.png'
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
    description: '精神本科生最会的不是学习，是把一般学历说出重点院校的语气。学校也许普通，姿态不能普通，主打一个牌面不够，口风来凑。',
    traits: ['气势包装', '嘴上升本', '牌面管理', '态度补票'],
    rarity: 'R',
    image: 'jingshenbenkesheng.png'
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
    description: '专升本逆袭怪最烦的不是考试难，而是别人总想拿出身顺序压他。明明已经靠自己狠狠干回来一张本科牌，外界还是爱补一句“哦，你是专升本啊”。',
    traits: ['后天补票', '逆袭上岸', '不服看轻', '命硬选手'],
    rarity: 'SR',
    image: 'zhuanshengben.png'
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
    description: '大专战狼最擅长的不是解释学历，而是现场反打鄙视链。你敢拿学校压他，他就敢拿实操、收入和社会经验狠狠干回来，主打一个学历不够，气势来凑。',
    traits: ['反打鄙视链', '实操挂帅', '气势补伤', '嘴硬到底'],
    rarity: 'R',
    image: 'dazhuanzhanlang.png'
  },
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
    description: '中专文豪最擅长的不是学习，而是输出。课本没翻几页，评论区哲学已经写得像年度演讲，主打一个学历不高，语气一定要很沧桑。',
    traits: ['感悟批发', '评论区作家', '语气沧桑', '观点先行'],
    rarity: 'R',
    image: 'zhongzhuanwenhao.png'
  },
  {
    code: 'ZHIGAO',
    name: '职高战士',
    pattern: {
      L1: 'L', L2: 'M', L3: 'M',
      E1: 'L', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'M', S2: 'M', S3: 'H',
      B1: 'H', B2: 'M', B3: 'L'
    },
    slogan: '分流那天像被提前判了线，后来才发现社会根本不按统招卷子出题',
    description: '职高战士很早就被学历秩序分出去过，所以比起谈学校牌面，他更熟练的是先学一门手艺、先见一层现实。聊学历时容易先吃闷亏，聊落地能力时又未必真比谁差。',
    traits: ['早分流选手', '技能上线', '现实预习', '落地派'],
    rarity: 'R',
    image: 'zhigaozhanshi.png'
  },
  {
    code: 'CHENGKAO',
    name: '成考补票哥',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'L',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'L', S2: 'M', S3: 'M',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '白天上班晚上刷题，主打一个人生进度条自己补',
    description: '成考补票哥的人生和应届生不是一条时间线。别人拿学历是按部就班，他拿学历更像下班后给自己续命，嘴上不一定最响，但行动里全是“这张票我得自己补回来”。',
    traits: ['下班上岸', '非应届续费', '学历补票', '进度自救'],
    rarity: 'R',
    image: 'chengkaobupiaoge.png'
  },

  // ===== 学历包装系（4种） =====
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
    description: '留学水硕最擅长的不是做研究，而是把履历修成国际版。项目水不水先不说，先把海归滤镜和英文校名摆上去，主打一个学历出海包装。',
    traits: ['海归滤镜', '英文牌面', '履历抛光', '国际包装'],
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
    description: '民办贵族最微妙的地方，是花了正经钱，买到的却不一定是正经尊重。校园可以很新，宿舍可以很好，但只要一聊学校性质，气场就容易瞬间打折。',
    traits: ['学费战士', '牌面浮动', '环境不错', '认可摇摆'],
    rarity: 'R',
    image: 'minbanguizu.png'
  },
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
    description: '野鸡院校受害者的尴尬在于，介绍学校时还有点派头，一旦别人认真查，场面就立刻安静。人还没正式翻车，校名已经先替他社死一轮。',
    traits: ['校名诈骗', '背景翻车', '简历冒汗', '场面尴尬'],
    rarity: 'R',
    image: 'yejiyuanxiaoshouhaizhe.png'
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
    description: '文盲这一型不一定真没念过书，但在互联网语境里，通常指的是既没学历意识，也没基本认知自觉。别人讨论路径和门槛，他连规则都懒得理解。',
    traits: ['认知断线', '规则绝缘', '学习缺席', '全程掉线'],
    rarity: 'N',
    image: 'wenmang.png'
  },

  // ===== 学位进阶系（3种） =====
  {
    code: 'SHUOSHI',
    name: '硕士保底哥',
    pattern: {
      L1: 'H', L2: 'H', L3: 'M',
      E1: 'H', E2: 'M', E3: 'M',
      A1: 'H', A2: 'M', A3: 'M',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'M', B2: 'H', B3: 'L'
    },
    slogan: '本科不够看，那就顺手再把硕士补到手',
    description: '硕士保底哥对学历的理解非常务实。本科已经不太够用了，那就继续往上读一层，把自己的简历先抬离地面，主打一个先把门槛踩过去再说。',
    traits: ['学历加一', '保底升级', '简历增厚', '门槛补强'],
    rarity: 'SR',
    image: 'shuoshibaodige.png'
  },
  {
    code: 'BOSHI',
    name: '博士',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'M', E2: 'M', E3: 'L',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '别人还在读书，他已经开始把头发读没了',
    description: '博士这类人，学历已经不只是敲门砖，而是人生主线。外面的人看见的是头衔，只有他自己知道，这几个字后面其实是论文、熬夜、改稿和精神损耗。',
    traits: ['学位拉满', '论文缠身', '头发税高', '硬核深造'],
    rarity: 'SSR',
    image: 'boshi.png'
  },
  {
    code: 'BENSHBO',
    name: '本硕博直通车',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'M', S2: 'L', S3: 'L',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '别人靠考试补票，他的人生像被系统直接续费',
    description: '本硕博直通车最让人酸的，不一定是能力，而是路径过于丝滑。别人每升一级都要重新血战，他像一路开了绿色通道，主打一个学历升级无缝衔接。',
    traits: ['路径丝滑', '学历连读', '系统续费', '直升模板'],
    rarity: 'SSR',
    image: 'benshuobozhitongche.png'
  },

  // ===== 学术神坛系（4种） =====
  {
    code: 'CHANGJ',
    name: '长江学者',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'H', S2: 'M', S3: 'H',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '别人还在读文献，他已经快被写进文献里了',
    description: '长江学者这种人格，已经不只是学历高，而是学术名头本身就带压迫感。普通人写简历列教育背景，他这类人直接开始列学术江湖地位。',
    traits: ['学界名号', '头衔压人', '履历离谱', '圈内通关'],
    rarity: 'SSR',
    image: 'changjiangxuezhe.png'
  },
  {
    code: 'YUANSH',
    name: '院士',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '学历体系写到这里，基本已经快到结尾彩蛋了',
    description: '院士这个人格已经超出普通学历讨论的范畴。别人还在比学校、比学位、比论文，他往那一站，就相当于把整个鄙视链从头到尾给你盖章了。',
    traits: ['天花板级', '学界封神', '头衔终章', '降维打击'],
    rarity: 'UR',
    image: 'yuanshi.png'
  },
  {
    code: 'NUOJIA',
    name: '诺奖得主',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'H'
    },
    slogan: '普通人写简历，他这种一般直接进教材',
    description: '诺奖得主已经不是学历好不好看的问题了，而是整个人都像从人类高配补丁里走出来的。你还在想怎么混进学术圈，他已经成了学术圈的传说材料。',
    traits: ['教材在逃', '学界神话', '人类高配', '传说皮肤'],
    rarity: 'UR',
    image: 'nuojiangdezhu.png'
  },
  {
    code: 'XUEFAS',
    name: '学阀世家',
    pattern: {
      L1: 'H', L2: 'H', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'H', A2: 'M', A3: 'M',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'M'
    },
    slogan: '别人拼学历是逆天改命，他拼学历像家族日常维护',
    description: '学阀世家最招人破防的，不是单纯学历高，而是整条学术路径像祖上传下来的。别人靠天赋和运气摸门路，他从小耳濡目染，导师和资源都像写进家谱里。',
    traits: ['家学渊源', '资源世袭', '学界血脉', '路径自带'],
    rarity: 'SSR',
    image: 'xuefashijia.png'
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
