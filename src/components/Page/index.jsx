import classes from './index.module.scss';
import logo from '../../../public/assets/logo.svg';
import TransfersFilters from '../TransfersFilters/index.jsx';
import Filters from '../Filters/index.jsx';
import List from '../List/index.jsx';
import { useSelector } from 'react-redux';
import { LoadingLogo } from '../../ui/LoadingLogo/index.jsx';

function Page() {
  const { loadingFetchListTickets } = useSelector((store) => store.getTickets);
  return (
    <>
      <div>
        <div className={classes.containerLogo}>
          <img src={logo} className={classes.logoAviasales} />
          {loadingFetchListTickets ? <LoadingLogo /> : null}
        </div>
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
