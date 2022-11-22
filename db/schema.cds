context DATA {
    entity CAR {
        key VIN             : String(17) @assert.format: '[A-Ha-hJ-Nj-nPR-Zr-z0-9]{13}[0-9]{4}';
            MODEL           : Association to CAR_MODEL;
            COLOR           : String(50);
            PRODUCTION_DATE : Date;
    };

    entity CAR_MODEL {
        key NAME        : String(100) not null;
        key MAKE        : String(100) not null;
        key VERSION     : Integer;
            TO_CAR_TYPE : Association to CAR_TYPE;
    };

    entity CAR_TYPE {
        key NAME    : String(50);
        DOOR_COUNT  : Integer;
    }
}
