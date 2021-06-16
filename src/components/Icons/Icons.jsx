import IconsSVG from '../../utils/symbol-defs.svg';

import s from './Icons.module.scss';

function Icons({ name, size, color='', className='noClass' }) {

  return(
    <svg className={s[className]} fill={color} stroke={color} width={size} height={size}>
      <use xlinkHref={`${IconsSVG}#icon-${name}`} />
    </svg>
  )
}

export default Icons;