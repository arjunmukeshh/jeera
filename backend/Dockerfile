# Use the official Golang image
FROM golang:1.21

# Set the working directory inside the container
WORKDIR /app

# Copy the Go project files to the container
COPY go.mod go.sum ./

# Download and install any dependencies
RUN go mod download

# Copy the rest of your project
COPY . .

# Build the Go application
RUN go build -o main .

# Expose the port your application will run on
EXPOSE 3001

# Command to run your application
CMD ["./main"]
