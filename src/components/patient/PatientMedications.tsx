import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const PatientMedications = () => {
  const medications = [
    {
      name: "Lisinopril 10mg",
      schedule: "Once daily with breakfast",
      status: "Active"
    },
    {
      name: "Metformin 500mg",
      schedule: "Twice daily with meals",
      status: "Active"
    },
    {
      name: "Vitamin D3 1000 IU",
      schedule: "Once daily",
      status: "Active"
    },
    {
      name: "Aspirin 81mg",
      schedule: "Once daily",
      status: "Active"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Current Medications</CardTitle>
        <CardDescription>Your active prescriptions and medication schedule</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {medications.map((medication, index) => (
          <div key={index} className="border border-border/20 rounded-lg p-3 md:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="space-y-1 flex-1">
                <p className="font-medium text-sm md:text-base">{medication.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{medication.schedule}</p>
              </div>
              <Badge variant="secondary" className="w-fit">{medication.status}</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};