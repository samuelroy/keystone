module.exports = {
  ERROR_CODES: {
    PullWhileFilesModified: 'PullWhileFilesModified',
    InvitationFailed: 'InvitationFailed',
    ProjectNameExists: 'ProjectNameExists',
    ConfigFileExists: 'ConfigFileExists',
    FailedToFetch: 'FailedToFetch',
    PullBeforeYouPush: 'PullBeforeYouPush',
    NeedToBeAdminOrContributor: 'NeedToBeAdminOrContributor',
    NeedToBeAdmin: 'NeedToBeAdmin',
    MissingParams: 'MissingParams',
    AccountMismatch: 'AccountMismatch',
    InvalidProjectName: 'InvalidProjectName',
    Conflict: 'Conflict',
  },
  KEYSTONE_MAIL: process.env.KEYSTONE_MAIL || 'http://localhost:8080',
  KEYSTONE_WEB: process.env.KEYSTONE_WEB || 'http://localhost:8000',
  INVITATIONS_STORE: 'invitations.json',
  ROLES: {
    ADMINS: 'admins',
    CONTRIBUTORS: 'contributors',
    READERS: 'readers',
  },
  PUBKEY: 'public.key',
  KEYSTONE_CONFIG_PATH: '.ksconfig',
  PROJECTS_STORE: process.env.PROJECTS_STORE || 'projects.json',
  KEYSTONE_HIDDEN_FOLDER: process.env.KEYSTONE_HIDDEN_FOLDER || '.keystone',
  SHARED_MEMBER: '{{shared}}',
  LOGIN_KEY_PREFIX: '{{login}}',
  SHARE_FILENAME: 'keystone-link.json',
  SESSION_FILENAME: process.env.SESSION_FILENAME || 'session.json',
  EVENTS: { CONFLICT: 'CONFLICT' },
}
