# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2e8348bc-2cf6-49b5-8087-1fe939260bfd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2e8348bc-2cf6-49b5-8087-1fe939260bfd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2e8348bc-2cf6-49b5-8087-1fe939260bfd) and click on Share -> Publish.

## Deploying to Netlify

- **Build command**: `npm run build`
- **Publish directory**: `dist`

Notes:

- This is a Vite app; Netlify will serve the contents of the `dist` folder after build.
- This project uses client-side routing. A `_redirects` file is already added to `public` with `/* /index.html 200` to make SPA routes work on Netlify.
- **Contact Form**: Uses `mailto` link to open the user's email client.
- **Supabase**: If using the UPP features, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify Site Settings.

Steps to deploy on Netlify:

1. In Netlify, create a new site from Git and connect your repository.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. In Site Settings -> Build & deploy -> Environment, add any needed env vars (see notes above).
4. Deploy the site. After a successful build, your site will be live on the Netlify domain.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
