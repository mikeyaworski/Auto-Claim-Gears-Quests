function claim() {
  const claimQuestBtn = document.querySelector('.styles__ClaimReward-ga76s6-0');
  if (claimQuestBtn) claimQuestBtn.click();
}

function clickQuestActions() {
  // all the quest actions which have not been done yet
  const claimQuestActions = [...document.querySelectorAll('.quest-action-container')].filter(claimQuestAction => claimQuestAction.querySelector('i.icon-circle-empty'));

  claimQuestActions.forEach(claimQuestAction => {
    const actionLink = claimQuestAction.querySelector('a');
    if (actionLink) actionLink.click();
  });
}

function closeModal() {
  const closeModalBtn = document.querySelector('.icon-cancel-thin');
  if (closeModalBtn) closeModalBtn.click();
}

function openQuestsTab() {
  const questsTabBtn = document.querySelector('button[title=Quests]');
  if (questsTabBtn) questsTabBtn.click();
}

const INTERVALS = Object.freeze({
  questsTab: 60 * 1000,
  claim: 5 * 1000,
  clickQuestActions: 5 * 60 * 1000, // every 5 mins because opening tabs frequently can be a problem if Gears' website has broken quests (as they usually do - it's TC...)
  closeModal: 5 * 1000,
});

let questsInterval;

chrome.storage.sync.get(['autoClickQuests'], ({ autoClickQuests }) => {
  if (autoClickQuests) {
    questsInterval = setInterval(openQuestsTab, INTERVALS.questsTab);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoClickQuests) {
    if (changes.autoClickQuests.newValue) {
      questsInterval = setInterval(openQuestsTab, INTERVALS.questsTab);
    } else {
      clearInterval(questsInterval);
    }
  }
});

setInterval(claim, INTERVALS.claim);
setInterval(clickQuestActions, INTERVALS.clickQuestActions);
setInterval(closeModal, INTERVALS.closeModal);
