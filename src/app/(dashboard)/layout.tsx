import NewLayout from "@/component/Layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NewLayout>{children}</NewLayout>
    </section>
  );
}
