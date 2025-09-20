# 🏆 Kaun Banega Quiz Master - KBC Style Quiz Game

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Sunetra1570/quiz-App)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-✅-brightgreen)](https://www.w3.org/TR/CSS3-mediaqueries/)

> **A stunning, fully-featured quiz application inspired by the iconic "Kaun Banega Crorepati" (KBC) TV show. Challenge your knowledge with authentic KBC-style gameplay, lifelines, and immersive animations!**

## 🎯 Live Demo

```bash
# Clone the repository
git clone https://github.com/Sunetra1570/quiz-App.git

# Navigate to the project
cd quiz-App

# Open in browser
open index.html
```

## ✨ Features

### 🎮 **Core Gameplay**
- **🏆 Authentic KBC Experience** - Complete replica of the famous quiz show
- **⏰ Real-time Timer** - 30-second countdown with visual indicators
- **🎯 Smart Scoring** - Progressive difficulty with reward system
- **📱 Universal Compatibility** - Works on all devices and screen sizes

### 🆘 **Lifeline System**
- **🔄 50:50** - Remove two incorrect answers
- **👥 Audience Poll** - See realistic voting percentages
- **💡 Show Answer** - Reveal the correct answer (auto-win)

### 🎨 **Visual Excellence**
- **🌟 Premium KBC Styling** - Dark theme with gold accents
- **✨ Smooth Animations** - Professional transitions and effects
- **🎊 Victory Celebrations** - Confetti animations for achievements
- **📱 Responsive Design** - Perfect on mobile, tablet, and desktop

### 🧠 **Question Database**
- **📚 Diverse Categories** - History, Science, Geography, Literature
- **🔄 Dynamic Selection** - Randomized questions for replayability
- **⚡ Instant Feedback** - Immediate answer validation
- **📊 Performance Tracking** - Score analysis and feedback

## 🚀 Quick Start

### Option 1: Direct Download
1. Download the project files
2. Open `index.html` in any modern web browser
3. Start playing immediately!

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8080
```

Then visit `http://localhost:8080` in your browser.

## 📱 Device Compatibility

| Device Type | Screen Size | Layout | Status |
|-------------|-------------|---------|---------|
| 📱 Mobile Portrait | 320px - 575px | Single Column | ✅ Optimized |
| 📱 Mobile Landscape | 576px - 767px | Compact Grid | ✅ Optimized |
| 📱 Tablet Portrait | 768px - 991px | Flexible Grid | ✅ Optimized |
| 💻 Laptop | 992px - 1199px | Sidebar Layout | ✅ Optimized |
| 🖥️ Desktop | 1200px - 1439px | Full Layout | ✅ Optimized |
| 🖥️ Large Desktop | 1440px - 1919px | Enhanced Layout | ✅ Optimized |
| 🖥️ Ultra-wide | 1920px+ | Premium Layout | ✅ Optimized |

## 🎮 How to Play

### 1. **Start the Game**
- Click the golden "Start Game" button
- Get ready for an exciting quiz journey!

### 2. **Answer Questions**
- Read each question carefully
- Select your answer from 4 options (A, B, C, D)
- Watch the timer - you have 30 seconds per question!

### 3. **Use Lifelines Wisely**
- **50:50**: Eliminates 2 wrong answers (use once)
- **Audience Poll**: Shows voting percentages (use once)
- **Show Answer**: Reveals correct answer (use once)

### 4. **Track Your Progress**
- Monitor your score in real-time
- See your question progress (e.g., 3/10)
- Celebrate your achievements!

## 🛠️ Technical Architecture

### **Frontend Stack**
```
HTML5 + CSS3 + Vanilla JavaScript
├── Semantic HTML structure
├── Modern CSS Grid & Flexbox
├── ES6+ JavaScript features
└── Progressive Web App ready
```

### **Key Technologies**
- **🎨 CSS Variables** - Dynamic theming system
- **📱 CSS Grid & Flexbox** - Responsive layouts
- **⚡ ES6 Modules** - Clean, maintainable code
- **🎭 CSS Animations** - Smooth transitions and effects
- **🎊 Canvas Confetti** - Victory celebrations
- **🔤 Font Awesome** - Professional icons

### **File Structure**
```
quiz-App/
├── 📄 index.html          # Main application structure
├── 🎨 style.css           # Complete styling system
├── ⚡ script.js           # Game logic and interactions
├── 📖 README.md           # This documentation
└── 🎯 favicon.ico         # Browser tab icon
```

## 🎨 Customization

### **Add New Questions**
```javascript
// In script.js, add to questionBank array
{
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Correct Option",
    difficulty: "easy|medium|hard"
}
```

### **Modify Timer Duration**
```javascript
// In script.js, change TIME_PER_QUESTION
const TIME_PER_QUESTION = 30; // seconds
```

### **Customize Scoring**
```javascript
// In script.js, modify points per answer
const POINTS_PER_CORRECT_ANSWER = 10;
```

### **Theme Customization**
```css
/* In style.css, modify CSS variables */
:root {
    --primary-dark: #0a0e27;
    --accent-gold: #ffd700;
    --accent-orange: #ff6b35;
    /* Add your custom colors */
}
```

## 🎯 Performance Features

### **⚡ Optimizations**
- **Vanilla JavaScript** - No framework overhead
- **CSS-only animations** - Hardware accelerated
- **Optimized images** - SVG icons and emoji favicons
- **Minimal dependencies** - Only essential libraries

### **📱 Mobile Optimizations**
- **Touch-friendly** - 44px+ touch targets
- **Fast loading** - Optimized for slow connections
- **Offline ready** - Works without internet
- **Battery efficient** - Minimal resource usage

## 🌟 Advanced Features

### **🎨 Visual Effects**
- **Gradient backgrounds** - Dynamic color schemes
- **Particle animations** - Floating gold particles
- **Pulse effects** - Breathing timer animation
- **Glow effects** - Magical gold highlighting

### **🔊 Audio Integration**
- **Timer sounds** - Authentic KBC ticking
- **Victory fanfare** - Celebration audio
- **Sound controls** - User preference respect

### **♿ Accessibility**
- **Keyboard navigation** - Full keyboard support
- **Screen reader friendly** - Semantic HTML
- **High contrast mode** - Enhanced visibility
- **Reduced motion** - Respects user preferences

## 🧪 Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| 🌐 Chrome | 80+ | ✅ Full Support |
| 🦊 Firefox | 75+ | ✅ Full Support |
| 🍎 Safari | 13+ | ✅ Full Support |
| 📘 Edge | 80+ | ✅ Full Support |
| 📱 Mobile Browsers | Modern | ✅ Full Support |

## 🔧 Development

### **Setup Development Environment**
```bash
# Clone repository
git clone https://github.com/Sunetra1570/quiz-App.git
cd quiz-App

# Install development server (optional)
npm install -g http-server

# Start development server
http-server -p 8080 -o
```

### **Code Quality**
- **✅ Clean Architecture** - Separation of concerns
- **📝 Commented Code** - Comprehensive documentation
- **🔧 Modular Design** - Reusable components
- **🧪 Error Handling** - Robust error management

## 🎊 Screenshots

### 🏠 **Start Screen**
- Welcome interface with game information
- Professional KBC-style branding
- Animated gold elements

### 🎮 **Quiz Interface**
- Question display with timer
- 4-option answer grid
- Lifeline buttons
- Progress tracking

### 🏆 **Results Screen**
- Final score display
- Performance analysis
- Confetti celebrations
- Restart option

---

<div align="center">

### 🌟 **Star this repository if you enjoyed the quiz!** ⭐

**Made with ❤️ by Sunetra Tiwary**

[🏠 Homepage](https://github.com/Sunetra1570/quiz-App) • [🐛 Report Bug](https://github.com/Sunetra1570/quiz-App/issues) • [✨ Request Feature](https://github.com/Sunetra1570/quiz-App/issues)

</div>