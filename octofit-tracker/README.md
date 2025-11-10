# OctoFit Tracker - User Settings Form

A modern, accessible, and user-friendly settings form for the OctoFit Tracker fitness application.

## Features

### 🎨 Excellent Usability

- **Clean, Intuitive Interface**: Organized sections with clear visual hierarchy
- **Real-time Validation**: Immediate feedback on form inputs with helpful error messages
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support

### 🔍 Form Validation

- Required field indicators
- Email format validation
- Phone number format validation
- Visual error states with animated messages
- Disabled save button when form has errors

### 💡 User-Friendly Features

- **Unsaved Changes Warning**: Alerts users before leaving with unsaved changes
- **Visual Feedback**: 
  - Success banner on save
  - Loading spinner during submission
  - Hover effects on interactive elements
- **Smart Field Grouping**: Related fields grouped logically
- **Range Slider**: Visual representation for weekly workout targets
- **Checkbox Cards**: Large, easy-to-click notification and privacy settings

### 📱 Sections

1. **👤 Personal Information**
   - First Name, Last Name (required)
   - Email Address (required, validated)
   - Phone Number (optional)

2. **🎯 Fitness Goals**
   - Primary fitness goal selector
   - Weekly workout target slider (1-7 days)

3. **🔔 Notification Preferences**
   - Email notifications
   - Push notifications
   - Achievement alerts
   - Workout reminders

4. **🔒 Privacy Settings**
   - Public profile toggle
   - Statistics visibility
   - Messaging permissions

## Getting Started

### Prerequisites

- Node.js 14+ installed
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd octofit-tracker/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` directory.

## Technology Stack

- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with animations and transitions
- **HTML5** - Semantic markup with accessibility features

## Design Principles

### Accessibility
- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus visible states
- Reduced motion support for users with motion sensitivity

### Performance
- Optimized React rendering
- CSS animations for smooth interactions
- Lazy validation (only after user interaction)

### User Experience
- Progressive disclosure of information
- Clear visual feedback for all actions
- Helpful error messages
- Consistent design language

## Form Behavior

### Validation Rules

- **First Name**: Minimum 2 characters
- **Last Name**: Minimum 2 characters  
- **Email**: Valid email format (example@domain.com)
- **Phone Number**: Optional, but must be valid format if provided

### State Management

- Form tracks changes to warn about unsaved data
- Validation triggers on blur (after user leaves field)
- Re-validation on every change once field is touched
- Submit button disabled when form has validation errors

## Screenshots

### Initial State
![User Settings Form](https://github.com/user-attachments/assets/6fbd894f-89eb-426b-8d15-d9c63bf4cc4c)

### Filled Form with Unsaved Changes
![Form with Data](https://github.com/user-attachments/assets/b3da971c-d3ae-4cc9-9d0e-7939bfbe2ca9)

### Validation Error
![Validation Error](https://github.com/user-attachments/assets/bf92ef9a-0431-41a4-98d2-7996f3cc2f6f)

### Success State
![Success Message](https://github.com/user-attachments/assets/1ec4fa88-778f-4d77-842a-fb2a13eda3ec)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Built with ❤️ for Mergington High School
