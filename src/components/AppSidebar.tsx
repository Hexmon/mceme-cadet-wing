import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  BookOpen,
  GraduationCap,
  Activity,
  MessageSquare,
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
  UserCheck
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    group: "Dashboard",
    items: [
      { title: "Home", url: "/dashboard", icon: Home }
    ]
  },
  {
    group: "Assessment – NSA",
    items: [
      { title: "OLQA", url: "/dashboard/olqa", icon: FileText }
    ]
  },
  {
    group: "Overall OC Details", 
    items: [
      { title: "View All", url: "/dashboard/oc-details", icon: Users }
    ]
  },
  {
    group: "Academics",
    items: [
      { title: "Coming Soon", url: "/dashboard/academics", icon: BookOpen, badge: "Soon" }
    ]
  },
  {
    group: "Physical Training & Sports",
    items: [
      { title: "Activities", url: "/dashboard/pts", icon: Activity }
    ]
  },
  {
    group: "Interview",
    collapsible: true,
    items: [
      { title: "Platoon Cdr", url: "/dashboard/interview/platoon-cdr", icon: UserCheck },
      { title: "DS Coord", url: "/dashboard/interview/ds-coord", icon: UserCheck },
      { title: "CDR CTW", url: "/dashboard/interview/cdr-ctw", icon: UserCheck },
      { title: "DCCI", url: "/dashboard/interview/dcci", icon: UserCheck },
      { title: "Comdt", url: "/dashboard/interview/comdt", icon: UserCheck }
    ]
  },
  {
    group: "Report Management",
    items: [
      { title: "Reports", url: "/dashboard/reports", icon: FileText }
    ]
  },
  {
    group: "Site Settings",
    items: [
      { title: "Configuration", url: "/dashboard/settings", icon: Settings }
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  const [openGroups, setOpenGroups] = useState<string[]>(["Interview"]);

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent/50";

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r border-border">
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img 
              src="https://facultytick.com/wp-content/uploads/2022/03/Military-College-Of-Electronics-Mechanical-Engineering.jpg"
              alt="MCEME Logo" 
              className="h-8 w-8 object-contain rounded"
            />
            {!collapsed && (
              <div>
                <h3 className="font-semibold text-primary">MCEME CTW</h3>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* User Role Badge */}
        {!collapsed && (
          <div className="p-4 border-b border-border">
            <Badge variant="secondary" className="w-full justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Platoon Commander
            </Badge>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 p-2">
          {menuItems.map((section) => (
            <SidebarGroup key={section.group}>
              {section.collapsible ? (
                <Collapsible 
                  open={openGroups.includes(section.group)}
                  onOpenChange={() => toggleGroup(section.group)}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarGroupLabel className="flex items-center justify-between hover:bg-accent/50 rounded-md p-2 cursor-pointer">
                      <span className="text-xs font-medium text-muted-foreground">
                        {collapsed ? section.group.charAt(0) : section.group}
                      </span>
                      {!collapsed && (
                        <ChevronRight 
                          className={`h-3 w-3 transition-transform ${
                            openGroups.includes(section.group) ? 'rotate-90' : ''
                          }`}
                        />
                      )}
                    </SidebarGroupLabel>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <NavLink to={item.url} className={getNavCls}>
                                <item.icon className="h-4 w-4" />
                                {!collapsed && (
                                  <div className="flex items-center justify-between w-full">
                                    <span>{item.title}</span>
                                    {item.badge && (
                                      <Badge variant="outline" className="text-xs">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <>
                  {!collapsed && (
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
                      {section.group}
                    </SidebarGroupLabel>
                  )}
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink to={item.url} className={getNavCls}>
                              <item.icon className="h-4 w-4" />
                              {!collapsed && (
                                <div className="flex items-center justify-between w-full">
                                  <span>{item.title}</span>
                                  {item.badge && (
                                    <Badge variant="outline" className="text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </>
              )}
            </SidebarGroup>
          ))}
        </div>

        {/* Help Section */}
        <div className="p-2 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/dashboard/help" className={getNavCls}>
                  <HelpCircle className="h-4 w-4" />
                  {!collapsed && <span>Help / How-To</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}