export default function getInputs(state) {
  return [
    {
      title: 'День',
      type: 'date',
      name: 'date',
      value: state.date,
      // handleChange,
    },
    {
      title: 'Время',
      type: 'time',
      name: 'time',
      value: state.time,
      // handleChange,
    },
    {
      title: 'Категории',
      type: 'button',
      name: 'category',
      value: state.category.name,
      // handleClick,
    },
    {
      title: 'Сумма',
      type: 'text',
      name: 'summ',
      value: state.summ,
      // handleChange,
    },
    {
      title: 'Валюта',
      type: 'text',
      name: 'currency',
      value: state.currency,
      // handleChange,
    },
    {
      title: 'Комментарий',
      type: 'text',
      name: 'comment',
      value: state.comment,
      // handleChange,
    },
  ];
}