# React-PDF Resume

This is a **Resume Builder** application built using Vite, React, TypeScript, and `@react-pdf/renderer`. The app allows users to generate a PDF version of their resume based on provided data. Currently, the app uses a static JavaScript object for the resume data, but future iterations will integrate a database for dynamic data fetching.

## Features

- **React & TypeScript**: The app is built using React with TypeScript for type safety and better developer experience.
- **PDF Generation**: Uses `@react-pdf/renderer` to generate a downloadable PDF version of the resume.
- **Vite**: A fast build tool to enable blazing-fast development with hot module replacement.
- **PNPM**: A fast, disk-space efficient package manager.
- **LinkedIn-style Experience Section**: Experience section is displayed in a grouped style, similar to LinkedIn’s layout.

## Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **PDF Rendering**: `@react-pdf/renderer`
- **Package Manager**: PNPM

## Future Enhancements

- **Dynamic Data**: Currently, the resume data is hardcoded as a static object. Future iterations will integrate a database to allow for dynamic data management.
- **Improved UI**: Further enhancements to the UI for more customization options and a better user experience.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/stonix26/react-pdf-resume.git
   cd react-pdf-resume
   ```

2. Install dependencies using PNPM:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:

   ```bash
   http://localhost:5173
   ```

## Building for Production

To build the app for production, run:

```bash
pnpm build
```

This will create an optimized build in the `dist/` directory.

## Usage

1. **View PDF Preview**: You can preview the generated PDF directly in the browser.
2. **Download Resume**: Click the "Download PDF" button to download the resume as a PDF file.
3. **Customize Resume Data**: For now, you can edit the resume data in the `./src/data.ts` file. Future versions will allow you to modify data via an integrated database.
