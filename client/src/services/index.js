
export { default as api } from './api';

import * as authServiceModule from './authService';
export const authService = authServiceModule;

import * as majorServiceModule from './majorService';
export const majorService = majorServiceModule;

import * as applicationServiceModule from './applicationService';
export const applicationService = applicationServiceModule;

import * as facultyServiceModule from './facultyService';
export const facultyService = facultyServiceModule;

import * as userServiceModule from './userService';
export const userService = userServiceModule;

import * as roleServiceModule from './roleService';
export const roleService = roleServiceModule;

import * as chatServiceModule from './chatService';
export const chatService = chatServiceModule;

import * as statisticsServiceModule from './statisticsService';
export const statisticsService = statisticsServiceModule;

import * as subjectGroupServiceModule from './subjectGroupService';
export const subjectGroupService = subjectGroupServiceModule;

import * as admissionMethodServiceModule from './admissionMethodService';
export const admissionMethodService = admissionMethodServiceModule;

import * as historicalScoreServiceModule from './historicalScoreService';
export const historicalScoreService = historicalScoreServiceModule;

import * as postServiceModule from './postService';
export const postService = postServiceModule;

import * as categoryServiceModule from './categoryService';
export const categoryService = categoryServiceModule;

import * as candidateServiceModule from './candidateService';
export const candidateService = candidateServiceModule;

import * as applicationDocumentServiceModule from './applicationDocumentService';
export const applicationDocumentService = applicationDocumentServiceModule;

import * as majorSubjectMappingServiceModule from './majorSubjectMappingService';
export const majorSubjectMappingService = majorSubjectMappingServiceModule;

export default {
    authService: authServiceModule,
    majorService: majorServiceModule,
    applicationService: applicationServiceModule,
    facultyService: facultyServiceModule,
    userService: userServiceModule,
    roleService: roleServiceModule,
    chatService: chatServiceModule,
    statisticsService: statisticsServiceModule,
    subjectGroupService: subjectGroupServiceModule,
    admissionMethodService: admissionMethodServiceModule,
    historicalScoreService: historicalScoreServiceModule,
    postService: postServiceModule,
    categoryService: categoryServiceModule,
    candidateService: candidateServiceModule,
    applicationDocumentService: applicationDocumentServiceModule,
    majorSubjectMappingService: majorSubjectMappingServiceModule
};
