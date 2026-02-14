import type { Technology } from '../../backend';

const categories = [
  'Display Technology',
  'Processing',
  'Battery',
  'Camera',
  'Connectivity',
  'Materials',
  'Audio',
  'Security',
  'AI & ML',
  'Manufacturing',
];

const effects = [
  'Increases battery life by 10%',
  'Improves processing speed by 15%',
  'Enhances display quality',
  'Reduces manufacturing cost by 5%',
  'Improves camera resolution',
  'Increases device durability',
  'Enhances wireless connectivity',
  'Reduces power consumption',
  'Improves AI capabilities',
  'Increases production efficiency',
];

function generateTech(id: number): Technology {
  const category = categories[id % categories.length];
  const tier = Math.floor(id / 300) + 1;

  return {
    researchId: `tech-${id}`,
    researchName: `${category} ${tier}.${(id % 100) + 1}`,
    category,
    effectedTestProps: [effects[id % effects.length], effects[(id + 1) % effects.length]],
    status: { __kind__: 'notStarted', notStarted: null },
    price: BigInt(1000 + id * 100),
    researchTime: BigInt(5 + (id % 20)),
    requirements:
      id > 0 && id % 10 === 0
        ? {
            cash: BigInt(5000),
            researchedTechnologies: [`tech-${id - 1}`],
          }
        : undefined,
    description: `Advanced ${category.toLowerCase()} technology that provides significant improvements to device performance and capabilities.`,
    isCompleted: false,
    researchDate: undefined,
    cost: BigInt(1000 + id * 100),
  };
}

export const techDataset: Technology[] = Array.from({ length: 3000 }, (_, i) => generateTech(i));
