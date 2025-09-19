import React, { useState, useEffect } from 'react';
import { Filter, Calendar, Layers, Play, Pause, RotateCcw, Download, MapPin, Activity } from 'lucide-react';

export default function ExplorePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFloat, setSelectedFloat] = useState<any>(null);
  const [timeRange, setTimeRange] = useState({ start: '2024-01', end: '2024-12' });
  const [activeFilters, setActiveFilters] = useState({
    region: 'all',
    parameter: 'temperature',
    depth: [0, 2000],
    quality: 'all'
  });

  // Mock data for demonstration
  const mockFloats = [
    { id: 'WMO_4902345', lat: -20.5, lon: 57.8, lastUpdate: '2024-01-15', status: 'active', profiles: 145 },
    { id: 'WMO_4902346', lat: -18.2, lon: 55.3, lastUpdate: '2024-01-14', status: 'active', profiles: 132 },
    { id: 'WMO_4902347', lat: -22.1, lon: 59.2, lastUpdate: '2024-01-13', status: 'delayed', profiles: 158 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="flex h-screen">
        {/* Left Filter Panel */}
        <div className="w-80 bg-white dark:bg-slate-800 shadow-lg overflow-y-auto transition-colors duration-300 animate-slide-in-left">
          <div className="p-6 border-b border-slate-200 dark:border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
              <Filter className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
              Filters
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Time Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="month"
                  value={timeRange.start}
                  onChange={(e) => setTimeRange({ ...timeRange, start: e.target.value })}
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                />
                <input
                  type="month"
                  value={timeRange.end}
                  onChange={(e) => setTimeRange({ ...timeRange, end: e.target.value })}
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Region</label>
              <select
                value={activeFilters.region}
                onChange={(e) => setActiveFilters({ ...activeFilters, region: e.target.value })}
                className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
              >
                <option value="all">All Regions</option>
                <option value="indian">Indian Ocean</option>
                <option value="atlantic">Atlantic Ocean</option>
                <option value="pacific">Pacific Ocean</option>
                <option value="southern">Southern Ocean</option>
              </select>
            </div>

            {/* Parameter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Parameter</label>
              <select
                value={activeFilters.parameter}
                onChange={(e) => setActiveFilters({ ...activeFilters, parameter: e.target.value })}
                className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
              >
                <option value="temperature">Temperature</option>
                <option value="salinity">Salinity</option>
                <option value="oxygen">Dissolved Oxygen</option>
                <option value="chlorophyll">Chlorophyll</option>
              </select>
            </div>

            {/* Depth Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Depth Range (m)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min depth"
                  value={activeFilters.depth[0]}
                  onChange={(e) => setActiveFilters({ 
                    ...activeFilters, 
                    depth: [parseInt(e.target.value) || 0, activeFilters.depth[1]] 
                  })}
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Max depth"
                  value={activeFilters.depth[1]}
                  onChange={(e) => setActiveFilters({ 
                    ...activeFilters, 
                    depth: [activeFilters.depth[0], parseInt(e.target.value) || 2000] 
                  })}
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Apply Filters Button */}
            <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 flex flex-col">
          {/* Map Controls */}
          <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-600 p-4 transition-colors duration-300 animate-fade-in-down">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 ${
                    isPlaying 
                      ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg' 
                      : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'} Animation</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-all duration-200 transform hover:scale-105">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset View</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  <select className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-md text-sm transition-colors">
                    <option>Satellite</option>
                    <option>Ocean</option>
                    <option>Terrain</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-300">
                Showing {mockFloats.length} active floats
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 dark:from-primary-600 dark:via-secondary-600 dark:to-accent-600 relative overflow-hidden transition-colors duration-500">
            {/* Mock Map Interface */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20">
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <div className="text-white text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-float">
                    <Layers className="w-12 h-12 animate-bounce-gentle" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                  <p className="text-lg opacity-90">
                    Real map integration would show Argo float trajectories here
                  </p>
                </div>
              </div>

              {/* Mock Float Markers */}
              {mockFloats.map((float, index) => (
                <div
                  key={float.id}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-150 animate-pulse-slow ${
                    float.status === 'active' ? 'bg-success-400 shadow-lg shadow-success-400/50' : 'bg-accent-400 shadow-lg shadow-accent-400/50'
                  }`}
                  style={{
                    left: `${30 + index * 15}%`,
                    top: `${40 + index * 10}%`,
                    animationDelay: `${index * 200}ms`
                  }}
                  onClick={() => setSelectedFloat(float)}
                >
                  <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-current"></div>
                </div>
              ))}
            </div>

            {/* Time Slider */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in-up">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">Jan 2024</span>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    className="flex-1 h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer transition-colors"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">Dec 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Float Details */}
        <div className="w-80 bg-white dark:bg-slate-800 shadow-lg border-l border-slate-200 dark:border-slate-600 transition-colors duration-300 animate-slide-in-right">
          {selectedFloat ? (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                  {selectedFloat.id}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedFloat.status === 'active' 
                        ? 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-200' 
                        : 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200'
                    }`}>
                      {selectedFloat.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Profiles:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedFloat.profiles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Last Update:</span>
                    <span className="font-medium text-slate-900 dark:text-white">{selectedFloat.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-300">Position:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {selectedFloat.lat}°, {selectedFloat.lon}°
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Profile Preview */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Latest Profile
                </h4>
                <div className="h-32 bg-gradient-to-t from-primary-100 via-secondary-100 to-accent-100 dark:from-primary-900 dark:via-secondary-900 dark:to-accent-900 rounded-lg flex items-center justify-center transition-colors duration-300 hover:shadow-lg">
                  <div className="text-center text-slate-600 dark:text-slate-300">
                    <div className="text-2xl mb-1 animate-bounce-gentle">📊</div>
                    <div className="text-xs">Temperature Profile</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  View Full Profile
                </button>
                <button className="w-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 px-4 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 transform hover:scale-105">
                  Add to Comparison
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 py-2 px-4 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 transform hover:scale-105">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400 animate-fade-in">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                <Layers className="w-8 h-8 animate-bounce-gentle" />
              </div>
              <p>Click on a float marker to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}