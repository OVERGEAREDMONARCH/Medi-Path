import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientHeader } from "@/components/patient/PatientHeader";
import { PatientStats } from "@/components/patient/PatientStats";
import { PatientOverview } from "@/components/patient/PatientOverview";
import { PatientAppointments } from "@/components/patient/PatientAppointments";
import { PatientRecords } from "@/components/patient/PatientRecords";
import { PatientMedications } from "@/components/patient/PatientMedications";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <PatientHeader />

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Welcome back, John Doe
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Here's an overview of your health information and upcoming appointments.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto rounded-lg border bg-muted/50 p-1">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs md:text-sm">Appointments</TabsTrigger>
            <TabsTrigger value="records" className="text-xs md:text-sm">Records</TabsTrigger>
            <TabsTrigger value="medications" className="text-xs md:text-sm">Medications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 md:space-y-6">
            <PatientStats />
            <PatientOverview />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4 md:space-y-6">
            <PatientAppointments />
          </TabsContent>

          <TabsContent value="records" className="space-y-4 md:space-y-6">
            <PatientRecords />
          </TabsContent>

          <TabsContent value="medications" className="space-y-4 md:space-y-6">
            <PatientMedications />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;