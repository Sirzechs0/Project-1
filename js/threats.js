// --- THREAT FILTERING ---
function filterThreats(category) {
  const cards = document.querySelectorAll('.threat-card');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter cards
  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'block';
    } else {
      const threatLevel = card.getAttribute('data-threat');
      if (category === 'contained') {
        // Show detained/neutral status threats
        const status = card.querySelector('.threat-meta').textContent;
        if (status.includes('DETAINED') || status.includes('ARKHAM') || status.includes('NEUTRAL')) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      } else if (threatLevel === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// --- THREAT MODAL ---
const threatData = {
  joker: {
    name: 'THE JOKER',
    image: 'https://images5.alphacoders.com/130/thumb-1920-1309924.png',
    realName: 'UNKNOWN',
    status: 'AT LARGE',
    threat: 'CRITICAL',
    profile: `The Joker represents Gotham's most dangerous and unpredictable criminal threat. His complete disregard for human life, combined with his genius-level intellect and mastery of chemical warfare, makes him an existential threat to the city.`,
    psychology: `Psychological Profile: Exhibits complete lack of empathy, compulsive need for chaos, and obsessive fixation on Batman. Multiple psychiatric evaluations have proven inconclusive. Subject appears to derive pleasure from causing fear and suffering in others.`,
    abilities: [
      'Expert chemist - specializes in toxins and hallucinogens',
      'Master manipulator and psychologist',
      'Immunity to most poisons and toxins',
      'Unpredictable combat style',
      'Extensive criminal network'
    ],
    knownAssociates: ['Harley Quinn', 'Various hired thugs', 'Corrupt officials'],
    criminalHistory: [
      'Ace Chemical Plant incident - origin unknown',
      '47 confirmed murders',
      'Multiple mass casualty events',
      'Joker toxin attacks on Gotham population',
      'Arkham Asylum breakouts: 12'
    ],
    weaknesses: [
      'Obsessive need for Batman\'s attention',
      'Overconfidence in chaotic plans',
      'Underestimates organized resistance'
    ],
    countermeasures: `Antidote for Joker toxin maintained in Batcave medical bay. Recommend immediate deployment of gas masks and chemical neutralizers when engaging. Subject should be considered armed and extremely dangerous at all times.`
  },
  bane: {
    name: 'BANE',
    image: 'https://images6.alphacoders.com/892/thumb-1920-892810.jpg',
    realName: 'UNKNOWN',
    status: 'DETAINED - BLACKGATE',
    threat: 'HIGH',
    profile: `Bane is a formidable adversary combining superhuman strength with tactical genius. Born in the prison of Peña Duro, he spent his formative years studying combat, strategy, and the human body.`,
    psychology: `Highly intelligent and disciplined. Unlike most criminals, Bane approaches conflict methodically. He is known for studying his opponents extensively before engagement. Exhibits strong willpower but is psychologically dependent on Venom compound.`,
    abilities: [
      'Enhanced strength via Venom compound',
      'Genius-level tactical thinking',
      'Master of multiple martial arts',
      'Photographic memory',
      'Exceptional pain tolerance'
    ],
    knownAssociates: ['Former League of Shadows', 'Mercenary groups'],
    criminalHistory: [
      'Broke Batman\'s back during first encounter',
      'Orchestrated Blackgate Prison takeover',
      'Mercenary operations worldwide',
      'Multiple assassination contracts'
    ],
    weaknesses: [
      'Dependent on Venom supply',
      'Venom tubes vulnerable to damage',
      'Weakened significantly when Venom flow interrupted'
    ],
    countermeasures: `Target Venom delivery system. Electrical disruption of pump mechanism reduces threat level significantly. Recommend engaging only when adequately prepared with countermeasures.`
  },
  penguin: {
    name: 'THE PENGUIN',
    image: 'https://picfiles.alphacoders.com/340/thumb-1920-340875.jpg',
    realName: 'Oswald Chesterfield Cobblepot',
    status: 'AT LARGE',
    threat: 'HIGH',
    profile: `The Penguin is Gotham's most influential crime lord, operating under the guise of legitimate businessman. His Iceberg Lounge serves as a hub for criminal enterprise while maintaining a veneer of respectability.`,
    psychology: `Highly intelligent with sophisticated understanding of business and politics. Driven by desire for respect and power. Exhibits narcissistic tendencies but maintains calculated approach to crime. Sensitive about physical appearance.`,
    abilities: [
      'Extensive criminal network',
      'Political connections and influence',
      'Weapons dealing expertise',
      'Modified umbrella weapons',
      'Financial resources rivaling Wayne Enterprises'
    ],
    knownAssociates: ['Falcone Crime Family', 'Corrupt politicians', 'International arms dealers'],
    criminalHistory: [
      'Racketeering and extortion: 50+ cases',
      'Illegal arms trafficking',
      'Money laundering operations',
      'Murder-for-hire: 15+ suspected cases',
      'Stolen WayneTech technology fencing'
    ],
    weaknesses: [
      'Need for social acceptance',
      'Predictable business patterns',
      'Reliance on hired muscle',
      'Legitimate businesses provide legal leverage'
    ],
    countermeasures: `Financial investigation and RICO prosecution most effective long-term. Physical confrontation requires caution - umbrella weapons include machine guns, blades, and gas dispensers.`
  },
  catwoman: {
    name: 'CATWOMAN',
    image: 'https://images8.alphacoders.com/136/thumb-1920-1364320.jpeg',
    realName: 'Selina Kyle',
    status: 'NEUTRAL',
    threat: 'MODERATE',
    profile: `Catwoman operates in moral gray area between criminal and vigilante. Expert thief with personal code of ethics. Increasingly selective about targets, often focusing on corrupt wealthy individuals.`,
    psychology: `Independent and strong-willed. Troubled past drives kleptomaniac tendencies, but shows capacity for empathy and justice. Complicated relationship with Batman - sometimes ally, sometimes adversary.`,
    abilities: [
      'Master cat burglar',
      'Olympic-level acrobatics',
      'Expert martial artist',
      'Stealth and infiltration specialist',
      'Advanced knowledge of security systems'
    ],
    knownAssociates: ['Occasionally collaborates with Batman', 'Poison Ivy (friendship)'],
    criminalHistory: [
      'High-value jewelry thefts: 40+',
      'Art theft from private collections',
      'Corporate espionage',
      'No violent crimes on record'
    ],
    weaknesses: [
      'Moral compass can be exploited',
      'Emotional attachment to cats',
      'Conflicted feelings about Batman'
    ],
    countermeasures: `Non-lethal restraint recommended. Subject responds to logical argumentation and has assisted Batman on multiple occasions. Potential for rehabilitation high.`
  },
  scarecrow: {
    name: 'SCARECROW',
    image: 'https://static0.cbrimages.com/wordpress/wp-content/uploads/2017/06/scarecrow-dc-comics-gotham-batman-header.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5',
    realName: 'Dr. Jonathan Crane',
    status: 'DETAINED - ARKHAM ASYLUM',
    threat: 'CRITICAL',
    profile: `Former psychiatrist specializing in phobias, Dr. Crane uses weaponized fear toxin to terrorize victims. His expertise in psychology and chemistry makes him exceptionally dangerous.`,
    psychology: `Obsessed with fear and its effects on human psyche. Childhood trauma involving abusive father led to pathological fascination with terror. Views fear experiments as scientific research rather than criminal acts.`,
    abilities: [
      'Expert psychologist and psychiatrist',
      'Advanced chemistry knowledge',
      'Fear toxin creation and deployment',
      'Psychological manipulation',
      'Understands and exploits deepest fears'
    ],
    knownAssociates: ['Ra\'s al Ghul (former)', 'Various Arkham inmates'],
    criminalHistory: [
      'Unethical experiments on patients',
      'Mass fear toxin attacks: 8 incidents',
      'Psychological torture of victims',
      'Arkham Asylum security breaches: 7'
    ],
    weaknesses: [
      'Physically weak without fear toxin',
      'Predictable modus operandi',
      'Antidote neutralizes fear toxin'
    ],
    countermeasures: `Maintain supply of fear toxin antidote at all times. Gas mask essential for engagement. Subject dangerous only when able to deploy toxin - physical combat capability minimal.`
  },
  riddler: {
    name: 'THE RIDDLER',
    image: 'https://cdn.mos.cms.futurecdn.net/v6hegBS6dpoD79dNHhE42n-650-80.jpg.webp',
    realName: 'Edward Nygma',
    status: 'DETAINED - ARKHAM ASYLUM',
    threat: 'HIGH',
    profile: `Edward Nygma's genius-level intellect is matched only by his compulsive need to prove his superiority through riddles and puzzles. This obsession is both his greatest weapon and his ultimate weakness.`,
    psychology: `Narcissistic personality disorder with obsessive-compulsive tendencies. Driven by need for recognition and validation of intelligence. Cannot resist leaving puzzles and clues - views it as intellectual challenge.`,
    abilities: [
      'Genius-level intellect (IQ: 193)',
      'Expert in engineering and computer science',
      'Elaborate death trap construction',
      'Hacking and cyber warfare',
      'Pattern recognition and code-breaking'
    ],
    knownAssociates: ['Various hired technicians', 'Cyber criminals'],
    criminalHistory: [
      'Elaborate puzzle-based heists: 20+',
      'Death trap victims: 12 (all rescued)',
      'City-wide riddle schemes: 5',
      'Corporate espionage and blackmail'
    ],
    weaknesses: [
      'Compulsive need to leave riddles',
      'Cannot resist intellectual challenges',
      'Ego prevents him from working efficiently'
    ],
    countermeasures: `Use intellectual challenges to manipulate behavior. Subject will always provide clues to his schemes. Pattern analysis of previous riddles helps predict future actions.`
  },
  twoface: {
    name: 'TWO-FACE',
    image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2021/08/two-face-standing-coins-featured.jpg?q=50&fit=crop&w=1008&h=693&dpr=1.5',
    realName: 'Harvey Dent',
    status: 'AT LARGE',
    threat: 'HIGH',
    profile: `Once Gotham's crusading District Attorney, Harvey Dent's transformation into Two-Face represents the tragic cost of fighting Gotham's corruption. Acid attack left half his face scarred, fracturing his psyche.`,
    psychology: `Dissociative identity disorder - Harvey Dent and Two-Face personalities battle for control. All major decisions determined by coin flip. Dent personality occasionally surfaces, showing original heroic nature.`,
    abilities: [
      'Extensive legal knowledge',
      'Criminal network management',
      'Expert marksman',
      'Strategic planning',
      'Political connections from DA days'
    ],
    knownAssociates: ['Former organized crime contacts', 'Recruited gang members'],
    criminalHistory: [
      'Becomes Two-Face after acid attack',
      'Bank heists based on number two: 15+',
      'Revenge killings: 8 confirmed',
      'Dual-themed crimes and territories'
    ],
    weaknesses: [
      'Dependent on coin flips for decisions',
      'Harvey Dent personality can be reached',
      'Predictable pattern of duality in crimes'
    ],
    countermeasures: `Coin dependency can be exploited tactically. Appeal to Harvey Dent persona may result in cooperation. Dr. Leslie Thompkins recommends psychiatric intervention.`
  },
  ivy: {
    name: 'POISON IVY',
    image: 'https://c4.wallpaperflare.com/wallpaper/505/725/105/batman-poison-ivy-dc-comics-superhero-costumes-hd-wallpaper-preview.jpg',
    realName: 'Dr. Pamela Isley',
    status: 'DETAINED - ARKHAM ASYLUM',
    threat: 'MODERATE',
    profile: `Dr. Pamela Isley's transformation into Poison Ivy occurred during botanical experiments gone wrong. Now immune to all toxins and able to control plant life, she has become Gotham's most dangerous eco-terrorist.`,
    psychology: `Extreme environmental activist with misanthropic worldview. Views humanity as plague on Earth. Prioritizes plant life over human life. Capable of genuine friendship (Catwoman, Harley Quinn) suggesting retained humanity.`,
    abilities: [
      'Complete control over plant life',
      'Immunity to all toxins and poisons',
      'Pheromone-based mind control',
      'Botanical toxin creation',
      'Enhanced strength and durability'
    ],
    knownAssociates: ['Catwoman (friendship)', 'Harley Quinn (friendship)'],
    criminalHistory: [
      'Eco-terrorism attacks on corporations: 25+',
      'Mind control of political figures',
      'Botanical garden takeovers',
      'Attempted genocide via plant spores'
    ],
    weaknesses: [
      'Vulnerable to herbicides and fire',
      'Emotional attachment to certain individuals',
      'Predictable targeting of environmental threats'
    ],
    countermeasures: `Herbicide-based weapons effective. Fire suppresses plant growth. Appeals to environmental protection may facilitate cooperation on shared threats.`
  }
};

function openThreatModal(threatId) {
  const modal = document.getElementById('threatModal');
  const modalBody = document.getElementById('modalBody');
  const data = threatData[threatId];
  
  if (!data) return;
  
  modalBody.innerHTML = `
    <div class="threat-modal-header" style="background-image: url('${data.image}'); background-size: cover; background-position: center; height: 300px; filter: grayscale(50%); margin: -40px -40px 30px -40px; position: relative;">
      <div style="position: absolute; bottom: 20px; left: 20px; background: rgba(0,0,0,0.8); padding: 15px 25px;">
        <h2 style="color: var(--bat-yellow); margin: 0; font-size: 2rem;">${data.name}</h2>
      </div>
    </div>
    
    <div class="threat-modal-content">
      <div class="threat-modal-info" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 25px; font-family: 'Share Tech Mono', monospace; font-size: 0.9rem;">
        <div><strong style="color: var(--bat-yellow);">Real Name:</strong> ${data.realName}</div>
        <div><strong style="color: var(--bat-yellow);">Status:</strong> <span class="status-wanted">${data.status}</span></div>
        <div style="grid-column: 1 / -1;"><strong style="color: var(--bat-yellow);">Threat Level:</strong> <span style="color: var(--danger-red);">${data.threat}</span></div>
      </div>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">PROFILE</h3>
      <p style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">${data.profile}</p>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">PSYCHOLOGICAL ASSESSMENT</h3>
      <p style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">${data.psychology}</p>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">ABILITIES & SKILLS</h3>
      <ul style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">
        ${data.abilities.map(ability => `<li>${ability}</li>`).join('')}
      </ul>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">KNOWN ASSOCIATES</h3>
      <ul style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">
        ${data.knownAssociates.map(associate => `<li>${associate}</li>`).join('')}
      </ul>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">CRIMINAL HISTORY</h3>
      <ul style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">
        ${data.criminalHistory.map(crime => `<li>${crime}</li>`).join('')}
      </ul>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">KNOWN WEAKNESSES</h3>
      <ul style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc;">
        ${data.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
      </ul>
      
      <h3 style="color: var(--bat-yellow); border-bottom: 2px solid var(--bat-yellow); padding-bottom: 10px; margin-top: 30px;">COUNTERMEASURES</h3>
      <p style="font-family: 'Share Tech Mono', monospace; line-height: 1.8; color: #ccc; background: rgba(255, 51, 51, 0.1); padding: 15px; border-left: 3px solid var(--danger-red);">${data.countermeasures}</p>
    </div>
  `;
  
  modal.style.display = 'block';
}

function closeThreatModal() {
  const modal = document.getElementById('threatModal');
  modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('threatModal');
  if (event.target == modal) {
    closeThreatModal();
  }
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeThreatModal();
  }
});