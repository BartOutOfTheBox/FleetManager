sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, FilterType) {
        "use strict";

        return Controller.extend("be.amista.carmanagecarsui.controller.CarList", {
            onInit: function () {

            },

            /**
             * When the user presses the button to add a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handlePressAddCarButton: function (oEvent) {
                // lazy loading
                if (!this._addDialog) {
                    this._addDialog = this.loadFragment({
                        name: "be.amista.carmanagecarsui.fragment.AddCarDialog",
                    });
                }
                
                // open dialog
                this._addDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            handleAddCarDialogConfirm: function (oEvent) {
                var oEntry = {
                    "VIN": this.getView().byId("idAddCarDialogVINInput").getValue(),
                    "MAKE": this.getView().byId("idAddCarDialogMakeInput").getValue(),
                    "MODEL": this.getView().byId("idAddCarDialogModelInput").getValue(),
                    "CAR_TYPE_ID": parseInt(this.getView().byId("idAddCarDialogTypeInput").getSelectedKey()),
                    "COLOR": this.getView().byId("idAddCarDialogColorInput").getValue()
                };
                
                var oBindingContext =this.getView().byId("idCarsTable").getBinding("items");
                oBindingContext.create(oEntry);

                this.getView().byId("idAddCarDialog").close();
            },

            handleAddCarDialogCancel: function () {
                if (this._addDialog) {
                    this.getView().byId("idAddCarDialog").close();
                }
            },

            onCarsTableSeach: function(oEvent) {
                var oCarsTable = this.getView().byId("idCarsTable");
                var sValue = oEvent.getSource().getValue();
                var oFilter = 
                    new Filter({
                        path: 'MAKE',
                        operator: FilterOperator.Contains,
                        value1: sValue,
                        caseSensitive: false,
                    });

                oCarsTable.getBinding("items").filter(oFilter, FilterType.Application);
            },

            handlePressDeleteCarButton: function(oEvent) {
                var oBindingContext = oEvent.getSource().getBindingContext();
                oBindingContext.delete();
            },
        });
    });
