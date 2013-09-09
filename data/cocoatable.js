/* -*- mode: JavaScript; tab-width: 4; indent-tabs-mode: t; c-basic-offset: 4 -*- */
//
//  Change for Firefox Add-on SDK.
//
// -------------------------------------------
//
// cocoatable.js
// Copyright(c) 2010 ku ku0522a*gmail.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// -------------------------------------------
	
	function $A(a) {
		return Array.prototype.slice.call(a)
	}
	function $T(e) {
		return ( typeof e.innerText == 'undefined' ) ?
			e.textContent : e.innerText;
	}
	function setText(e, text) {
//              Chrome               
// 		if ( typeof e.innnerText == 'undefined' ) {
// 			e.appendChild(document.createTextNode(text));
// 		} else {
// 			e.innnerText = text;
// 		}

                // Firefox
		if ( typeof e.textContent == 'undefined' ) {
			e.appendChild(document.createTextNode(text));
		} else {
			e.textContent = text;
		}

	}
	function keys(o) {
		if ( Object.keys ) {
			return Object.keys(o) 
		} else {
			var klasses = [];
			for ( var n in o ) {
				klasses.push(n);
			}
			return klasses;
		}
	}
	function _classHash(e) {
		var o = e.className.split(/\s+/).reduce( function (m, n) {
			m[n] = 1;
			return m;
		}, {} );
		var klasses = [];
		for ( var n in o ) {
			klasses.push(n);
		}
		return o;
	}
	function removeClass(e, name) {
		var o =_classHash(e);
		delete o[name];
		e.className = keys(o).join(" ");
	}
	function addClass(e, name) {
		var o =_classHash(e);
		o[name] = 1;
		e.className = keys(o).join(" ");
	}

	function CocoaTable(data, headers) {
		this._cellObjects = [];
		this._editingCell = null;
		this._selectedRow = null;
		this._index2name = ['no'].concat(headers);
		this._listener = {};

		this._table = document.getElementById('cocoatable');
		this.initalize(data);
		this._cells = 0;


		var self = this;
		document.addEventListener('click', function (e) {
			if ( self._editingCell ) {
				self._editingCell.commit();
				self._editingCell = null;
			}
		}, false);

		this.setupButtonEventHandlers();
		this.setupUpDownButtonEventHandlers();
		this.setupEtcButtonHandlers();
	}

	CocoaTable.Cell = function (opts) {
		this.id = opts.id;
		this._e = document.createElement('td');
		this._editbox = null;
		this._listener = opts.listener;
		this._textContainer = document.createElement('span');
		setText(this._textContainer, opts.text);
		this._e.appendChild(this._textContainer);

		if ( opts.editing ) {
			this.open();
		}

		if ( opts.td_no ) {
			addClass(this._e , 'td-no');
		} else {
			var self = this;
			this._e.addEventListener( 'click', function (ev) {
				try{
					self.open();
					ev.preventDefault();
					ev.stopPropagation();
				} catch(e) { console.log(e)}
			}, false);
		}
	}
	CocoaTable.prototype.serialize = function () {
		return JSON.stringify(this.to_json());
	}
	CocoaTable.prototype.to_json = function () {
		var self = this;
		var rows = document.querySelectorAll('.cocoatable tbody tr');
		var a = $A(rows).map( function(row) {
			var columns = row.querySelectorAll('td');
			return $A(columns).reduce( function(j, i, index) {
				var t = $T(i);
				j[ self._index2name[index] ] = t;
				return j;
			}, {} );
		} );
		return a;
	}
	CocoaTable.prototype.chooseUniqueId = function () {
		var rows = document.querySelectorAll('.cocoatable tbody tr');
		var max = Array.prototype.slice.call(rows).reduce( function (m, row) {
			var n = row.getAttribute('id');
			n = n.replace(/^\D+(\d+)$/, '$1');
			return ( m < n ) ? n : m;
		}, -1);
		return max + 1;
	}
	CocoaTable.prototype.moveToNextCell = function (cellColumnElement) {
		var target = cellColumnElement.nextSibling;
		var nextCell = this.findCellObjectForElmenet(target);
		if ( nextCell ) {
			nextCell.open();
		}
	}
	CocoaTable.prototype.setSelectedRow = function (row) {
		if ( this._selectedRow ) {
			removeClass(this._selectedRow, 'selected');
		}
		if ( row )
			addClass(row, 'selected');
		this._selectedRow = row;
	}
	CocoaTable.prototype.emptyRowObjectRepresentation = function () {
		return this._index2name.reduce( function (j, i) {
			j[i] = '';
			return j;
		}, {} );
	}
	CocoaTable.prototype.setupButtonEventHandlers = function () {
		var plus = document.getElementById('cocoatable-button-plus');
		var minus = document.getElementById('cocoatable-button-minus');

		var self = this;
		plus.addEventListener( 'click', function (ev) {
		try	{
			if ( self._editingCell ) {
				self._editingCell.commit();
				self._editingCell = null;
				
			}
			
			var row = self.addRow( self.emptyRowObjectRepresentation(),
				self.chooseUniqueId(), true);
			self.setSelectedRow(row);
			
			ev.preventDefault();
			ev.stopPropagation();
		}catch(e) {
			console.log(e)
		}
		}, true);

		minus.addEventListener( 'click', function (ev) {
			if ( self._selectedRow == null )
				return;
			
			var index = self.selectedIndex();
			self._selectedRow.parentNode.removeChild(self._selectedRow);

			var rows = document.querySelectorAll('.cocoatable tbody tr');

			if (index < rows.length)
				self.setSelectedRow(rows[index]);
			else
				self.setSelectedRow(null);				

			self.updated();

			ev.preventDefault();
			ev.stopPropagation();
		}, true);

	}
	CocoaTable.prototype.selectedIndex = function () {
		var rows = document.querySelectorAll('.cocoatable tbody tr');
		
		for (var i = 0; i < rows.length; i++ ) {
			if (_classHash(rows[i]).selected)
				return i;
		}
	}
	CocoaTable.prototype.setupUpDownButtonEventHandlers = function () {
		var up = document.getElementById('cocoatable-button-up');
		var down = document.getElementById('cocoatable-button-down');

		var self = this;
	  
		up.addEventListener( 'click', function (ev) {
		try	{
			if ( self._editingCell ) {
				self._editingCell.commit();
				self._editingCell = null;
				
			}

			var rows = document.querySelectorAll('.cocoatable tbody tr');
			var index = self.selectedIndex();

			if (index > 0) {
				rows[index].parentNode.insertBefore(rows[index], rows[index - 1]);
				self.updated();
			}

			ev.preventDefault();
			ev.stopPropagation();
		}catch(e) {
			console.log(e)
		}
		}, true);
		
		down.addEventListener( 'click', function (ev) {
			if ( self._selectedRow == null )
				return;
			
			var rows = document.querySelectorAll('.cocoatable tbody tr');
			var index = self.selectedIndex();

			if (index < rows.length - 1) {
				rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
				self.updated();
			}

			ev.preventDefault();
			ev.stopPropagation();
		}, true);
	}

	function removeChildAll(el) {
		var list = el.childNodes;
		for(var i=0; list.length>0; i++) {
			el.removeChild(list[0]);
		}
	}

	function dumpObj(o){
		var str = "";
		for(var i in o) {
			str = str + "\n" + i + "\t"+ o[i];
		}
		console.log(str);
	}

	function setupRestoreButton(self) {
 		var restoreButton = document.getElementById('restore-button');

		restoreButton.addEventListener( 'click', function (ev) {
 			if (confirm('Restore Setting?')) {
				// 既存のテーブルは削除
				var tbody = document.querySelector('.cocoatable tbody');
				removeChildAll(tbody);

				// 初期化
				// @todo main.jsと共有
				var defaultLinkformData = [
					{name:"PlainText",   format:"%text%\\n%url%"},
					{name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
					{name:"Markdown",   format:"[%text%](%url%)"},
					{name:"MediaWiki",   format:"[%url% %text%]"},
					{name:"PukiWiki",   format:"[[%text%>%url%]]"},
					{name:"TiddlyWiki",  format:"[[%text%|%url%]]"},
					{name:"Twitter",     format:"%text% %url%"},
					{name:"hatena",      format:"[%url%:title=%text%]"},
					{name:"short",      format:"%text% %short%"}
				];

				self.initalize(defaultLinkformData);
				self.updated();

				// 通知
				self.pushButton("restore");
 			}
		}, true);
	}

	function setupClearButton(self) {
 		var button = document.getElementById('clear-button');

		button.addEventListener( 'click', function (ev) {
 			if (confirm('Clear Setting?')) {
				// 既存のテーブルは削除
				var tbody = document.querySelector('.cocoatable tbody');
				removeChildAll(tbody);

				// 初期化
				self.initalize([]);
				self.updated();

				// 通知
				self.pushButton("clear");
 			}
		}, true);
	}

    function setupImportButton(self) {
		var button = document.getElementById('import-button');

		button.addEventListener( 'click', function (ev) {
			self.updated();
			self.pushButton("import");
		}, true);
	}

    function setupExportButton(self) {
		var button = document.getElementById('export-button');

		button.addEventListener( 'click', function (ev) {
			self.updated();
			self.pushButton("export");
		}, true);
	}

	CocoaTable.prototype.setupEtcButtonHandlers = function () {
		setupRestoreButton(this);
		setupImportButton(this);
		setupExportButton(this);
		setupClearButton(this);
	}

	CocoaTable.Cell.prototype.element = function () {
		return this._e;
	}
	CocoaTable.Cell.prototype.open = function () {
			if ( this._editbox == null ) {
				var self = this;

				this._editbox = document.createElement('input');
				this._editbox.type = 'text';
				this._editbox.width = this._e.offsetWidth - 20;
				this._editbox.style.width = (this._e.offsetWidth - 20) + "px";
				this._editbox.value = $T(this._textContainer);
				this._editbox.addEventListener( 'keydown', function (ev) {
					if ( ev.keyCode == 9 ) {
						self.commit();
						if ( self._listener ) {
							self._listener.moveToNextCell(self._e);
						}
					} else if ( ev.keyCode == 13 ) {
						self.commit();
					} else if ( ev.keyCode == 27 ) {
						self.cancel();
					}
				}, false);
				this._e.appendChild(this._editbox);
				addClass( this._e, 'editing');
				//addClass( this._e.parentNode, 'editing');
				this._textContainer.style.display = 'none';

				window.setTimeout( function () {
					self._editbox.focus();
					self._editbox.select();
				}, 10);

				if ( this._listener ) {
					this._listener.startEditing(self);
				}
			}
	}
	CocoaTable.Cell.prototype.value = function () {
		return this._editbox ? this._editbox.value : $T(this._textContainer);
	}
	CocoaTable.Cell.prototype.close = function () {
		this._editbox.parentNode.removeChild(this._editbox);
		this._textContainer.style.display = "";
		this._editbox = null;

		removeClass( this._e, 'editing');
		//removeClass( this._e.parentNode, 'editing');

		if ( this._listener ) {
			this._listener.endEditing(this);
		}

		this.removeEmptyRow();
	}
	CocoaTable.Cell.prototype.removeEmptyRow = function () {
		var empty = this.siblingCells.every( function (n) {
			return (n.value() == '');
		} );
		if ( empty ) {
			var row = this._e.parentNode;
			row.parentNode.removeChild(row);
			return true;	
		}
		return false
	}

	CocoaTable.Cell.prototype.cancel = function () {
		if ( this._editbox ) {
			this._editbox.value = '';
		}

		this.close();

		if ( this._listener )
			this._listener.unselectRow();
	}
	CocoaTable.Cell.prototype.commit = function () {
		setText(this._textContainer, this._editbox.value);

		this.close();

		if ( this._listener ) {
			this._listener.unselectRow();
			this._listener.updated();
		}
	}
	CocoaTable.prototype.findCellObjectForElmenet = function (e) {
		return this._cellObjects.reduce( function (j, i) {
			return j ? j : ((i.boundElement == e) ? i.cellObject : null) ;
		}, null );
	}
	CocoaTable.prototype.addRow = function (def, suffixId, editing) {
		var tbody = this._table.querySelector('tbody');
		var row = document.createElement('tr');
		
		var self = this;
		var siblings = this._index2name.map( function (columnName, index) {
			var cell = new CocoaTable.Cell( {
				id: "cocoatable-cell-" + columnName + "-"+ suffixId,
				text: def[columnName] || '',
				editing: (index == 1) ? editing : false,
				listener: self,
				td_no: columnName == 'no'
			} );
			row.appendChild(cell.element());
			self._cellObjects.push( {
				cellObject: cell,
				boundElement: cell._e
			} );
			return cell;
		} );

		siblings.map( function (i) {
			i.siblingCells = siblings;
		} );

		var self = this;
		row.addEventListener( 'click', function (ev) {
			if ( self._selectedRow != row ) {
				if ( self._editingCell ) {
					self._editingCell.commit();
					self._editingCell = null;
					
				}
				
				self.setSelectedRow(row);
				ev.preventDefault();
				ev.stopPropagation();
			} else {
				
			}
		}, true);
		row.setAttribute('id', 'cocoatable-row' + suffixId);

		tbody.appendChild(row);
		return row;
	}

	CocoaTable.prototype.initalize = function (formats) {
		var self = this;
		formats.map( function (n, i) {
			self.addRow.apply(self, [n, i], false);
		} );
		this.updateNo();
	}
	CocoaTable.prototype.unselectRow = function () {
		this.setSelectedRow(null);
	}
	CocoaTable.prototype.endEditing = function (cell) {
		this._editingCell = null;
	}
	CocoaTable.prototype.startEditing = function (cell) {
		if ( this._editingCell ) {
			this._editingCell.commit();
		}
		this._editingCell = cell;
	}
	CocoaTable.prototype.updated = function () {
		this.updateNo();

		if ( this._listener.onUpdated )
			this._listener.onUpdated();
	}
	function getNo(index) {
		if (index <= 8)
			return index + 1;
		else if (index == 9)
			return "0";
		else
			return "";
	}
	CocoaTable.prototype.updateNo = function () {
		var rows = document.querySelectorAll('.cocoatable tbody tr');
		for (var i = 0; i < rows.length; i++ ) {
			rows[i].querySelector('td').innerHTML = "<span>" + getNo(i) + "</span>";
		}
	}
	CocoaTable.prototype.pushButton = function (msg) {
		if ( this._listener.onPushButton )
			this._listener.onPushButton(msg);
	}
	CocoaTable.prototype.importData = function (data) {
		this.initalize(data);
		this.updated();
	}


