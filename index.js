const net = require("net");

// Define the server address and port
// const serverAddress = '<device_ip>';  // Replace <device_ip> with the actual IP
const serverAddress = "10.16.40.101"; // Replace <device_ip> with the actual IP
const port = 9000;

// XML command as a string
const command = `
<EmberPlus>
  <Command type="GetValue">
    <Target path="1.1.35.3.1"/>
  </Command>
</EmberPlus>
`;

{
  /* <EmberPlus>
  <Command type="SetValue">
    <Target path="/device/audio/channel/1/volume"/>
    <Value>75</Value>
  </Command>
</EmberPlus> */
}

// Create a TCP client
const client = new net.Socket();

client.connect(port, serverAddress, () => {
  console.log("Connected to the server");
  // Send the command
  client.write(command);
  console.log("SEND");
});

client.on("data", (data) => {
  console.log("Received: " + data.toString());
  // Close the client after receiving the response
  client.destroy();
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error("Error: " + err.message);
});
