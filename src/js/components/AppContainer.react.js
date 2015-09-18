'use strict';

import React from 'react';
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');

import {AppStore} from '../stores/AppStore';
import AppActions from '../actions/AppActions';
import appStoreMixin from './AppStore.mixin.js';

import Dashboard from './Dashboard.react';
import PlotPicker from './PlotPicker.react';

var AppContainer = React.createClass({
    getInitialState: function () {
        return this.getState();
    },

    mixins: [appStoreMixin],

    getState: function () {
        return AppStore.getState()
    },

    _onChange: function () {
        this.setState(this.getState());
    },

    handlePublishClick: function (event) {
        AppActions.publishDashboard();
    },

    render: function () {
        let state = this.getState();

        if(!('plots' in state) && state.rows.length === 0) {
            return (<img
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    display: 'block',
                    marginTop: '50px'
                }}
                src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"/>)
        }

        if(ENV.mode === 'create') {

            return (
                <div>
                    <Dashboard rows={state.rows} canRearrange={state.canRearrange}/>
                    <PlotPicker {...this.state}/>
                </div>
            );

        } else {
            return (<div>
                <Dashboard rows={state.rows}/>
            </div>)
        }
    }
});

module.exports = DragDropContext(HTML5Backend)(AppContainer);
