import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    TrendingUp,
    Users,
    Target,
    Award,
    AlertTriangle,
    CheckCircle,
    Zap,
    Globe,
    Star,
    Trophy,
    Crown,
    Medal,
    Flame
} from 'lucide-react';

const ResumeAnalyticsDashboard = ({ resumeData }) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        generateAnalytics();
    }, [resumeData]);

    const generateAnalytics = async () => {
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const analyticsData = {
            overallScore: calculateOverallScore(resumeData),
            atsScore: resumeData.latestATSScore?.score || 0,
            marketCompetitiveness: calculateMarketCompetitiveness(resumeData),
            industryFit: calculateIndustryFit(resumeData),
            skillGapAnalysis: analyzeSkillGaps(resumeData),
            improvementPriorities: generateImprovementPriorities(resumeData),
            competitivePositioning: calculateCompetitivePositioning(resumeData),
            careerTrajectory: analyzeCareerTrajectory(resumeData),
            salaryInsights: generateSalaryInsights(resumeData),
            trendingSkills: getTrendingSkills(),
            industryDemand: getIndustryDemand(),
            peerComparison: generatePeerComparison(resumeData)
        };

        setAnalytics(analyticsData);
        setLoading(false);
    };

    const calculateOverallScore = (data) => {
        const atsScore = data.latestATSScore?.score || 0;
        const completeness = calculateCompleteness(data);
        const keywordOptimization = calculateKeywordOptimization(data);
        const impactMetrics = calculateImpactMetrics(data);

        return Math.round((atsScore * 0.4) + (completeness * 0.2) + (keywordOptimization * 0.2) + (impactMetrics * 0.2));
    };

    const calculateCompleteness = (data) => {
        let score = 0;
        if (data.profile?.name) score += 20;
        if (data.profile?.email) score += 15;
        if (data.profile?.phone) score += 10;
        if (data.profile?.summary) score += 20;
        if (data.sections?.some(s => s.type === 'experience')) score += 20;
        if (data.sections?.some(s => s.type === 'skills')) score += 15;
        return score;
    };

    const calculateKeywordOptimization = (data) => {
        // Simple keyword analysis
        const content = JSON.stringify(data).toLowerCase();
        const keywords = ['leadership', 'team', 'project', 'developed', 'managed', 'improved', 'increased', 'reduced'];
        const matches = keywords.filter(keyword => content.includes(keyword)).length;
        return Math.min(100, (matches / keywords.length) * 100);
    };

    const calculateImpactMetrics = (data) => {
        // Check for quantifiable achievements
        const content = JSON.stringify(data);
        const metrics = (content.match(/\d+/g) || []).length;
        return Math.min(100, metrics * 10);
    };

    const calculateMarketCompetitiveness = (data) => {
        const skills = extractSkills(data);
        const trendingSkills = ['react', 'python', 'aws', 'docker', 'kubernetes', 'ai', 'machine learning'];
        const matchingSkills = skills.filter(skill =>
            trendingSkills.some(trending => skill.toLowerCase().includes(trending))
        ).length;

        return {
            score: Math.round((matchingSkills / trendingSkills.length) * 100),
            level: matchingSkills > 4 ? 'High' : matchingSkills > 2 ? 'Medium' : 'Low',
            trendingMatches: matchingSkills,
            totalTrending: trendingSkills.length
        };
    };

    const calculateIndustryFit = (data) => {
        const skills = extractSkills(data);
        const industries = {
            'Full Stack Development': ['react', 'node', 'javascript', 'html', 'css', 'mongodb'],
            'Data Science': ['python', 'machine learning', 'sql', 'pandas', 'tensorflow'],
            'DevOps': ['aws', 'docker', 'kubernetes', 'jenkins', 'terraform'],
            'Mobile Development': ['react native', 'flutter', 'ios', 'android']
        };

        const fits = Object.entries(industries).map(([industry, requiredSkills]) => {
            const matchingSkills = skills.filter(skill =>
                requiredSkills.some(required => skill.toLowerCase().includes(required))
            ).length;

            return {
                industry,
                fitScore: Math.round((matchingSkills / requiredSkills.length) * 100),
                matchingSkills,
                totalRequired: requiredSkills.length
            };
        }).sort((a, b) => b.fitScore - a.fitScore);

        return fits;
    };

    const analyzeSkillGaps = (data) => {
        const currentSkills = extractSkills(data);
        const highDemandSkills = [
            'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
            'TypeScript', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'
        ];

        const gaps = highDemandSkills.filter(skill =>
            !currentSkills.some(current =>
                current.toLowerCase().includes(skill.toLowerCase())
            )
        );

        const emerging = ['AI/ML', 'Web3', 'Edge Computing', 'Low-Code/No-Code'];
        const emergingGaps = emerging.filter(skill =>
            !currentSkills.some(current =>
                current.toLowerCase().includes(skill.toLowerCase().split('/')[0])
            )
        );

        return { gaps, emergingGaps, coverage: Math.round((currentSkills.length / highDemandSkills.length) * 100) };
    };

    const generateImprovementPriorities = (data) => {
        const priorities = [];

        if (!data.profile?.summary || data.profile.summary.length < 50) {
            priorities.push({
                title: 'Enhance Professional Summary',
                description: 'Your summary is too short or missing. Add a compelling 3-4 sentence overview.',
                impact: 'High',
                effort: 'Medium',
                category: 'Content'
            });
        }

        const experienceSection = data.sections?.find(s => s.type === 'experience');
        if (!experienceSection || !experienceSection.content?.jobs?.length) {
            priorities.push({
                title: 'Add Work Experience',
                description: 'Include detailed work experience with quantifiable achievements.',
                impact: 'Critical',
                effort: 'High',
                category: 'Content'
            });
        }

        const skillsSection = data.sections?.find(s => s.type === 'skills');
        if (!skillsSection || !skillsSection.content?.list) {
            priorities.push({
                title: 'Add Skills Section',
                description: 'List relevant technical and soft skills.',
                impact: 'High',
                effort: 'Low',
                category: 'Structure'
            });
        }

        if ((data.latestATSScore?.score || 0) < 70) {
            priorities.push({
                title: 'Optimize for ATS',
                description: 'Improve keyword usage and formatting for applicant tracking systems.',
                impact: 'High',
                effort: 'Medium',
                category: 'ATS'
            });
        }

        return priorities.slice(0, 5); // Top 5 priorities
    };

    const calculateCompetitivePositioning = (data) => {
        const score = calculateOverallScore(data);
        let position, description, percentile;

        if (score >= 90) {
            position = 'Elite';
            description = 'Top 5% of candidates - Highly competitive';
            percentile = 95;
        } else if (score >= 80) {
            position = 'Strong';
            description = 'Top 15% of candidates - Very competitive';
            percentile = 85;
        } else if (score >= 70) {
            position = 'Good';
            description = 'Top 30% of candidates - Competitive';
            percentile = 70;
        } else if (score >= 60) {
            position = 'Average';
            description = 'Top 50% of candidates - Needs improvement';
            percentile = 50;
        } else {
            position = 'Below Average';
            description = 'Bottom 50% of candidates - Significant improvements needed';
            percentile = 25;
        }

        return { position, description, percentile, score };
    };

    const analyzeCareerTrajectory = (data) => {
        const experience = data.sections?.find(s => s.type === 'experience')?.content?.jobs || [];
        const trajectory = [];

        if (experience.length === 0) {
            return { level: 'Entry', progression: 'Not enough data', recommendations: ['Add work experience'] };
        }

        // Analyze career progression
        const titles = experience.map(job => job.title || '').filter(title => title);
        const hasProgression = titles.length > 1 && titles.some((title, i) =>
            i > 0 && (title.toLowerCase().includes('senior') || title.toLowerCase().includes('lead'))
        );

        let level, progression, recommendations;

        if (experience.length >= 5 && hasProgression) {
            level = 'Senior/Lead';
            progression = 'Strong upward trajectory';
            recommendations = ['Consider management roles', 'Pursue expert certifications'];
        } else if (experience.length >= 3) {
            level = 'Mid-Level';
            progression = 'Steady career growth';
            recommendations = ['Seek senior positions', 'Build leadership skills'];
        } else {
            level = 'Entry/Mid-Level';
            progression = 'Building foundation';
            recommendations = ['Gain more experience', 'Develop specialized skills'];
        }

        return { level, progression, recommendations, experienceCount: experience.length };
    };

    const generateSalaryInsights = (data) => {
        const skills = extractSkills(data);
        const experience = data.sections?.find(s => s.type === 'experience')?.content?.jobs?.length || 0;

        // Base salary calculation
        let baseSalary = 60000; // Entry level base

        // Experience multiplier
        baseSalary += experience * 8000;

        // Skills multiplier
        const premiumSkills = ['aws', 'docker', 'kubernetes', 'python', 'ai', 'react'];
        const premiumCount = skills.filter(skill =>
            premiumSkills.some(premium => skill.toLowerCase().includes(premium))
        ).length;
        baseSalary += premiumCount * 5000;

        // Location adjustment (assuming major tech hub)
        const locationMultiplier = 1.3;

        const finalSalary = Math.round(baseSalary * locationMultiplier);

        return {
            estimatedRange: {
                min: Math.round(finalSalary * 0.8),
                max: Math.round(finalSalary * 1.2)
            },
            confidence: premiumCount > 3 ? 'High' : premiumCount > 1 ? 'Medium' : 'Low',
            factors: {
                experience: experience,
                premiumSkills: premiumCount,
                location: 'Tech Hub'
            }
        };
    };

    const getTrendingSkills = () => {
        return [
            { name: 'AI/ML', growth: '+45%', demand: 'Very High' },
            { name: 'Cloud (AWS/Azure)', growth: '+35%', demand: 'Very High' },
            { name: 'TypeScript', growth: '+30%', demand: 'High' },
            { name: 'DevOps', growth: '+25%', demand: 'High' },
            { name: 'Cybersecurity', growth: '+40%', demand: 'Very High' }
        ];
    };

    const getIndustryDemand = () => {
        return [
            { sector: 'Technology', demand: 'Very High', growth: '+12%' },
            { sector: 'Healthcare', demand: 'High', growth: '+8%' },
            { sector: 'Finance', demand: 'High', growth: '+6%' },
            { sector: 'E-commerce', demand: 'Medium', growth: '+4%' }
        ];
    };

    const generatePeerComparison = (data) => {
        const userScore = calculateOverallScore(data);
        const peers = [
            { percentile: 25, score: 45, label: '25th Percentile' },
            { percentile: 50, score: 65, label: 'Median' },
            { percentile: 75, score: 80, label: '75th Percentile' },
            { percentile: 90, score: 88, label: '90th Percentile' },
            { percentile: 95, score: 92, label: '95th Percentile' }
        ];

        const userPercentile = peers.find(peer => userScore <= peer.score)?.percentile || 95;

        return { userScore, userPercentile, peers };
    };

    const extractSkills = (data) => {
        const skills = [];
        const skillsSection = data.sections?.find(s => s.type === 'skills');
        if (skillsSection?.content?.list) {
            skills.push(...skillsSection.content.list.split(',').map(s => s.trim()));
        }
        return skills;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Analyzing your resume...</p>
                </div>
            </div>
        );
    }

    if (!analytics) return null;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'competitiveness', label: 'Market Fit', icon: Target },
        { id: 'skills', label: 'Skills Analysis', icon: Zap },
        { id: 'career', label: 'Career Insights', icon: TrendingUp },
        { id: 'comparison', label: 'Peer Comparison', icon: Users }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold dark:text-white flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-primary-dark" />
                    Resume Analytics Dashboard
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Trophy className="w-4 h-4" />
                    Advanced AI-Powered Insights
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-primary-dark text-white border-b-2 border-primary-dark'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-dark'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {/* Overall Score */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <Award className="w-8 h-8" />
                                <span className="text-2xl font-bold">{analytics.overallScore}%</span>
                            </div>
                            <h4 className="font-semibold mb-1">Overall Score</h4>
                            <p className="text-sm opacity-90">Comprehensive rating</p>
                        </div>

                        {/* ATS Score */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <Target className="w-8 h-8" />
                                <span className="text-2xl font-bold">{analytics.atsScore}%</span>
                            </div>
                            <h4 className="font-semibold mb-1">ATS Score</h4>
                            <p className="text-sm opacity-90">Tracking system compatibility</p>
                        </div>

                        {/* Market Competitiveness */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <TrendingUp className="w-8 h-8" />
                                <span className="text-2xl font-bold">{analytics.marketCompetitiveness.score}%</span>
                            </div>
                            <h4 className="font-semibold mb-1">Market Fit</h4>
                            <p className="text-sm opacity-90">{analytics.marketCompetitiveness.level} competitiveness</p>
                        </div>

                        {/* Competitive Position */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                                <Crown className="w-8 h-8" />
                                <span className="text-2xl font-bold">{analytics.competitivePositioning.percentile}%</span>
                            </div>
                            <h4 className="font-semibold mb-1">Percentile Rank</h4>
                            <p className="text-sm opacity-90">{analytics.competitivePositioning.position}</p>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'competitiveness' && (
                    <motion.div
                        key="competitiveness"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Industry Fit */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    Industry Fit Analysis
                                </h4>
                                <div className="space-y-3">
                                    {analytics.industryFit.slice(0, 4).map((fit, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <span className="text-sm font-medium dark:text-white">{fit.industry}</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${fit.fitScore}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-semibold text-blue-600">{fit.fitScore}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trending Skills */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-orange-500" />
                                    Trending Skills
                                </h4>
                                <div className="space-y-3">
                                    {analytics.trendingSkills.map((skill, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <span className="text-sm font-medium dark:text-white">{skill.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-green-600 font-semibold">{skill.growth}</span>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    skill.demand === 'Very High' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {skill.demand}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Salary Insights */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                            <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-green-500" />
                                Salary Insights
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">
                                        ${analytics.salaryInsights.estimatedRange.min.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Minimum Range</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${analytics.salaryInsights.estimatedRange.max.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Maximum Range</p>
                                </div>
                                <div className="text-center">
                                    <p className={`text-lg font-semibold ${
                                        analytics.salaryInsights.confidence === 'High' ? 'text-green-600' :
                                        analytics.salaryInsights.confidence === 'Medium' ? 'text-yellow-600' :
                                        'text-red-600'
                                    }`}>
                                        {analytics.salaryInsights.confidence} Confidence
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Estimation Accuracy</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'skills' && (
                    <motion.div
                        key="skills"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Skill Gaps */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                    Skill Gaps to Address
                                </h4>
                                <div className="space-y-3">
                                    {analytics.skillGapAnalysis.gaps.map((gap, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <AlertTriangle className="w-4 h-4 text-red-500" />
                                            <span className="text-sm text-red-800 dark:text-red-200">{gap}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        <strong>Skill Coverage:</strong> {analytics.skillGapAnalysis.coverage}% of high-demand skills
                                    </p>
                                </div>
                            </div>

                            {/* Emerging Skills */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    Emerging Skills to Learn
                                </h4>
                                <div className="space-y-3">
                                    {analytics.skillGapAnalysis.emergingGaps.map((skill, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm text-yellow-800 dark:text-yellow-200">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'career' && (
                    <motion.div
                        key="career"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Career Trajectory */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Career Trajectory
                                </h4>
                                <div className="space-y-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <p className="font-semibold text-blue-800 dark:text-blue-200">{analytics.careerTrajectory.level}</p>
                                        <p className="text-sm text-blue-600 dark:text-blue-300">{analytics.careerTrajectory.progression}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium dark:text-white mb-2">Career Recommendations:</p>
                                        <ul className="space-y-2">
                                            {analytics.careerTrajectory.recommendations.map((rec, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm dark:text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Improvement Priorities */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                                    <Target className="w-5 h-5 text-orange-500" />
                                    Top Improvement Priorities
                                </h4>
                                <div className="space-y-3">
                                    {analytics.improvementPriorities.map((priority, index) => (
                                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <h5 className="font-medium dark:text-white">{priority.title}</h5>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    priority.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                                                    priority.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {priority.impact}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{priority.description}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                                                <span>Effort: {priority.effort}</span>
                                                <span>Category: {priority.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'comparison' && (
                    <motion.div
                        key="comparison"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <h4 className="text-lg font-semibold dark:text-white mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                Peer Comparison Analysis
                            </h4>

                            <div className="space-y-4">
                                {/* User's Position */}
                                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <div className="text-4xl font-bold text-purple-600 mb-2">{analytics.peerComparison.userPercentile}%</div>
                                    <p className="text-lg font-semibold dark:text-white">Your Percentile Rank</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You score higher than {analytics.peerComparison.userPercentile}% of candidates
                                    </p>
                                </div>

                                {/* Comparison Chart */}
                                <div className="space-y-3">
                                    {analytics.peerComparison.peers.map((peer, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-20 text-sm font-medium dark:text-white">{peer.label}</div>
                                            <div className="flex-1">
                                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            peer.score <= analytics.peerComparison.userScore
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-400'
                                                        }`}
                                                        style={{ width: `${(peer.score / 100) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="w-12 text-sm font-semibold dark:text-white text-right">{peer.score}%</div>
                                        </div>
                                    ))}

                                    {/* User's Score Line */}
                                    <div className="flex items-center gap-4 border-t pt-3 border-gray-200 dark:border-gray-700">
                                        <div className="w-20 text-sm font-bold text-primary-dark">You</div>
                                        <div className="flex-1">
                                            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-dark rounded-full"
                                                    style={{ width: `${analytics.peerComparison.userScore}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="w-12 text-sm font-bold text-primary-dark text-right">
                                            {analytics.peerComparison.userScore}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeAnalyticsDashboard;
