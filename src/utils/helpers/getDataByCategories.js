const getDataByCategories = data => {
  return data
    .map(transaction => {
      const { category, summ, ...rest } = transaction;
      return { ...rest, ...category, summ: Number(transaction.summ) };
    })
    .reduce((acc, { name, id, summ }) => {
      if (!acc.length) return [{ name, id, summ }];
      if (acc.find(category => category.id === id)) {
        acc.find(category => category.id === id).summ += summ;
        return acc;
      }
      return [...acc, { name, id, summ }];
    }, []);
};

export default getDataByCategories;