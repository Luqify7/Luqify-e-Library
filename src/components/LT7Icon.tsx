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
      }}
      className="flex items-center justify-center bg-black text-white font-black"
    >
      LT7
    </div>
  );
}