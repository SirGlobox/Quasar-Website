# Deployment Guide - Quasar Consultants Website

This guide provides step-by-step instructions for deploying the Quasar Consultants website to production environments.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Connect Repository**
   - Push your code to GitHub/GitLab
   - Connect your repository to Vercel
   - Set build directory to `client`

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Option 2: Netlify

1. **Deploy Settings**
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
   - Node version: 18

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.com
   ```

## 🔧 Backend Deployment

### Option 1: Render (Recommended)

1. **Create New Web Service**
   - Connect your repository
   - Set root directory to `server`
   - Build command: `npm install`
   - Start command: `npm start`

2. **Environment Variables**
   ```
   NODE_ENV=production
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=info@quasarconsultants.com
   CLIENT_URL=https://your-frontend-url.com
   ```

### Option 2: Heroku

1. **Create Heroku App**
   ```bash
   heroku create quasar-consultants-api
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set RESEND_API_KEY=your_resend_api_key
   heroku config:set CONTACT_EMAIL=info@quasarconsultants.com
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   ```

3. **Deploy**
   ```bash
   git subtree push --prefix server heroku main
   ```

### Option 3: Railway

1. **Connect Repository**
   - Set root directory to `server`
   - Add environment variables in dashboard

## 📝 Pre-Deployment Checklist

### Frontend Checklist
- [ ] Update API endpoints to production URLs
- [ ] Set environment variables
- [ ] Optimize images and assets
- [ ] Test all forms and functionality
- [ ] Verify SEO meta tags
- [ ] Check mobile responsiveness
- [ ] Test contact form integration

### Backend Checklist
- [ ] Set production environment variables
- [ ] Configure CORS for production domain
- [ ] Set up Resend API key
- [ ] Test contact form endpoint
- [ ] Verify rate limiting
- [ ] Check security headers
- [ ] Test sitemap and robots.txt

### SEO Checklist
- [ ] Update canonical URLs
- [ ] Verify structured data
- [ ] Test sitemap generation
- [ ] Check robots.txt
- [ ] Verify meta descriptions
- [ ] Test Open Graph tags

## 🔒 Security Configuration

### Environment Variables
```bash
# Required
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=info@quasarconsultants.com

# Optional
NODE_ENV=production
CLIENT_URL=https://quasarconsultants.com
GA_TRACKING_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=your_verification_code
```

### SSL/HTTPS
- Enable SSL certificates (automatic on most platforms)
- Force HTTPS redirects
- Update CSP headers for production

## 📊 Analytics Setup

### Google Analytics
1. Create GA4 property
2. Add tracking ID to environment variables
3. Verify tracking in production

### Google Search Console
1. Add property for your domain
2. Verify ownership
3. Submit sitemap: `https://quasarconsultants.com/sitemap.xml`

## 🚀 Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Optimize images (WebP format)
- Implement lazy loading
- Minify CSS/JS

### Backend
- Enable compression middleware
- Set up caching headers
- Optimize database queries (if applicable)
- Monitor response times

## 🔍 Post-Deployment Testing

### Functionality Tests
- [ ] Contact form submission
- [ ] Email delivery
- [ ] Navigation links
- [ ] Mobile menu
- [ ] Form validation
- [ ] Error handling

### Performance Tests
- [ ] Page load speed
- [ ] Core Web Vitals
- [ ] Mobile performance
- [ ] Image optimization

### SEO Tests
- [ ] Meta tags
- [ ] Structured data
- [ ] Sitemap accessibility
- [ ] Robots.txt
- [ ] Canonical URLs

## 📱 Mobile Optimization

### Testing Checklist
- [ ] Responsive design
- [ ] Touch interactions
- [ ] Mobile navigation
- [ ] Form usability
- [ ] Image scaling
- [ ] Loading performance

## 🔧 Monitoring & Maintenance

### Health Checks
- Set up uptime monitoring
- Monitor API endpoints
- Track error rates
- Monitor performance metrics

### Regular Maintenance
- Update dependencies
- Review security patches
- Monitor analytics
- Backup data (if applicable)

## 🆘 Troubleshooting

### Common Issues

**Contact Form Not Working**
- Check Resend API key
- Verify CORS configuration
- Check rate limiting settings

**Images Not Loading**
- Verify image paths
- Check CDN configuration
- Optimize image sizes

**SEO Issues**
- Verify meta tags
- Check structured data
- Test sitemap accessibility

**Performance Issues**
- Enable compression
- Optimize images
- Check caching headers
- Monitor Core Web Vitals

## 📞 Support

For deployment issues:
- Check platform documentation
- Review error logs
- Test locally first
- Contact platform support

## 🎯 Production URLs

After deployment, update these URLs:
- Frontend: `https://quasarconsultants.com`
- Backend: `https://api.quasarconsultants.com`
- Sitemap: `https://quasarconsultants.com/sitemap.xml`
- Robots: `https://quasarconsultants.com/robots.txt`

---

**Remember**: Always test thoroughly in staging before deploying to production! 