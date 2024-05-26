export const getRandomGradient = (): string => {
  const colors = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#FF8C33',
    '#8C33FF',
    '#33FF8C',
  ];
  const randomColor1 = colors[Math.floor(Math.random() * colors.length-1)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;
};