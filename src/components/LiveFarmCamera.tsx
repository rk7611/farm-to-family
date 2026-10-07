'use client';

import React, { useState, useEffect } from 'react';
import {
  Camera,
  Radio,
  Eye,
  Maximize2,
  RefreshCw,
  Sun,
  Droplet,
  Compass,
  Thermometer,
  ShieldAlert,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface LiveFarmCameraProps {
  farmName?: string;
  plotNumber?: string;
  isPremium?: boolean;
}

export default function LiveFarmCamera({
  farmName = 'Anekal Valley Agro Estate',
  plotNumber = 'Plot B-14 (Dedicated)',
  isPremium = true,
}: LiveFarmCameraProps) {
  const [activeCam, setActiveCam] = useState(1);
  const [timestamp, setTimestamp] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panX, setPanX] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(
        now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB') + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const cameras = [
    {
      id: 1,
      name: 'Cam 01: North Trellis Line',
      desc: 'San Marzano Tomato & Cucumber Climbers',
      image:
        'https://images.unsplash.com/photo-1592417817098-8f3d6ef23992?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      name: 'Cam 02: Root Zone & Raised Beds',
      desc: 'Early Nantes Carrots & Bell Pepper Furrows',
      image:
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      name: 'Cam 03: Precision Drip Manifold',
      desc: 'Sub-surface irrigation station & fertigation hub',
      image:
        'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 4,
      name: 'Cam 04: Panoramic Estate Canopy',
      desc: 'Wide-angle view of participating family parcel',
      image:
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const currentCam = cameras.find((c) => c.id === activeCam) || cameras[0];

  return (
    <div className="w-full bg-[#102115] text-white rounded-3xl overflow-hidden border border-[#234531] shadow-2xl">
      {/* Top Stream Control Bar */}
      <div className="p-4 sm:p-5 bg-[#0D1B11] border-b border-[#1E3B27] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>LIVE CAM FEED</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-zinc-300 block">{farmName}</span>
            <span className="text-[11px] text-[#A1D1AF]">{plotNumber} • Secured Stream</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="hidden sm:inline bg-black/40 px-3 py-1 rounded-md border border-white/5">
            {timestamp || 'LIVE 1080P'}
          </span>
          <span className="text-emerald-400 text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Telemetry Online</span>
          </span>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative aspect-video sm:aspect-21/9 bg-zinc-900 overflow-hidden group">
        {/* Background Image with Zoom/Pan */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
          style={{
            backgroundImage: `url(${currentCam.image})`,
            transform: `scale(${zoomLevel}) translateX(${panX}px)`,
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Viewport Live Overlays */}
        <div className="absolute top-4 left-4 pointer-events-none space-y-1">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-white inline-flex items-center gap-2 border border-white/10">
            <Camera className="w-3.5 h-3.5 text-[#A1D1AF]" />
            <span>{currentCam.name}</span>
          </div>
          <p className="text-[11px] text-zinc-300 drop-shadow-md">{currentCam.desc}</p>
        </div>

        {/* Telemetry Sensor HUD (Bottom Left) */}
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-zinc-300">
              <Droplet className="w-3.5 h-3.5 text-sky-400" />
              <div>
                <span className="text-[10px] text-zinc-400 block">Soil Moisture</span>
                <span className="font-bold text-white">38.4% F.C.</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <div>
                <span className="text-[10px] text-zinc-400 block">Ambient Temp</span>
                <span className="font-bold text-white">24.8°C</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
              <div>
                <span className="text-[10px] text-zinc-400 block">Solar Lux</span>
                <span className="font-bold text-white">48,200 lx</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-zinc-400 block">Soil pH</span>
                <span className="font-bold text-white">6.8 (Optimal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive PTZ Controls (Bottom Right) */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <div className="bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(1, z - 0.2))}
              className="px-2 py-1 text-xs font-mono hover:bg-white/20 rounded transition text-white"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[11px] font-mono px-1 text-zinc-300">{zoomLevel.toFixed(1)}x</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(2, z + 0.2))}
              className="px-2 py-1 text-xs font-mono hover:bg-white/20 rounded transition text-white"
              title="Zoom In"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setZoomLevel(1);
              setPanX(0);
            }}
            className="p-2 bg-black/70 backdrop-blur-md hover:bg-white/20 text-white rounded-lg border border-white/10 transition"
            title="Reset Angle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Camera Switcher Grid */}
      <div className="p-4 bg-[#0D1B11] border-t border-[#1E3B27] grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cameras.map((cam) => (
          <button
            key={cam.id}
            type="button"
            onClick={() => {
              setActiveCam(cam.id);
              setZoomLevel(1);
              setPanX(0);
            }}
            className={`p-2.5 rounded-xl text-left border transition ${
              activeCam === cam.id
                ? 'bg-[#172F1F] border-[#A1D1AF] text-white shadow-sm'
                : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span className="text-xs font-semibold block leading-tight">{cam.name}</span>
            <span className="text-[10px] text-zinc-400 mt-0.5 block truncate">{cam.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
