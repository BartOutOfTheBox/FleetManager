sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/core/UIComponent", 
    "be/amista/carmanagecarsui/model/formatter"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, UIComponent, formatter) {
        "use strict";

        return Controller.extend("be.amista.carmanagecarsui.controller.BaseController", {
            formatter: formatter,

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} [sName] the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
             * Convenience method for getting the message manager.
             * @public
             * @returns {sap.ui.core.message.MessageManager} the default Message Manager
             */
            getMessageManager: function () {
                return sap.ui.getCore().getMessageManager();
            },
        });
    }
);
