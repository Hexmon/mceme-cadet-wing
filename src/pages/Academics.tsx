import React from "react";
import { Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Academics = () => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="max-w-md w-full text-center shadow-md">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Hourglass className="h-8 w-8 text-muted-foreground animate-pulse" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The Academics module is currently under development. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Academics;
