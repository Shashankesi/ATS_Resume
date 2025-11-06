# 🎨 SmartCareer AI - Component Usage Guide

## Overview
This guide explains how to use the newly created premium UI components throughout the SmartCareer AI application.

---

## 📦 Component Libraries

### 1. **PremiumButton Component**
**Location**: `src/components/PremiumButton.jsx`

```jsx
import PremiumButton from '@/components/PremiumButton';

// Usage
<PremiumButton variant="primary" size="md" icon={Download}>
  Download Report
</PremiumButton>

// Props
- variant: 'primary' | 'secondary' | 'danger' | 'success'
- size: 'sm' | 'md' | 'lg'
- icon: Icon component (optional)
- disabled: boolean
- onClick: function
- className: string (additional classes)
```

### 2. **PremiumLoader Component**
**Location**: `src/components/PremiumLoader.jsx`

```jsx
import PremiumLoader from '@/components/PremiumLoader';

// Usage
{isLoading && <PremiumLoader text="Loading SmartCareer AI..." />}

// Props
- text: string (loading message)
```

### 3. **PremiumInput Components**
**Location**: `src/components/UI/PremiumInputs.jsx`

```jsx
import { PremiumInput, PremiumTextarea, PremiumSelect, PremiumBadge, PremiumCard } from '@/components/UI/PremiumInputs';

// PremiumInput
<PremiumInput
  label="Email"
  placeholder="your@email.com"
  icon={Mail}
  error={emailError}
  type="email"
/>

// PremiumTextarea
<PremiumTextarea
  label="Description"
  placeholder="Enter description..."
  rows={4}
  error={descError}
/>

// PremiumSelect
<PremiumSelect
  label="Category"
  options={[
    { value: 'ai', label: 'AI Tools' },
    { value: 'jobs', label: 'Jobs' }
  ]}
/>

// PremiumBadge
<PremiumBadge variant="success" size="md">Active</PremiumBadge>

// PremiumCard
<PremiumCard hover glowEffect>
  <h3>My Card Content</h3>
</PremiumCard>
```

### 4. **PremiumModals Component**
**Location**: `src/components/UI/PremiumModals.jsx`

```jsx
import { PremiumModal, PremiumAlert } from '@/components/UI/PremiumModals';

// PremiumModal
const [isOpen, setIsOpen] = useState(false);

<PremiumModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  icon={AlertCircle}
  size="md"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</PremiumModal>

// PremiumAlert
<PremiumAlert
  type="success"
  title="Success!"
  message="Your resume has been saved."
  dismissible
  onDismiss={() => {}}
/>

// Alert Types: 'success' | 'error' | 'warning' | 'info'
```

### 5. **Dividers Component**
**Location**: `src/components/UI/Dividers.jsx`

```jsx
import { WaveDivider, GradientBorder, SectionDivider } from '@/components/UI/Dividers';

// WaveDivider
<WaveDivider height={100} />

// GradientBorder
<div className="relative">
  <GradientBorder position="top" />
  Content here
</div>

// SectionDivider
<SectionDivider />
```

### 6. **NextLevelLoadingBar Component**
**Location**: `src/components/UI/NextLevelLoadingBar.jsx`

```jsx
import NextLevelLoadingBar from '@/components/UI/NextLevelLoadingBar';

// Usage (show during page transitions)
<NextLevelLoadingBar isLoading={isPageLoading} />
```

### 7. **IconLibrary Utilities**
**Location**: `src/components/UI/IconLibrary.jsx`

```jsx
import {
  AnimatedSparkles,
  PulsingDot,
  LoadingSpinner,
  GlowingBadge,
  EnhancedFeatureIcon,
  StatBadge
} from '@/components/UI/IconLibrary';

// AnimatedSparkles
<AnimatedSparkles size={24} className="text-orange-400" />

// PulsingDot
<PulsingDot size={8} className="bg-orange-400" />

// LoadingSpinner
<LoadingSpinner size={24} className="text-orange-400" />

// GlowingBadge
<GlowingBadge icon={Sparkles} text="AI Powered" />

// EnhancedFeatureIcon
<EnhancedFeatureIcon Icon={Brain} gradient="from-purple-500 to-blue-500" />

// StatBadge
<StatBadge icon={Users} label="Total Users" value="10K+" color="blue" />
```

---

## 🎬 Animation Variants
**Location**: `src/animation/variants.js`

```jsx
import { containerVariants, itemVariants, hoverScale, fadeInVariants } from '@/animation/variants';

// Usage with motion components
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Available variants
- containerVariants
- itemVariants
- fadeInVariants
- slideInVariants
- slideUpVariants
- scaleInVariants
- rotateInVariants
- flipInVariants
- bounceInVariants
- hoverScale
- hoverGlow
- tapScale
- pulseVariants
- floatVariants
- rotateVariants
- shimmerVariants
- pageTransitionVariants
- modalVariants
- dropdownVariants
- toastVariants
- loadingVariants
- listVariants
- listItemVariants
```

---

## 🎯 Best Practices

### Color Consistency
- **Primary**: Orange (`#ff8c00` / `rgb(249, 115, 22)`)
- **Secondary**: Pink (`#ec4899` / `rgb(236, 72, 153)`)
- **Success**: Green
- **Error**: Red
- **Warning**: Yellow
- **Info**: Blue

### Button Variants
```jsx
// Primary CTA
<PremiumButton variant="primary">Primary Action</PremiumButton>

// Secondary Action
<PremiumButton variant="secondary">Secondary Action</PremiumButton>

// Danger/Delete
<PremiumButton variant="danger">Delete</PremiumButton>

// Success/Confirm
<PremiumButton variant="success">Confirm</PremiumButton>
```

### Spacing Rules
- Use Tailwind's spacing scale: `p-4`, `py-6`, `gap-3`
- Modal padding: `px-6 py-6`
- Card padding: `p-6`
- Section padding: `py-12` to `py-20`

### Shadow Hierarchy
- **Subtle**: `shadow-md hover:shadow-lg`
- **Medium**: `shadow-lg hover:shadow-xl`
- **Large**: `shadow-2xl`
- **Glow**: `shadow-orange-500/50`

### Border Radius
- Buttons: `rounded-lg` (8px)
- Cards: `rounded-2xl` (16px)
- Icons: `rounded-xl` (12px)
- Small elements: `rounded` (4px)

---

## 📱 Responsive Design

All components are mobile-responsive:

```jsx
// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

// Flex layouts
<div className="flex flex-col md:flex-row items-center gap-4">
  {/* Content */}
</div>
```

---

## 🚀 Performance Tips

1. **Use Lazy Loading**
```jsx
const PremiumButton = lazy(() => import('@/components/PremiumButton'));
```

2. **Memoize Components**
```jsx
export default memo(PremiumButton);
```

3. **Optimize Animations**
- Keep animations under 300ms for micro-interactions
- Use `ease: 'easeInOut'` for smooth transitions
- Limit `blur-3xl` effects on many elements

---

## 🔗 Common Implementations

### Form with Validation
```jsx
import { PremiumInput, PremiumButton } from '@/components/UI/PremiumInputs';

<form onSubmit={handleSubmit}>
  <PremiumInput
    label="Email"
    icon={Mail}
    error={errors.email}
    value={formData.email}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
  />
  <PremiumButton variant="primary" type="submit">Submit</PremiumButton>
</form>
```

### Loading State
```jsx
import PremiumLoader from '@/components/PremiumLoader';

{isLoading ? (
  <PremiumLoader text="Processing..." />
) : (
  <YourContent />
)}
```

### Alert Notification
```jsx
import { PremiumAlert } from '@/components/UI/PremiumModals';

{showAlert && (
  <PremiumAlert
    type="success"
    title="Success"
    message="Action completed successfully"
    dismissible
    onDismiss={() => setShowAlert(false)}
  />
)}
```

---

## 🎓 Example: Complete Feature Page

```jsx
import { containerVariants, itemVariants } from '@/animation/variants';
import { PremiumButton } from '@/components/PremiumButton';
import { PremiumCard } from '@/components/UI/PremiumInputs';
import { motion } from 'framer-motion';

export default function FeaturePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold">
        Amazing Feature
      </motion.h1>

      <PremiumCard className="mt-8">
        <motion.div variants={itemVariants}>
          <p>Feature description</p>
          <PremiumButton variant="primary" className="mt-4">
            Get Started
          </PremiumButton>
        </motion.div>
      </PremiumCard>
    </motion.div>
  );
}
```

---

## 📞 Support

For questions about component usage, check:
- Component JSX files for inline comments
- Props interface at the top of each file
- Example implementations in existing pages

---

## 📝 Changelog

### Latest Updates
- ✅ Added PremiumButton component
- ✅ Enhanced PremiumLoader with floating icons
- ✅ Created comprehensive input library
- ✅ Added premium modals and alerts
- ✅ Implemented reusable animation variants
- ✅ Added divider components
- ✅ Enhanced footer and navbar

**Last Updated**: Current Session
**Version**: 3.3.0

---

## 🚀 Next Steps

1. Test all components on mobile devices
2. Implement dark mode switcher
3. Add page transition animations
4. Create dashboard widgets using components
5. Implement toast notification system

Enjoy building with premium components! 🎉
