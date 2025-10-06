import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

type TabItem = {
  value: string;
  title: string;
  icon?: React.ElementType;
  link?: string;
};

interface GlobalTabsProps {
  tabs: TabItem[];
  defaultValue: string;
  children: React.ReactNode;
}

export default function GlobalTabs({ tabs, defaultValue, children }: GlobalTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map(({ value, title, icon: Icon, link }) =>
          link ? (
            <Link key={value} to={link} className="text-center hover:text-primary">
              <TabsTrigger value={value} className="flex items-center gap-2 border border-gray-300 data-[state=inactive]:bg-[#746F72] data-[state=active]:bg-white data-[state=active]:border-primary rounded-md px-3 py-2 transition-colors text-white w-full">
                {Icon && <Icon className="h-4 w-4" />}
                {title}
              </TabsTrigger>
            </Link>
          ) : (
            <TabsTrigger key={value} value={value} className="flex items-center gap-2 border border-gray-300 data-[state=inactive]:bg-[#746F72] data-[state=active]:bg-white data-[state=active]:border-primary rounded-md px-3 py-2 transition-colors text-white w-full">
              {Icon && <Icon className="h-4 w-4" />}
              {title}
            </TabsTrigger>
          )
        )}
      </TabsList>

      {/* Inject page-specific content */}
      {children}
    </Tabs>
  );
}
