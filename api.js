const baseUrl = require('./config').BASE_URL;
const issueUrl = `${baseUrl}/api/issues`;

const baseOptions = {
  headers: {
    Accept: 'application/json',
    origin: 'https://localhost:3001',
    "Content-Type": 'application/json;charset=UTF-8',
  },
}

const createIssue = async (title, description) => {
  try {
    const options = {
      ...baseOptions,
      method: 'POST',
      body: JSON.stringify({
        title,
        description
      })
    };

    const issue = await fetch(issueUrl, options);

    return issue.json();
  } catch (e) {
    throw e;
  }
}

const getIssues = async () => {
  try {
    const options = {
      ...baseOptions,
      method: 'GET'
    };
    const issues = await fetch(issueUrl, options);
    return issues.json();
  } catch (e) {
    throw e;
  }
}

const getIssueById = async (id) => {
  try {
    const options = {
      ...baseOptions,
      method: 'GET'
    };
    const issue = await fetch(`${issueUrl}/${id}`, options);
    return issue.json();
  } catch (e) {
    throw e;
  }
}

const updateIssue = async (id, title, description) => {
  try {
    const body = {};
    if (title) body.title = title;
    if (description) body.description = description;

    const options = {
      ...baseOptions,
      method: 'PATCH',
      body: JSON.stringify(body)
    };

    const issue = await fetch(`${issueUrl}/${id}`, options);
    return issue.json();
  } catch (e) {
    throw e;
  }
}

const deleteIssue = async (id) => {
  try {
    const options = {
      ...baseOptions,
      method: 'DELETE',
    };

    const issue = await fetch(`${issueUrl}/${id}`, options);
    return issue.json();
  } catch (e) {
    throw e;
  }
}

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue
}