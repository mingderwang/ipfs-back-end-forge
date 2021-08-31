# Use Node v7 as the base image.
FROM node:7

# File Author / Maintainer
MAINTAINER Brayton Stafford

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Define working directory
WORKDIR /app
# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Expose our server port.
EXPOSE 5001

# Run our app.
CMD ["npm", "start"]
