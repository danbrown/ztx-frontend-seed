import { Input, InputProps } from "@wipsie/ui";

export const ZetaInput = ({
  children,
  wrapperProps = {},
  ref,
  ...props
}: InputProps) => {
  return (
    <Input
      {...props}
      ref={ref && (ref as any)}
      wrapperProps={{
        ...wrapperProps,
        style: {
          ...wrapperProps?.style,
          clipPath: "url(#cyberButton1)",
          WebkitClipPath: "url(#cyberButton1)",
        },
      }}
    >
      {children}
    </Input>
  );
};
