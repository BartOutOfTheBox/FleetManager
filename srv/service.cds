using DATA from '../db/schema';

service CatalogService @(requires: 'authenticated-user') {
    entity Cars
        as projection on DATA.CAR;

    entity CarModels
        as projection on DATA.CAR_MODEL;

    @readonly 
    entity CarTypes
        as projection on DATA.CAR_TYPE;
}
