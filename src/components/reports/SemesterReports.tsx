import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Download, FileText, BarChart3 } from 'lucide-react';

type SemesterReportsProps = {
  semester?: string;
  printable?: boolean;
};

export const SemesterReports: React.FC<SemesterReportsProps> = ({ semester, printable = false }) => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // You can optionally use the `semester` prop to preselect or override state
  // e.g., set selectedSemester from prop if in printable mode
  // You can update this logic as needed

  const reportTypes = [
    { id: 'attendance', name: 'Attendance Report', icon: BarChart3 },
    { id: 'academic', name: 'Academic Performance', icon: FileText },
    { id: 'dossier', name: 'Complete E-Dossier', icon: Download },
  ];

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report for semester ${selectedSemester || semester}, year ${selectedYear}`);
  };

  return (
    <Card className={`p-6 mb-8 ${printable ? 'shadow-none border-none' : ''}`}>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Semester-wise Reports</h3>
      </div>

      {/* You can choose to hide the selects if `printable` */}
      {!printable && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Semester</label>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger>
                <SelectValue placeholder="Choose semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
                <SelectItem value="7">Semester 7</SelectItem>
                <SelectItem value="8">Semester 8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Academic Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Choose academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2024-25">2024-25</SelectItem>
                <SelectItem value="2025-26">2025-26</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Reports UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5 text-primary" />
                <h4 className="font-medium">{report.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate detailed {report.name.toLowerCase()} for the selected semester
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                disabled={!selectedSemester && !semester || !selectedYear}
                onClick={() => handleGenerateReport(report.id)}
              >
                <Download className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          );
        })}
      </div>

      {/* Optional Quick Actions */}
      {!printable && selectedSemester && selectedYear && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium mb-2">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Print All Reports
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download ZIP
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
