sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
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
                if (!this._addDialog) {
                    this._addDialog = this.loadFragment({
                        name: "be.amista.carmanagecarsui.fragment.AddCarDialog",
                    });
                }
    
                this._addDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            handleAddCarDialogConfirm: function (oEvent) {
                var oEntry = {
                    "VIN": this.getView().byId("idAddCarDialogVINInput").getValue(),
                    "MAKE": this.getView().byId("idAddCarDialogMakeInput").getValue(),
                    "MODEL": this.getView().byId("idAddCarDialogModelInput").getValue(),
                    "COLOR": this.getView().byId("idAddCarDialogColorInput").getValue()
                };
                var oCarsList = this.getModel().bindList("/Cars");
                var oNewContext = 
                    oCarsList.create(oEntry);
                this.getView().byId("idAddCarDialog").close();
            },

            handleAddCarDialogCancel: function () {
                if (this._addDialog) {
                    this.getView().byId("idAddCarDialog").close();
                }
            },
        });
    });
