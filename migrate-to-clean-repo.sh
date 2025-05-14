#!/bin/bash

# Define source and destination directories
SOURCE_DIR=$(pwd)
DEST_DIR="../website-publish"

echo "Migrating necessary website files to $DEST_DIR..."

# Create directory structure
mkdir -p $DEST_DIR/_11ty/config
mkdir -p $DEST_DIR/_data/i18n
mkdir -p $DEST_DIR/_includes
mkdir -p $DEST_DIR/css
mkdir -p $DEST_DIR/en/{pages,newsletter}
mkdir -p $DEST_DIR/no/{pages,nyhetsbrev}
mkdir -p $DEST_DIR/img/{logo,favicon,articles,team}
mkdir -p $DEST_DIR/js
mkdir -p $DEST_DIR/pages
mkdir -p $DEST_DIR/.github/workflows
mkdir -p $DEST_DIR/scripts

# Copy core configuration files
cp .eleventy.js $DEST_DIR/
cp package.json $DEST_DIR/
cp package-lock.json $DEST_DIR/
cp README.md $DEST_DIR/
cp CNAME $DEST_DIR/
cp robots.txt $DEST_DIR/
cp sitemap.njk $DEST_DIR/
cp site.webmanifest $DEST_DIR/
cp index.html $DEST_DIR/

# Copy workflow for GitHub Pages
cp .github/workflows/build-deploy.yml $DEST_DIR/.github/workflows/

# Copy _11ty configuration
cp -r _11ty/* $DEST_DIR/_11ty/

# Copy data files
cp -r _data/* $DEST_DIR/_data/

# Copy includes/templates
cp -r _includes/* $DEST_DIR/_includes/

# Copy static assets
cp -r css/* $DEST_DIR/css/
cp -r js/* $DEST_DIR/js/

# Copy essential scripts
cp -r scripts/* $DEST_DIR/scripts/

# Copy content
cp -r en/* $DEST_DIR/en/
cp -r no/* $DEST_DIR/no/
cp -r pages/* $DEST_DIR/pages/

# Copy images (only if they exist)
if [ -d "img/logo" ]; then
  cp -r img/logo/* $DEST_DIR/img/logo/ 2>/dev/null || true
fi
if [ -d "img/articles" ]; then
  cp -r img/articles/* $DEST_DIR/img/articles/ 2>/dev/null || true
fi
if [ -d "img/team" ]; then
  cp -r img/team/* $DEST_DIR/img/team/ 2>/dev/null || true
fi

# Create .gitignore file
cat > $DEST_DIR/.gitignore << EOF
node_modules/
_site/
.DS_Store
*.log
EOF

echo "Migration complete. The new clean repository is ready at $DEST_DIR"
echo "Next steps:"
echo "1. cd $DEST_DIR"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial commit for website launch'"
echo "5. Create a new GitHub repository"
echo "6. git remote add origin <your-new-repo-url>"
echo "7. git push -u origin main" 