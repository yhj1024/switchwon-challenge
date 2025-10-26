import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>switchwon</title>
        {/* DNS+TLS 워밍업 */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* CSS 자체 프리로드 (중복 다운로드 안 됨) */}
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-pretendard">{children}</body>
    </html>
  );
}
