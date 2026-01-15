# Private Label Email Preview

## Overview

This tool simplifies the process of setting up Private Label Email service by making it easier to preview and change customizations quickly. No database updates are required to see a preview when using this simple utility tool.

## Features

- Preview private label email before updating the database.
- Preview and copy the XML required for the database (DEV and PROD).
- Use a simplified configuration to add a new private label preview.

## Quick Start

To use this app, download the code and run locally in development mode:

1. Run `npm install` if necessary.
2. Run `npm start` to start the app.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files, e.g., when you add a new configuration for a new private label email implementation.

## Adding a New Private Label Email Preview

To add a new private label email preview, you need to add a new private label object to the `PRIVATE_LABELS` object in the file `constants.ts`. Use the Default object as a guide for what needs to be included. Any new private label preview can only update a few things:

- **name**: the company name (should be provided)
- **managerId**: the unique record id for the company (should be provided)
- **logoFile**: email logo filename (should be provided but customized by SL)
- **backgroundColor**: background color for both header and footer sections (may be provided but may need to be determined by SL)
- **color**: text color for bold text in footer

Example:

```javascript
  {
    name: 'Default',
    managerId: '9E74C20E-21CF-4F11-BCCA-C55C57915B82',
    email: {
      logoFile: 'defaultEmailLogo.jpg',
      backgroundColor: 'red',
      color: 'yellow',
    },
  },
```

Once added, the preview will be available in the application.

For additional information about how to create Private Label service (email and web UI), including image preparation, see the [Private Label Service](https://sharper.slab.com/posts/private-label-service-cc5j8fyy) documentation on Slab.
