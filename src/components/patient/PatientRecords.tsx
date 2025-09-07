import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const PatientRecords = () => {
  const records = [
    {
      title: "Blood Test Results",
      date: "Dec 10, 2024"
    },
    {
      title: "X-Ray Chest",
      date: "Nov 28, 2024"
    },
    {
      title: "MRI Brain Scan",
      date: "Nov 15, 2024"
    },
    {
      title: "ECG Report",
      date: "Oct 30, 2024"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Medical Records</CardTitle>
        <CardDescription>Your health history and documents</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {records.map((record, index) => (
            <div key={index} className="border border-border/20 rounded-lg p-3 md:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="space-y-1">
                  <p className="font-medium text-sm md:text-base">{record.title}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{record.date}</p>
                </div>
                <Button size="sm" variant="outline" className="w-full sm:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};