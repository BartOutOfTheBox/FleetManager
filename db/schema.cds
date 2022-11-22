context DATA {
    entity CAR {
        key VIN             : String(17) @assert.format: '[A-Ha-hJ-Nj-nPR-Zr-z0-9]{13}[0-9]{4}';
            MAKE            : String(100) not null;
            MODEL           : String(100) not null;
            TO_CAR_TYPE     : Association to CAR_TYPE;
            COLOR           : String(50);
            PRODUCTION_DATE : Date;
    };

    entity CAR_MODEL {
        key MAKE        : String(100) not null;
        key MODEL       : String(100) not null;
        key VERSION     : Integer;
            TO_CAR_TYPE : Association to CAR_TYPE;
    };

    entity CAR_TYPE {
        key ID      : Integer;
        TYPE        : String(50);
        DOOR_COUNT  : Integer;
    }
}
