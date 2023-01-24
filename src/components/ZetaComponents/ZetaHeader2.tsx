import { ContainerProps, Container } from "@wipsie/ui";

export const ZetaHeader2 = ({
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
        clipPath: "url(#cyberHeader2)",
        WebkitClipPath: "url(#cyberHeader2)",
      }}
    >
      {children}
    </Container>
  );
};
