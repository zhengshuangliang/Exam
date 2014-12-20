/*jshint unused: false */
/* exported staffTypeEnum, adminTabEnum, selectOptionEnum, staffStatusEnum, environmentEnum, locationTypeEnum */

var staffTypeEnum = {
    employee: 1,
    contractor: 2,
    intern: 3
};

var staffTitleEnum = {
    engineerSoftwareI: 11,
    engineerSoftwareII: 12,
    engineerSoftwareIII: 13,
    engineerSoftwareIV: 14,
    engineerSoftwareStaff: 15,
    engineerSoftwareStaffSenior: 16
}

var adminTabEnum = {
    staff: 0,
    projects: 1,
    versions: 2,
    productFamily: 3
};

var selectOptionEnum = {
    selectOne: -1,
    addNew: -2,
    notApplicable: -3,
    error: -4,
    loading: -5,
    noneFound: -6
};

var staffStatusEnum = {
    active: 1,
    transferred: 2,
    separated: 3
};

var environmentEnum = {
    test: 1,
    production: 2
};

var locationTypeEnum = {
    staffAllocation: 1,
    staffAdministration: 2
};