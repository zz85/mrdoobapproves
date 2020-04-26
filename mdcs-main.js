window.CodeMirror = require('./node_modules/codemirror/lib/codemirror');

window.eslint_configs = {
    // TODO have a proper ESLINT config loader!!!

    standard: require('eslint-config-standard'),
    // airbnb: require('eslint-config-airbnb-base'),
    google: require('eslint-config-google'),
    grunt: require('eslint-config-grunt'),
    // idiomatic: require('eslint-config-idiomatic'),
    // jquery: require('eslint-config-jquery'),
    // node: require('eslint-config-node-style-guide'),
    wikimedia: require('eslint-config-wikimedia'),
    wordpress: require('eslint-config-wordpress'),
}