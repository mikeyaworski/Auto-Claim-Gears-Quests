let questsInterval;
let voteInterval;
let retweetInterval;
let refreshTimeout;

function setClickEverythingIntervals() {
  questsInterval = setInterval(openQuestsTab, INTERVALS.questsTab);
  retweetInterval = setInterval(retweetAnyTweet, INTERVALS.retweet);
  voteInterval = setInterval(vote, INTERVALS.vote);
}

function setRefreshTimeout() {
  refreshTimeout = setTimeout(refresh, INTERVALS.refresh);
}

getPreferences([{
  key: 'autoClickEverything',
  cb: val => {
    if (val) setClickEverythingIntervals();
  },
}, {
  key: 'autoRefresh',
  cb: val => {
    if (val) setRefreshTimeout();
  },
}]);

hookPreferences([{
  key: 'autoClickEverything',
  cb: val => {
    if (val) {
      setClickEverythingIntervals();
    } else {
      clearInterval(questsInterval);
      clearInterval(voteInterval);
      clearInterval(retweetInterval);
    }
  },
}, {
  key: 'autoRefresh',
  cb: val => {
    if (val) {
      setRefreshTimeout();
    } else {
      clearInterval(refreshTimeout);
    }
  },
}]);

setInterval(claim, INTERVALS.claim);
setInterval(clickQuestActions, INTERVALS.clickQuestActions);
setInterval(closeModal, INTERVALS.closeModal);
