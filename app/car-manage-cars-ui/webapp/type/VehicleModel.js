sap.ui.define([
    "sap/ui/model/CompositeType",
], function(CompositeType) {
	"use strict";

    /**
     * Custom model type for car models
     * @class
     * @extends sap.ui.model.CompositeType
     */
     return CompositeType.extend("be.amista.carmanagecarsui.type.VehicleModel", {
                
        constructor: function() {
            CompositeType.apply(this, arguments);
            this.bParseWithValues = true; // make 'parts' available in parseValue
        },

        /**
        * Displaying data from the right model (model -> view)
        */
        formatValue: function (parts) {
            return `${parts[0]}, ${parts[1]}`;
        },

        /**
        * Assigning entered value to the right model (view -> model)
        */
        parseValue: function (vValue, sTargetType) {
            return vValue.split(', ');
        },

        validateValue: function () {

        },
     });
});
