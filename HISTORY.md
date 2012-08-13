# 2.0 2012/08/13

* Add 'Edit title' (Edit title and create link)
* Add 'Disable Keyboard shortcuts'

# 1.3 2012/08/11

* Support Add-on SDK 1.9
* Add default setting 'Markdown', 'MediaWiki', 'PukiWiki', 'TiddlyWiki', 'hatena'
* Fix setting.ja.html, setting.en.html

# 1.2 2011/10/18

* Support Add-on SDK 1.1
  * Sorry SDK 1.1 Add-on, "simple-storage" has been replaced by the path. (jid0-seIFaYDCkHVDZhihluA8wNSDuU4 -> jid0-seIFaYDCkHVDZhihluA8wNSDuU4@jetpack)
  * Copy the 'store.json', then please restore setting.
  * {UserName} and {YourProfilePath} is different on your environment.
  * OSX
    * (befor) ~/Library/Application Support/Firefox/Profiles/{YourProfilePath}/jetpack/jid0-seIFaYDCkHVDZhihluA8wNSDuU4/simple-storage/store.json
    * (after) ~/Library/Application Support/Firefox/Profiles/{YourProfilePath}/jetpack/jid0-seIFaYDCkHVDZhihluA8wNSDuU4@jetpack/simple-storage/store.json
  * WindowsXP
    * (befor) C:/Documents and Settings/{UserName}/Application Data/Firefox/Profiles/{YourProfilePath}/jetpack/jid0-seIFaYDCkHVDZhihluA8wNSDuU4/simple-storage/store.json
    * (after) C:/Documents and Settings/{UserName}/Application Data/Firefox/Profiles/{YourProfilePath}/jetpack/jid0-seIFaYDCkHVDZhihluA8wNSDuU4@jetpack/simple-storage/store.json
* Add context-menu icon.

# 1.1.1 2011/06/07

* %wikiname% bug fixes.
  * Fixed can not create link. (EUC encode wikiname, if catch an error is now displayed in the unconverted.)
  * decodeURI -> decodeURIComponent, continuous '/' can not be translated.

# 1.1 2011/05/27

* Optimize of settings panel.
* Settings panel change save timing.
  * When the panel is closed.
  * Only when there are changes to save data.
* Add menu, "Disable Direct Select".
* Settings panel "No." add a column.
* Ctrl+1,2,..9,0, direct select not activate when.

# 1.0 2011/05/20

* Add %wikiname% variable.
  * URL to WikiName. ("http://en.wikipedia.org/wiki/Main_Page" to "Main_Page")
* Support Add-on SDK 1.05b.
* Add Japanese translation.
* Change Keybind, Clipboard text to %text% and Create link.
    * "Ctrl + X" -> "Ctrl + Shift + C"
* Settings panel provide links to "Recommended Settings".
* Typo
  * Recommended Linkform -> Recommended Settings
  * Setting -> Settings. (thanks Rbt)

# 0.9 2011/05/07

* Import & Export
  * Linkform setting share & backup.
  * Import from clipboard
  * Export to clipboard
* Configuration screen redesign.
* Add "Recommended Linkform" in Setting panel.
* Add "Set %text% from Clipboard (Ctrl+X)".
* "Direct Select", "0" key add.
* The selected text to all line breaks converted to spaces.
* Add "Clear Setting" button.
* Typo, "All Tabs Space" -> "All Tabs Separate".

# 0.8 2011/04/30

* "All Tabs" command can be chosen linkform.
* Add "All Tabs Space" command.
* Add shortcut, "Direct Select".
  * "1", "2", "3", "4", "5" key, select No. linkform.

# 0.7 2011/04/25

* Add Date & Time variables.
  * %date%, %datetime%, %year%, .... 
* Add %isgd% variable. Create shorten URL !!
* Add "\n", "\t" variable.
* Expanded linkform of the root menu.
* Add test.
* Bug fix.

# 0.6 2011/04/19

* Addition of Keyboard shortcut.
* Settig panel is more wieldy.
* Switching to English.
* Bug fix.
* Design brush up.
* Add README and HISTORY

# 0.17 2011/04/14

* Speed-up.

# 0.16 2011/04/13

* Beta Release.

