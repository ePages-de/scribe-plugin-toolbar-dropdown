(function () {
    'use strict';

    var scribePluginToolbarDropdown = function (toolbarNode, options) {
        var dropdown = toolbarNode.querySelector(options.selector);
        var activeCommandElement = dropdown.querySelector(options.activeSelector);

        /**
         * toggleDropdownHandler for toggling the dropdown menu
         *
         * @param {Event} event event object
         */
        var toggleDropdownHandler = function () {
            dropdown.classList.toggle('open');
            if (dropdown.classList.contains('open')) {
                document.addEventListener('click', cancelHandler);
            } else {
                document.removeEventListener('click', cancelHandler);
            }
        };

        /**
         * cancelHandler for closing dropdown when clicked
         * somewhere outside the toolbar
         *
         * @param {Event} event event object
         */
        var cancelHandler = function (event) {
            if (!dropdown.contains(event.target)) {
                toggleDropdownHandler();
            }
        };

        return function (scribe) {
            // create own simulated command for the dropdown-toggle
            var dropdownCommand = new scribe.api.Command('dropdownToggle');
            var commandNodes = dropdown.querySelectorAll('[data-command-name]');

            var someCommandEnabled = function () {
                return commands.some(function (c) {
                    return c.command.queryEnabled();
                });
            };
            var firstActiveCommand = function () {
                return commands.filter(function (c) {
                    return c.command.queryState();
                })[0];
            };

            /*
             * get scribe-commands for the dropdown
             */
            var commands = [].map.call(commandNodes, function (node) {
                return {
                    command: scribe.getCommand(node.dataset.commandName),
                    title: node.textContent,
                    name: node.dataset.commandName
                };
            });

            /**
             * dropdown is always enabled when used
             * the commands from the dropdown have their own `queryEnabled`
             *
             * @returns {Boolean} is this command active
             */
            dropdownCommand.queryEnabled = function () {
                return true;
            };

            /**
             * check if one of the commands in the dropdown is active
             * check if the active command is not the default one
             *
             * @returns {Boolean} is one of the non-default commands active
             */
            dropdownCommand.queryState = function () {
                var activeCommand = (someCommandEnabled() ? firstActiveCommand() : null) || commands[0];

                // set the text for the dropdown element to the active command
                // command title text is comming from the actual element inside the dropdown
                activeCommandElement.textContent = activeCommand.title;
                // there is no active/inactive state for the dropdown
                // so always return false
                return false;
            };

            dropdown.addEventListener('click', toggleDropdownHandler);

            scribe.commands.dropdownToggle = dropdownCommand;
        };
    };

    // Module system magic dance
    if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = scribePluginToolbarDropdown;
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(function () {
            return scribePluginToolbarDropdown;
        });
    } else {
        window.scribePluginToolbarDropdown = scribePluginToolbarDropdown;
    }
}());
