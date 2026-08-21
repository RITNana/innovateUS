import { useState, useEffect } from 'react';
import "./Newsletter.css"

export default function NewsletterOptInForm() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState(''); // state variable for email
  const [country, setCountry] = useState('')
  const [govOrg, setGovOrg] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [workshopSeries, setWorkshopSeries] = useState('')

  const [loading, setLoading] = useState(false); // loading state
  const [message, setMessage] = useState(''); // message state
  const [messageType, setMessageType] = useState('');


  const apiURL = "https://burnes-center.directus.app/items/cw_intake"
  const accessToken = import.meta.env.VITE_DIRECTUS_TOKEN


  // update email state with user input 
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value)
  }

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

  // // Test Token
  // useEffect(() => {
  //   console.log("Token Loaded: ", accessToken)
  // }, [])


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

            // newsletter_opt_in: true,
            // Add timestamp
            // signup_date: new Date().toISOString(), 
          }),
        }
      );

      const responseData = await response.json()
      // console.log("Full Log", responseData)
      // console.log('POST Status Code', response.status)

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

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

    } catch (error) {
      setMessageType('error');
      setMessage('Error subscribing. Please try again.');
      console.error('Error:', error);

    } finally {
      setLoading(false);
    }
  };

  // Testing GET Request
  // const retrieveDataTest = async () => {
  //   try {
  //     const response = await fetch(apiURL,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Authorization": `Bearer ${accessToken}`
  //         }

  //       },
  //     )

  //     const data = await response.json()
  //     console.log("Retrived Data", data)
  //     console.log("GET Status Code", response.status)
  //     console.log("Returned Data", )

  //     if (!response.ok) {
  //       console.log("Error", data.errors)
  //     }
  //   } catch (error) {
  //     console.log("Fetch Error", error)

  //   }
  // }

  // retrieveDataTest()

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


          {/* Newsletter Opt-In Checkbox */}
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

          {/* Workshop Series Dropdown */}
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