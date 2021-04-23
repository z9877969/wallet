import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import {
  addCostsCat,
  addIncomesCat,
} from '../../redux/categories/categoriesOperation';
import Button from '../_share/Button';
import Form from '../_share/Form';
import css from '../_share/Form/Form.module.css';

const AddCategory = () => {
  const dispatch = useDispatch();
  const { push, location } = useHistory();
  const { url } = useRouteMatch();
  const [value, setValue] = useState('');

  const category = url.split('/')[1];

  const handleChange = e => setValue(e.target.value);
  const handleGoBack = () => push(location.state?.from || "/");

  const handleSubmit = e => {
    e.preventDefault();
    category === 'incomes' && dispatch(addIncomesCat({ name: value }));
    category === 'costs' && dispatch(addCostsCat({ name: value }));
    setValue('');
    handleGoBack();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button className={css.btn} title="GoBack" cbOnClick={handleGoBack}/>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Введите категорию"
      />
    </Form>
  );
};

export default AddCategory;
