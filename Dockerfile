FROM node:16-alpine
WORKDIR /app
COPY . .
ENV NODE_ENV=production
CMD ["npm", "start"]
EXPOSE 8000
