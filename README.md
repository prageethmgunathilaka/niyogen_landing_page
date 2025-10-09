# Next SaaS HTML Template 
# More Info: http://localhost:5173/niyogen.html/ hero,Product Overview,Features,How It Works,Get Started, fnq,
# http://localhost:5173/home-page-02.html

# Change the existing origin to point to the new repository
git remote set-url origin https://github.com/prageethmgunathilaka/niyogen_landing_page.git

# Verify the change
git remote -v

# Now push your code
git push -u origin main

A modern, responsive HTML template collection for SaaS businesses, startups, and web applications. This project provides 35+ beautifully designed home page variations and comprehensive inner pages including authentication, pricing, blog, contact, and more.

## 🚀 Features

- **35+ Home Page Variations** - Different layouts and styles for various business needs
- **Complete Inner Pages** - Authentication, pricing, blog, contact, about, team, and more
- **Modern Design** - Clean, professional design with dark/light mode support
- **Responsive Layout** - Mobile-first approach with Tailwind CSS
- **Interactive Components** - Smooth animations, sliders, and interactive elements
- **Component-Based Architecture** - Modular HTML components for easy customization
- **Vite Build System** - Fast development and optimized production builds

## 📁 Project Structure

```
next-saas-html/
├── public/                 # Static assets (images, videos, icons)
│   ├── images/            # Image assets organized by page
│   ├── icons/             # SVG icons
│   ├── video/             # Video assets
│   └── logo/              # Logo variations
├── src/
│   ├── components/        # HTML components
│   │   ├── pages/         # Page-specific components
│   │   └── shared/        # Shared components (header, footer)
│   ├── js/               # JavaScript modules
│   │   ├── animation/     # Animation scripts
│   │   ├── common/        # Common utilities
│   │   └── utils/         # Utility functions
│   ├── styles/           # CSS stylesheets
│   └── main.js           # Main JavaScript entry point
├── *.html                # HTML page files
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md            # This file
```

## 🛠️ Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

## 📦 Installation

1. **Extract the template files** to your local development environment

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## 🚀 Development

### Start Development Server

Run the development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

The development server will start at `http://localhost:5173` (or the next available port).

### Available Pages

The project includes 35+ home page variations and numerous inner pages. You can access them by opening the corresponding HTML files in your browser:

- **Home Pages**: `home-page-01.html` through `home-page-35.html`
- **Authentication**: `login-page-01.html`, `signup-page-01.html`, etc.
- **Pricing**: `pricing-page-01.html`, `pricing-page-02.html`, etc.
- **Blog**: `blog-page-01.html`, `blog-details-page.html`, etc.
- **About**: `about-page-01.html`, `about-page-02.html`, etc.
- **Contact**: `contact-us-page.html`
- **And many more...**

## 🏗️ Building for Production

### Build the Project

Create optimized production build:

```bash
npm run build
# or
yarn build
```

The built files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

This will serve the built files from the `dist/` directory.

## 🎨 Customization

### Adding New Pages

1. Create a new HTML file in the root directory
2. Use the component system to include shared elements:
   ```html
   <Component src="src/components/shared/header-one.htm" />
   <Component src="src/components/shared/footer-one.htm" />
   ```

### Modifying Styles

- **Tailwind CSS**: Modify `src/styles/` files for custom styles
- **Component Styles**: Edit individual component CSS files
- **Variables**: Update `src/styles/variables.css` for theme customization

### Adding Animations

- Create new animation files in `src/js/animation/`
- Import and initialize in `src/main.js`

### Need Custom Development?

If you need custom modifications or additional features, we offer professional development services. Contact us at [your-email@domain.com](mailto:your-email@domain.com) for a quote.

## 🛠️ Technologies Used

- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **Swiper.js** - Touch slider library
- **Motion** - Animation library

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📧 Support & Contact

If you encounter any issues or need assistance with this template:

- **Email Support**: [your-email@domain.com](mailto:your-email@domain.com)
- **Documentation**: Check the included documentation files
- **Customization Help**: Contact us for custom development services

## 📄 License

This template is licensed for commercial use. Please refer to the license terms included with your purchase.

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Happy coding! 🎉**
