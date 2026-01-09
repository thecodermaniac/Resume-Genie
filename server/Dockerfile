# server/Dockerfile

# 1. Use an official Node runtime as a parent image
FROM node:20.19.6-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# 4. Copy the rest of the backend code
COPY . .

# 5. Expose the port your app runs on
EXPOSE 3001

# 6. Command to run the app
CMD ["node", "index.js"]