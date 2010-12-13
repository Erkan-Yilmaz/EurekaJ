// ==========================================================================
// Project:   EurekaJView.InstrumentationTreeModel
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EurekaJView */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
EurekaJView.InstrumentationTreeModel = SC.Record.extend(
/** @scope EurekaJView.InstrumentationTreeModel.prototype */
{

    guid: SC.Record.attr(String),
    name: SC.Record.attr(String),
    isSelected: SC.Record.attr(Boolean),
    parentPath: SC.Record.attr(String),
    guiPath: SC.Record.attr(String),
    hasChildren: SC.Record.attr(Boolean),
    treeItemIsExpanded: NO,

    childrenNodes: SC.Record.toMany('EurekaJView.InstrumentationTreeModel'),
	availableCharts: SC.Record.toMany('EurekaJView.ChartSelectorModel', { inverse: 'parentTreeNode', isMaster: YES }),
	
    treeItemChildren: function() {
        if (this.get('childrenNodes').toArray().length === 0) {
            return null;
        } else {
            return this.get('childrenNodes');
        }
    }.property()
});