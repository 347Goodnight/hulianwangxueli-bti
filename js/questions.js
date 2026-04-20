// 互联网学历测试 - 30 道场景题
// 每维度 2 题，共 15 维度
// 每题 3 个选项，分值 1-3

const questions = [
  // ===== 学习能力模型 =====
  // L1 记忆力
  {
    id: 'q1',
    dim: 'L1',
    text: '老师刚划完一页期末重点，你通常属于哪种人？',
    options: [
      { text: '扫一遍就差不多进脑子了', value: 3 },
      { text: '回去多看几次基本能记住', value: 2 },
      { text: '第二天就像没见过这页', value: 1 }
    ]
  },
  {
    id: 'q2',
    dim: 'L1',
    text: '考前翻到上个月背过的内容，你的反应更像？',
    options: [
      { text: '大部分还能直接复述出来', value: 3 },
      { text: '有印象，但细节得再捞一下', value: 2 },
      { text: '这玩意我什么时候学过', value: 1 }
    ]
  },

  // L2 理解力
  {
    id: 'q3',
    dim: 'L2',
    text: '遇到一道步骤很绕的大题，你第一反应是？',
    options: [
      { text: '先拆条件，找它到底在考什么', value: 3 },
      { text: '先试两步，卡住再说', value: 2 },
      { text: '先看答案，别和自己过不去', value: 1 }
    ]
  },
  {
    id: 'q4',
    dim: 'L2',
    text: '老师讲一个新知识点时，你通常多久能跟上？',
    options: [
      { text: '课堂上就能捋顺逻辑', value: 3 },
      { text: '课后自己再顺一遍能懂', value: 2 },
      { text: '得靠同学翻译成人话', value: 1 }
    ]
  },

  // L3 专注力
  {
    id: 'q5',
    dim: 'L3',
    text: '晚自习写作业时，手机放在桌边会怎样？',
    options: [
      { text: '放着也不影响，我先把题写完', value: 3 },
      { text: '写一阵会摸几次看看消息', value: 2 },
      { text: '手机不动我就浑身难受', value: 1 }
    ]
  },
  {
    id: 'q6',
    dim: 'L3',
    text: '一节 45 分钟的课，你更接近哪种状态？',
    options: [
      { text: '基本全程在线，能跟着老师走', value: 3 },
      { text: '前半节还行，后面会飘', value: 2 },
      { text: '开场五分钟后灵魂就出走了', value: 1 }
    ]
  },

  // ===== 考试能力模型 =====
  // E1 应试技巧
  {
    id: 'q7',
    dim: 'E1',
    text: '考前复习，你最像哪种人？',
    options: [
      { text: '先抓高频考点和真题套路', value: 3 },
      { text: '按老师给的范围老老实实看', value: 2 },
      { text: '翻到哪算哪，主打一个随缘', value: 1 }
    ]
  },
  {
    id: 'q8',
    dim: 'E1',
    text: '考场上碰到不会的选择题，你更会？',
    options: [
      { text: '结合题干和选项结构排除乱猜', value: 3 },
      { text: '先空着，回头凭感觉补', value: 2 },
      { text: '直接点兵点将，天命所归', value: 1 }
    ]
  },

  // E2 临场发挥
  {
    id: 'q9',
    dim: 'E2',
    text: '真正发卷那一刻，你通常是什么状态？',
    options: [
      { text: '越到考场越清醒，脑子反而更快', value: 3 },
      { text: '正常做，基本不会太离谱', value: 2 },
      { text: '一紧张就容易脑子卡壳', value: 1 }
    ]
  },
  {
    id: 'q10',
    dim: 'E2',
    text: '考试做到一半突然卡住时，你更像？',
    options: [
      { text: '马上跳题，先保后面的分', value: 3 },
      { text: '再磨一会儿，不行再走', value: 2 },
      { text: '死磕到自己心态爆炸', value: 1 }
    ]
  },

  // E3 运气成分
  {
    id: 'q11',
    dim: 'E3',
    text: '蒙题这件事，在你身上通常是什么效果？',
    options: [
      { text: '离谱地准，像开了玄学挂', value: 3 },
      { text: '一半一半，看天意', value: 2 },
      { text: '总能完美绕开正确答案', value: 1 }
    ]
  },
  {
    id: 'q12',
    dim: 'E3',
    text: '你和考试运气的关系更像？',
    options: [
      { text: '老师总爱考我刚看过的那块', value: 3 },
      { text: '偶尔灵，偶尔像被针对', value: 2 },
      { text: '我复习的从来不在卷子上', value: 1 }
    ]
  },

  // ===== 学习态度模型 =====
  // A1 自觉性
  {
    id: 'q13',
    dim: 'A1',
    text: '如果这周没人布置作业，你会怎么过？',
    options: [
      { text: '自己找题做，顺便预习下一章', value: 3 },
      { text: '快考试了才会主动翻书', value: 2 },
      { text: '没人管？那当然先玩了再说', value: 1 }
    ]
  },
  {
    id: 'q14',
    dim: 'A1',
    text: '老师说“这题不检查，你们自己回去做”，你会？',
    options: [
      { text: '照做，反正最后还是自己吃亏', value: 3 },
      { text: '做一半，意思意思', value: 2 },
      { text: '这话在我耳里等于不用做', value: 1 }
    ]
  },

  // A2 勤奋度
  {
    id: 'q15',
    dim: 'A2',
    text: '放学回去以后，你一般还会学多久？',
    options: [
      { text: '至少两三个小时，任务没完不睡', value: 3 },
      { text: '学一会儿，够用就行', value: 2 },
      { text: '回去基本就和学习告别了', value: 1 }
    ]
  },
  {
    id: 'q16',
    dim: 'A2',
    text: '周末的你更像哪种版本？',
    options: [
      { text: '按计划学，任务排得明明白白', value: 3 },
      { text: '拖到周日晚上集中救火', value: 2 },
      { text: '周末？那不是用来学习的', value: 1 }
    ]
  },

  // A3 求知欲
  {
    id: 'q17',
    dim: 'A3',
    text: '碰到一个没学明白的知识点，你通常会？',
    options: [
      { text: '非得搞懂，不然心里不舒服', value: 3 },
      { text: '有人讲明白我也愿意听', value: 2 },
      { text: '不懂就不懂吧，反正先过', value: 1 }
    ]
  },
  {
    id: 'q18',
    dim: 'A3',
    text: '除了考试内容，你会主动看别的东西吗？',
    options: [
      { text: '会，我对很多问题都想多挖一点', value: 3 },
      { text: '看心情，有兴趣就看', value: 2 },
      { text: '课本都没看完，哪有那闲工夫', value: 1 }
    ]
  },

  // ===== 社交能力模型 =====
  // S1 师生关系
  {
    id: 'q19',
    dim: 'S1',
    text: '下课后拿着题去办公室找老师，你会紧张吗？',
    options: [
      { text: '不紧张，甚至还能顺便多问两句', value: 3 },
      { text: '有问题才去，问完赶紧撤', value: 2 },
      { text: '能不去就不去，看见老师就想绕路', value: 1 }
    ]
  },
  {
    id: 'q20',
    dim: 'S1',
    text: '在老师眼里，你大概是哪类人？',
    options: [
      { text: '他基本记得住我，还会点我名字', value: 3 },
      { text: '有点印象，但不算存在感很强', value: 2 },
      { text: '我像教室里的背景板', value: 1 }
    ]
  },

  // S2 同学关系
  {
    id: 'q21',
    dim: 'S2',
    text: '课间十分钟，你最常见的状态是？',
    options: [
      { text: '一堆人围着聊，信息量比上课还大', value: 3 },
      { text: '和固定几个朋友待着', value: 2 },
      { text: '自己坐着放空，尽量不被打扰', value: 1 }
    ]
  },
  {
    id: 'q22',
    dim: 'S2',
    text: '同学来找你借东西/抄作业/问题，你通常会？',
    options: [
      { text: '来者不拒，我在班里算流通中心', value: 3 },
      { text: '看关系，熟的可以', value: 2 },
      { text: '我自己都顾不上，别来找我', value: 1 }
    ]
  },

  // S3 团队协作
  {
    id: 'q23',
    dim: 'S3',
    text: '小组作业自由组队时，你更像？',
    options: [
      { text: '默认当组织者，把活都分了', value: 3 },
      { text: '分到我这部分，我就按时交', value: 2 },
      { text: '先观察，最好能混进躺赢局', value: 1 }
    ]
  },
  {
    id: 'q24',
    dim: 'S3',
    text: '一个组最后做得好不好，你通常贡献多少？',
    options: [
      { text: '我基本是主要输出位', value: 3 },
      { text: '我完成该我做的那部分', value: 2 },
      { text: '主要贡献情绪价值和“加油”', value: 1 }
    ]
  },

  // ===== 生存策略模型 =====
  // B1 抗压能力
  {
    id: 'q25',
    dim: 'B1',
    text: '查到自己考砸那一秒，你更接近哪种反应？',
    options: [
      { text: '先稳住，回头看自己输在哪', value: 3 },
      { text: '难受一阵，但也能缓过来', value: 2 },
      { text: '心态直接炸掉，怀疑人生', value: 1 }
    ]
  },
  {
    id: 'q26',
    dim: 'B1',
    text: '当作业、考试、DDL一起冲过来时，你会？',
    options: [
      { text: '先排优先级，再一个个清', value: 3 },
      { text: '边慌边做，至少还能推进', value: 2 },
      { text: '压力太大，先瘫一会儿', value: 1 }
    ]
  },

  // B2 时间管理
  {
    id: 'q27',
    dim: 'B2',
    text: '作业和任务在你这里通常是什么命运？',
    options: [
      { text: '提前做完，截止日只是摆设', value: 3 },
      { text: '卡在最后一天交，也算准时', value: 2 },
      { text: '没有截止日逼我，我根本不会动', value: 1 }
    ]
  },
  {
    id: 'q28',
    dim: 'B2',
    text: '学习和娱乐撞车时，你最像哪种人？',
    options: [
      { text: '先把该做的做掉，再安心玩', value: 3 },
      { text: '玩一会儿再补，主打一个平衡', value: 2 },
      { text: '先玩了再说，学习看命', value: 1 }
    ]
  },

  // B3 作弊倾向
  {
    id: 'q29',
    dim: 'B3',
    text: '考场上如果有机会偷看一眼，你通常会？',
    options: [
      { text: '不会，错了也认', value: 1 },
      { text: '实在不会时可能瞄一下', value: 2 },
      { text: '有机会不利用才不合理', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'B3',
    text: '你对“作弊也是一种技术活”这句话怎么看？',
    options: [
      { text: '不认同，过线了就是过线了', value: 1 },
      { text: '能理解，但我也不太敢真上', value: 2 },
      { text: '说得对，会钻空子也是本事', value: 3 }
    ]
  }
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
