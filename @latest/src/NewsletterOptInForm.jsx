import { useState, useEffect } from 'react';
import "./Newsletter.css"

export default function NewsletterOptInForm() {

  // state variables for input fields
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState(''); //
  const [country, setCountry] = useState('')
  const [govOrg, setGovOrg] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [workshopSeries, setWorkshopSeries] = useState('')

  // state variables for handling state loading 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // URl and access tokens initalized
  const apiURL = "https://burnes-center.directus.app/items/cw_intake"
  const accessToken = import.meta.env.VITE_DIRECTUS_TOKEN


  // update email state with user input 
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // update the first name with user input
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }
  // update the last name with user input
  const handleLastName = (e) => {
    setLastName(e.target.value)
  }

  // Handle country input change
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }

  // Handle government organization input change
  const handleGovOrg = (e) => {
    setGovOrg(e.target.value)
  }

  // Handle newsletter checkbox change
  const handleNewsletter = (e) => {
    setNewsletter(e.target.checked)
  }

  // Handle workshop series dropdown change
  const handleWorkshopSeries = (e) => {
    setWorkshopSeries(e.target.value)
  }


  // Sends a POST request to the server to add data to the required fields
  // Authorization header required due to accesss token
  // returns the repsonse body, which gets converted to a JSON with the different fields

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading 
    setLoading(true); // boolean to know if data has been sent
    setMessage(''); // set message to be empty 


    try {
      const response = await fetch(
        apiURL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization header with token would go here
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            email: email,
            first_name: firstName,
            last_name: lastName,
            country: country,
            gov_org: govOrg,
            newsletter: newsletter,
            workshop_series: workshopSeries,
          }),
        }
      );


      // if the response returned is not valid (data I send), throw an error
      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      // Else, show a success message and reset the fields to empty
      setMessageType('success');
      setMessage('Thank you for subscribing! Check your email for updates.');
      // Reset form
      setEmail('');
      setFirstName('');
      setLastName('');
      setCountry('');
      setGovOrg('');
      setNewsletter(false);
      setWorkshopSeries('');

      // any error with our request, throw and error
    } catch (error) {
      setMessageType('error');
      setMessage('Error subscribing. Please try again.');
      console.error('Error:', error);

      // reset loading state to false 
    } finally {
      setLoading(false);
    }
  };

  // JSX of our Newsletter Form
  return (
    <>
      <div className="newsletter-form-container">
        <h2> Registration Form </h2>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <label>Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email address"
            required
            disabled={loading}
            className="email-input"
          />
          <label> First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstName}
            placeholder='First Name'
            disabled={loading}
            required
            className="first-name-input"
          />
          <label> Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastName}
            disabled={loading}
            placeholder='Last Name'
            required >
          </input>

          <label> Country </label>
          {/* Government Organization Field */}
          <select
            value={govOrg}
            onChange={handleGovOrg}
            disabled={loading}
            required>
            <option value="">
              Select Country Required
            </option>
            <option value="us">
              United States
            </option>
            <option value="outside-us">
              Outside the United States
            </option>
          </select>


         { /* Newsletter Opt-In Checkbox */ }
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={newsletter}
              onChange={handleNewsletter}
              disabled={loading}
            />
            Subscribe to our weekly newsletter
          </label>

        {  /* Workshop Series Dropdown */ }
          <select
            value={workshopSeries}
            onChange={handleWorkshopSeries}
            disabled={loading}
            required
          >
            <option value="">Select a Workshop Series</option>
            <option value="data-skills">Data Skills</option>
            <option value="digital-skills">Digital Skills</option>
            <option value="innovation-training">Innovation Training</option>
            <option value="ai-government">AI in Government</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="subscribe-button"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>

          {message && (
            <div className={`message message-${messageType}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </>
  );
}