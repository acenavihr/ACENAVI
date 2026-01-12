"use client"

import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { useState } from "react"

interface LifecycleStageProps {
  iconName: keyof typeof LucideIcons
  title: string
  subtitle: string
  points: readonly [string, string, string]
  index: number
  showIndex?: boolean
}

export function LifecycleStage({ iconName, title, subtitle, points, index, showIndex = true }: LifecycleStageProps) {
  const Icon = LucideIcons[iconName] as LucideIcons.LucideIcon
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center group h-full justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
      style={{ zIndex: isActive ? 100 : 10 }}
      whileHover={{ zIndex: 100 }}
      onClick={handleClick}
    >
      <div className="relative cursor-pointer">
        {/* Stage Circle - Fully Blue with White Icon */}
        <motion.div 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2f5bff] border-2 border-[#2f5bff] flex items-center justify-center shadow-md transition-all duration-200"
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0 10px 25px -5px rgba(47, 91, 255, 0.3), 0 8px 10px -6px rgba(47, 91, 255, 0.3)"
          }}
          animate={isActive ? {
            scale: 1.15,
            boxShadow: "0 10px 25px -5px rgba(47, 91, 255, 0.3), 0 8px 10px -6px rgba(47, 91, 255, 0.3)"
          } : {}}
        >
          <Icon
            className="w-6 h-6 md:w-8 md:h-8 text-white transition-transform duration-200 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Index Label - Conditionally rendered */}
        {showIndex && (
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2f5bff] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
            {index + 1}
          </span>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm md:text-base font-medium text-foreground tracking-tight">{title}</h3>
        
        {/* Hover/Click Card - DESKTOP: Hover above, MOBILE/TABLET: Click to toggle */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[280px] transition-all duration-300 z-50 
          ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'} 
          lg:group-hover:opacity-100 lg:group-hover:visible lg:pointer-events-none`}
        >
          <div className="bg-card border border-border rounded-lg shadow-2xl p-4">
            {/* Subtitle */}
            <p className="text-xs font-semibold text-[#2f5bff] mb-3 uppercase tracking-wide">
              {subtitle}
            </p>
            
            {/* Bullet Points */}
            <ul className="space-y-2 text-left">
              {points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                  <span className="text-[#2f5bff] mt-0.5 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
        </div>
      </div>
    </motion.div>
  )
}