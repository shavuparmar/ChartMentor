import React from 'react';

const Logo = ({ size = 500, color = "white", backgroundColor = "#0d1117" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background Container */}
            <rect width="500" height="500" fill={backgroundColor} rx="40" ry="40" />

            {/* Outer Circular "C" Shape */}
            <path
                d="M 230 400 A 150 150 0 1 1 350 180"
                stroke={color}
                strokeWidth="18"
                strokeLinecap="round"
            />

            {/* Candlestick Chart Elements */}
            <g fill={color}>
                {/* Bar 1 */}
                <rect x="155" y="320" width="8" height="60" rx="2" />
                <line x1="159" y1="310" x2="159" y2="390" stroke={color} strokeWidth="2" />

                {/* Bar 2 */}
                <rect x="185" y="290" width="8" height="70" rx="2" />
                <line x1="189" y1="280" x2="189" y2="375" stroke={color} strokeWidth="2" />

                {/* Bar 3 */}
                <rect x="215" y="305" width="8" height="50" rx="2" />
                <line x1="219" y1="295" x2="219" y2="365" stroke={color} strokeWidth="2" />

                {/* Bar 4 */}
                <rect x="245" y="285" width="8" height="40" rx="2" />
                <line x1="249" y1="275" x2="249" y2="335" stroke={color} strokeWidth="2" />
            </g>

            {/* The Central 'M' and Growth Arrow */}
            <path
                d="M 190 230 L 270 330 L 350 200 L 350 400 M 350 200 L 430 100 M 430 100 L 380 110 M 430 100 L 420 150"
                stroke={color}
                strokeWidth="22"
                strokeLinejoin="round"
                strokeLinecap="round"
            />

            {/* Top Arc Accent */}
            <path
                d="M 270 145 A 120 120 0 0 1 340 160"
                stroke={color}
                strokeWidth="6"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Logo;