const SEC = 1000;
const MIN = 60 * SEC;

const INTERVALS = Object.freeze({
  claim: 5 * SEC,
  clickQuestActions: 5 * MIN,
  closeModal: 5 * SEC,
  questsTab: 1 * MIN,
  refresh: 10 * MIN,
  retweet: 5 * MIN,
  vote: 15 * SEC,
});
