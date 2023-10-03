const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    return config;
};

// import { ModuleScopePlugin } from 'react-dev-utils';

// export default function override(config, env) {
//     // Remove ModuleScopePlugin from the list of resolve plugins
//     config.resolve.plugins = config.resolve.plugins.filter(
//         (plugin) => !(plugin instanceof ModuleScopePlugin)
//     );

//     return config;
// }
