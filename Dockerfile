FROM node:15
WORKDIR /app
COPY package.json .
# RUN npm install --only=production ##replaced by below

# Careful with the spacings
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only-production; \
        fi

COPY . ./
# EXPOSE 5001
ENV PORT 5001
EXPOSE $PORT
# CMD ["node", "index.js"] ## changed to below after intro of volumes
# CMD ["npm", "run", "dev"] ## switched to belo with control of evnvironments using docker-compose
CMD ["node", "index.js"]



