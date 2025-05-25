export function SidebarMenu() {
  return (
    <nav className="w-1/5 bg-white p-6 shadow-md">
      <ul className="space-y-4 text-gray-700 font-semibold">
        <li className="cursor-pointer hover:text-blue-600">Início</li>
        <li className="cursor-pointer hover:text-blue-600">Transferências</li>
        <li className="cursor-pointer hover:text-blue-600">Investimentos</li>
        <li className="cursor-pointer hover:text-blue-600">Outros serviços</li>
      </ul>
    </nav>
  );
}