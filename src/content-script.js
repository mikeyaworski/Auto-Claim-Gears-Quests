function click(element) {
  if (element) element.click();
}

function claim() {
  const claimQuestBtn = document.querySelector('.styles__ClaimReward-ga76s6-0');
  click(claimQuestBtn);
}

function clickQuestActions() {
  // all the quest actions which have not been done yet
  const claimQuestActions = [...document.querySelectorAll('.quest-action-container')].filter(claimQuestAction => claimQuestAction.querySelector('i.icon-circle-empty'));

  claimQuestActions.forEach(claimQuestAction => {
    const actionLink = claimQuestAction.querySelector('a');
    click(actionLink);
  });
}

function closeModal() {
  const closeModalBtn = document.querySelector('.icon-cancel-thin');
  click(closeModalBtn);
}

function openQuestsTab() {
  const tabBtn = document.querySelector('button[title=Quests]');
  click(tabBtn);
}

// there might be a really clean XPath expression for this...
function retweetAnyTweet() {
  const actionQuests = [...document.querySelectorAll('.quest-action-container')];
  const needsToRetweet = actionQuests.some(actionQuest => {
    const isComplete = !actionQuest.querySelector('.quest-action-icon.icon-circle-empty');
    if (isComplete) return false;
    const questActionText = actionQuest.querySelector('.quest-action-text');
    return questActionText.innerText && questActionText.innerText.toLowerCase().includes('retweet any tweet');
  });
  if (needsToRetweet) {
    const retweetButton = document.querySelector('.icon-retweet');
    click(retweetButton);
  }
}

// consider using XPath here and analyzing text if these classes change somewhat frequently
function vote() {
  const voteButton = document.querySelector('.view__StyledButton-sc-1lnp3pd-2');
  click(voteButton);
  setTimeout(() => {
    const option = document.querySelector('.styles__Answer-sc-8lpte4-2');
    click(option);
    if (option) {
      const closePanel = document.querySelector('.SidebarActionButton-sc-856ady-0');
      click(closePanel);
    }
  }, 1000);
}

const INTERVALS = Object.freeze({
  questsTab: 60 * 1000,
  claim: 5 * 1000,
  clickQuestActions: 5 * 60 * 1000, // every 5 mins because opening tabs frequently can be a problem if Gears' website has broken quests (as they usually do - it's TC...)
  retweet: 5 * 60 * 1000,
  vote: 15 * 1000,
  closeModal: 5 * 1000,
});

let questsInterval;
let voteInterval;
let retweetInterval;

chrome.storage.sync.get(['autoClickQuests'], ({ autoClickQuests }) => {
  if (autoClickQuests) {
    questsInterval = setInterval(openQuestsTab, INTERVALS.questsTab);
    retweetInterval = setInterval(retweetAnyTweet, INTERVALS.retweet);
    voteInterval = setInterval(vote, INTERVALS.vote);
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoClickQuests) {
    if (changes.autoClickQuests.newValue) {
      questsInterval = setInterval(openQuestsTab, INTERVALS.questsTab);
      retweetInterval = setInterval(retweetAnyTweet, INTERVALS.retweet);
      voteInterval = setInterval(vote, INTERVALS.vote);
    } else {
      clearInterval(questsInterval);
      clearInterval(voteInterval);
      clearInterval(retweetInterval);
    }
  }
});

setInterval(claim, INTERVALS.claim);
setInterval(clickQuestActions, INTERVALS.clickQuestActions);
setInterval(closeModal, INTERVALS.closeModal);
