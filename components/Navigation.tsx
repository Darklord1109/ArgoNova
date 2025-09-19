import React, { useState } from 'react';
import { Menu, X, Globe, Upload, MessageCircle, Database, BarChart3, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'explore', label: 'Explore', icon: Globe },
    { id: 'profiles', label: 'Profiles', icon: BarChart3 },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'catalog', label: 'Catalog', icon: Database },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  return (
    <nav className="bg-slate-900 dark:bg-slate-950 text-white shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-lg flex items-center justify-center animate-glow">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-secondary-400 to-primary-400 bg-clip-text text-transparent">
                ArgoScope
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 transform hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700 dark:border-slate-600 animate-fade-in-down">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-secondary-600 to-primary-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-200"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}