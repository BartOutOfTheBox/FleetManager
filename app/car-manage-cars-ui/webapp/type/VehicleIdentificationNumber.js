sap.ui.define([
    "sap/ui/model/SimpleType",
    "sap/ui/model/ValidateException",
], 
    function(SimpleType, ValidateException) {
	"use strict";

    /**
     * Custom model type for validating an E-Mail address
     * @class
     * @extends sap.ui.model.SimpleType
     */
     return SimpleType.extend("be.amista.carmanagecarsui.type.VehicleIdentificationNumber", {
        /**
        * Displaying data from the right model (model -> view)
        */
        formatValue: function (oValue) {
            return oValue;
        },

        /**
        * Assigning entered value to the right model (view -> model)
        */
        parseValue: function (oValue) {
            //parsing step takes place before validating step, value could be altered here
            return oValue;
        },

        /**
         * Validate the input value
         * 
         * @param {*} oValue 
         */
        validateValue: function (oValue) {
            // Regex to match vin numbers: 13 chars and 4 digits
            var sVinRegex = "[A-Ha-hJ-Nj-nPR-Zr-z0-9]{13}[0-9]{4}";
            if (!oValue.match(sVinRegex)) {
                throw new ValidateException("'" + oValue + "' is not a valid VIN number.");
            }
        }
    });
});
