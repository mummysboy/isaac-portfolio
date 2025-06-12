export default function TestGuardPage() {
  return (
    <main className="p-10 text-center text-2xl text-red-600">
      🚨 You should NOT see this. Middleware didn't block you!
    </main>
  );
}
