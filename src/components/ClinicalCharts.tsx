import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, FileText } from "lucide-react";

interface ClinicalChartsProps {
  data?: {
    totalParticipants: number;
    activeTrials: number;
    efficacyRate: number;
    dataPoints: string;
    efficacyData: Array<{week: string; placebo: number; treatment: number; encrypted: boolean}>;
    adverseEventsData: Array<{severity: string; count: number}>;
    demographicsData: Array<{group: string; value: number; fill: string}>;
  };
}

const efficacyData = [
  { week: 'Week 1', placebo: 20, treatment: 15, encrypted: true },
  { week: 'Week 2', placebo: 25, treatment: 12, encrypted: true },
  { week: 'Week 4', placebo: 30, treatment: 8, encrypted: true },
  { week: 'Week 8', placebo: 35, treatment: 5, encrypted: true },
  { week: 'Week 12', placebo: 40, treatment: 3, encrypted: true },
];

const adverseEventsData = [
  { severity: 'Mild', count: 45 },
  { severity: 'Moderate', count: 23 },
  { severity: 'Severe', count: 8 },
  { severity: 'Critical', count: 2 },
];

const demographicsData = [
  { group: '18-30', value: 25, fill: 'hsl(var(--primary))' },
  { group: '31-45', value: 35, fill: 'hsl(var(--primary-glow))' },
  { group: '46-60', value: 28, fill: 'hsl(var(--accent))' },
  { group: '60+', value: 12, fill: 'hsl(var(--muted-foreground))' },
];

export const ClinicalCharts = ({ data }: ClinicalChartsProps) => {
  // Use provided data or fallback to default mock data
  const currentData = data || {
    totalParticipants: 1247,
    activeTrials: 23,
    efficacyRate: 78.4,
    dataPoints: "847K",
    efficacyData,
    adverseEventsData,
    demographicsData
  };
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-clinical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentData.totalParticipants.toLocaleString()}</div>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="text-xs">Encrypted</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-clinical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trials</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentData.activeTrials}</div>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="text-xs">Phase II/III</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-clinical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficacy Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{currentData.efficacyRate}%</div>
            <div className="flex items-center space-x-1">
              <Badge className="text-xs bg-accent/10 text-accent">+12.3%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-clinical">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{currentData.dataPoints}</div>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="text-xs">FHE Protected</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-data">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Treatment Efficacy Over Time</span>
              <Badge variant="outline" className="text-xs">Encrypted Analysis</Badge>
            </CardTitle>
            <CardDescription>
              Comparative analysis of treatment vs placebo groups (FHE encrypted data)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData.efficacyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="treatment" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Treatment Group"
                />
                <Line 
                  type="monotone" 
                  dataKey="placebo" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Placebo Group"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-data">
          <CardHeader>
            <CardTitle>Patient Demographics</CardTitle>
            <CardDescription>
              Age distribution across all active trials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentData.demographicsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ group, value }) => `${group}: ${value}%`}
                >
                  {currentData.demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-data">
          <CardHeader>
            <CardTitle>Adverse Events Analysis</CardTitle>
            <CardDescription>
              Safety profile across all trials (encrypted reporting)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData.adverseEventsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="severity" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-data">
          <CardHeader>
            <CardTitle>Enrollment Progress</CardTitle>
            <CardDescription>
              Patient recruitment status by trial phase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Phase I Trials</span>
                <span className="text-muted-foreground">156/200</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-gradient-clinical h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Phase II Trials</span>
                <span className="text-muted-foreground">847/1200</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Phase III Trials</span>
                <span className="text-muted-foreground">244/400</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '61%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};