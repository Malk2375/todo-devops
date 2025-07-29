FROM node:18
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Installation des dépendances
RUN npm install
# Copy the rest of the application code to the working directory
COPY . .
EXPOSE 3000
CMD ["npm", "start"]