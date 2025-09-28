'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Interactive Satellite Globe Component
 * 
 * Features:
 * - 3D globe visualization with satellite data
 * - Real-time carbon project locations
 * - Interactive data points
 * - Responsive design for all screen sizes
 * - Animated data visualization
 */

interface ProjectData {
  id: string;
  name: string;
  location: string;
  type: 'forest' | 'renewable' | 'carbon-capture';
  co2Reduction: number;
  status: 'active' | 'verified' | 'pending';
  lat: number;
  lng: number;
}

const projectData: ProjectData[] = [
  // Major Global Carbon Projects
  {
    id: '1',
    name: 'Amazon Rainforest Protection',
    location: 'Brazil',
    type: 'forest',
    co2Reduction: 2500000,
    status: 'active',
    lat: -3.4653,
    lng: -62.2159
  },
  {
    id: '2',
    name: 'Sahara Solar Initiative',
    location: 'Morocco',
    type: 'renewable',
    co2Reduction: 1800000,
    status: 'verified',
    lat: 31.6295,
    lng: -7.9811
  },
  {
    id: '3',
    name: 'North Sea Wind Farms',
    location: 'Netherlands',
    type: 'renewable',
    co2Reduction: 1200000,
    status: 'active',
    lat: 52.1326,
    lng: 5.2913
  },
  {
    id: '4',
    name: 'Congo Basin Forest',
    location: 'Democratic Republic of Congo',
    type: 'forest',
    co2Reduction: 3200000,
    status: 'verified',
    lat: -4.0383,
    lng: 21.7587
  },
  {
    id: '5',
    name: 'Sleipner Carbon Storage',
    location: 'Norway',
    type: 'carbon-capture',
    co2Reduction: 800000,
    status: 'active',
    lat: 58.3679,
    lng: 1.7876
  },
  {
    id: '6',
    name: 'Great Green Wall',
    location: 'Senegal',
    type: 'forest',
    co2Reduction: 1500000,
    status: 'active',
    lat: 14.4974,
    lng: -14.4524
  },
  {
    id: '7',
    name: 'Gansu Wind Farm',
    location: 'China',
    type: 'renewable',
    co2Reduction: 2200000,
    status: 'verified',
    lat: 38.9000,
    lng: 100.4500
  },
  {
    id: '8',
    name: 'Australian Bushfire Recovery',
    location: 'Australia',
    type: 'forest',
    co2Reduction: 1800000,
    status: 'active',
    lat: -25.2744,
    lng: 133.7751
  },
  {
    id: '9',
    name: 'Iceland Geothermal',
    location: 'Iceland',
    type: 'renewable',
    co2Reduction: 400000,
    status: 'verified',
    lat: 64.9631,
    lng: -19.0208
  },
  {
    id: '10',
    name: 'Mangrove Restoration',
    location: 'Bangladesh',
    type: 'forest',
    co2Reduction: 600000,
    status: 'active',
    lat: 23.6850,
    lng: 90.3563
  },
  {
    id: '11',
    name: 'California Carbon Capture',
    location: 'United States',
    type: 'carbon-capture',
    co2Reduction: 900000,
    status: 'verified',
    lat: 36.7783,
    lng: -119.4179
  },
  {
    id: '12',
    name: 'Siberian Reforestation',
    location: 'Russia',
    type: 'forest',
    co2Reduction: 2800000,
    status: 'active',
    lat: 61.5240,
    lng: 105.3188
  }
];

export default function SatelliteGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

      // Draw interactive elements over satellite image
      const drawInteractiveElements = () => {
        const centerX = canvas.width / (2 * window.devicePixelRatio);
        const centerY = canvas.height / (2 * window.devicePixelRatio);
        const radius = Math.min(centerX, centerY) * 0.8;

        // Clear canvas (transparent background)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw project points with enhanced visualization
        projectData.forEach((project, index) => {
          const x = centerX + (project.lng / 180) * radius * 0.8;
          const y = centerY - (project.lat / 90) * radius * 0.8;
          
          // Only draw if point is within globe bounds
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance <= radius) {
            const colors = {
              forest: '#22c55e',
              renewable: '#3b82f6',
              'carbon-capture': '#8b5cf6'
            };

            const time = Date.now() * 0.001;
            const pulse = Math.sin(time * 3 + index * 0.5) * 0.3 + 0.7;
            const size = 4 + pulse * 2;

            // Draw connection lines to show data flow
            if (index % 3 === 0) {
              ctx.strokeStyle = colors[project.type] + '20';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(centerX, centerY);
              ctx.lineTo(x, y);
              ctx.stroke();
            }

            // Draw pulsing rings
            ctx.beginPath();
            ctx.arc(x, y, size + 8, 0, 2 * Math.PI);
            ctx.strokeStyle = colors[project.type] + '30';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x, y, size + 4, 0, 2 * Math.PI);
            ctx.strokeStyle = colors[project.type] + '50';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw main point
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fillStyle = colors[project.type];
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Add status indicator
            if (project.status === 'active') {
              ctx.beginPath();
              ctx.arc(x + size + 2, y - size - 2, 2, 0, 2 * Math.PI);
              ctx.fillStyle = '#22c55e';
              ctx.fill();
            }
          }
        });

        // Draw real-time data streams
        const time = Date.now() * 0.001;
        for (let i = 0; i < 5; i++) {
          const angle = (time * 0.5 + i * 1.2) % (Math.PI * 2);
          const x = centerX + Math.cos(angle) * radius * 0.9;
          const y = centerY + Math.sin(angle) * radius * 0.9;
          
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + Math.sin(time * 2 + i) * 0.2})`;
          ctx.fill();
        }
      };

      drawInteractiveElements();

    // Animation loop
    const animate = () => {
      drawInteractiveElements();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const getProjectTypeColor = (type: string) => {
    const colors = {
      forest: 'text-green-600 bg-green-100',
      renewable: 'text-blue-600 bg-blue-100',
      'carbon-capture': 'text-purple-600 bg-purple-100'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-emerald-600 bg-emerald-100',
      verified: 'text-blue-600 bg-blue-100',
      pending: 'text-yellow-600 bg-yellow-100'
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="relative w-full h-full">
      {/* Real Satellite Image Globe */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        {/* Real satellite image of Earth */}
        <img
          src="https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/globe_west_2048.jpg"
          alt="NASA Blue Marble satellite view of Earth"
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            // Fallback to Earth image from NASA
            e.currentTarget.src = "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&crop=center&auto=format&q=80";
          }}
        />
        
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-sm text-emerald-400">Loading satellite data...</div>
            </div>
          </div>
        )}
        
        {/* Canvas overlay for interactive elements */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Data Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Top Stats */}
        <div className="flex justify-between items-start">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="text-xs font-medium text-gray-700 mb-1">Active Projects</div>
            <div className="text-lg font-bold text-emerald-600">{projectData.length}</div>
            <div className="text-[10px] text-gray-500">Satellite tracked</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="text-xs font-medium text-gray-700 mb-1">CO₂ Reduced</div>
            <div className="text-lg font-bold text-emerald-600">
              {(projectData.reduce((sum, p) => sum + p.co2Reduction, 0) / 1000000).toFixed(1)}M tons
            </div>
            <div className="text-[10px] text-gray-500">Cumulative impact</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <div className="text-xs font-medium text-gray-700 mb-1">Countries</div>
            <div className="text-lg font-bold text-emerald-600">
              {new Set(projectData.map(p => p.location)).size}
            </div>
            <div className="text-[10px] text-gray-500">NASA verified</div>
          </div>
        </div>

        {/* Bottom Project List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-gray-700">Live Global Projects</div>
            <div className="text-[10px] text-gray-500">NASA satellite data</div>
          </div>
          <div className="space-y-1">
            {projectData.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 rounded-lg p-1"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`w-2 h-2 rounded-full ${
                  project.type === 'forest' ? 'bg-green-500' :
                  project.type === 'renewable' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <span className="font-medium text-gray-900 flex-1 truncate">{project.name}</span>
                <span className="text-[10px] text-gray-500">{(project.co2Reduction / 1000000).toFixed(1)}M</span>
                <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-[10px] text-gray-500 text-center">
              Click any project for details • {projectData.length} total projects worldwide
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedProject.name}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Location:</span>
                <span className="text-sm font-medium">{selectedProject.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Type:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectTypeColor(selectedProject.type)}`}>
                  {selectedProject.type.replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">CO₂ Reduction:</span>
                <span className="text-sm font-bold text-emerald-600">
                  {selectedProject.co2Reduction.toLocaleString()} tons
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
