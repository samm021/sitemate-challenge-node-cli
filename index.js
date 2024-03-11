const readlineSync = require('readline-sync');
const api = require('./api');
require('dotenv').config();

function initInstructions() {
  console.log('\n');
  console.info('save / 1        : create/save issue');
  console.info('read all / 2    : read all saved issues');
  console.info('read / 3        : read issue (by issue id)');
  console.info('update / 4      : update issue (by issue id)');
  console.info('delete / 5      : delete an issue (by issue id)');
  console.info('--help          : display instructions');
  console.info('--exit          : exit the program');
}

async function initList() {
  const choice = readlineSync.question('Enter input: ');


  switch (choice) {
    case '1':
    case 'save':
      const titleToSave = readlineSync.question('Enter issue title: ');
      const descriptionToSave = readlineSync.question('Enter issue description: ');
      const savedIssue = await api.createIssue(titleToSave, descriptionToSave);

      console.log('\n');
      !savedIssue.message ? console.info('Issue added successfully.') : console.error(savedIssue.message);
      break;

    case '2':
    case 'read all':
      const issues = await api.getIssues();
      !issues.message ? issues.forEach((issue, idx) => console.log(`no. ${idx + 1}`, issue)) : console.error(issues?.message);
      break;

    case '3':
    case 'read':
      const idToRead = readlineSync.question('Enter issue ID to read:  ');;
      const fetchedIssue = await api.getIssueById(idToRead);
      console.log('\n');
      !fetchedIssue.message ? console.info(fetchedIssue) : console.error(fetchedIssue.message);
      break;

    case '4':
    case 'update':
      const idToUpdate = readlineSync.question('Enter issue ID to update:  ');
      const issueToUpdate = await api.getIssueById(idToUpdate);
      if (issueToUpdate.message) { 
        console.error(issueToUpdate.message);
        break;
      }

      console.info(issueToUpdate);
      const titleToUpdate = readlineSync.question('Enter issue title (press enter to skip):  ');
      const descriptionToUpdate = readlineSync.question('Enter issue (press enter to skip):  ');
      const updatedIssue = await api.updateIssue(idToUpdate, titleToUpdate, descriptionToUpdate);

      console.log('\n');
      if (updatedIssue.message) { 
        console.error(updatedIssue.message);
        break;
      }
      console.info(`Issue ${idToUpdate} updated successfully.`);
      console.info(updatedIssue);
      break;

    case '5':
    case 'delete':
      const idToDelete = readlineSync.question('Enter issue ID to delete:  ');
      const deletedIssue = await api.deleteIssue(idToDelete);

      if (deletedIssue.message) {
        console.error(deletedIssue.message);
        break;
      }
      console.log('\n');
      console.info(`Issue ${idToDelete} deleted successfully.`);
      break;

    case '--help':
      initInstructions();
      break;

    case '--exit':
    case 'clear':
      console.log('\n');
      console.info('Exiting the app.');
      process.exit();

    default:
      console.info('Input invalid. Input --help to see available options');
  }

  if (choice != '--help') initInstructions();
  initList();
}





// Start the app
console.log('Welcome to Issue CLI app!');
initInstructions();
initList();