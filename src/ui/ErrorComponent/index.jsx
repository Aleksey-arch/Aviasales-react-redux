import classes from './index.module.scss';
import { VscBracketError } from 'react-icons/vsc';

export const ErrorComponent = () => {
  return (
    <div className={classes.ldsRipple}>
      <VscBracketError fontSize={50} color="#cc5f5f" />
      <p>Ничего не найдено!</p>
    </div>
  );
};
