import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton Loader Components
 * Various skeleton loaders for different content types
 */

// Base shimmer animation
const shimmerVariants = {
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Card Skeleton
 * Skeleton for card-based content
 */
export const CardSkeleton = ({ className = '' }) => (
  <motion.div
    className={`bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded-2xl p-6 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
    style={{
      backgroundSize: '200% 100%',
    }}
  >
    <div className="space-y-4">
      <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
      <div className="h-4 bg-slate-700/50 rounded w-full"></div>
      <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
      <div className="flex gap-2 mt-6">
        <div className="h-8 bg-slate-700/50 rounded w-20"></div>
        <div className="h-8 bg-slate-700/50 rounded w-20"></div>
      </div>
    </div>
  </motion.div>
);

/**
 * Text Skeleton
 * Skeleton for text content lines
 */
export const TextSkeleton = ({ 
  lines = 3,
  className = '',
  height = 'h-4'
}) => (
  <motion.div
    className={`space-y-3 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`${height} bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-${
          i === lines - 1 ? '3/4' : 'full'
        }`}
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite',
        }}
      ></div>
    ))}
  </motion.div>
);

/**
 * Avatar Skeleton
 * Skeleton for avatar/profile picture
 */
export const AvatarSkeleton = ({ 
  size = 'w-12 h-12',
  className = ''
}) => (
  <motion.div
    className={`${size} rounded-full bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
    style={{
      backgroundSize: '200% 100%',
    }}
  ></motion.div>
);

/**
 * Table Skeleton
 * Skeleton for table rows
 */
export const TableSkeleton = ({ 
  rows = 5,
  columns = 4,
  className = ''
}) => (
  <motion.div
    className={`space-y-3 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    {[...Array(rows)].map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {[...Array(columns)].map((_, colIndex) => (
          <div
            key={colIndex}
            className="h-10 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded flex-1"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          ></div>
        ))}
      </div>
    ))}
  </motion.div>
);

/**
 * Stat Card Skeleton
 * Skeleton for stat cards
 */
export const StatCardSkeleton = ({ className = '' }) => (
  <motion.div
    className={`p-6 rounded-2xl bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
    style={{
      backgroundSize: '200% 100%',
    }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 rounded-lg bg-slate-700/50"></div>
      <div className="w-12 h-6 rounded bg-slate-700/50"></div>
    </div>
    <div className="h-4 bg-slate-700/50 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-slate-700/50 rounded w-1/3"></div>
  </motion.div>
);

/**
 * List Skeleton
 * Skeleton for list items
 */
export const ListSkeleton = ({ 
  items = 5,
  className = ''
}) => (
  <motion.div
    className={`space-y-4 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    {[...Array(items)].map((_, i) => (
      <div key={i} className="flex gap-4 p-4 rounded-lg bg-white/5 dark:bg-slate-800/30 border border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-3/4" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
          <div className="h-3 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-1/2" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
        </div>
      </div>
    ))}
  </motion.div>
);

/**
 * Image Skeleton
 * Skeleton for image placeholders
 */
export const ImageSkeleton = ({ 
  className = 'w-full h-64',
  radius = 'rounded-lg'
}) => (
  <motion.div
    className={`bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 ${radius} ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
    style={{
      backgroundSize: '200% 100%',
    }}
  ></motion.div>
);

/**
 * Grid Skeleton
 * Skeleton for grid layouts
 */
export const GridSkeleton = ({ 
  columns = 3,
  items = 6,
  className = ''
}) => (
  <motion.div
    className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    {[...Array(items)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </motion.div>
);

/**
 * Resume Preview Skeleton
 * Skeleton for resume preview card
 */
export const ResumePreviewSkeleton = ({ className = '' }) => (
  <motion.div
    className={`p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 border border-white/10 ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    <div className="space-y-4">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <div className="h-6 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-1/2 mb-2" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
        <div className="h-4 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-3/4" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
      </div>
      
      {/* Content sections */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-5 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-1/3" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
          <div className="h-4 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-full" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
          <div className="h-4 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-5/6" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
        </div>
      ))}
    </div>
  </motion.div>
);

/**
 * Profile Card Skeleton
 * Skeleton for user profile card
 */
export const ProfileCardSkeleton = ({ className = '' }) => (
  <motion.div
    className={`p-6 rounded-2xl bg-white/5 dark:bg-slate-800/30 border border-white/10 text-center ${className}`}
    variants={shimmerVariants}
    animate="shimmer"
  >
    <div className="flex justify-center mb-4">
      <AvatarSkeleton size="w-20 h-20" />
    </div>
    <div className="h-5 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-2/3 mx-auto mb-2" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
    <div className="h-4 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-1/2 mx-auto mb-4" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
    <div className="flex gap-2 justify-center">
      <div className="h-8 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-20" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
      <div className="h-8 bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 rounded w-20" style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }}></div>
    </div>
  </motion.div>
);

/**
 * Dashboard Skeleton
 * Complete dashboard loading skeleton
 */
export const DashboardSkeleton = ({ className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ResumePreviewSkeleton />
      </div>
      <div>
        <ProfileCardSkeleton />
      </div>
    </div>

    {/* List Section */}
    <ListSkeleton items={3} />
  </div>
);

export default {
  CardSkeleton,
  TextSkeleton,
  AvatarSkeleton,
  TableSkeleton,
  StatCardSkeleton,
  ListSkeleton,
  ImageSkeleton,
  GridSkeleton,
  ResumePreviewSkeleton,
  ProfileCardSkeleton,
  DashboardSkeleton,
};
