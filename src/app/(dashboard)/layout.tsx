export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      {/* TODO: 인증 체크 로직 추가 */}
      {/* TODO: 네비게이션/사이드바 추가 */}
      {children}
    </div>
  );
}
