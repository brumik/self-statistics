import ButtonAppBar from "./ButtonAppBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ButtonAppBar />
      {children}
    </>
  );
}
