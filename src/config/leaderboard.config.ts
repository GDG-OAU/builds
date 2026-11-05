export const LEADERBOARD_CONFIG = {
  adminEmails: [
    'rebeccaayodele08@gmail.com'
  ],
  individual: {
    completenessWeight: 0.40,
    projectCountWeight: 0.30,
    communityVotesWeight: 0.30,
    projectCap: 3,
    voteCap: 50,
    completenessBreakdown: {
      demoLink: 0.50,
      googleToolsMinTwo: 0.30,
      descriptionPresent: 0.20
    }
  },
  community: {
    submissionRateWeight: 0.70,
    repeatBuildersWeight: 0.30,
    windowDays: 7,
    defaultEstimatedAttendees: 100
  },
  voting: {
    maxDailyVotesPerUser: 10
  }
};

