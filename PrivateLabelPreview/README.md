# Private Label Email Preview

## Overview

This tool simplifies the process of setting up Private Label Email service by making it easier to preview and change customizations quickly. No database updates are required to see a preview when using this simple utility tool.

## Features

- Preview customized Private Label Email without updating the database.
- Auto-generated Private Label Email Service XML configuration.
- Auto-generated Private Label Email Preview configuration for saving previews.

## Getting Started

To use this app, download the code and run locally in development mode:

1. Run `npm install` if necessary.
2. Run `npm start` to start the app.

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files, e.g., when you add a new configuration for a new private label email implementation.

## Config Builder

Use the Config Builder to create a custom Private Label Email configuration. The preview will update as you change config values.

As you customize the preview, the XML configuration required to enable Private Label Email service for a customer will be automatically generated.

Additionally, the preview configuration you can use to save the preview as a 'Saved Preview' in this tool will be automatically generated. Note that previews require manual changes.

Use the respective copy buttons to copy the configurations.

## Saved Previews

To save a private label email preview to this tool (a 'saved preview'), you need to add a new private label preview configuration to the `PRIVATE_LABELS` array in the file `constants.ts`. Use the Config Builder to generate the configuration. You will also need a logo file, which needs to be added to the `/public/emailLogos` folder in the application.

### Customizations

The following customizations are available:

- **Name**: company name, provided in ticket
- **Manage ID**: unique record id for the company, provided in ticket
- **Logo**: email logo filename, provided in ticket but customized by SL
- **Background Color**: background color, used for both header and footer sections; may be provided but may need to be determined by SL
- **Color**: text color, used for bold text in footer

Example:

```javascript
  {
    name: 'New Config',
    managerId: '1A23B45C-67DE-8F90-GHIJ-K12L34567M89',
    email: {
      logoFile: 'demoEmailLogo.jpg',
      backgroundColor: 'fuchsia',
      color: 'yellow',
    },
  },
```

Once added, the preview will be available in the application on the Saved Previews page.

---

For additional information about how to create Private Label service (email and web UI), including image preparation, see the [Private Label Service](https://sharper.slab.com/posts/private-label-service-cc5j8fyy) documentation on Slab.
