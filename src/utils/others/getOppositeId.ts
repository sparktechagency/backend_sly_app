export const getOppositeId = (
  arrayOfId: [string, string],
  id: string
): string => {
  return arrayOfId[0] === id ? arrayOfId[1] : arrayOfId[0];
};
