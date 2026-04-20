// 互联网学历测试 - 27 种人格类型定义（SBTI风格版）
// 每种人格由 15 维度的 L/M/H 模式组成

const personalityTypes = [
  // ===== 学霸系（4种） =====
  {
    code: 'JUANW',
    name: '卷王',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'M',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'M', S2: 'L', S3: 'M',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '别人熄灯了，他才刚热身',
    description: '卷王不是单纯努力，是带着一点"谁都别想轻松"的狠劲。自己累到头昏眼花也无所谓，重点是不能让同学安稳上岸。他存在的意义，就是把"竞争氛围"四个字具象化。',
    traits: ['自律狂魔', '时间管理大师', '图书馆钉子户', '绩点收割机'],
    rarity: 'SSR',
    image: 'juanwang.png'
  },
  {
    code: 'TIANCA',
    name: '天才',
    pattern: {
      L1: 'H', L2: 'H', L3: 'M',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'M', A2: 'L', A3: 'H',
      S1: 'H', S2: 'M', S3: 'M',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '看着没学，其实都学了',
    description: '天才最擅长的不是考高分，而是让别人怀疑努力的意义。平时像在摆烂，作业像在敷衍，成绩一出来却总能稳稳压人一头。越轻描淡写，越让人破防。',
    traits: ['天赋异禀', '轻松碾压', '考试锦鲤', '智商税免缴者'],
    rarity: 'SSR',
    image: 'tiancai.png'
  },
  {
    code: 'PIANKA',
    name: '偏科怪',
    pattern: {
      L1: 'H', L2: 'M', L3: 'M',
      E1: 'M', E2: 'H', E3: 'H',
      A1: 'M', A2: 'M', A3: 'H',
      S1: 'L', S2: 'M', S3: 'L',
      B1: 'M', B2: 'L', B3: 'M'
    },
    slogan: '一科封神，一科送命',
    description: '偏科怪的人生像一张裂开的成绩单。一门强到能把全班按在地上摩擦，另一门却烂得像从来没学过。总分不上不下，单科战绩却足够吹一学期。',
    traits: ['严重偏科', '单科王者', '两极分化', '老师头疼对象'],
    rarity: 'SR',
    image: 'piankemei.png'
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
    description: '小镇做题家把刷题当成最稳的上升通道，也真的靠做题走了很远。他们最擅长在标准答案里求生，却也最容易在离开卷子之后感到失重。不是不够努力，是世界出的题越来越偏。',
    traits: ['做题机器', '应试高手', '努力型选手', '迷茫前行'],
    rarity: 'SR',
    image: 'xiaozhentizuotijia.png'
  },

  // ===== 学渣系（6种） =====
  {
    code: 'FEIWU',
    name: '废物',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'L', E2: 'L', E3: 'L',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'L', B2: 'L', B3: 'L'
    },
    slogan: '不学，不装，也不挣扎',
    description: '废物最大的特点，是连"努力一下"都嫌麻烦。不会做题不稀奇，稀奇的是他连装样子都懒得装。别人多少还会焦虑一下，他已经提前和失败达成和解。',
    traits: ['彻底躺平', '自暴自弃', '看透人生', '佛系青年'],
    rarity: 'N',
    image: 'feiwu.png'
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
    slogan: '能躺着，绝不坐起来',
    description: '摆烂王不是学不会，是根本不想救。面对学习，他最熟悉的反应不是紧张，而是"算了吧"。别人还在抢救人生，他已经熟练地把一切交给命运。',
    traits: ['彻底躺平', '心态平和', '看透人生', '乐天派'],
    rarity: 'N',
    image: 'bailanwang.png'
  },
  {
    code: 'MENGTS',
    name: '蒙题高手',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'M', S2: 'M', S3: 'L',
      B1: 'M', B2: 'L', B3: 'M'
    },
    slogan: '不会做，但很会赌',
    description: '蒙题高手对知识没什么敬畏，对运气倒是信得很深。公式不一定记住了，三长一短那套民间玄学倒是烂熟于心。考场上最稳定的发挥，就是稳定地和命运对赌。',
    traits: ['蒙题玄学', '考试锦鲤', '运气流', '不会但能对'],
    rarity: 'R',
    image: 'mengtigaoshou.png'
  },
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
    slogan: '分数不够，路子来凑',
    description: '钞能力者的人生逻辑和大多数人不太一样。别人靠成绩换机会，他靠资源跳流程。学习不是没用，只是没那么急，毕竟总有人能把门从里面打开。',
    traits: ['家境优渥', '资源拉满', '留学预备', '赢在起跑线'],
    rarity: 'SR',
    image: 'chaonenglizhe.png'
  },
  {
    code: 'ZUOBID',
    name: '作弊大师',
    pattern: {
      L1: 'L', L2: 'L', L3: 'L',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'M', B2: 'M', B3: 'H'
    },
    slogan: '不会做题，但会做局',
    description: '作弊大师真正研究的从来不是知识点，而是执行细节。纸条怎么藏，角度怎么找，配合怎么打，考场在他眼里更像战术演练。实力不一定够，手法一定要稳。',
    traits: ['作弊高手', '小抄专家', '反侦察能力', '铤而走险'],
    rarity: 'R',
    image: 'zuobidash.png'
  },
  {
    code: 'POFANG',
    name: '破防怪',
    pattern: {
      L1: 'L', L2: 'L', L3: 'M',
      E1: 'L', E2: 'L', E3: 'L',
      A1: 'L', A2: 'L', A3: 'M',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'L', B2: 'L', B3: 'L'
    },
    slogan: '成绩一出，先骂世界',
    description: '破防怪平时对学习毫无表示，出分那天却突然情绪丰沛。题太偏，老师太水，制度太烂，反正问题总在外面。承认自己没学是不可能的，嘴硬才是最后的尊严。',
    traits: ['自我欺骗', '甩锅达人', '嘴硬王者', '永不认错'],
    rarity: 'N',
    image: 'pofangguai.png'
  },

  // ===== 中庸系（2种） =====
  {
    code: 'JIGEZS',
    name: '及格战士',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'M',
      S1: 'M', S2: 'M', S3: 'M',
      B1: 'M', B2: 'M', B3: 'L'
    },
    slogan: '不求优秀，只求活着',
    description: '及格战士的人生目标极其明确，就是低空飞过。平时存在感不高，出分时却总能精准卡在线上，像在和系统漏洞共生。谈不上风光，但真的很会生存。',
    traits: ['精准控分', '60分万岁', '生存专家', '隐形高手'],
    rarity: 'N',
    image: 'jigedou.png'
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
    slogan: '平时查无此人，考前突然显灵',
    description: '抱佛脚不是不会学，是永远只在最危险的时候学。平时毫无动静，越临近考试越像被雷劈醒。别人学一学期，他赌最后几天，主打一个把焦虑转化成短时爆发。',
    traits: ['临时抱佛脚', '突击高手', '惊险刺激', 'deadline战士'],
    rarity: 'R',
    image: 'baofeijiao.png'
  },

  // ===== 学生干部系（1种） =====
  {
    code: 'GANBU',
    name: '学生会干部',
    pattern: {
      L1: 'M', L2: 'M', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'H', A2: 'H', A3: 'M',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '题做得一般，官话说得很满',
    description: '学生会干部不一定是班里最会学习的人，但一定是最会"组织安排"的那批人。通知、活动、流程、汇报，一个比一个熟。知识学没学进去不好说，体制内语感倒是提前练出来了。',
    traits: ['学生干部', '组织能力', '人脉广泛', '体制内语感'],
    rarity: 'R',
    image: 'xueshengganbu.png'
  },

  // ===== 特长生系（2种） =====
  {
    code: 'TIYUS',
    name: '体育生',
    pattern: {
      L1: 'L', L2: 'L', L3: 'H',
      E1: 'L', E2: 'M', E3: 'M',
      A1: 'L', A2: 'H', A3: 'L',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '文化课不行，身体素质拉满',
    description: '体育生的人设很简单，训练永远比考试更有存在感。文化课像副本，比赛才是主战场。别人靠脑子卷，他靠身体拼，提到考试像上刑，提到比赛立刻来状态。',
    traits: ['运动健将', '文化课苦手', '身体素质', '特长生'],
    rarity: 'SR',
    image: 'tiyusheng.png'
  },
  {
    code: 'YISHUS',
    name: '艺术生',
    pattern: {
      L1: 'M', L2: 'H', L3: 'M',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'M', A2: 'M', A3: 'H',
      S1: 'M', S2: 'M', S3: 'L',
      B1: 'M', B2: 'L', B3: 'L'
    },
    slogan: '专业烧钱，文化补刀',
    description: '艺术生是一种典型的双线受苦人格。专业课费命费钱，文化课还不肯轻易放过他。别人是一条赛道跑到底，他是两边都要交作业，两边都要挨打。',
    traits: ['艺术天赋', '与众不同', '创意无限', '另辟蹊径'],
    rarity: 'SR',
    image: 'yishusheng.png'
  },

  // ===== 复读/升学系（4种） =====
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
    slogan: '别人高考结束，他高考重开',
    description: '复读战神最强的不是成绩，是不服。别人考完就散场，他偏要回去再打一局。嘴上说给自己一次机会，实际上是在和那条分数线狠狠干架。',
    traits: ['执念深重', '背水一战', '不服输', '考研老兵'],
    rarity: 'SR',
    image: 'fuduzhanshen.png'
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
    description: '双非战神最熟悉的处境，就是还没开口就先被贴标签。不是因为没本事，而是太清楚学校名有时候比内容更先决定别人态度。所以他们总在拼命证明，自己不是简历上那两个字。',
    traits: ['实力过硬', '背景普通', '逆袭选手', '被低估者'],
    rarity: 'SR',
    image: 'shuangfeizhanshen.png'
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
    slogan: '不是原装本科，但硬是爬上来了',
    description: '专升本逆袭怪最烦的不是考试难，而是解释成本高。明明已经靠自己重新打了一遍，别人却总想用一句"哦，你是专升本啊"把所有努力压扁。越被看低，越想往上顶。',
    traits: ['逆袭选手', '不服输', '自我证明', '努力型选手'],
    rarity: 'SR',
    image: 'zhuanshengben.png'
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
    slogan: '校名很响，背景很虚',
    description: '野鸡院校受害者最尴尬的地方，不在于学历本身，而在于名字听着太像真的。介绍时还有点气势，真查起来就开始沉默。人还没出场，学校先把场面搞得很难看。',
    traits: ['学校拖后腿', '实力被低估', '尴尬处境', '努力自救'],
    rarity: 'R',
    image: 'yejiyuanxiaoshouhaizhe.png'
  },

  // ===== 社会系（1种） =====
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
    slogan: '别人谈梦想，他先看包不包住',
    description: '厂狗预备役的人生观通常来得比同龄人更早一点。别人还在畅想逆袭和远方，他已经开始考虑现实和成本。不是没有理想，是太早知道理想有时候得先给生存让路。',
    traits: ['现实主义', '生存优先', '早熟的觉悟', '务实派'],
    rarity: 'N',
    image: 'changgouyubeiyi.png'
  },

  // ===== 精神系（2种） =====
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
    slogan: '学校一般，心气顶配',
    description: '精神本科生的核心能力，是用气势弥补牌面。学校可能普通，发言不能普通；学历也许一般，姿态必须在线。三句话里至少两句在暗示自己只是"当年没发挥好"。',
    traits: ['虚张声势', '自我包装', '精神胜利', '面子工程'],
    rarity: 'R',
    image: 'jingshenbenkesheng.png'
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
    slogan: '书没读明白，人生先看透了',
    description: '中专文豪最擅长的，不是考试，而是输出观点。课本没翻几页，朋友圈和评论区倒写得像社会观察家。学历不一定高，感悟一定要深，主打一个经历不够，语气来凑。',
    traits: ['口才了得', '社会观察家', '感悟深刻', '键盘侠'],
    rarity: 'R',
    image: 'zhongzhuanwenhao.png'
  },

  // ===== 兴趣系（4种） =====
  {
    code: 'SHUOCH',
    name: '说唱改命哥',
    pattern: {
      L1: 'M', L2: 'H', L3: 'L',
      E1: 'L', E2: 'M', E3: 'M',
      A1: 'L', A2: 'L', A3: 'M',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'M', B2: 'L', B3: 'L'
    },
    slogan: '成绩救不了人生，flow可以',
    description: '说唱改命哥对知识点没什么兴趣，对押韵倒是极度敏感。卷子不会写几道，气势必须先顶上来。别人靠分数找存在感，他靠节奏和态度证明自己没输。',
    traits: ['说唱狂热', '态度先行', '押韵狂魔', '另辟蹊径'],
    rarity: 'R',
    image: 'shuochanggaimingge.png'
  },
  {
    code: 'DIANJS',
    name: '电竞少年',
    pattern: {
      L1: 'M', L2: 'H', L3: 'L',
      E1: 'L', E2: 'M', E3: 'M',
      A1: 'L', A2: 'L', A3: 'M',
      S1: 'M', S2: 'H', S3: 'H',
      B1: 'M', B2: 'L', B3: 'L'
    },
    slogan: '书不会背，版本一定懂',
    description: '电竞少年的大脑对游戏更新异常敏锐，对课本内容却总是拒绝加载。成绩像高地，一碰就掉；英雄强度、装备改动、战术理解倒是背得滚瓜烂熟。学习不行，BP不能输。',
    traits: ['游戏狂热', '电竞梦想', '手速惊人', '学业荒废'],
    rarity: 'R',
    image: 'dianjingshaonian.png'
  },
  {
    code: 'LIAOME',
    name: '撩妹高手',
    pattern: {
      L1: 'L', L2: 'M', L3: 'L',
      E1: 'L', E2: 'M', E3: 'H',
      A1: 'L', A2: 'L', A3: 'L',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'M', B2: 'L', B3: 'L'
    },
    slogan: '题不会写，情话张口就来',
    description: '撩妹高手在校园里的主要赛道从来不是学习。别人晚自习刷题，他晚自习经营人设；卷子做不做另说，纸条一定得传到位。学业成绩不稳定，情绪价值输出倒是相当稳定。',
    traits: ['恋爱达人', '情场高手', '学习靠边', '青春无悔'],
    rarity: 'R',
    image: 'liaomeigaoshou.png'
  },
  {
    code: 'CHUANGY',
    name: '创业哥',
    pattern: {
      L1: 'M', L2: 'H', L3: 'L',
      E1: 'M', E2: 'M', E3: 'M',
      A1: 'L', A2: 'L', A3: 'H',
      S1: 'H', S2: 'H', S3: 'H',
      B1: 'H', B2: 'L', B3: 'L'
    },
    slogan: '书还没读懂，世界已经想改了',
    description: '创业哥最大的特点，是永远先于现实一步进入宏大叙事。PPT、商业模式、赛道、融资，嘴上全是大词，行动上主打一个先把气氛做起来。别人还在备考，他已经准备改变行业。',
    traits: ['创业梦想', '宏大叙事', 'PPT大师', '气氛组'],
    rarity: 'SR',
    image: 'chuangyegen.png'
  },

  // ===== 竞赛系（1种） =====
  {
    code: 'JINGSLH',
    name: '竞赛老嗨',
    pattern: {
      L1: 'H', L2: 'H', L3: 'H',
      E1: 'H', E2: 'H', E3: 'H',
      A1: 'H', A2: 'H', A3: 'H',
      S1: 'L', S2: 'L', S3: 'L',
      B1: 'H', B2: 'H', B3: 'L'
    },
    slogan: '普通考试，不配入眼',
    description: '竞赛老嗨对月考和排名往往带着一点天然的不屑。他的世界里，真正值得拿出来说的，得是国奖、省一、强基、竞赛履历。不是不能参加普通赛道，只是总想证明自己本来就在更高一层。',
    traits: ['竞赛达人', '高冷气质', '精英意识', '不屑常规'],
    rarity: 'SSR',
    image: 'jingsailaohai.png'
  }
];

// 兜底人格
const fallbackType = {
  code: 'UNKNOWN',
  name: '未定义人格',
  pattern: {},
  slogan: '你太独特了，无法被现有类型定义',
  description: '你的学习特征非常独特，不在我们现有的 27 种人格范畴内。也许你是未来的新型学习者？',
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
