const net = require("net");

const ip = "10.16.40.145"; // IP address of the HyperDeck
const port = 9993; // TCP port for HyperDeck
const command = "stop\n"; // Command to send, followed by a newline character

const client = new net.Socket();

client.connect(port, ip, () => {
  console.log(`Connected to ${ip}:${port}`);
});

client.on("data", (data) => {
  const response = data.toString();
  console.log(`Received: ${response}`);

  // Check for the welcome message or ready state
  if (response.startsWith("500")) {
    // Send the stop command
    client.write(command, () => {
      console.log(`Command '${command.trim()}' sent`);
    });
  }

  // Close the connection after a short delay to ensure the command is sent
  setTimeout(() => {
    client.destroy(); // Close the connection
  }, 1000);
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error(`Error: ${err.message}`);
});
