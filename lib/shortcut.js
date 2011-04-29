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
  case 'createLink':
    commands.redoLink(fl.currentLabel(), data.linkdata);
    break;
  case 'home':
    commands.setLinkFormIndex(0);
    break;
  case 'prev':
    commands.thirdLinkform();
    break;
  case 'next':
    commands.secondLinkform();
    break;
   case 'select':
    commands.setLinkFormIndex(data.index);
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


