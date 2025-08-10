# Quasar Consultants Website

A high-performance, SEO-optimized website for Quasar Consultants - Home Service Business Consulting in Charlotte, NC.

## 🚀 Features

- **Modern React Frontend** with responsive design
- **Node.js/Express Backend** with security best practices
- **SEO Optimized** with structured data and meta tags
- **Contact Form Integration** with Resend API
- **Performance Optimized** with Core Web Vitals focus
- **Accessibility Compliant** (WCAG 2.1)
- **Mobile-First Design** with brand-consistent styling
- **Local Business Schema** for enhanced local SEO

## 🛠 Tech Stack

### Frontend
- React 18
- React Router DOM
- React Helmet Async (SEO)
- React Hook Form (form handling)
- Lucide React (icons)
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- Resend API (email delivery)
- Helmet.js (security)
- Express Rate Limit (anti-spam)
- Express Validator (input validation)

## 📁 Project Structure

```
quasar-consultants-website/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Services.js
│   │   │   ├── Services.css
│   │   │   ├── About.js
│   │   │   ├── About.css
│   │   │   ├── Contact.js
│   │   │   └── Contact.css
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js
│   └── package.json
├── package.json
├── env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quasar-consultants-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your configuration:
   - `RESEND_API_KEY`: Get from [Resend](https://resend.com)
   - `CONTACT_EMAIL`: Your business email
   - Other optional settings

4. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This starts both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the React app for production
- `npm start` - Start production server

### Frontend (client/)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Backend (server/)
- `npm run dev` - Start with nodemon (development)
- `npm start` - Start production server
- `npm test` - Run tests

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the `client/build` folder
3. Set environment variables in your hosting platform

### Backend (Heroku/Render)
1. Deploy the `server` folder
2. Set environment variables:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NODE_ENV=production`
   - `CLIENT_URL` (your frontend URL)

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment | No (default: development) |
| `CLIENT_URL` | Frontend URL for CORS | No (default: localhost:3000) |
| `RESEND_API_KEY` | Resend API key | Yes |
| `CONTACT_EMAIL` | Contact form recipient | Yes |
| `GA_TRACKING_ID` | Google Analytics ID | No |
| `GOOGLE_SITE_VERIFICATION` | Search Console verification | No |

### SEO Configuration

The website includes comprehensive SEO features:
- Meta tags for all pages
- Structured data (JSON-LD)
- XML sitemap generation
- Robots.txt
- Open Graph tags
- Twitter Cards

### Security Features

- Helmet.js for security headers
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Honeypot spam protection
- Content Security Policy

## 📊 Performance Optimization

- Lazy loading for images
- Code splitting
- Compression middleware
- Optimized fonts and assets
- Core Web Vitals monitoring
- Web Vitals reporting

## 🎨 Branding & Design

### Color Scheme
- Primary Purple: `#6B46C1`
- Secondary Purple: `#8B5CF6`
- Dark Background: `#1A1A2E`
- Card Background: `#0F3460`

### Typography
- Primary: Inter (body text)
- Headings: Poppins

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interactions

## 🔍 SEO Checklist

- [x] Meta titles and descriptions
- [x] Structured data markup
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] Local business schema
- [x] FAQ schema
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Image alt text
- [x] Semantic HTML
- [x] Internal linking
- [x] Page speed optimization

## 🛡 Security Checklist

- [x] Input validation
- [x] Rate limiting
- [x] CORS configuration
- [x] Security headers
- [x] Spam protection
- [x] Environment variables
- [x] Error handling
- [x] HTTPS enforcement

## 📞 Contact Form

The contact form includes:
- Form validation
- Spam protection (honeypot)
- Rate limiting
- Email delivery via Resend
- Auto-reply to users
- Admin notifications

## 🚀 Future Enhancements

- Blog CMS integration
- Analytics dashboard
- Lead tracking system
- Customer portal
- Appointment scheduling
- Payment integration
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: info@quasarconsultants.com
- Phone: (123) 456-7890

---

**Quasar Consultants** - Transforming home service businesses in Charlotte, NC since 2008. 