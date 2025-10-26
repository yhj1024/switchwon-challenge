import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
      >
        레이아웃입니다
        {children}
      </body>
    </html>
  );
}
