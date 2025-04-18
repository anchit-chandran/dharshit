# Deploying to GitHub Pages

Follow these steps to deploy your "Who Wants to be a Dharshillionaire?" webapp to GitHub Pages:

## 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., "dharshillionaire")
4. Set it to Public or Private as you prefer
5. Click "Create repository"

## 2. Push Your Code to GitHub

From your project directory, run the following commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

(If your branch is called "master" instead of "main", replace "main" with "master" in the last command)

## 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch (or "master" if that's what you're using)
5. Click "Save"

## 4. Access Your Website

GitHub Pages will provide you with a URL in the format:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

It may take a few minutes for your site to be published. Once published, you can share this URL with Dharshana!

## 5. Using a Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain from a domain registrar
2. In your GitHub repository Settings, under GitHub Pages, add your custom domain
3. Follow GitHub's instructions to configure DNS settings with your domain registrar 