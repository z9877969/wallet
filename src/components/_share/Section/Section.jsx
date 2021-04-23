import css from './Section.module.css';

const Section = ({ title, children, className }) => {
  return (
    <section className={css.section + (className || '')}>
      {!!title && typeof title === 'string' ? (
        <h2 className={css.title}>{title}</h2>
      ) : title?.tag === 'h1' ? (
        <h1 className={css.title}>{title}</h1>
      ) : title?.tag === 'h3' ? (
        <h3 className={css.title}>{title}</h3>
      ) : null}
      {children}
    </section>
  );
};

export default Section;
