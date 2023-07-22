FROM node:18 AS ui-build 
WORKDIR /usr/src/app
COPY client/ ./client/
RUN cd client && yarn && yarn run build

FROM node:18 as server
WORKDIR /root/

COPY --from=ui-build /usr/src/app/client/build ./client/build

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN yarn

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "yarn", "run", "start" ]