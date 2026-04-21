// 互联网学历测试 - 30 道场景题
// 每维度 2 题，共 15 维度
// 每题 3 个选项，分值 1-3

const questions = [
  // ===== 信息处理模型 =====
  // L1 信息留存
  {
    id: 'q1',
    dim: 'L1',
    text: '刷完"学历越高越幸福"的视频，两天后你脑子里还剩啥？',
    options: [
      { text: '结论、案例、评论区名场面，全在', value: 3 },
      { text: '结论还在，细节靠评论区续命', value: 2 },
      { text: '只剩焦虑，内容全蒸发', value: 1 }
    ]
  },
  {
    id: 'q2',
    dim: 'L1',
    text: '群里聊张雪峰、考公考研，你是什么状态？',
    options: [
      { text: '谁在讲梗谁在放屁，我都分得清', value: 3 },
      { text: '主线跟得上，细节靠蒙', value: 2 },
      { text: '聊完一圈，我像没来过', value: 1 }
    ]
  },

  // L2 逻辑拆解
  {
    id: 'q3',
    dim: 'L2',
    text: '张雪峰又上热搜分析专业就业，你？',
    options: [
      { text: '先听，再拆他哪句在下钩子', value: 3 },
      { text: '先听个大概，再蹲评论区', value: 2 },
      { text: '谁上热搜谁有理', value: 1 }
    ]
  },
  {
    id: 'q4',
    dim: 'L2',
    text: '博主把薪资、就业率、幸福感搅一锅，你多久能听出不对？',
    options: [
      { text: '一耳朵就知道他在偷换概念', value: 3 },
      { text: '多刷几条评论才反应过来', value: 2 },
      { text: '他说得顺耳就行', value: 1 }
    ]
  },

  // L3 注意稳定
  {
    id: 'q5',
    dim: 'L3',
    text: '本来要投简历，结果抖音连刷三条焦虑视频，你会？',
    options: [
      { text: '先投，焦虑给我排队', value: 3 },
      { text: '看两秒，直奔评论区吃瓜', value: 2 },
      { text: '手停不下来，抖音比我妈还懂我', value: 1 }
    ]
  },
  {
    id: 'q6',
    dim: 'L3',
    text: '"先就业还是先择业"的直播吵半小时，你能撑多久？',
    options: [
      { text: '能听完，还顺手记点干货', value: 3 },
      { text: '前半程在线，后半程走神', value: 2 },
      { text: '吵不到五分钟就切了', value: 1 }
    ]
  },

  // ===== 上岸博弈模型 =====
  // E1 策略判断
  {
    id: 'q7',
    dim: 'E1',
    text: '考公考研信息满天飞，你怎么筛？',
    options: [
      { text: '先看赛道，再挑能用的', value: 3 },
      { text: '挑顺眼的先抄两条', value: 2 },
      { text: '谁说得燃就听谁', value: 1 }
    ]
  },
  {
    id: 'q8',
    dim: 'E1',
    text: '首页同时推"二战翻盘""保研秘籍""考公攻略"，你？',
    options: [
      { text: '只拿能落地的，不拜模板', value: 3 },
      { text: '先抄几条，顶一阵再说', value: 2 },
      { text: '全盘照搬，赌命不露馅', value: 1 }
    ]
  },

  // E2 现场应对
  {
    id: 'q9',
    dim: 'E2',
    text: '饭桌突然问你"考研还是工作"，所有人都盯着你，你？',
    options: [
      { text: '当场讲清，气势还稳', value: 3 },
      { text: '先糊住，再边编边理', value: 2 },
      { text: '话没两句，人先想逃', value: 1 }
    ]
  },
  {
    id: 'q10',
    dim: 'E2',
    text: '评论区有人阴阳你学校专业，你？',
    options: [
      { text: '越被阴阳越冷静，顺手反杀', value: 3 },
      { text: '会红温，但还能圆回来', value: 2 },
      { text: '一解释就像自证', value: 1 }
    ]
  },

  // E3 风向感应
  {
    id: 'q11',
    dim: 'E3',
    text: '考研群有人天天晒学习时长，你？',
    options: [
      { text: '被创一下，手还是继续刷题', value: 3 },
      { text: '看一眼，互不打扰', value: 2 },
      { text: '当场破防，感觉别人都偷跑了', value: 1 }
    ]
  },
  {
    id: 'q12',
    dim: 'E3',
    text: '热搜天天换说法，你总能刷到有用那条吗？',
    options: [
      { text: '总能，像平台偷偷递答案', value: 3 },
      { text: '偶尔踩中，剩下看命', value: 2 },
      { text: '有用的刷不到，焦虑一条不落', value: 1 }
    ]
  },

  // ===== 行动驱动模型 =====
  // A1 主动推进
  {
    id: 'q13',
    dim: 'A1',
    text: '没人催你规划学历和工作，你？',
    options: [
      { text: '自己也会推，不想真掉队', value: 3 },
      { text: '想到就动两下', value: 2 },
      { text: '没人催就当没这事', value: 1 }
    ]
  },
  {
    id: 'q14',
    dim: 'A1',
    text: '刷到同龄人晒保研、晒编制、晒高薪，你？',
    options: [
      { text: '酸归酸，先补短板', value: 3 },
      { text: '先酸一会，再看心情', value: 2 },
      { text: '酸完划走，继续装死', value: 1 }
    ]
  },

  // A2 执行密度
  {
    id: 'q15',
    dim: 'A2',
    text: '收藏一堆干货之后，你一般？',
    options: [
      { text: '真拿出来用，不养蛊', value: 3 },
      { text: '挑两条试试，剩下吃灰', value: 2 },
      { text: '收藏夹就是我的努力证明', value: 1 }
    ]
  },
  {
    id: 'q16',
    dim: 'A2',
    text: '明知该复习找实习，结果先刷了半小时梗，你？',
    options: [
      { text: '晚上也得把进度拉回来', value: 3 },
      { text: '补一点算一点', value: 2 },
      { text: '今天既然废了就废到底', value: 1 }
    ]
  },

  // A3 求证欲
  {
    id: 'q17',
    dim: 'A3',
    text: '看见"学历高不一定幸福""先就业更现实"这种串烧，你？',
    options: [
      { text: '会多翻样本，不吃一口热搜', value: 3 },
      { text: '有人总结我就顺手看', value: 2 },
      { text: '看个热闹就散', value: 1 }
    ]
  },
  {
    id: 'q18',
    dim: 'A3',
    text: '网红把专业吹成"闭眼赢"或"纯天坑"，你会查吗？',
    options: [
      { text: '先查，受不了拿人生当带货', value: 3 },
      { text: '有空再查', value: 2 },
      { text: '他说得自信我就先信', value: 1 }
    ]
  },

  // ===== 互动能力模型 =====
  // S1 向上沟通
  {
    id: 'q19',
    dim: 'S1',
    text: '老师说"有问题来问"，你？',
    options: [
      { text: '真有事就去问，顺手聊透', value: 3 },
      { text: '卡死了才去', value: 2 },
      { text: '宁愿瞎撞也不问', value: 1 }
    ]
  },
  {
    id: 'q20',
    dim: 'S1',
    text: '老师在群里点名问你"考研还是就业"，你？',
    options: [
      { text: '能接住，还能顺手讲规划', value: 3 },
      { text: '会紧，但还能回', value: 2 },
      { text: '只想装掉线', value: 1 }
    ]
  },

  // S2 同辈交流
  {
    id: 'q21',
    dim: 'S2',
    text: '群里吵"学历重要还是能力重要""张雪峰有没有用"，你是？',
    options: [
      { text: '活跃嘴替，梗和观点都我在顶', value: 3 },
      { text: '看情况接两句', value: 2 },
      { text: '潜水，别 cue 我', value: 1 }
    ]
  },
  {
    id: 'q22',
    dim: 'S2',
    text: '别人私信问你"专业值不值""要不要二战"，你？',
    options: [
      { text: '愿意认真聊，利弊都给他摆', value: 3 },
      { text: '回两句意思意思', value: 2 },
      { text: '我自己都没活明白', value: 1 }
    ]
  },

  // S3 协作输出
  {
    id: 'q23',
    dim: 'S3',
    text: '一起做"学历焦虑图鉴"或"专业避坑合集"，你？',
    options: [
      { text: '主动分工定节奏，还顺手催人', value: 3 },
      { text: '分我啥我做啥', value: 2 },
      { text: '先找轻松活', value: 1 }
    ]
  },
  {
    id: 'q24',
    dim: 'S3',
    text: '多人赶简历、PPT、申报材料时，你一般？',
    options: [
      { text: '主输出位，最后还得收尸', value: 3 },
      { text: '自己那份不掉链子', value: 2 },
      { text: '主要负责说辛苦了', value: 1 }
    ]
  },

  // ===== 生存策略模型 =====
  // B1 抗压能力
  {
    id: 'q25',
    dim: 'B1',
    text: '刷到"学历越高薪资越高幸福感越强"对比图，你？',
    options: [
      { text: '先稳住，再看它是不是卖焦虑', value: 3 },
      { text: '会被扎一下，但还能活', value: 2 },
      { text: '看完像被指名道姓骂了', value: 1 }
    ]
  },
  {
    id: 'q26',
    dim: 'B1',
    text: '别人晒 offer 晒上岸，你还没定下来，你？',
    options: [
      { text: '先稳住，按节奏继续', value: 3 },
      { text: '焦虑归焦虑，还能动', value: 2 },
      { text: '直接进入全网针对我模式', value: 1 }
    ]
  },

  // B2 节奏管理
  {
    id: 'q27',
    dim: 'B2',
    text: '考研考公求职实习一起压过来，你？',
    options: [
      { text: '分阶段排，不让一起炸', value: 3 },
      { text: '见招拆招，勉强没死', value: 2 },
      { text: '全堆着，等死线抽我', value: 1 }
    ]
  },
  {
    id: 'q28',
    dim: 'B2',
    text: '白天被热搜创飞，晚上还有材料要交，你？',
    options: [
      { text: '先交，再慢慢崩', value: 3 },
      { text: '边崩边做，效率打折', value: 2 },
      { text: '先崩一会，明天的我背锅', value: 1 }
    ]
  },

  // B3 包装边界
  {
    id: 'q29',
    dim: 'B3',
    text: '有人叫你把"普通经历"写成"高配项目"，你？',
    options: [
      { text: '不碰，普通就普通', value: 1 },
      { text: '小修可以，别修成诈骗', value: 2 },
      { text: '写呗，互联网谁不包装', value: 3 }
    ]
  },
  {
    id: 'q30',
    dim: 'B3',
    text: '"会包装会讲故事的人先赢半步"，你认吗？',
    options: [
      { text: '不认，包装替不了真本事', value: 1 },
      { text: '半认，过线就等着翻车', value: 2 },
      { text: '认，不会包装的先吃亏', value: 3 }
    ]
  }
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions };
}
