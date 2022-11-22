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
                this._setViewModel();
            },

            _setViewModel: function () {
                let oData = {
                    today: new Date(),
                    mode: "browse",
                };
                let oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel, "viewModel");
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
                let dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd" }); 
                let oContext = oListBinding.create({
                    "VIN": null,
                    "TO_CAR_MODEL_MAKE": null,
                    "TO_CAR_MODEL_NAME": null,
                    "TO_CAR_MODEL_VERSION": null,
                    // "TO_CAR_TYPE_ID": 1,
                    "COLOR": null,
                    "PRODUCTION_DATE": dateFormat.format(new Date()),
                });
                this.getModel("viewModel").setProperty("/mode", "create");
                oDialog.setBindingContext(oContext);
                oDialog.open();
                // activate automatic message generation for the complete dialog
                oMessageManager.registerObject(this.getView().byId("idAddCarDialog"), true);
            },

            /**
             * When the user presses the a car from the table.
             * 
             * @param {Object} oEvent - The press event supplied by the view.
             */
            handlePressCar: function (oEvent) {
                let oMessageManager = this.getMessageManager();
                oMessageManager.removeAllMessages();                
                let oBindingContext = oEvent.getSource().getBindingContext();
                let oDialog = this.getView().byId("idAddCarDialog");
                this.getModel("viewModel").setProperty("/mode", "edit");
                oDialog.setBindingContext(oBindingContext);
                oDialog.open();
                // activate automatic message generation for the complete dialog
                oMessageManager.registerObject(this.getView().byId("idAddCarDialog"), true);
            },

            closeAddCarDialog: function (oEvent) {
                const oDialog = this.getView().byId("idAddCarDialog");
                if (oDialog.isOpen()) oDialog.close();
            },

            /**
             * Before the Add/Edit car dialog is closed
             * 
             * @param {Object} oEvent - the event
             */
             afterAddCarDialogClose: function (oEvent) {
                let oClickedButton = oEvent.getParameter("origin");
                if (oClickedButton == null) this.handleAddCarDialogCancel();
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
                    const oBindingContext = oDialog.getBindingContext();
                    await oBindingContext.created();
                    this.closeAddCarDialog();
                    if (this.getModel("viewModel").getProperty("/mode") === "edit") {
                        oBindingContext.refresh();
                    }
                    this.getModel("viewModel").setProperty("/mode", "browse");
                } catch (oError) {
                    console.log(oError.message);
                }              
            },

            /**
             * When the user presses the button to cancel adding a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handleAddCarDialogCancel: function () {
                this.getModel().resetChanges("carGroup");
                this.closeAddCarDialog();
                this.getModel("viewModel").setProperty("/mode", "browse");
                this.getMessageManager().removeAllMessages();
            },
            
            /**
             * When the user presses the button to delete a car from the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handlePressDeleteCarButton: function(oEvent) {
                let that = this;
                this.getModel("viewModel").setProperty("/mode", "delete");
                let oBindingContext = oEvent.getSource().getBindingContext();
                let oCar = oBindingContext.getObject();

                let sWarningMessage = `Delete ${oCar.TO_CAR_MODEL_MAKE} ${oCar.TO_CAR_MODEL_NAME} (${oCar.VIN})?`;
                MessageBox.warning(sWarningMessage, {
                    actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.DELETE,
                    onClose: function (sAction) {
                        if (sAction === "DELETE") {
                            oBindingContext.delete("$auto");
                        }
                        that.getModel("viewModel").setProperty("/mode", "browse");
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
                let sFilterValue = oEvent.getSource().getValue();
                const aFilterFields = ["VIN", "TO_CAR_MODEL_MAKE", "TO_CAR_MODEL_NAME"];
                const aFilters = aFilterFields.map((sFilterField) => {
                    return (
                        new Filter({
                            path: sFilterField,
                            operator: FilterOperator.Contains,
                            value1: sFilterValue,
                            caseSensitive: false,
                        })
                    );
                });
                let oFilter = new Filter(aFilters);
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
                    // Regex to match vin numbers: 13 chars and 4 digits
                    var sVinRegex = "[A-Ha-hJ-Nj-nPR-Zr-z0-9]{13}[0-9]{4}";
                    if (!oValue.match(sVinRegex)) {
                        throw new ValidateException("'" + oValue + "' is not a valid VIN number.");
                    }
                }
            }),
        });
    });
