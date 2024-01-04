const path = require('path');
const baseOptions = require('./typedoc.cjs');
module.exports = {
  ...baseOptions,
  textContentMappings: {
    'header.title': 'My API - {version}',
    'header.readme': 'My Readme',
    'header.docs': 'Docs',
    'breadcrumbs.home': 'Home',
    'title.indexPage': ':tada: Custom Index Title',
    'title.memberPage': '{name}',
    'title.modulePage': '{kind} - {name}',
    'label.source': 'Defined In',
    'kind.variable.plural': '多变的',
  },
};
