import Image from "next/image";

type LT7IconProps = {
  size?: number;
  shape?: "circle" | "square";
};

export default function LT7Icon({
  size = 48,
  shape = "circle",
}: LT7IconProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? "50%" : "12px",
        overflow: "hidden",
      }}
      className="flex items-center justify-center"
    >
      <Image
  src="/images/lt7-icon.png"
  alt="LT7 Icon"
  width={size}
  height={size}
  priority
  className="brightness-0 invert"
/>
    </div>
  );
}