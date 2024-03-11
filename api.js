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
    throw e?.message;
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
    throw e?.message;
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
    throw e?.message;
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
    throw e?.message;
  }
}

const deleteIssue = async (id) => {
  try {
    const options = {
      ...baseOptions,
      method: 'DELETE',
    };

    await fetch(`${issueUrl}/${id}`, options);
    return;
  } catch (e) {
    throw e?.message;
  }
}

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue
}