# Using the official Golang image
FROM golang:1.21

# Setting the working directory inside the container
WORKDIR /app

# Copying the Go project files to the container
COPY go.mod go.sum ./

# Download and install any dependencies
RUN go mod download

# Copy the rest of project
COPY . .

# Build the Go application
RUN go build -o main .

# Expose the port
EXPOSE 3001

# Command to run application
CMD ["./main"]
