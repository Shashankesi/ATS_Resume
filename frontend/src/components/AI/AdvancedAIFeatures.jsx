import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Brain, Target, TrendingUp, Sparkles, Loader2, CheckCircle, AlertCircle, Lightbulb, Award, BarChart3, Users, Globe } from 'lucide-react';
import { analyzeATS, generateSummary, rewriteBullets, getJobRecommendations, skillGapAnalyzer } from '../utils/aiUtils';
import { showToast } from '../utils/toast';

const AdvancedAIFeatures = ({ resumeData, onApplyImprovements }) => {
    const [activeFeature, setActiveFeature] = useState('overview');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({});
    const [improvements, setImprovements] = useState([]);

    const features = [
        {
            id: 'overview',
            name: 'AI Overview',
            icon: Brain,
            description: 'Comprehensive AI analysis of your resume',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 'ats-optimizer',
            name: 'ATS Optimizer',
            icon: Target,
            description: 'Advanced ATS scoring and optimization',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 'content-enhancer',
            name: 'Content Enhancer',
            icon: Sparkles,
            description: 'AI-powered content improvements',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'job-matcher',
            name: 'Job Matcher',
            icon: Users,
            description: 'Find matching jobs and requirements',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 'skill-analyzer',
            name: 'Skill Analyzer',
            icon: BarChart3,
            description: 'Analyze skill gaps and recommendations',
            color: 'from-indigo-500 to-purple-500'
        },
        {
            id: 'career-insights',
            name: 'Career Insights',
            icon: TrendingUp,
            description: 'AI-powered career guidance',
            color: 'from-teal-500 to-blue-500'
        }
    ];

    const runAIAnalysis = async (featureId) => {
        setLoading(true);
        try {
            let result;

            switch (featureId) {
                case 'overview':
                    result = await generateComprehensiveOverview(resumeData);
                    break;
                case 'ats-optimizer':
                    result = await analyzeATS(resumeData, '');
                    break;
                case 'content-enhancer':
                    result = await generateContentImprovements(resumeData);
                    break;
                case 'job-matcher':
                    const skills = extractSkillsFromResume(resumeData);
                    result = await getJobRecommendations(skills, 'tech');
                    break;
                case 'skill-analyzer':
                    const currentSkills = extractSkillsFromResume(resumeData);
                    result = await skillGapAnalyzer(currentSkills, ['React', 'Node.js', 'Python', 'AWS'], 'Senior Full Stack Developer');
                    break;
                case 'career-insights':
                    result = await generateCareerInsights(resumeData);
                    break;
                default:
                    result = null;
            }

            setResults(prev => ({ ...prev, [featureId]: result }));

            if (featureId === 'content-enhancer' && result?.improvements) {
                setImprovements(result.improvements);
            }

        } catch (error) {
            console.error(`AI ${featureId} failed:`, error);
            showToast.error(`AI ${featureId} analysis failed. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const generateComprehensiveOverview = async (data) => {
        const skills = extractSkillsFromResume(data);
        const atsResult = await analyzeATS(data, '');

        return {
            overallScore: atsResult.score || 75,
            strengths: [
                'Strong technical foundation',
                'Clear career progression',
                'Quantifiable achievements'
            ],
            weaknesses: [
                'Could improve keyword optimization',
                'Add more industry-specific terms'
            ],
            recommendations: [
                'Incorporate more ATS-friendly keywords',
                'Add metrics to achievements',
                'Update with recent technologies'
            ],
            marketFit: calculateMarketFit(skills),
            nextSteps: [
                'Apply to 5-10 positions this week',
                'Network on LinkedIn',
                'Prepare for technical interviews'
            ]
        };
    };

    const generateContentImprovements = async (data) => {
        const improvements = [];

        // Improve summary
        if (data.profile?.summary) {
            const improvedSummary = await generateSummary(data.profile, [], 'professional');
            improvements.push({
                type: 'summary',
                original: data.profile.summary,
                improved: improvedSummary,
                impact: 'High',
                reason: 'More impactful and keyword-rich summary'
            });
        }

        // Improve experience bullets
        if (data.sections) {
            for (const section of data.sections) {
                if (section.type === 'experience' && section.content?.jobs) {
                    for (const job of section.content.jobs) {
                        if (job.bullets && job.bullets.length > 0) {
                            for (let i = 0; i < job.bullets.length; i++) {
                                const improved = await rewriteBullets(job.bullets[i]);
                                improvements.push({
                                    type: 'experience',
                                    sectionId: section._id,
                                    jobTitle: job.title,
                                    original: job.bullets[i],
                                    improved: improved,
                                    impact: 'Medium',
                                    reason: 'Stronger action verbs and quantifiable results'
                                });
                            }
                        }
                    }
                }
            }
        }

        return { improvements, totalImprovements: improvements.length };
    };

    const generateCareerInsights = async (data) => {
        const skills = extractSkillsFromResume(data);
        const experience = estimateExperienceYears(data);

        return {
            careerLevel: determineCareerLevel(experience),
            salaryRange: estimateSalaryRange(skills, experience),
            growthPotential: calculateGrowthPotential(skills),
            recommendedRoles: suggestRoles(skills),
            skillGaps: identifySkillGaps(skills),
            nextMoves: [
                'Pursue advanced certifications',
                'Take on leadership roles',
                'Expand into emerging technologies'
            ]
        };
    };

    const extractSkillsFromResume = (data) => {
        const skills = [];

        // Extract from skills section
        const skillsSection = data.sections?.find(s => s.type === 'skills');
        if (skillsSection?.content?.list) {
            skills.push(...skillsSection.content.list.split(',').map(s => s.trim()));
        }

        // Extract from experience descriptions
        if (data.sections) {
            data.sections.forEach(section => {
                if (section.type === 'experience' && section.content?.jobs) {
                    section.content.jobs.forEach(job => {
                        // Simple keyword extraction (in real app, use NLP)
                        const techKeywords = ['React', 'Node.js', 'Python', 'JavaScript', 'AWS', 'Docker', 'MongoDB', 'SQL'];
                        techKeywords.forEach(keyword => {
                            if (job.description?.toLowerCase().includes(keyword.toLowerCase()) && !skills.includes(keyword)) {
                                skills.push(keyword);
                            }
                        });
                    });
                }
            });
        }

        return skills;
    };

    const estimateExperienceYears = (data) => {
        // Simple estimation based on job count
        const expSection = data.sections?.find(s => s.type === 'experience');
        const jobCount = expSection?.content?.jobs?.length || 0;
        return Math.max(1, jobCount * 2); // Rough estimate
    };

    const determineCareerLevel = (years) => {
        if (years < 2) return 'Entry Level';
        if (years < 5) return 'Mid Level';
        if (years < 8) return 'Senior Level';
        return 'Expert/Lead Level';
    };

    const estimateSalaryRange = (skills, years) => {
        const baseSalary = 50000 + (years * 5000) + (skills.length * 2000);
        return {
            min: Math.round(baseSalary * 0.8),
            max: Math.round(baseSalary * 1.3),
            currency: 'USD'
        };
    };

    const calculateGrowthPotential = (skills) => {
        const highDemandSkills = ['AI', 'Machine Learning', 'Cloud', 'DevOps', 'Cybersecurity'];
        const matchCount = skills.filter(skill =>
            highDemandSkills.some(highDemand =>
                skill.toLowerCase().includes(highDemand.toLowerCase())
            )
        ).length;

        return matchCount > 2 ? 'High' : matchCount > 0 ? 'Medium' : 'Standard';
    };

    const suggestRoles = (skills) => {
        const roles = [];
        if (skills.includes('React') || skills.includes('JavaScript')) roles.push('Frontend Developer');
        if (skills.includes('Node.js') || skills.includes('Python')) roles.push('Backend Developer');
        if (skills.includes('React') && skills.includes('Node.js')) roles.push('Full Stack Developer');
        if (skills.includes('AWS') || skills.includes('Docker')) roles.push('DevOps Engineer');
        if (skills.includes('Python') && skills.includes('AI')) roles.push('Machine Learning Engineer');

        return roles.length > 0 ? roles : ['Software Developer', 'Web Developer'];
    };

    const identifySkillGaps = (currentSkills) => {
        const essentialSkills = ['Git', 'Agile', 'REST APIs', 'Testing', 'CI/CD'];
        return essentialSkills.filter(skill => !currentSkills.some(current =>
            current.toLowerCase().includes(skill.toLowerCase())
        ));
    };

    const calculateMarketFit = (skills) => {
        const marketSkills = ['React', 'Node.js', 'Python', 'AWS', 'JavaScript', 'TypeScript'];
        const matchCount = skills.filter(skill => marketSkills.includes(skill)).length;
        return Math.round((matchCount / marketSkills.length) * 100);
    };

    const applyAllImprovements = () => {
        if (onApplyImprovements && improvements.length > 0) {
            onApplyImprovements(improvements);
            showToast.success(`Applied ${improvements.length} AI improvements!`);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold dark:text-white flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-primary-dark" />
                    Advanced AI Features
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Zap className="w-4 h-4" />
                    Powered by Advanced AI
                </div>
            </div>

            {/* Feature Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    const isActive = activeFeature === feature.id;
                    const hasResult = results[feature.id];

                    return (
                        <motion.button
                            key={feature.id}
                            onClick={() => {
                                setActiveFeature(feature.id);
                                if (!hasResult) {
                                    runAIAnalysis(feature.id);
                                }
                            }}
                            className={`relative p-4 rounded-xl border-2 transition-all ${
                                isActive
                                    ? 'border-primary-dark bg-primary-dark/10 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-dark/50'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-0.5 mb-3`}>
                                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-md flex items-center justify-center">
                                    <Icon className={`w-6 h-6 text-gradient-to-r ${feature.color.split(' ')[1]}`} />
                                </div>
                            </div>

                            <h4 className="font-semibold text-left dark:text-white mb-1">{feature.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-left">{feature.description}</p>

                            {hasResult && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Results Display */}
            <AnimatePresence mode="wait">
                {activeFeature && results[activeFeature] && (
                    <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary-dark mr-3" />
                                <span className="text-lg dark:text-white">Analyzing with AI...</span>
                            </div>
                        ) : (
                            <FeatureResultDisplay
                                featureId={activeFeature}
                                result={results[activeFeature]}
                                onApplyImprovements={activeFeature === 'content-enhancer' ? applyAllImprovements : null}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bulk Apply Button */}
            {improvements.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                >
                    <button
                        onClick={applyAllImprovements}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-green-500/50 font-semibold flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        Apply All {improvements.length} AI Improvements
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// Component to display different types of results
const FeatureResultDisplay = ({ featureId, result, onApplyImprovements }) => {
    switch (featureId) {
        case 'overview':
            return (
                <div className="space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-primary-dark mb-2">{result.overallScore}%</div>
                        <p className="text-gray-600 dark:text-gray-400">Overall Resume Score</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Strengths</h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                {result.strengths.map((strength, i) => (
                                    <li key={i}>• {strength}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Areas to Improve</h4>
                            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                {result.weaknesses.map((weakness, i) => (
                                    <li key={i}>• {weakness}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Lightbulb className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Recommendations</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                                {result.recommendations.slice(0, 3).map((rec, i) => (
                                    <li key={i}>• {rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="font-semibold dark:text-white mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-dark" />
                            Next Steps
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {result.nextSteps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                                    <span className="text-sm dark:text-gray-200">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case 'content-enhancer':
            return (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold dark:text-white">Content Improvements</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {result.totalImprovements} improvements found
                        </span>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {result.improvements.map((improvement, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-primary-dark capitalize">{improvement.type}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        improvement.impact === 'High' ? 'bg-red-100 text-red-800' :
                                        improvement.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                    }`}>
                                        {improvement.impact} Impact
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Original:</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                                            {improvement.original}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Improved:</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                            {improvement.improved}
                                        </p>
                                    </div>

                                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                                        {improvement.reason}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {onApplyImprovements && (
                        <button
                            onClick={onApplyImprovements}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold"
                        >
                            Apply All Improvements
                        </button>
                    )}
                </div>
            );

        case 'career-insights':
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                                Career Assessment
                            </h4>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm dark:text-gray-200">Career Level:</span>
                                    <span className="font-semibold text-primary-dark">{result.careerLevel}</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm dark:text-gray-200">Salary Range:</span>
                                    <span className="font-semibold text-green-600">
                                        ${result.salaryRange.min.toLocaleString()} - ${result.salaryRange.max.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-sm dark:text-gray-200">Growth Potential:</span>
                                    <span className={`font-semibold ${
                                        result.growthPotential === 'High' ? 'text-green-600' :
                                        result.growthPotential === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                                    }`}>
                                        {result.growthPotential}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                Recommended Roles
                            </h4>

                            <div className="space-y-2">
                                {result.recommendedRoles.map((role, i) => (
                                    <div key={i} className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">{role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="text-lg font-semibold dark:text-white mb-4 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-orange-500" />
                            Skill Gaps to Address
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {result.skillGaps.map((skill, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                                    <AlertCircle className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm text-orange-800 dark:text-orange-200">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        default:
            return (
                <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Analysis results will appear here</p>
                </div>
            );
    }
};

export default AdvancedAIFeatures;