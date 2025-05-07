import HeaderButtons from "./header-buttons";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="border-b h-14 lg:h-16 flex items-center justify-between p-4 lg:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="md:hidden size-10" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 md:hidden"
        />
        <h1 className="font-medium">{title}</h1>
      </div>
      <HeaderButtons />
    </header>
  );
};

export default Header;
