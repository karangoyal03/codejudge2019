FROM mhart/alpine-node:10

COPY public /tmp/public/
COPY app.js /tmp/
COPY routes /tmp/routes/
COPY views /tmp/views/
COPY package.json /tmp/
COPY package-lock.json /tmp/
COPY bin /tmp/bin/
WORKDIR /tmp/

EXPOSE 3000

# Build the app
RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/node/express/build.sh
RUN chmod 775 ./build.sh
RUN sh build.sh

# Add extra docker commands here (if any)...

# Run the app
RUN wget https://codejudge-starter-repo-artifacts.s3.ap-south-1.amazonaws.com/backend-project/node/express/run.sh
RUN chmod 775 ./run.sh
CMD sh run.sh