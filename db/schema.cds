context DATA {
    entity CAR {
        key VIN             : String(17);
            MAKE            : String(100) not null;
            MODEL           : String(100);
            TO_CAR_TYPE     : Association to CAR_TYPE;
            COLOR           : String(50);
            PRODUCTION_DATE : Date;
    };

    entity CAR_TYPE {
        key ID      : Integer;
        TYPE        : String(50);
        DOOR_COUNT  : Integer;
    }
}
