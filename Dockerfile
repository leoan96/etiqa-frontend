FROM node:13.12.0-alpine
ENV PORT 8081
ENV REACT_APP_USER_API_BASEURL http://localhost:3000
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]