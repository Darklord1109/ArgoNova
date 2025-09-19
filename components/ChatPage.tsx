import React, { useState } from 'react';
import { Send, MessageCircle, Bot, User, Sparkles, BarChart3, Map, Database } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{ type: string; label: string; data?: any }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Argo data assistant. I can help you explore ocean profiles, analyze temperature and salinity data, and answer questions about our dataset. What would you like to know?",
      timestamp: new Date(),
      actions: [
        { type: 'query', label: 'Show temperature trends', data: 'temperature_trends' },
        { type: 'map', label: 'View on map', data: 'map_view' },
        { type: 'profile', label: 'Latest profiles', data: 'recent_profiles' }
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQueries = [
    "Show me temperature profiles from the Indian Ocean",
    "Compare salinity between Atlantic and Pacific",
    "Find floats with biogeochemical sensors",
    "What's the temperature trend at 500m depth?",
    "Show recent float deployments",
    "Export data for Madagascar region"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: "I found 47 temperature profiles from the Indian Ocean region. The data shows interesting seasonal variations with surface temperatures ranging from 24-29°C. Here's what the analysis reveals:",
          actions: [
            { type: 'chart', label: 'View Temperature Chart', data: 'temp_chart' },
            { type: 'map', label: 'Show on Map', data: 'map_locations' },
            { type: 'export', label: 'Export Data', data: 'export_csv' }
          ]
        },
        {
          content: "Based on the latest Argo data, I can see clear differences in salinity patterns. The Atlantic Ocean shows higher average salinity (35.2 PSU) compared to the Pacific (34.8 PSU). This is consistent with global circulation patterns.",
          actions: [
            { type: 'comparison', label: 'Detailed Comparison', data: 'salinity_compare' },
            { type: 'profile', label: 'View Profiles', data: 'profile_view' }
          ]
        },
        {
          content: "I found 12 active floats with biogeochemical sensors (BGC-Argo) currently operating. These sensors measure oxygen, pH, nitrate, and chlorophyll-a concentrations.",
          actions: [
            { type: 'catalog', label: 'Browse BGC Floats', data: 'bgc_catalog' },
            { type: 'map', label: 'Show Locations', data: 'bgc_map' }
          ]
        }
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse.content,
        timestamp: new Date(),
        actions: randomResponse.actions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
  };

  const handleAction = (action: { type: string; label: string; data?: any }) => {
    // Handle different action types
    console.log('Action clicked:', action);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        {/* Chat History Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              Chat History
            </h2>
          </div>
          
          <div className="p-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4">
              New Conversation
            </button>
            
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-medium text-slate-900 text-sm mb-1">Current Session</div>
                <div className="text-slate-600 text-xs">Started just now</div>
              </div>
              
              <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="font-medium text-slate-700 text-sm mb-1">Indian Ocean Analysis</div>
                <div className="text-slate-500 text-xs">Yesterday</div>
              </div>
              
              <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="font-medium text-slate-700 text-sm mb-1">Temperature Trends</div>
                <div className="text-slate-500 text-xs">2 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white shadow-sm border-b border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Argo AI Assistant</h3>
                  <p className="text-sm text-slate-600">Powered by advanced ocean data analysis</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-slate-600' 
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`max-w-3xl ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-slate-600 text-white'
                      : 'bg-white border border-slate-200'
                  }`}>
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleAction(action)}
                          className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          {action.type === 'chart' && <BarChart3 className="w-4 h-4" />}
                          {action.type === 'map' && <Map className="w-4 h-4" />}
                          {action.type === 'export' && <Database className="w-4 h-4" />}
                          {action.type === 'profile' && <BarChart3 className="w-4 h-4" />}
                          {action.type === 'catalog' && <Database className="w-4 h-4" />}
                          {action.type === 'comparison' && <BarChart3 className="w-4 h-4" />}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-slate-500 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-sm text-slate-500">Analyzing data...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Queries */}
          {messages.length <= 1 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                Suggested Questions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuery(query)}
                    className="text-left p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="border-t border-slate-200 p-4 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about ocean data, temperature profiles, float locations..."
                className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}