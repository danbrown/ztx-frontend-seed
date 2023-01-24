import { ContainerProps, Container } from "@wipsie/ui";

export const ZetaHeader1 = ({
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
        clipPath: "url(#cyberHeader1)",
        WebkitClipPath: "url(#cyberHeader1)",
      }}
    >
      {children}
    </Container>
  );
};
