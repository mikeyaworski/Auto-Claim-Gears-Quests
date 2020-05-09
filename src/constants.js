const SEC = 1000;
const MIN = 60 * SEC;

const INTERVALS = Object.freeze({
  claim: 5 * SEC,
  clickQuestActions: 5 * MIN, // every 5 mins because opening tabs frequently can be a problem if Gears' website has broken quests (as they usually do - it's TC...)
  closeModal: 5 * SEC,
  questsTab: MIN,
  refresh: 10 * MIN,
  retweet: 5 * MIN,
  vote: 15 * SEC,
});
