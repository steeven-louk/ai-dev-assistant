FROM node:20-alpine

WORKDIR /app

# On copie les fichiers de dépendances
COPY package*.json ./
RUN npm install

# On copie tout le code source
COPY . .

# On supprime la ligne "RUN npm run build" car elle ne sert à rien ici

EXPOSE 4000

# On lance directement le fichier source
CMD ["node", "src/server.js"]