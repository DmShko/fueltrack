import { FC } from "react";

import { StarProps } from '../../../types/springAnimaTypes';

import st from './Star.module.scss';

// images components

import Star from '../../SvgComponents/Star/Star';

const Booble: FC<StarProps> = ({ styleProps }) => {
  return (

    <div className={st.container} style={{...styleProps} as {}}>
      <Star width='100%' height='100%'/>
    </div>
  )
}

export default Booble;