import React from 'react';
import { wudiInfo } from '../data/sampleData';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      
      <section className="contact-info">
        <div className="contact-card">
          <h2>General Inquiries</h2>
          <p>
            <strong>Email:</strong> {wudiInfo.contact_email || 'theboard@wudi.org'}
          </p>
          <p>
            For general questions about WUDI, our leagues, or other inquiries,
            please email us and a board member will get back to you as soon as possible.
          </p>
        </div>
        
        <div className="contact-card">
          <h2>Emergency Contact</h2>
          <p>
            <strong>Emergency Number:</strong> {wudiInfo.emergency_number || '914.251.6900'}
          </p>
          <p>
            This number should be used for emergencies at our playing fields. It will connect
            you to security services at SUNY Purchase, who can provide faster response than 911.
          </p>
          <p>
            <strong>Please save this number in your phone as "WUDI Emergency".</strong>
          </p>
        </div>
      </section>
      
      <section className="social-media">
        <h2>Connect With Us</h2>
        
        <div className="social-links">
          {wudiInfo.slack_invite_link && (
            <div className="social-link">
              <h3>Slack</h3>
              <p>Join our Slack community to stay connected:</p>
              <a href={wudiInfo.slack_invite_link} target="_blank" rel="noopener noreferrer">
                Join WUDI Slack
              </a>
            </div>
          )}
          
          <div className="social-link">
            <h3>Other Platforms</h3>
            <p>More social media links coming soon!</p>
          </div>
        </div>
      </section>
      
      <section className="fields-info">
        <h2>Our Fields</h2>
        
        <div className="location-card">
          <h3>SUNY Purchase</h3>
          <p>735 Anderson Hill Rd, Purchase, NY 10577</p>
          
          <div className="field-map">
            <h4>Field Map</h4>
            <p>
              Our main playing fields are located at SUNY Purchase. Parking is available
              at the Performing Arts Center (PAC) and the Great Lawn.
            </p>
            
            <div className="map-links">
              <h4>Google Maps Links</h4>
              <ul>
                <li>
                  <a 
                    href="https://maps.google.com/?q=SUNY+Purchase+PAC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    PAC Parking
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.google.com/?q=SUNY+Purchase+Great+Lawn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Great Lawn Parking
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <p>Contact form coming soon!</p>
      </section>
    </div>
  );
};

export default ContactPage;