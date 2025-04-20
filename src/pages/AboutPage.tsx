import React from 'react';
import { wudiInfo } from '../data/sampleData';

const AboutPage: React.FC = () => {
  const boardMembers = wudiInfo.board_members || [];
  
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About WUDI</h1>
        <p>
          Westchester Ultimate Disc, Inc. (WUDI) is a non-profit organization dedicated to the
          growth and development of the sport of Ultimate Frisbee in Westchester County, New York.
        </p>
        <p>
          We organize leagues throughout the year, including winter, spring, summer, and fall seasons,
          catering to players of all skill levels and backgrounds.
        </p>
      </section>
      
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          WUDI's mission is to promote the sport of Ultimate Frisbee in a fun, inclusive, and
          competitive environment. We strive to foster a community that values Spirit of the Game,
          camaraderie, and athletic excellence.
        </p>
      </section>
      
      <section className="leagues-overview">
        <h2>Our Leagues</h2>
        
        <div className="league-description">
          <h3>Winter League</h3>
          <p>Our winter league is a co-ed indoor league that runs from January through March.</p>
        </div>
        
        <div className="league-description">
          <h3>Spring League</h3>
          <p>
            Spring leagues include a co-ed 5v5 outdoor league and a women's league, both running
            for 4 weeks in April and May as a transition into the summer season.
          </p>
        </div>
        
        <div className="league-description">
          <h3>Summer League</h3>
          <p>
            Our flagship season features both recreational and competitive co-ed leagues
            running from June through August, including a season-long theme and special events.
          </p>
        </div>
        
        <div className="league-description">
          <h3>Fall League</h3>
          <p>The fall league is a co-ed outdoor league that runs from September through November.</p>
        </div>
      </section>
      
      <section className="board-members">
        <h2>Board Members</h2>
        
        {boardMembers.length > 0 ? (
          <div className="board-grid">
            {boardMembers.map(member => (
              <div key={member.id} className="board-member-card">
                <h3>{member.name}</h3>
                {member.email && <p><strong>Email:</strong> {member.email}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>Board member information coming soon.</p>
        )}
      </section>
      
      <section className="history">
        <h2>Our History</h2>
        <p>
          WUDI was founded in the early 2000s by a group of dedicated Ultimate players who
          wanted to create organized playing opportunities in Westchester County. Since then,
          we have grown to serve hundreds of players each year across multiple seasons and leagues.
        </p>
        <p>
          Our primary playing fields are located at SUNY Purchase, where we've established
          a home for Ultimate in the region.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;