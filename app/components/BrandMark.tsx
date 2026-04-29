export function BrandMark({
  size = "md",
  invert = false,
}: {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}) {
  const scale =
    size === "sm" ? "text-[14px]" : size === "lg" ? "text-2xl" : "text-base";
  const her = invert ? "bg-bone text-ink" : "bg-wine text-bone";
  const energy = invert ? "text-bone" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-1.5 font-display tracking-[0.12em] ${scale}`}>
      <span className={`${her} px-1.5 leading-none py-1`}>HER</span>
      <span className={`${energy} leading-none`}>ENERGY</span>
    </span>
  );
}
