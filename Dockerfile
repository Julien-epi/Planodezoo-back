# Étape 1: Choisir une image Node.js comme base
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers source du projet dans le conteneur
COPY . .

# Compiler les fichiers TypeScript en JavaScript
RUN npm run build

# Exposer le port sur lequel votre application backend va écouter
EXPOSE 8000

# Définir la commande pour démarrer l'application
CMD ["node", "dist/index.js"]
