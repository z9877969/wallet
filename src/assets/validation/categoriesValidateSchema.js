import * as Yup from 'yup';

export default Yup.object().shape({
    category: Yup.string().matches(/^(?!(Выберите)[\s](категорию))\w*/, "Input correctly data"),
    summ: Yup.string().matches(/^[0-9]{1,8}/, "Input correctly data"),
});