const anyLetter = ['a', 's', 'd', 'f', 'g', 'h'];

const getRandomLetterIdx = letterListLength =>
  Math.ceil(Math.random() * (letterListLength - 1));

const createRandomWord = letterQuantity => {
  const letterListLength = anyLetter.length;
  let word = '';
  for (let i = 0; i < letterQuantity; i += 1) {
    const letterIdx = getRandomLetterIdx(letterListLength);
    word += anyLetter[letterIdx];
  }
  return word;
};

const createRandomObject = keysQuantity =>
  Array(keysQuantity)
    .fill('')
    .reduce((acc, _, idx) => {
      acc[idx] = createRandomWord(4);
      return acc;
    }, {});

const iteratingObjWithLoop = obj => {
  for (const key in obj) {
    if (obj[key] === 'qwe') return key;
  }
};

const iteratingObjWithObjectClass = obj => {
  return Object.keys(obj).find(el => obj[el] === 'qwe');
};

const getFuncSpeed = cb => {
  const startTime = Date.now();
  cb();
  const funcSpeed = (Date.now() - startTime) / 1000;
  console.log('funcSpeed :>> ', funcSpeed, ' sec');
  return funcSpeed;
};

const object = createRandomObject(1000000);

const speedWithLoop = getFuncSpeed(() => iteratingObjWithLoop(object));
const speedWithClass = getFuncSpeed(() => iteratingObjWithObjectClass(object));

console.log('objWithLoop :>> ', speedWithLoop);
console.log('objWithClass :>> ', speedWithClass);

console.log('k :>> ', ((speedWithLoop / speedWithClass) * 100).toFixed(2));
