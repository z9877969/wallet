export default function transformDataListToArr(data) {
  const dataTransformed = [];
  for (const id in data) {
    dataTransformed.push({ id, ...data[id] });
  }
  return dataTransformed;
}
