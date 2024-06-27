import React, { FC, SVGAttributes } from 'react';
import classNames from 'classnames';

const ErrorIcon: FC<SVGAttributes<Record<string, unknown>>> = ({ width = 24, className }) => {
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
        stroke="#db3646"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      ></circle>
      <line
        className="path line"
        fill="none"
        stroke="#db3646"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="34.4"
        y1="37.9"
        x2="95.8"
        y2="92.3"
      ></line>
      <line
        className="path line"
        fill="none"
        stroke="#db3646"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2"
      ></line>
    </svg>
  );
};

export default ErrorIcon;
