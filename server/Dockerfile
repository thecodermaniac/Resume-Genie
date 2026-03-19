# server/Dockerfile

# AWS Lambda official Node.js 20 runtime (includes the Lambda Runtime Interface)
FROM public.ecr.aws/lambda/nodejs:20

# Lambda uses /var/task as the function code directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Lambda handler: file.exportedFunction → lambda.handler
CMD ["lambda.handler"]