import React, { useState, useEffect } from 'react'
import './UserSettingsForm.css'

const UserSettingsForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fitnessGoal: 'general',
    weeklyGoal: '3',
    notifications: {
      email: true,
      push: false,
      achievements: true,
      reminders: true
    },
    privacy: {
      profilePublic: true,
      showStats: true,
      allowMessages: false
    }
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Validate form fields
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value || value.trim().length < 2) {
          return 'Must be at least 2 characters'
        }
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || !emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        break
      case 'phoneNumber':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          return 'Please enter a valid phone number'
        }
        break
      default:
        return ''
    }
    return ''
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    
    setHasChanges(true)
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string') {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(Object.keys(newErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onSave(formData)
      setIsSubmitting(false)
      setHasChanges(false)
    }, 1000)
  }

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  return (
    <form className="user-settings-form" onSubmit={handleSubmit} noValidate>
      <div className="form-section">
        <h2>👤 Personal Information</h2>
        <p className="section-description">Update your personal details</p>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.firstName && touched.firstName ? 'error' : ''}
              placeholder="Enter your first name"
              aria-required="true"
              aria-invalid={errors.firstName && touched.firstName ? 'true' : 'false'}
              aria-describedby={errors.firstName && touched.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && touched.firstName && (
              <span className="error-message" id="firstName-error" role="alert">
                {errors.firstName}
              </span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.lastName && touched.lastName ? 'error' : ''}
              placeholder="Enter your last name"
              aria-required="true"
              aria-invalid={errors.lastName && touched.lastName ? 'true' : 'false'}
              aria-describedby={errors.lastName && touched.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && touched.lastName && (
              <span className="error-message" id="lastName-error" role="alert">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? 'error' : ''}
              placeholder="your.email@example.com"
              aria-required="true"
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            />
            {errors.email && touched.email && (
              <span className="error-message" id="email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">
              Phone Number <span className="optional">(optional)</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phoneNumber && touched.phoneNumber ? 'error' : ''}
              placeholder="+1 (555) 123-4567"
              aria-invalid={errors.phoneNumber && touched.phoneNumber ? 'true' : 'false'}
              aria-describedby={errors.phoneNumber && touched.phoneNumber ? 'phoneNumber-error' : undefined}
            />
            {errors.phoneNumber && touched.phoneNumber && (
              <span className="error-message" id="phoneNumber-error" role="alert">
                {errors.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>🎯 Fitness Goals</h2>
        <p className="section-description">Set your fitness objectives</p>
        
        <div className="form-group">
          <label htmlFor="fitnessGoal">Primary Fitness Goal</label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
          >
            <option value="general">General Fitness</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="endurance">Build Endurance</option>
            <option value="flexibility">Improve Flexibility</option>
            <option value="strength">Build Strength</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="weeklyGoal">Weekly Workout Target</label>
          <div className="slider-group">
            <input
              type="range"
              id="weeklyGoal"
              name="weeklyGoal"
              min="1"
              max="7"
              value={formData.weeklyGoal}
              onChange={handleChange}
              className="slider"
              aria-valuemin="1"
              aria-valuemax="7"
              aria-valuenow={formData.weeklyGoal}
              aria-label="Weekly workout target"
            />
            <span className="slider-value">{formData.weeklyGoal} days/week</span>
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h2>🔔 Notification Preferences</h2>
        <p className="section-description">Choose how you want to be notified</p>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications.email"
              checked={formData.notifications.email}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Email Notifications</strong>
              <small>Receive updates and summaries via email</small>
            </span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications.push"
              checked={formData.notifications.push}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Push Notifications</strong>
              <small>Get real-time alerts on your device</small>
            </span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications.achievements"
              checked={formData.notifications.achievements}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Achievement Alerts</strong>
              <small>Celebrate your milestones and badges</small>
            </span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="notifications.reminders"
              checked={formData.notifications.reminders}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Workout Reminders</strong>
              <small>Daily reminders to stay on track</small>
            </span>
          </label>
        </div>
      </div>
      
      <div className="form-section">
        <h2>🔒 Privacy Settings</h2>
        <p className="section-description">Control your profile visibility</p>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="privacy.profilePublic"
              checked={formData.privacy.profilePublic}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Public Profile</strong>
              <small>Allow others to view your profile</small>
            </span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="privacy.showStats"
              checked={formData.privacy.showStats}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Show Statistics</strong>
              <small>Display your workout stats on your profile</small>
            </span>
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="privacy.allowMessages"
              checked={formData.privacy.allowMessages}
              onChange={handleChange}
            />
            <span className="checkbox-text">
              <strong>Allow Messages</strong>
              <small>Let other users send you messages</small>
            </span>
          </label>
        </div>
      </div>
      
      <div className="form-actions">
        {hasChanges && (
          <p className="unsaved-changes">
            ⚠️ You have unsaved changes
          </p>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </button>
      </div>
    </form>
  )
}

export default UserSettingsForm
