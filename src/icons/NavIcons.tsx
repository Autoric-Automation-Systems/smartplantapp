import React from "react";

type NavIconProps = {
  className?: string;
};

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const AlarmsIcon: React.FC<NavIconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M18 8a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
    <path d="M10.3 20a2 2 0 0 0 3.4 0" />
  </svg>
);

export const PlantIcon: React.FC<NavIconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 21v-8" />
    <path d="M12 13C12 8.5 15.5 5 20 5c0 4.5-3.5 8-8 8Z" />
    <path d="M12 15c0-3.9-3.1-7-7-7 0 3.9 3.1 7 7 7Z" />
  </svg>
);

export const CompanyIcon: React.FC<NavIconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
    <path d="M14 9h4a2 2 0 0 1 2 2v10" />
    <path d="M2 21h20" />
    <path d="M8 7h2M8 11h2M8 15h2" />
  </svg>
);

export const UsersIcon: React.FC<NavIconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
    <circle cx="9.5" cy="7.5" r="3.5" />
    <path d="M21 20v-1.5a4 4 0 0 0-3-3.87" />
    <path d="M15.5 4.13a4 4 0 0 1 0 7.74" />
  </svg>
);
