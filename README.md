# AttendanceTracker - Smart Attendance Calculator

A minimalist, responsive web application that helps students calculate their attendance percentage and plan how many classes they need to attend to reach their target attendance goals.

## 🌟 Features

- **Real-time Attendance Calculation**: Instantly calculate your current attendance percentage
- **Target Planning**: Set attendance goals and get precise recommendations
- **Smart Recommendations**: Know exactly how many classes to attend or how many you can afford to miss
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Minimalist design inspired by modern web aesthetics
- **Local Storage**: Saves your inputs for convenience (data persists for 24 hours)
- **Accessibility**: Built with screen readers and keyboard navigation in mind

## 🚀 Live Demo

Deploy this project easily on GitHub Pages, Netlify, or Vercel for a live demo.

## 📁 File Structure

```
attendance-tracker/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Setup Instructions

### Quick Setup (GitHub Pages)

1. **Fork or Download** this repository
2. **Upload files** to your GitHub repository:
   - `index.html`
   - `styles.css` 
   - `script.js`
   - `README.md`
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "Deploy from branch"
   - Choose "main" branch
   - Save and wait for deployment

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/attendance-tracker.git
   cd attendance-tracker
   ```

2. **Open locally**:
   - Simply open `index.html` in your browser
   - Or use a local server like Live Server in VS Code

### Deploy to Other Platforms

#### Netlify
1. Drag and drop the project folder to [Netlify Deploy](https://app.netlify.com/drop)
2. Your site will be live instantly

#### Vercel
1. Import project from GitHub on [Vercel](https://vercel.com)
2. Deploy with default settings

## 🎯 How to Use

1. **Enter Classes Attended**: Input the number of classes you've attended
2. **Enter Total Classes**: Input the total number of classes held so far
3. **Set Target Percentage**: Enter your desired attendance percentage (default: 75%)
4. **Click Calculate**: Get instant results and recommendations
5. **View Results**: See your current attendance and actionable advice

## 💡 Calculation Logic

### Current Attendance
```
Current % = (Classes Attended ÷ Total Classes) × 100
```

### Classes Needed for Target
```
Classes Needed = (Target% × Total - 100 × Attended) ÷ (100 - Target%)
```

### Classes You Can Miss
The calculator determines how many future classes you can miss while maintaining your target percentage.

## 🎨 Design Features

- **Minimalist Aesthetic**: Clean, distraction-free interface
- **Modern Typography**: Inter font family for optimal readability
- **Smooth Animations**: Subtle hover effects and transitions
- **Color Psychology**: Orange accents (#ff6b35) for energy and motivation
- **Glass Morphism**: Subtle blur effects for modern appeal
- **Mobile-First**: Responsive design that works on all devices

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #ff6b35;    /* Orange accent */
  --text-color: #1a1a1a;       /* Dark text */
  --background: #fafafa;       /* Light background */
  --white: #ffffff;            /* Pure white */
}
```

### Content
- Update text content in `index.html`
- Modify stats in the hero section
- Change feature descriptions

### Functionality
- Modify calculation logic in `script.js`
- Add new features like class scheduling
- Implement data export functionality

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Todo / Future Enhancements

- [ ] Multiple subject tracking
- [ ] Class schedule integration
- [ ] Export data to PDF/Excel
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)
- [ ] Notification reminders
- [ ] Historical data charts
- [ ] Class timetable integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you find this project helpful, please ⭐ star the repository!

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for students by students**

*Keep learning, keep growing!* 📚
