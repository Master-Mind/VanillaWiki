FROM node:16-alpine
WORKDIR /app
COPY . .
COPY /etc/secrets/ca.pem .
ENV NODE_ENV=production
RUN npm install
CMD ["npm", "start"]
EXPOSE 8000
