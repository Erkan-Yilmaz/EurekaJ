// ==========================================================================
// Project:   EurekaJView.AlertAdministrationView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals EurekaJView */

/** @class

        (Document Your View Here)

 @extends SC.View
 */
EurekaJView.AlertAdministrationView = SC.View.extend(
    /** @scope EurekaJView.AlertAdministrationView.prototype */ {

    childViews: 'newAlertView alertSelectionScrollView deleteAlertButtonView alertContentView'.w(),
    layout: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    newAlertView : SC.View.design({
        childViews: 'newAlertTextFieldView newAlertButtonView'.w(),
        layout: {top: 20, height: 30, left: 0, width: 200 },
        backgroundColor: "#ffffff",

        newAlertTextFieldView : SC.TextFieldView.design({
            layout: {top: 2, height: 24, centerY:0, width: 120, left: 2 },
            valueBinding: 'EurekaJView.alertAdministrationController.newAlertName'
        }),

        newAlertButtonView: SC.ButtonView.extend({
            layout: {left: 125, right: 2, height: 24, centerY: 0, top: 2, centerY: 0},
            title: "Add",
            action: 'EurekaJView.addNewAlertAction'
        })
    }).classNames('thinBlackBorder'),

    alertSelectionScrollView: SC.ScrollView.design({
        layout: {top: 50, bottom: 25, left: 0, width: 200 },
        hasHorizontalScroller: YES,
        hasVerticalScroller: YES,

        contentView: SC.ListView.extend({
        	allowsMultipleSelection: NO,
        	
            backgroundColor: '#F0F8FF',
            contentBinding: 'EurekaJView.alertAdministrationController.arrangedObjects',
            selectionBinding: 'EurekaJView.alertAdministrationController.selection',
            contentValueKey: "alertName",
            selectionDelegate: EurekaJView.alertSelectionDelegate,
        })
    }),
    
    deleteAlertButtonView: SC.ButtonView.extend({
        layout: {left: 0, width: 200, height: 24, centerX: 0, bottom: 0, centerY: 0},
        title: "Delete Selected Alert",
        action: 'EurekaJView.deleteSelectedAlertAction'
    }),

    alertContentView: SC.View.extend({
        childViews: 'activeLabelView activeCheckboxView errorLabelView errorTextfieldView warningLabelView warningTextfieldView alertTypeLabelView alertTypeSelectFieldView delayLabelView delayTextfieldView alertSourceLabelView saveAlertButtonView alertEmailNotificationLabelView alertEmailNotificationSelectFieldView alertChartSelectScrollView alertPluginNotificationLabelView alertPluginNotificationSelectFieldView'.w(),
        isVisibleBinding: 'EurekaJView.alertAdministrationController.showEditAlertView',
        layout: {top: 20, bottom: 0, right: 0, left: 215},

        activeLabelView: SC.LabelView.extend({
            layout: {left: 10, width: 80, top: 0, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Activated:'
        }).classNames('blacklabel'),

        activeCheckboxView: SC.CheckboxView.extend({
            layout: {left: 90, width: 20, top: 0, height: 20},
            contentBinding: 'EurekaJView.editAlertController',
            contentValueKey: "alertActivated"
        }),


        errorLabelView: SC.LabelView.extend({
            layout: {left: 10, width: 80, top: 25, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Error Value:'
        }).classNames('blacklabel'),

        errorTextfieldView: SC.TextFieldView.extend({
            layout: {left: 90, width: 100, top: 25, height: 20},
            contentBinding: 'EurekaJView.editAlertController',
            contentValueKey: "alertErrorValue",
			validator: SC.Validator.Number 
        }),

        warningLabelView: SC.LabelView.extend({
            layout: {left: 220, width: 100, top: 25, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Warning Value:'
        }).classNames('blacklabel'),

        warningTextfieldView: SC.TextFieldView.extend({
            layout: {left: 330, width: 100, top: 25, height: 20},
            contentBinding: 'EurekaJView.editAlertController',
            contentValueKey: "alertWarningValue",
			validator: SC.Validator.Number 
        }),

        alertTypeLabelView: SC.LabelView.extend({
            layout: {left: 10, width: 80, top: 50, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Alert Type:'
        }).classNames('blacklabel'),

        alertTypeSelectFieldView: SC.SelectButtonView.extend({
            layout: {left: 90, width: 150, top: 50, height: 25},
            theme: 'square',
            nameKey: 'typeName',
            valueKey: 'alertType',

            objectsBinding: 'EurekaJView.administrationPaneController.alertTypes',
            contentBinding: 'EurekaJView.editAlertController',
            contentValueKey: 'alertType',
            disableSort: YES,
            acceptsFirstResponder: function() {
                return this.get('isEnabled');
            }.property('isEnabled')
        }),

        delayLabelView: SC.LabelView.extend({
            layout: {left: 220, width: 100, top: 50, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Alert Delay:'
        }).classNames('blacklabel'),

        delayTextfieldView: SC.TextFieldView.extend({
            layout: {left: 330, width: 100, top: 50, height: 20},
            contentBinding: 'EurekaJView.editAlertController',
            contentValueKey: "alertDelay",
			validator: SC.Validator.Number 
        }),

        alertSourceLabelView: SC.LabelView.extend({
            layout: {left: 10, width: 100, top: 75, height: 30},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Alert Source:'
        }).classNames('blacklabel'),


        alertChartSelectScrollView: SC.ScrollView.design({
            layout: {left: 10, right: 20, top: 95, height: 150},
            hasHorizontalScroller: YES,
            hasVerticalScroller: YES,

            contentView: SC.SourceListView.extend({
                allowsMultipleSelection: NO,
                backgroundColor: '#F0F8FF',
                contentValueKey: "name",
                rowHeight: 18,
                contentBinding: 'EurekaJView.alertChartController.arrangedObjects',
                selectionBinding: 'EurekaJView.alertChartController.selection',
                selectionDelegate: EurekaJView.alertSelectionDelegate
            })
        }),

        alertEmailNotificationLabelView: SC.LabelView.extend({
            layout: {left: 10, width: 200, top: 250, height: 25},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Email Notification:'
        }).classNames('blacklabel'),

        alertEmailNotificationSelectFieldView: SC.ScrollView.design({
            layout: {left: 10, width: 200, top: 280, bottom: 40},
            hasHorizontalScroller: YES,
            hasVerticalScroller: YES,


            contentView: SC.ListView.extend({
                allowsMultipleSelection: NO,
                backgroundColor: '#F0F8FF',
                contentValueKey: "name",
                contentBinding: 'EurekaJView.alertNotificationController.arrangedObjects',
                selectionBinding: 'EurekaJView.alertNotificationController.selection',
                contentValueKey: "emailGroupName",
                selectionDelegate: EurekaJView.alertSelectionDelegate,


                acceptsFirstResponder: function() {
                    return this.get('isEnabled');
                }.property('isEnabled')
            })
        }),
        
        alertPluginNotificationLabelView: SC.LabelView.extend({
            layout: {left: 225, right: 20, top: 250, height: 25},
            controlSize: SC.REGULAR_CONTROL_SIZE,
            value: 'Plugin Notification:'
        }).classNames('blacklabel'),
        
        alertPluginNotificationSelectFieldView: SC.ScrollView.design({
            layout: {left: 225, right: 20, top: 280, bottom: 40},
            hasHorizontalScroller: YES,
            hasVerticalScroller: YES,


            contentView: SC.ListView.extend({
                allowsMultipleSelection: NO,
                backgroundColor: '#F0F8FF',
                contentValueKey: "name",
                contentBinding: 'EurekaJView.alertPluignListController.arrangedObjects',
                selectionBinding: 'EurekaJView.alertPluignListController.selection',
                contentValueKey: "alertPluginName",
                selectionDelegate: EurekaJView.alertSelectionDelegate,


                acceptsFirstResponder: function() {
                    return this.get('isEnabled');
                }.property('isEnabled')
            })
        }),

        saveAlertButtonView: SC.ButtonView.design({
            layout: {right: 10, width: 150, bottom: 10, height: 25},
            title: "Save All Alert Changes",
            action: "EurekaJView.saveAlertsAction"
        })

    })

});
