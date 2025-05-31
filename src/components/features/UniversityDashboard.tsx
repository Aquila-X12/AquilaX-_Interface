
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Brain, 
  Award, 
  Clock, 
  Target,
  Calendar,
  MessageSquare,
  FileText,
  PieChart
} from 'lucide-react';

export const UniversityDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const stats = {
    totalStudents: 15247,
    activeConversations: 3891,
    completedAssignments: 8567,
    averageEngagement: 87,
    knowledgeBase: 12890,
    facultyUsers: 234
  };

  const departments = [
    { id: 'all', name: 'All Departments', students: 15247 },
    { id: 'cs', name: 'Computer Science', students: 3245 },
    { id: 'math', name: 'Mathematics', students: 2156 },
    { id: 'physics', name: 'Physics', students: 1876 },
    { id: 'biology', name: 'Biology', students: 2987 },
    { id: 'chemistry', name: 'Chemistry', students: 1543 },
    { id: 'engineering', name: 'Engineering', students: 3440 }
  ];

  const recentActivity = [
    { type: 'assignment', title: 'Machine Learning Fundamentals', department: 'CS', submissions: 234, dueDate: '2024-01-15' },
    { type: 'discussion', title: 'Quantum Physics Debate', department: 'Physics', participants: 89, activity: 'active' },
    { type: 'research', title: 'DNA Sequencing Project', department: 'Biology', status: 'in-progress', team: 12 },
    { type: 'exam', title: 'Calculus III Final', department: 'Math', scheduled: '2024-01-20', registered: 145 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">University Dashboard</h1>
            <p className="text-gray-400">AI-Powered Educational Analytics & Management</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">
              EDU PRO
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-500/30">
              Live Data
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-green-400">+12% this semester</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.activeConversations.toLocaleString()}</div>
              <p className="text-xs text-blue-400">Active today</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Assignments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.completedAssignments.toLocaleString()}</div>
              <p className="text-xs text-green-400">Completed this month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.averageEngagement}%</div>
              <Progress value={stats.averageEngagement} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.knowledgeBase.toLocaleString()}</div>
              <p className="text-xs text-purple-400">Articles & Resources</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Faculty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.facultyUsers}</div>
              <p className="text-xs text-orange-400">Active users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-purple-500/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/30">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600/30">Analytics</TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-purple-600/30">Departments</TabsTrigger>
            <TabsTrigger value="ai-insights" className="data-[state=active]:bg-purple-600/30">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest university-wide activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'assignment' ? 'bg-blue-600/20 text-blue-400' :
                          activity.type === 'discussion' ? 'bg-green-600/20 text-green-400' :
                          activity.type === 'research' ? 'bg-purple-600/20 text-purple-400' :
                          'bg-orange-600/20 text-orange-400'
                        }`}>
                          {activity.type === 'assignment' && <FileText className="h-4 w-4" />}
                          {activity.type === 'discussion' && <MessageSquare className="h-4 w-4" />}
                          {activity.type === 'research' && <Brain className="h-4 w-4" />}
                          {activity.type === 'exam' && <Award className="h-4 w-4" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{activity.title}</div>
                          <div className="text-sm text-gray-400">{activity.department}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.submissions && `${activity.submissions} submissions`}
                        {activity.participants && `${activity.participants} participants`}
                        {activity.team && `${activity.team} members`}
                        {activity.registered && `${activity.registered} registered`}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Department Performance */}
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Department Performance
                  </CardTitle>
                  <CardDescription>AI engagement by department</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.slice(1).map((dept) => (
                    <div key={dept.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{dept.name}</span>
                        <span className="text-gray-400">{dept.students} students</span>
                      </div>
                      <Progress value={Math.random() * 30 + 70} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Learning Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                      <div className="text-blue-400 font-medium">Peak Learning Hours</div>
                      <div className="text-white text-2xl">2:00 PM - 6:00 PM</div>
                      <div className="text-sm text-gray-400">Highest AI interaction rates</div>
                    </div>
                    <div className="p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                      <div className="text-green-400 font-medium">Most Popular Topics</div>
                      <div className="text-white">Machine Learning, Calculus</div>
                      <div className="text-sm text-gray-400">Based on conversation analysis</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Learning Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Comprehension Rate</span>
                      <span className="text-green-400 font-bold">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Problem Solving</span>
                      <span className="text-blue-400 font-bold">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Critical Thinking</span>
                      <span className="text-purple-400 font-bold">91%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Knowledge Retention</span>
                      <span className="text-orange-400 font-bold">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    AI Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-yellow-600/10 rounded border border-yellow-500/20">
                      <Award className="h-5 w-5 text-yellow-400" />
                      <div>
                        <div className="text-yellow-400 font-medium">Excellence in Learning</div>
                        <div className="text-xs text-gray-400">Top 5% engagement</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-purple-600/10 rounded border border-purple-500/20">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="text-purple-400 font-medium">AI Research Pioneer</div>
                        <div className="text-xs text-gray-400">Advanced AI utilization</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-600/10 rounded border border-green-500/20">
                      <Users className="h-5 w-5 text-green-400" />
                      <div>
                        <div className="text-green-400 font-medium">Collaborative Leader</div>
                        <div className="text-xs text-gray-400">Peer learning champion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
