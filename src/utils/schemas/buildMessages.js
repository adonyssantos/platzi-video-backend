const buildMessage = (entity, action) => {
  switch (action) {
    case 'list':
      return `${entity}s ${action}ed`;

    default:
      return `${entity} ${action}d`;
  }
};

module.exports = buildMessage;
