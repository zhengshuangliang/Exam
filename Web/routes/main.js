'use strict';
/**
* MODULE DEPENDENCIES
* -------------------------------------------------------------------------------------------------
* include any modules you will use through out the file
**/
var app = require('../server')
    , index = require('./index')
    , exam = require('./exam')
//    , activities = require('./activities')
//    , regions = require('./regions')
//    , productFamilies = require('./productFamilies')
//    , projects = require('./projects')
//    , versions = require('./versions')
//    , projectReview = require('./projectReview')
//    , staffMembers = require('./staffMembers')
//    , managers = require('./managers')
//    , teamSheets = require('./teamSheets')
//    , allocationOptions = require('./allocationOptions')
//    , staffTitles = require('./staffTitles')
//    , staffTypes = require('./staffTypes')
//    , officeLocations = require('./officeLocations')
//    , costCenters = require('./costCenters')
//    , productVerticals = require('./productVerticals')
//    , staffRoles = require('./staffRoles')
//    , admin = require('./admin')
//    , staffStatuses = require('./staffStatuses')
//    , bands = require('./bands')
//    , errorReporter = require('./errorReporter')
//    , passport = require('passport')
//    , flash = require('connect-flash')
//    , winston = require('winston')
//    , logout = require('./logout')
//    , feature = require('./feature')
//    , scrumTeam = require('./scrumTeam')
//    , department = require('./department')
//    , consultingFirms = require('./consultingFirms')
//    , loginQueryString = require('./loginQueryString')
//    , staffingTrends = require('./staffingTrends')
    ;



/**
* Authorization (Middleware)
* -------------------------------------------------------------------------------------------------
*
**/
function restrict(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.send('Unauthorized', 403); // send 403 http status.
    }
}




/**
* ROUTING
* -------------------------------------------------------------------------------------------------
* include a route file for each major area of functionality in the site
**/

app.get('/', index.index);
app.get('/exam/:examId/data', exam.getExamData)
app.get('/exam/:examId', exam.index)
//
//app.post('/errorReporter', errorReporter.logError);
//
//app.get('/login', login.index);
//app.post('/login', passport.authenticate('nopassword', { failureRedirect: '/login', failureFlash: true }), login.authenticate);
//
//app.get('/loginPage', loginQueryString.loginQString);
//
//app.get('/logout', logout.index);
//
//app.get('/activities/:staffID', restrict, activities.listActivities);
//app.get('/staffMembers/:staffID/activities', restrict, activities.listActivitiesByStaff);
//
//app.get('/regions', restrict, regions.listRegions);
//
//app.get('/regions/:regionID/officeLocations', restrict, officeLocations.listOfficeLocationsByRegion);
//
//app.get('/productFamilies', restrict, productFamilies.listProductfamilies);
//app.post('/productFamilies', restrict, productFamilies.upsertProductFamily);
//app.del('/productFamilies/:productFamilyID', restrict, productFamilies.deleteProductFamily);
//
//app.get('/productFamilies/:productfamilyID/projects', restrict, projects.listProjectsByProductFamily);
//app.get('/staffMembers/:staffID/project', restrict, projects.getStaffProject);
//app.post('/projects', restrict, projects.upsertProject);
//app.del('/projects/:projectID', restrict, projects.deleteProject);
//
//app.get('/projects/:projectID/versions', restrict, versions.listVersionsByProject);
//app.post('/versions', restrict, versions.upsertVersion);
//app.del('/versions/:versionID', restrict, versions.deleteVersion);
//
//app.post('/projectReview', restrict, projectReview.addProjectReviewProperty);
//app.get('/projectReview/:versionID/histProjectReview', restrict, projectReview.histProjectReviewProperty);
//app.get('/projectReview',projectReview.index);
//app.get('/projectReview/productFamilies', restrict, projectReview.listProjectReviewProductFamily);
//app.get('/projectReview/:productFamilyID/projects', restrict, projectReview.listProjectReviewProjects);
//app.get('/projectReview/:versionID/projectReviewSummary', restrict, projectReview.getProjectReviewSummary);
//app.get('/projectReview/:projectID/releases', restrict, projectReview.listProjectReviewReleases);
//app.get('/projectReview/staff/productFamilyAndProject', restrict, projectReview.getProductFamilyAndProject);
//app.del('/projectReview/:propertyIDList', restrict, projectReview.deleteProjectReviewProperty);
//app.post('/projectReview/projectSummary', restrict, projectReview.modifyProjectReviewSummary);
//
//app.get('/staffMembers/:staffID', restrict, staffMembers.listStaffMember);
//app.get('/staffMembers', restrict, staffMembers.searchStaffMembers);
//app.post('/staffMembers', restrict, staffMembers.upsertStaffMember);
//app.get('/managers/:managerID/staffMembers/:locationTypeID', restrict, staffMembers.listStaffMembersByManager);
//app.get('/directors/:departmentID', restrict, staffMembers.listDirectors);
//
//app.get('/managers', restrict, managers.listManagers);
//app.get('/managers/:managerID', managers.listManagersReportingToManager);
//
//app.get('/teamSheets', teamSheets.index);
//app.get('/managers/:managerID/teamSheets', teamSheets.listTeamSheetsByManagerByWeekEndingDate);
//app.get('/managers/:managerID/lastModifiedWeekEndingDate', teamSheets.getLastModifiedWeekEndingDate);
//app.post('/teamSheets', teamSheets.addTeamSheet);
//app.del('/teamSheets', restrict, teamSheets.deleteTeamSheetsByID);
//
//app.get('/allocationOptions', restrict, allocationOptions.listAllocationOptions);
//
//app.get('/staffTitles/:departmentID', restrict, staffTitles.listStaffTitles);
//
//app.get('/staffTypes', restrict, staffTypes.listStaffTypes);
//
//app.get('/consultingFirms', restrict, consultingFirms.listConsultingFirms);
//
//app.get('/costCenters/:departmentID', restrict, costCenters.listCostCenters);
//
//app.get('/productVerticals/:departmentID', restrict, productVerticals.listProductVerticals);
//
//app.get('/staffRoles/:departmentID', restrict, staffRoles.listStaffRoles);
//
//app.get('/admin', admin.index);
//
//app.get('/staffStatuses', restrict, staffStatuses.listStaffStatuses);
//
//app.get('/bands/:TypeID', restrict, bands.listBands);
//app.get('/version/:versionID/versionDetail', restrict, versions.getVersionDetail);
//
//
//app.get('/feature', feature.index);
//app.get('/featurelist', feature.listFeatures);
//app.get('/featureSizeList', feature.listSize);
//app.get('/featureBusinessNeedList', feature.listBusinessNeed);
//app.post('/feature', feature.addFeature);
//app.del('/feature', feature.addFeature);
//app.put('/feature', feature.addFeature);
//
//app.post('/scrumTeam', restrict, scrumTeam.upsertScrumTeam);
//app.del('/scrumTeam/:scrumTeamID', restrict, scrumTeam.deleteScrumTeam);
//app.get('/scrumTeam/:managerID', restrict, scrumTeam.listScrumTeamsByManager);
//app.get('/scrumTeamDetail/:scrumTeamID', restrict, scrumTeam.listScrumTeam);
//app.post('/scrumTeamStaffAdmin', restrict, scrumTeam.upsertScrumTeamStaffAdmin);
//app.get('/scrumTeamStaffAdmin', restrict, scrumTeam.listScrumTeams);
//
//app.get('/department', restrict, department.listDepartments);
//
//app.get('/staffingTrends',staffingTrends.index);

