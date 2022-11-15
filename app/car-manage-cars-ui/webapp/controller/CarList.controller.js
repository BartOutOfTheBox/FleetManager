sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
    "sap/m/MessageBox",
    "sap/ui/model/SimpleType",
    "sap/ui/model/ValidateException",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, FilterType, MessageBox, SimpleType, ValidateException) {
        "use strict";

        return Controller.extend("be.amista.carmanagecarsui.controller.CarList", {
            onInit: function () {
                // set message model
                let oMessageManager = this.getMessageManager();
                this.setModel(oMessageManager.getMessageModel(), "message");
            },

            /**
             * When the user presses the button to add a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handlePressAddCarButton: function (oEvent) {
                let oMessageManager = this.getMessageManager();
                oMessageManager.removeAllMessages();
                let oDialog = this.getView().byId("idAddCarDialog");
                let oListBinding = this.getView().byId("idCarsTable").getBinding("items");
                let oContext = oListBinding.create({
                    "VIN": "test",
                    "MAKE": "test",
                    "MODEL": "test",
                    "TO_CAR_TYPE_ID": 1,
                    "COLOR": "test",
                }, undefined, undefined, true);
                oDialog.setBindingContext(oContext);
                oDialog.open();
                // activate automatic message generation for the complete dialog
                oMessageManager.registerObject(this.getView().byId("idAddCarDialog"), true);
            },

            /**
             * When the user presses the button to confirm adding a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handleAddCarDialogConfirm: async function (oEvent) {
                try {
                    await this.getModel().submitBatch("carGroup");
                    const oDialog = this.getView().byId("idAddCarDialog");
                    await oDialog.getBindingContext().created();
                    oDialog.close();
                } catch (error) {
                    console.error(error);
                }              
            },

            /**
             * When the user presses the button to cancel adding a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handleAddCarDialogCancel: function () {
                this.getModel().resetChanges("carGroup");
                this.getView().byId("idAddCarDialog").close();
                this.getMessageManager().removeAllMessages();
                this.getView().byId("idAddCarDialog").close();
            },
            
            /**
             * When the user presses the button to delete a car from the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handlePressDeleteCarButton: function(oEvent) {
                let oBindingContext = oEvent.getSource().getBindingContext();
                let oCar = oBindingContext.getObject();

                let sWarningMessage = `Delete ${oCar.MAKE} ${oCar.MODEL} (${oCar.VIN})?`;
                MessageBox.warning(sWarningMessage, {
                    actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.DELETE,
                    onClose: function (sAction) {
                        if (sAction === "DELETE") {
                            oBindingContext.delete("$auto");
                        }
                    }
                });
            },

            /**
             * When the user searches in the cars table.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            onCarsTableSeach: function(oEvent) {
                let oCarsTable = this.getView().byId("idCarsTable");
                let sValue = oEvent.getSource().getValue();
                let oFilter = 
                    new Filter({
                        path: 'MAKE',
                        operator: FilterOperator.Contains,
                        value1: sValue,
                        caseSensitive: false,
                    });
    
                oCarsTable.getBinding("items").filter(oFilter, FilterType.Application);
            },

            /**
             * Custom model type for validating an E-Mail address
             * @class
             * @extends sap.ui.model.SimpleType
             */
            vinType: SimpleType.extend("vin", {
                formatValue: function (oValue) {
                    return oValue;
                },

                parseValue: function (oValue) {
                    //parsing step takes place before validating step, value could be altered here
                    return oValue;
                },

                validateValue: function (oValue) {
                    // The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
                    // It's always better to validate an address by simply sending an e-mail to it.
                    var rexMail = "[A-Ha-hJ-Nj-nPR-Zr-z0-9]{13}[0-9]{4}";
                    if (!oValue.match(rexMail)) {
                        throw new ValidateException("'" + oValue + "' is not a valid VIN number.");
                    }
                }
            }),
        });
    });
