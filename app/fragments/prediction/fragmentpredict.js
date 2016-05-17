var React = require('react');
require('./css/prediction.css');
var gVar = require('../../main/global.js');
//一共四个组件组成的fragment
var PredictionList = require('./predictionlist.js');
var Status = require('../order/status.js');
var TitleBar = require('../../components/titlebar/titlebar.js');
var Search = require('../../components/search/search.js');
var ListView = require('../../components/listview/listview.js');


var FragmentPrediciton = React.createClass({
    
    componentDidMount:function(){
        
    },
    
    
    render:function(){
        //<TitleBar title="预报管理"/>
        return(
            <div>
               <Search />
               <Status />
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
               <PredictionList /> 
            </div>
        );   
    }
});

module.exports = FragmentPrediciton;