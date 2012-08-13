//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/13

const PageMod = require('page-mod');
const data = require('self').data;
const commands = require("commands");
const fl = require("firelink_lib");

function copylink(data) {
  switch (data.kind) {
  case 'redoLink':
    if (!commands.getDisableDirectSelect())
      commands.redoLink(fl.currentLabel(), data.linkdata);
    break;
   case 'select':
    commands.setLinkFormIndex(data.index);
    break;
   case 'textFromClipboard':
    if (!commands.getDisableDirectSelect())
      commands.textFromClipboard(fl.currentLabel(), data.linkdata);
    break;
  }
}

exports.setup = function() {
  PageMod.PageMod({
    include: ['*'],
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('shortcuts.js'),
    onAttach: function onAttach(worker) {
      worker.on('message', function(data) {
        copylink(data);
      });
    }    
  });
}


