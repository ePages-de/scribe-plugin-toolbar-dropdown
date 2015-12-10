# scribe-plugin-toolbar-dropdown
A plugin for the [scribe](https://github.com/guardian/scribe/) Toolbar to use plugins in a dropdown.

## Usage
```javascript
var scribePluginToolbar = require('scribe-plugin-toolbar');
var scribePluginToolbarDropdown = require('scribe-plugin-toolbar-dropdown');

scribe.use(scribePluginToolbar(toolbarNode));
scribe.use(scribePluginToolbarDropdown(toolbarNode, {
    defaultCommand: 'p',
    selector: '.toolbar-dropdown',
    activeSelector: '.toolbar-dropdown-active'
}));
```

## Installation
```
bower install scribe-plugin-toolbar-dropdown
```
