export const uuid = (count: number): string => {
  const generate = () =>
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => {
      const r = (Math.random() * 36) | 0;
      return r.toString(36);
    });

  return Array.from({ length: count }, generate).join();
};
