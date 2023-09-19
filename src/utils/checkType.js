
export const checkType = (el, type) => {
  if (Object.prototype.toString.call(type) === '[object String]' && type.length) {
    const curType = type[0].toUpperCase() + type.slice(1);
    return Object.prototype.toString.call(el) === `[object ${curType}]`;
  }
  return false;
};
