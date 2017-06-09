/*
 *	 Constellation Platform 1.8
 *	 Web site: http://www.myConstellation.io
 *	 Copyright (C) 2014-2016 - Sebastien Warin <http://sebastien.warin.fr>
 *	 All Rights Reserved.
 *	
 *	 NOTICE:  All information contained herein is, and remains the property of Sebastien Warin.
 *	 The intellectual and technical concepts contained herein are proprietary to Sébastien Warin.
 *	 Dissemination of this information or reproduction of this material is strictly forbidden
 *   unless prior written permission is obtained from Sébastien Warin.
*/

angular.module('ngConstellation', ['ng'])
    .constant('CONSTELLATION_VERSION', '1.8.0')
    .constant('MODULE_VERSION', '1.8.1')
	.value('$', $)
    .factory('constellationConsumer', ['$', '$rootScope', function ($, $rootScope) {
        var constellationProxy = {
            constellationClient: null,
            onConnectionStateChangedCallback: null,
            initializeClient: function (serverUri, accessKey, friendlyName) {
                constellationProxy.constellationClient = $.signalR.createConstellationConsumer(serverUri, accessKey, friendlyName);
                constellationProxy.constellationClient.connection.stateChanged(function (change) {
                    if (constellationProxy.onConnectionStateChangedCallback != null) {
                        constellationProxy.onConnectionStateChangedCallback(change);
                    }
                });
            },
            connect: function () {
                constellationProxy.constellationClient.connection.start();
            },
            onConnectionStateChanged: function (callback) {
                constellationProxy.onConnectionStateChangedCallback = callback;
            },
            onReceiveMessage: function (callback) {
                return constellationProxy.constellationClient.client.onReceiveMessage(callback);
            },
            registerMessageCallback: function (messageKey, callback) {
                return constellationProxy.constellationClient.client.registerMessageCallback(messageKey, callback);
            },            
            sendMessage: function (scope, key, data) {
                return constellationProxy.constellationClient.server.sendMessage(scope, key, data);
            },
            sendMessageWithSaga: function (scope, key, data, callback) {
                return constellationProxy.constellationClient.server.sendMessageWithSaga(scope, key, data, callback);
            },
            subscribeMessages: function (group) {
                return constellationProxy.constellationClient.server.subscribeMessages(group);
            },
            onUpdateStateObject: function (callback) {
                return constellationProxy.constellationClient.client.onUpdateStateObject(callback);
            },
            registerStateObjectLink: function (sentinelName, packageName, name, type, callback) {
                return constellationProxy.constellationClient.client.registerStateObjectLink(sentinelName, packageName, name, type, callback);
            },
            requestStateObjects: function (sentinelName, packageName, name, type) {
                return constellationProxy.constellationClient.server.requestStateObjects(sentinelName, packageName, name, type);
            },
            subscribeStateObjects: function (sentinelName, packageName, name, type) {
                return constellationProxy.constellationClient.server.subscribeStateObjects(sentinelName, packageName, name, type);
            },
            unSubscribeMessages: function (group) {
                return constellationProxy.constellationClient.server.unSubscribeMessages(group);
            },
            unSubscribeStateObjects: function (sentinelName, packageName, name, type) {
                return constellationProxy.constellationClient.server.unSubscribeStateObjects(sentinelName, packageName, name, type);
            },
            requestSubscribeStateObjects: function (sentinelName, packageName, name, type) {
                return constellationProxy.constellationClient.server.requestSubscribeStateObjects(sentinelName, packageName, name, type);
            },
        };
        return constellationProxy;
    }])
    .factory('constellationController', ['$', '$rootScope', function ($, $rootScope) {
        var constellationProxy = {
            constellationClient: null,
            onConnectionStateChangedCallback: null,
            initializeClient: function (serverUri, accessKey, friendlyName) {
                constellationProxy.constellationClient = $.signalR.createConstellationController(serverUri, accessKey, friendlyName);
                constellationProxy.constellationClient.connection.stateChanged(function (change) {
                    if (constellationProxy.onConnectionStateChangedCallback != null) {
                        constellationProxy.onConnectionStateChangedCallback(change);
                    }
                });
            },
            connect: function () {
                constellationProxy.constellationClient.connection.start();
            },
            onConnectionStateChanged: function (callback) {
                constellationProxy.onConnectionStateChangedCallback = callback;
            },
            onReceiveLogMessage: function (callback) {
                return constellationProxy.constellationClient.client.onReceiveLogMessage(callback);
            },
            onUpdateSentinel: function (callback) {
                return constellationProxy.constellationClient.client.onUpdateSentinel(callback);
            },
            onUpdateSentinelsList: function (callback) {
                return constellationProxy.constellationClient.client.onUpdateSentinelsList(callback);
            },
            onReportPackageState: function (callback) {
                return constellationProxy.constellationClient.client.onReportPackageState(callback);
            },
            onReportPackageUsage: function (callback) {
                return constellationProxy.constellationClient.client.onReportPackageUsage(callback);
            },
            onUpdatePackageList: function (callback) {
                return constellationProxy.constellationClient.client.onUpdatePackageList(callback);
            },
            onUpdatePackageDescriptor: function (callback) {
                return constellationProxy.constellationClient.client.onUpdatePackageDescriptor(callback);
            },
            addToControlGroup: function (group) {
                return constellationProxy.constellationClient.server.addToControlGroup(group);
            },
            purgeStateObjects: function (sentinelName, packageName, name, type) {
                return constellationProxy.constellationClient.server.purgeStateObjects(sentinelName, packageName, name, type);
            },
            reloadServerConfiguration: function (deployConfiguration) {
                return constellationProxy.constellationClient.server.reloadServerConfiguration(deployConfiguration);
            },
            reload: function (sentinelName, packageName) {
                return constellationProxy.constellationClient.server.reload(sentinelName, packageName);
            },
            removeToControlGroup: function (group) {
                return constellationProxy.constellationClient.server.removeToControlGroup(group);
            },
            requestPackageDescriptor: function (packageName) {
                return constellationProxy.constellationClient.server.requestPackageDescriptor(packageName);
            },
            requestPackagesList: function (sentinelName) {
                return constellationProxy.constellationClient.server.requestPackagesList(sentinelName);
            },
            requestSentinelUpdates: function () {
                return constellationProxy.constellationClient.server.requestSentinelUpdates();
            },
            requestSentinelsList: function () {
                return constellationProxy.constellationClient.server.requestSentinelsList();
            },
            restart: function (sentinelName, packageName) {
                return constellationProxy.constellationClient.server.restart(sentinelName, packageName);
            },
            start: function (sentinelName, packageName) {
                return constellationProxy.constellationClient.server.start(sentinelName, packageName);
            },
            stop: function (sentinelName, packageName) {
                return constellationProxy.constellationClient.server.stop(sentinelName, packageName);
            },
            updatePackageSettings: function (sentinelName, packageName) {
                return constellationProxy.constellationClient.server.updatePackageSettings(sentinelName, packageName);
            }
        };
        return constellationProxy;
    }]);