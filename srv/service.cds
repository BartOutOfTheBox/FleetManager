using DATA from '../db/schema';

service CatalogService @(requires: 'authenticated-user') {
    entity Cars
        as projection on DATA.CAR;

    @readonly 
    entity CarTypes
        as projection on DATA.CAR_TYPE;
}
