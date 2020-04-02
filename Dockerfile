FROM node:10

# Set working directory
WORKDIR /usr/src/app

# Copy source files
COPY . .

# Install dependencies
RUN yarn install

# Build
RUN yarn run build

# Primary command when running container
CMD [ "yarn", "run", "start" ]
