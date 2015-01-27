/**
 * Sample that shows how select-tags directive work.
 *
 * @author Umed Khudoiberdiev <info@zar.tj>
 */
(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name selectTagsSample
     */
    angular.module('selectTagsSample', ['selectTags']);

    /**
     * @ngInject
     * @ngdoc controller
     * @name SelectTagsSampleCtrl
     */
    angular.module('selectTagsSample').controller('SelectTagsSampleCtrl', function ($scope, $http) {

        $scope.selectedUsers = [];
        $scope.selectedNames = [];
        $scope.loadedRepositories = [];
        $scope.isRemoveButton = true;

        /**
         * Array of data that will be used to show in the select.
         *
         * @type {{name: string}[]}
         */
        $scope.users = [
            {
                name: 'Galileo Galilei',
                email: 'galileo@example.com',
                group: 'super people'
            },
            {
                name: 'Benjamin Franklin',
                email: 'franklin@example.com',
                group: 'mega people'
            },
            {
                name: 'Avicenna',
                email: 'avicenna@example.com',
                group: 'super people'
            },
            {
                name: 'Albert Einstein',
                email: 'einstein@example.com',
                group: 'mega people'
            },
            {
                name: 'Alan Turing',
                email: 'turing@example.com',
                group: 'super people'
            },
            {
                name: 'Thomas Alva Edison',
                email: 'edison@example.com',
                group: 'mega people'
            },
            {
                name: 'Nikola Tesla',
                email: 'tesla@example.com',
                group: 'super people'
            }
        ];

        /**
         * Custom filter that can be applied to the data to restrict what
         * kind of data do we want to show to the user.
         *
         * This filter will filter out all users whose name doesn't start with 'A' latter.
         *
         * @param {{name: string}[]} users
         * @returns {{name: string}[]}
         */
        $scope.customFilter = function(users) {

            var allowedUsers = [];
            angular.forEach(users, function(user) {
                if (user.name.substr(0, 1) === 'A')
                    allowedUsers.push(user);
            });
            return allowedUsers;
        };

        /**
         * Custom decorator can be used to change the representation of the model items.
         *
         * @param {{name: string, email: string, group: string}} user
         * @returns {string}
         */
        $scope.tagDecorator = function(user) {
            return '<b>' + user.name + '</b> (' + (user.email ? user.email : 'no email ')+ ')';
        };

        /**
         * Custom decorator can be used to change the representation of the model items.
         *
         * @param {{name: string, email: string, group: string}} user
         * @returns {string}
         */
        $scope.dropdownItemDecorator = function(user) {
            return '<b>' + user.name + '</b> (' + user.email + ')';
        };

        /**
         * Custom decorator can be used to change the representation of the group names.
         *
         * @param {{name: string, email: string, group: string}} user
         * @returns {string}
         */
        $scope.dropdownGroupDecorator = function(user) {
            return '<u>' + user.group.toUpperCase() + '</u>';
        };

        /**
         * Callback called when model is changed.
         *
         * @param {{name: string, email: string, group: string}} user
         */
        $scope.changed = function(user) {
            console.log(user);
            $scope.isChangedCalled = true;
        };

        /**
         * A callback that will be called when search is performed in the select-tags component.
         * Must return a promise.
         *
         * @returns {*}
         */
        $scope.loadGithubRepositories = function() {
            return $http.get('https://api.github.com/legacy/repos/search/angular').then(function(response) {
                return { data: response.data.repositories };
            });
        };

        /**
         * A callback that will be called when search is performed in the select-tags component.
         * Search will be performed by a given keyword. Must return a promise.
         *
         * @param {string} keyword
         * @returns {*}
         */
        $scope.loadGithubRepositoriesByKeyword = function(keyword) {
            return $http.get('https://api.github.com/legacy/repos/search/' + keyword).then(function(response) {
                return { data: response.data.repositories };
            });
        };

    });

})();