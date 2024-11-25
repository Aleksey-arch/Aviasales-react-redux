import classes from './index.module.scss';
import logo from '../../assets/logo.svg';
import TransfersFilters from '../TransfersFilters/index.jsx';
import Filters from '../Filters/index.jsx';
import List from '../List/index.jsx';

function Page() {
  return (
    <>
      <div>
        <img src={logo} className={classes.logoAviasales} />
        <div className={classes.containerColumn}>
          <TransfersFilters />
          <div className={classes.containerFilterIsList}>
            <Filters />
            <List />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
