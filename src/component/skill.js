export const skillList = [
  {
    value: 'attack',
    caption: '攻撃',
    items: [
      { value: 'PS', caption: '物単' },
      { value: 'PR', caption: '物範' },
      { value: 'PA', caption: '物全' },
      { value: 'MS', caption: '魔単' },
      { value: 'MR', caption: '魔範' },
      { value: 'MA', caption: '魔全' }
    ]
  },
  {
    value: 'defense',
    caption: '防御',
    items: [
      { value: 'AP', caption: '物攻' },
      { value: 'AM', caption: '魔攻' }
    ]
  },
  {
    value: 'assist',
    caption: '補助',
    items: [
      { value: 'HP', caption: 'HP' },
      { value: 'TP', caption: 'TP' },
      { value: 'SP', caption: '速度' }
    ]
  },
  {
    value: 'enhance',
    caption: '強化',
    items: [
      { value: 'AP', caption: '物攻' },
      { value: 'AM', caption: '魔攻' },
      { value: 'DP', caption: '物防' },
      { value: 'DM', caption: '魔防' },
      { value: 'BP', caption: '物吸' },
      { value: 'BM', caption: '魔吸' }
    ]
  },
  {
    value: 'weaken',
    caption: '弱化',
    items: [
      { value: 'AP', caption: '物攻' },
      { value: 'AM', caption: '魔攻' },
      { value: 'DP', caption: '物防' },
      { value: 'DM', caption: '魔防' }
    ]
  },
  {
    value: 'encumber',
    caption: '阻害',
    items: [
      { value: 'NK', caption: '強打' },
      { value: 'ST', caption: '気絶' },
      { value: 'CF', caption: '混乱' },
      { value: 'BL', caption: '暗闇' },
      { value: 'TP', caption: 'TP減少' },
      { value: 'PR', caption: '挑発' }
    ]
  }
];

export const skillMap = skillList.reduce((skillMap, group) => {
  skillMap[group.value] = {
    caption: group.caption,
    skills: group.items.reduce((skills, skill) => {
      skills[skill.value] = skill.caption;
      return skills;
    }, {})
  };

  return skillMap;
}, {});
