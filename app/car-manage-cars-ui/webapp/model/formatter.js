sap.ui.define([

], function () {
    "use strict";

    return {
        formateDateOdataV4: function (sValue) {
            if (sValue == undefined || sValue == "") return null;
            return new Date(sValue);
        },
    };
});
