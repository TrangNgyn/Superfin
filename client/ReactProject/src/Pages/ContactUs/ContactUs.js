import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import '../../_assets/CSS/pages/ContactUs.css';

const useContactUs = (callback) => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      alert("Thank you for your reponse");
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };

}

const ContactUs = () =>{
  const {inputs, handleInputChange, handleSubmit} = useContactUs();
  return (
    <body id="contact-us">
      <div id="contact-us-window" >
        We'd love to hear from you
      </div>

      <div id="contact-us-content">

      <div id="contact-us-content1">
        <form  onSubmit={handleSubmit}>
          <div>
            <label id="contact-us-name">Name</label>
            <input id="contact-us-name-input"type="text" name="name" onChange={handleInputChange} value={inputs.name} required />
          </div>
          <div>
            <label id="contact-us-email">Email</label>
            <input id="contact-us-email-input" type="email" name="email" onChange={handleInputChange} value={inputs.email} required />
          </div>
          <div>
            <label id="contact-us-message">Message</label>
            <textarea id="contact-us-message-input" type="message" name="message" onChange={handleInputChange} value={inputs.message} required/>
          </div>
          <div id="contact-us-button-div">
          <button id="contact-us-button" type="submit">Send</button>
          </div>
        </form>
      </div>

      <div id="contact-us-content2">
      <h1><b>You can contact us via:</b></h1>
      <h2><b>Phone</b>: (02) 9681 6075 </h2>
      <h2><b>Address</b>: 3/34-36 Fairfield St, Fairfield East NSW 2165</h2>
      </div>

      </div>
    </body>
  );
}


export default ContactUs
