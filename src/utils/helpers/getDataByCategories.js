const getDataByCategories = data => {
  return data
    .map(transaction => {
      const { category, summ, id, ...rest } = transaction;
      return {
        // ...rest,
        id,
        name: typeof category === 'object' ? category.name : category,
        summ: Number(transaction.summ),
      };
    })
    .reduce((acc, { name, id, summ }) => {
      if (!acc.length) return [{ name, id, summ }];
      const curCat = acc.find(category => category.id === id);
      if (curCat) {
        curCat.summ += summ;
        return acc;
      }
      return [...acc, { name, id, summ }];
    }, []);
};

export default getDataByCategories;
