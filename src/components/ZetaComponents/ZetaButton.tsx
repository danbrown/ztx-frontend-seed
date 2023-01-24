import { Button, ButtonProps } from "@wipsie/ui";

export const ZetaButton = ({
  children,
  style = {},
  ref,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberButton2)",
        WebkitClipPath: "url(#cyberButton2)",
        paddingBottom: "0.65rem",
      }}
    >
      {children}
    </Button>
  );
};
