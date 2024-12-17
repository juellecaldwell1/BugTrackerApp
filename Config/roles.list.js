const ROLES_LIST = {
    "Developer": [
     "canViewData",
     "canCreateBug",
     "canEditMyBug",
     "canEditIfAssignedTo",
     "canReassignIfAssignedTo",
     "canAddComments",
     "canLogHoursOnBugs"
    ],
    "Business Analyst": [
     "canViewData",
     "canCreateBug",
     "canEditAnyBug",
     "canCloseAnyBug",
     "canClassifyAnyBug",
     "canReassignAnyBug",
     "canEditMyBug",
     "canEditIfAssignedTo",
     "canReassignIfAssignedTo",
     "canAddComments",
     "canAssignStepsToFix",
     "canLogHoursOnBugs"
    ],
    "Quality Analyst": [
      "canViewData",
      "canCreateBug",
      "canEditMyBug",
      "canEditIfAssignedTo",
      "canReassignIfAssignedTo",
      "canAddComments",
      "canAddTestCase",
      "canEditTestCase",
      "canDeleteTestCase",
      "canLogHoursOnBugs"
    ],
    "Product Manager": [
    "canViewData",
    "canCreateBug",
    "canEditMyBug",
    "canEditIfAssignedTo",
    "canReassignIfAssignedTo",
    "canAddComments",
    "canLogHoursOnBugs"
    ],
    "Technical Manager":[
    "canEditAnyUser",
    "canViewData",
    "canAssignRoles",
    "canCreateBug",
    "canReassignAnyBug",
    "canEditMyBug",
    "canEditIfAssignedTo",
    "canReassignIfAssignedTo",
    "canAddComments",
    "canDeleteBugs",
    "canAssignStepsToFix",
    "canLogHoursOnBugs"
    ]
};

export default ROLES_LIST