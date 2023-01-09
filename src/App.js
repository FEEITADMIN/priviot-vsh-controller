import "./App.css";
import React, { Component } from "react";
import pahoMqtt from "paho-mqtt/paho-mqtt";
import { Button, Col, Container, Row } from "react-bootstrap";
class App extends Component {
  state = {
    subject: "VirtualSmartHome/",
    host: "broker.emqx.io",
    port: "8084",
    // host: "broker.mqttdashboard.com",
    // port: "8000",
    rooms: [
      { Name: "Bedroom", LightOn: false, label: "Bedroom (2nd Floor)" },
      { Name: "Hallway", LightOn: false, label: "Hallway (2nd Floor)" },
      { Name: "Library", LightOn: false, label: "Library (2nd Floor)" },
      { Name: "Bathroom", LightOn: false, label: "Bathroom (1st Floor)" },
      { Name: "F1_Stairs", LightOn: false, label: "Stairs (1st Floor)" },
      { Name: "LivingRoom", LightOn: false, label: "Living Room (1st Floor)" },
      { Name: "Garage", LightOn: false, label: "Garage (Ground Floor)" },
      { Name: "GF_Stairs", LightOn: false, label: "Stairs (Ground Floor)" },
      { Name: "Kitchen", LightOn: false, label: "Kitchen (Ground Floor)" },
      { Name: "DiningRoom", LightOn: false, label: "Dining Room (Ground Floor)" },
      { Name: "Basement", LightOn: false, label: "Basement" },
    ],
    topic: "",
    client: {},
    messages: [],
    connected: false,
  };

  // Called after form input is processed
  startConnect = () => {
    // Generate a random client ID
    let clientID = "clientID-" + parseInt(Math.random() * 100);

    const client = new pahoMqtt.Client(this.state.host, Number(this.state.port), clientID);
    console.log(client);
    // Initialize new Paho client connection

    // Set callback handlers
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
      onSuccess: this.onConnect,
      useSSL: true,
    });
    this.setState({ client });
  };

  // Called when the client connects
  onConnect = () => {
    for (let i = 0; i < this.state.rooms.length; i++) {
      let topic = `${this.state.subject}${this.state.rooms[i].Name}/Light`;
      this.state.client.subscribe(topic);
    }
    this.setState({ connected: true });
  };

  // Called when the client loses its connection
  onConnectionLost = (responseObject) => {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
    this.setState({ connected: false });
  };

  changeLight = (destination, payload) => {
    let room_name = destination.substring(this.state.subject.length, destination.indexOf("/Light"));
    console.log("Payload", payload);
    console.log("Room Name", room_name);
    console.log("State", this.state);
    console.log("destination", destination);
    const rooms = this.state.rooms.map((r) => {
      if (r.Name === room_name) {
        r.LightOn = payload === "1";
        console.log("Room", r);
      }
      return r;
    });
    this.setState({ rooms });
  };

  toggleLight = (roomName) => {
    if (!this.state.connected) return;
    let lightOn = this.state.rooms.find((r2) => r2.Name === roomName).LightOn;

    this.state.client.publish(`${this.state.subject}${roomName}/Light`, !lightOn ? "1" : "0", 0, true);
  };

  // Called when a message arrives
  onMessageArrived = (message) => {
    console.log("onMessageArrived: " + message.payloadString);

    this.changeLight(message.destinationName, message.payloadString);
  };

  // Called when the disconnection button is pressed
  startDisconnect = () => {
    this.state.client.disconnect();
  };

  render() {
    return (
      <Container fluid={true} className="text-center">
        <Row className="py-4">
          <Col>
            <h1>PrivIoT</h1>
            <h2>Virtual Smart Home</h2>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <Button variant={this.state.connected ? "success" : "danger"} disabled={this.state.connected} onClick={() => this.startConnect()}>
              Connect
            </Button>
            <Button variant="primary" disabled={!this.state.connected} onClick={() => this.startDisconnect()}>
              Disconnect
            </Button>
          </Col>
        </Row>
        {this.state.rooms.map((r) => (
          <Row key={r.Name}>
            <Col xs="6" className="text-right">
              {r.label}
            </Col>
            <Col xs="2">
              <div className="toggleWrapper">
                <input
                  type="checkbox"
                  name={`toggle_${r.Name}`}
                  className="mobileToggle"
                  id={`toggle_${r.Name}`}
                  checked={this.state.rooms.find((r2) => r2.Name === r.Name).LightOn}
                  onChange={() => this.toggleLight(r.Name)}
                />
                <label htmlFor={`toggle_${r.Name}`}></label>
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}

export default App;
