import classes from './index.module.scss';

export const Loading = () => {
  return (
    <div className={classes.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  );
};
