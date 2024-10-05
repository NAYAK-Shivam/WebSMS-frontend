import React, { useState } from "react";
import "./MessageForm.css";
import axios from "axios";

const MessageForm = () => {
  const [messageBody, setMessageBody] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const res = await axios.post("http://localhost:5000/api/send-message", {
        messageBody,
      });
      setResponse(res.data.message);
    } catch (err) {
      setResponse("Failed to send message");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Send a Message</h1>
      <p className="app-intro">
        Welcome to the Twilio Messaging App! This application allows you to send
        messages directly to a recipient, in this case: the developer, using
        Twilio's communication services. Simply enter your message below and hit
        "Send."
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <textarea
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            placeholder="Type your message here"
            rows="4"
            cols="50"
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default MessageForm;
