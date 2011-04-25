//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/13

const PageMod = require('page-mod');
const data = require('self').data;
const fl = require("firelink_lib");

function copylink(data) {
  switch (data.kind) {
  case 'createLink':
    fl.createLink(fl.currentLabel(), data.linkdata);
    break;
  case 'home':
    fl.homeLinkform();
    //fl.createLink(fl.currentLabel(), data.linkdata);
    break;
  case 'prev':
    //fl.prevLinkform();
    fl.thirdLinkform();
    //fl.createLink(fl.currentLabel(), data.linkdata);
    break;
  case 'next':
    //fl.nextLinkform();
    fl.secondLinkform();
    //fl.createLink(fl.currentLabel(), data.linkdata);
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


