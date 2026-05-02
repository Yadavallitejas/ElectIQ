export const electionSteps = [
  {
    id: 1,
    phase: "Announcement",
    title: "Election Commission Announces Schedule",
    icon: "📢",
    color: "#FF6600",
    duration: "Day 1",
    description: "The Election Commission of India (ECI) announces the election schedule, including polling dates, and the Model Code of Conduct comes into effect immediately.",
    keyFacts: [
      "Model Code of Conduct begins from announcement date",
      "Government cannot announce new schemes after this point",
      "EC appoints observers for each constituency"
    ],
    learnMore: "The ECI is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    id: 2,
    phase: "Nomination",
    title: "Candidates File Nominations",
    icon: "📝",
    color: "#1e3a8a",
    duration: "Days 2–14",
    description: "Political parties and independent candidates file nomination papers with the Returning Officer. Candidates must submit Form 2B along with a security deposit.",
    keyFacts: [
      "Security deposit: ₹25,000 for Lok Sabha, ₹10,000 for State Assembly",
      "Candidate must be 25+ years for Lok Sabha, 25+ for Assembly",
      "Nomination must be proposed by at least one registered voter from the constituency"
    ],
    learnMore: "Deposits are forfeited if a candidate fails to secure more than 1/6th of total valid votes polled."
  },
  {
    id: 3,
    phase: "Scrutiny",
    title: "Nomination Papers Scrutinized",
    icon: "🔍",
    color: "#7c3aed",
    duration: "Day 15",
    description: "The Returning Officer examines all nomination papers for validity. Candidates, their agents, and one other person are allowed to be present.",
    keyFacts: [
      "RO checks candidate eligibility and correct form submission",
      "Defective nominations may be rejected at this stage",
      "Process is open and transparent"
    ],
    learnMore: "Any elector can raise objections to a nomination during the scrutiny process."
  },
  {
    id: 4,
    phase: "Withdrawal",
    title: "Last Date for Withdrawal",
    icon: "↩️",
    color: "#059669",
    duration: "Day 17",
    description: "Candidates who have filed nominations can withdraw their candidature up to 3 PM on the last date of withdrawal. After this, the final list of candidates is published.",
    keyFacts: [
      "Withdrawal is irrevocable once submitted",
      "Party symbols are allotted after withdrawal deadline",
      "Final candidate list is published by the RO"
    ],
    learnMore: "The ECI publishes the final list of contesting candidates with their party affiliations and symbols."
  },
  {
    id: 5,
    phase: "Campaign",
    title: "Election Campaign Period",
    icon: "🗣️",
    color: "#dc2626",
    duration: "Days 17–33",
    description: "Political parties and candidates campaign actively. Public meetings, rallies, door-to-door canvassing, and media advertising are all permitted within ECI guidelines.",
    keyFacts: [
      "Campaign spending limits enforced: ₹95 lakh for Lok Sabha",
      "Campaign silence period: 48 hours before polling",
      "Paid news and fake news can be reported to EC"
    ],
    learnMore: "The Model Code of Conduct regulates campaign conduct to ensure a level playing field."
  },
  {
    id: 6,
    phase: "Polling",
    title: "Voting Day",
    icon: "🗳️",
    color: "#FF6600",
    duration: "Day 35",
    description: "Registered voters cast their votes at designated polling booths using Electronic Voting Machines (EVMs). Polls typically open at 7 AM and close at 6 PM.",
    keyFacts: [
      "Bring Voter ID card or any of 12 approved alternative ID documents",
      "Vote using the blue button on EVM next to your chosen candidate",
      "VVPAT slip visible for 7 seconds to verify your vote"
    ],
    learnMore: "India uses EVMs since 1982. The VVPAT system was introduced for full transparency in 2019 general elections."
  },
  {
    id: 7,
    phase: "Counting",
    title: "Vote Counting & Results",
    icon: "📊",
    color: "#1e3a8a",
    duration: "Day 40+",
    description: "Votes are counted at designated counting centers under strict supervision. Results are declared constituency by constituency as counting progresses.",
    keyFacts: [
      "Counting starts at 8 AM on counting day",
      "Postal ballots counted first",
      "Results declared by Returning Officer after candidate with most votes confirmed"
    ],
    learnMore: "The candidate with the highest number of votes wins under India's First-Past-The-Post (FPTP) system."
  }
];

export const voterChecklist = [
  { id: 1, task: "Check if my name is on the Electoral Roll", link: "https://electoralsearch.eci.gov.in/", linkText: "Search on ECI website" },
  { id: 2, task: "Know my Polling Booth location", link: "https://electoralsearch.eci.gov.in/", linkText: "Find my booth" },
  { id: 3, task: "Have my Voter ID (EPIC) card ready", link: null, linkText: null },
  { id: 4, task: "Know the polling date and time for my constituency", link: "https://www.eci.gov.in/", linkText: "Check ECI website" },
  { id: 5, task: "Know the alternative ID documents I can carry", link: null, linkText: null },
  { id: 6, task: "Understand how to use the EVM correctly", link: null, linkText: null },
  { id: 7, task: "Know my rights if turned away at the booth", link: null, linkText: null }
];

export const quickFacts = [
  { emoji: "🏛️", fact: "India has 543 Lok Sabha constituencies" },
  { emoji: "👥", fact: "970 million+ registered voters as of 2024" },
  { emoji: "🗓️", fact: "General elections held every 5 years" },
  { emoji: "⚖️", fact: "ECI is an independent constitutional body" },
  { emoji: "📱", fact: "Voter Helpline: 1950 (toll free)" },
  { emoji: "🔒", fact: "Voting is secret — no one can see your vote" }
];
