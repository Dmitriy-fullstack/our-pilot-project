import Loader from "react-loader-spinner";

import s from './LoaderSpinner.module.scss';

const LoaderSpinner = ({ position = 'center' }) => 
  <div className={position === 'center' ? s.center : s.topRight}>
    <Loader
      type="Circles"
      color="#00BFFF"
      height={70}
      width={70}
      timeout={30000} //30 secs
    />
  </div>

export default LoaderSpinner;