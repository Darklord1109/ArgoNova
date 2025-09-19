import React from 'react';
import { ArrowRight, Waves, MessageCircle, Map, Upload, TrendingUp, Users, Shield, Zap, Globe2, BookOpen, HelpCircle, Award, Target, Eye, Heart } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import FloatingParticles from './FloatingParticles';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const sampleQueries = [
    "What's the average temperature at 1000m depth in the Southern Ocean?",
    "Show temperature profiles from the Indian Ocean in 2024",
    "Compare salinity trends between different regions",
    "Find floats with biogeochemical sensors near Madagascar"
  ];

  const features = [
    {
      icon: Map,
      color: 'from-primary-500 to-secondary-500',
      title: "Interactive Map Explorer",
      description: "Visualize Argo float trajectories with real-time filtering and spatial analysis",
      delay: "0ms"
    },
    {
      icon: TrendingUp,
      color: 'from-secondary-500 to-accent-500',
      title: "Profile Analysis",
      description: "Deep dive into temperature, salinity, and biogeochemical parameter profiles",
      delay: "100ms"
    },
    {
      icon: MessageCircle,
      color: 'from-accent-500 to-success-500',
      title: "AI-Powered Insights",
      description: "Ask questions in natural language and get intelligent data-driven responses",
      delay: "200ms"
    },
    {
      icon: Upload,
      color: 'from-success-500 to-primary-500',
      title: "Data Ingestion",
      description: "Upload and process NetCDF files with automated quality control",
      delay: "300ms"
    }
  ];

  const userPersonas = [
    {
      icon: Users,
      title: "Ocean Scientists",
      description: "Precise profile comparisons, raw data export, and advanced analytical tools",
      color: "from-primary-500 to-secondary-500"
    },
    {
      icon: Target,
      title: "Policy Makers",
      description: "High-level summaries, trend visualizations, and decision-support insights",
      color: "from-secondary-500 to-accent-500"
    },
    {
      icon: BookOpen,
      title: "Students & Educators",
      description: "Exploratory interface with easy-to-understand responses and learning resources",
      color: "from-accent-500 to-success-500"
    },
    {
      icon: Shield,
      title: "Data Engineers",
      description: "Pipeline monitoring, data lineage tracking, and system administration tools",
      color: "from-success-500 to-primary-500"
    }
  ];

  const aboutFeatures = [
    {
      icon: Globe2,
      title: "Global Coverage",
      description: "Access to worldwide Argo float network data spanning over two decades"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Automated ingestion and quality control of NetCDF files with instant availability"
    },
    {
      icon: Eye,
      title: "Visual Analytics",
      description: "Interactive maps, depth profiles, and comparative analysis tools"
    },
    {
      icon: Heart,
      title: "Open Science",
      description: "Supporting transparent, reproducible ocean research with accessible data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-secondary-900/5 to-accent-900/10 dark:from-primary-900/20 dark:via-secondary-900/10 dark:to-accent-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" style={{ zIndex: 2 }}>
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fade-in-down">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl animate-float">
                  <Waves className="w-12 h-12 text-white animate-bounce-gentle" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 rounded-2xl blur opacity-25 animate-glow"></div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up">
              ArgoScope
              <span className="block text-3xl font-normal text-slate-600 dark:text-slate-300 mt-2">
                Interactive Ocean Data Platform
              </span>
            </h1>
            
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Transform Argo NetCDF files into queryable insights. Explore ocean profiles, 
              discover patterns, and interact with your data through natural language.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <button
                onClick={() => onNavigate('explore')}
                className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-primary-700 hover:via-secondary-700 hover:to-accent-700"
              >
                <Map className="w-5 h-5 group-hover:animate-bounce-gentle" />
                <span>Explore Data</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onNavigate('chat')}
                className="group flex items-center justify-center space-x-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:border-secondary-300 dark:hover:border-secondary-500"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-bounce-gentle" />
                <span>Ask Questions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="py-16 bg-white dark:bg-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              How to Use ArgoScope
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Get started with our comprehensive ocean data platform in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">1. Upload Data</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Upload your Argo NetCDF files through our intuitive drag-and-drop interface. 
                Our system automatically validates and processes your data.
              </p>
            </div>
            
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <Map className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">2. Explore & Visualize</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Use our interactive map to explore float trajectories, filter by parameters, 
                and visualize ocean profiles with advanced analytical tools.
              </p>
            </div>
            
            <div className="text-center group animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-success-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">3. Ask Questions</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Interact with your data using natural language queries. Our AI assistant 
                provides insights, generates visualizations, and answers complex questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Queries */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in-up">
            Try These Sample Queries
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleQueries.map((query, index) => (
              <div
                key={index}
                onClick={() => onNavigate('chat')}
                className="group p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-secondary-300 dark:hover:border-secondary-500 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-100 to-primary-100 dark:from-secondary-900 dark:to-primary-900 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <MessageCircle className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">{query}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white dark:bg-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12 animate-fade-in-up">
            Powerful Ocean Data Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="text-center group animate-fade-in-up" 
                  style={{ animationDelay: feature.delay }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 animate-glow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Personas */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Built for Every Ocean Professional
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              ArgoScope serves diverse users across the ocean science community with tailored features and interfaces
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userPersonas.map((persona, index) => {
              const Icon = persona.icon;
              return (
                <div 
                  key={index} 
                  className="group p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg border border-slate-200 dark:border-slate-600 hover:border-secondary-300 dark:hover:border-secondary-500 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${persona.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                    {persona.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white dark:bg-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                About ArgoScope
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                ArgoScope transforms the way researchers interact with Argo oceanographic data. 
                Built by ocean scientists for ocean scientists, our platform bridges the gap between 
                raw NetCDF files and actionable insights.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                We believe in making ocean data accessible, queryable, and understandable for everyone 
                from seasoned researchers to curious students. Our AI-powered interface democratizes 
                access to one of the world's most comprehensive ocean datasets.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {aboutFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 dark:from-primary-900 dark:via-secondary-900 dark:to-accent-900 rounded-2xl flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                      <Waves className="w-12 h-12 text-white animate-bounce-gentle" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Ocean Data Visualization
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Interactive charts and maps coming to life
                    </p>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 rounded-2xl blur opacity-20 animate-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-16 bg-gradient-to-r from-primary-900 via-secondary-900 to-accent-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative">
            <h2 className="text-3xl font-bold mb-12 animate-fade-in-up">Global Ocean Coverage</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <div className="text-4xl font-bold text-secondary-300 mb-2">
                  <AnimatedCounter end={4000} suffix="+" />
                </div>
                <div className="text-secondary-100">Active Floats</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="text-4xl font-bold text-secondary-300 mb-2">
                  <AnimatedCounter end={2.5} suffix="M+" />
                </div>
                <div className="text-secondary-100">Profile Records</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="text-4xl font-bold text-secondary-300 mb-2">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-secondary-100">Ocean Basins</div>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="text-4xl font-bold text-secondary-300 mb-2">
                  <AnimatedCounter end={20} suffix="+ Years" />
                </div>
                <div className="text-secondary-100">Historical Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Everything you need to know about ArgoScope
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What is Argo data and why is it important?",
                answer: "Argo is a global array of autonomous profiling floats that measure temperature, salinity, and other ocean properties. This data is crucial for understanding climate change, ocean circulation, and marine ecosystems."
              },
              {
                question: "How does the AI chatbot work?",
                answer: "Our AI assistant uses advanced natural language processing to understand your questions about ocean data. It can generate SQL queries, create visualizations, and provide contextual answers based on the Argo dataset."
              },
              {
                question: "Can I upload my own NetCDF files?",
                answer: "Yes! ArgoScope supports uploading and processing of Argo-compatible NetCDF files. Our system automatically validates the data structure and performs quality control checks."
              },
              {
                question: "Is ArgoScope free to use?",
                answer: "ArgoScope is built to support open ocean science. Core features are freely available, with advanced computational resources available through institutional partnerships."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-600 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Waves className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">ArgoScope</span>
              </div>
              <p className="text-slate-400 mb-4">
                Transforming ocean data into actionable insights for the global research community.
              </p>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Award className="w-4 h-4" />
                <span>Open Science Initiative</span>
              </div>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => onNavigate('explore')} className="hover:text-secondary-400 transition-colors">Explore Data</button></li>
                <li><button onClick={() => onNavigate('chat')} className="hover:text-secondary-400 transition-colors">AI Assistant</button></li>
                <li><button onClick={() => onNavigate('upload')} className="hover:text-secondary-400 transition-colors">Upload Files</button></li>
                <li><button onClick={() => onNavigate('catalog')} className="hover:text-secondary-400 transition-colors">Data Catalog</button></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Data Sources</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-secondary-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ArgoScope. Supporting open ocean science worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}