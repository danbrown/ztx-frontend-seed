import { ContainerProps, Container } from "@wipsie/ui";

export const ZetaContainer = ({
  children,
  style = {},
  ref,
  ...props
}: ContainerProps) => {
  return (
    <Container
      {...props}
      ref={ref && (ref as any)}
      style={{
        ...style,
        clipPath: "url(#cyberCard1H)",
        WebkitClipPath: "url(#cyberCard1H)",
      }}
    >
      {children}
    </Container>
  );
};
