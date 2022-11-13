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

            /**
             * When the user presses the button to confirm addin a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
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

            /**
             * When the user presses the button to cancel adding a car to the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handleAddCarDialogCancel: function () {
                if (this._addDialog) {
                    this.getView().byId("idAddCarDialog").close();
                }
            },
            
            /**
             * When the user presses the button to delete a car from the system.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
            handlePressDeleteCarButton: function(oEvent) {
                var oBindingContext = oEvent.getSource().getBindingContext();
                oBindingContext.delete();
            },

            /**
             * When the user searches in the cars table.
             * 
             * @param {Object} oEvent - The click event supplied by the view.
             */
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
        });
    });
