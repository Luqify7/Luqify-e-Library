type LuqifyLogoProps = {
  size?: number;
};

export default function LuqifyLogo({
  size = 48,
}: LuqifyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      {/* Outer mark */}
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="24"
        fill="#3B2412"
      />


      {/* Open book */}
      <path
        d="M25 35C35 31 43 34 50 40V72C43 66 35 64 25 68V35Z"
        fill="#FAF7F0"
      />


      <path
        d="M75 35C65 31 57 34 50 40V72C57 66 65 64 75 68V35Z"
        fill="#FAF7F0"
      />


      {/* Digital connection */}
      <circle
        cx="50"
        cy="32"
        r="6"
        fill="#C9A96E"
      />


      <path
        d="M50 38V58"
        stroke="#C9A96E"
        strokeWidth="4"
        strokeLinecap="round"
      />


      {/* Small L mark */}
      <path
        d="M46 58H57"
        stroke="#C9A96E"
        strokeWidth="4"
        strokeLinecap="round"
      />

    </svg>
  );
}