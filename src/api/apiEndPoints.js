export const BASE_URL = process.env.BASE_URL;
export const SIGN_IN = "API/Account/authenticate";
export const GET_MY_TASKS = "API/Task/UserTasksAssignedToMe";
export const GET_LEADS = "API/CRM/Leads";
export const GET_COMPONY_MEM = "API/CompanyMembers";
export const GET_TASK_STATUS_FOR_PARTIAL = "API/Task/UserTaskStatusMaster"; //get which gives percentage
export const POST_UPDATE_TASK = "API/Task/UpdateTaskStatus"; //post// for accepting the and submitting form with completion %
export const POST_MY_TEAM = "API/CRM/MyTeam";
// post this data to get My teams
// {
//     "from": 1,
//     "to": -1,
//     "text": ""
// }
// to complete
// {
//     "TaskId": 869,
//     "TaskStatusValue": 100
// }
// ///gives status 100
// to accept only
// {
//     "TaskId": 868,
//     "TaskStatusValue": 0
// }
// // 0 status Accepted
// to partial
// {
//     "TaskId": 868,
//     "TaskStatusValue": 80 // percentage
// }
//status 80
//partial complete(80%)

// not accepted -1

//archieve ,  , view task coverage , delete in all
// complete and partial in when status is partial complet or accepted means status 0 or in 80 , 70 etc means not equal to 100 or -1
// accept button in only when status == -1
// status = completd  when ==100
// status = accepted when ==0
// status = not accepted when === -1
//  status = partial complete(80%) when not equal to 0 and -1 and 100
