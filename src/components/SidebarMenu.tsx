export function SidebarMenu() {
  return (
    <nav className="w-1/5 bg-white p-6 shadow-md">
      <ul className="space-y-4 links-primary text-center">
        <li className="cursor-pointer hover:text-gray-600 pb-3">Início</li>
        <li className="cursor-pointer hover:text-gray-600 pb-3">Transferências</li>
        <li className="cursor-pointer hover:text-gray-600 pb-3">Investimentos</li>
        <li className="cursor-pointer hover:text-gray-600 pb-3">Outros serviços</li>
      </ul>
    </nav>
  );
}