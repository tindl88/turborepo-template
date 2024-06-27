import React, { FC, SVGAttributes } from 'react';
import classNames from 'classnames';

const SuccessIcon: FC<SVGAttributes<Record<string, unknown>>> = ({ width = 24, className }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 130.2 130.2"
      width={width}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('fill-primary', className)}
    >
      <circle
        className="path circle"
        fill="none"
        stroke="#22c55e"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      ></circle>
      <polyline
        className="path check"
        fill="none"
        stroke="#22c55e"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      ></polyline>
    </svg>
  );
};

export default SuccessIcon;
