function claim() {
  const claimBtns = [...document.querySelectorAll('.styles__ClaimReward-ga76s6-0, .styles__ClaimReward-sc-129ohce-0')];
  claimBtns.forEach(click);
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
  const tabBtn = document.querySelector('button[title*=Quest]');
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
