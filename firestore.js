import { collection, getDocs, getDoc, doc, deleteDoc, setDoc, where, query } from "firebase/firestore";
import { auth, db } from "./firebase";

const EXPENSES_COLLECTION = 'expenses'
const BUDGET_COLLECTION = 'budgets'
const USERS_COLLECTION = 'users'
const ALLGROUPS_COLLECTION = 'allgroups'
const GROUPS_COLLECTION = 'groups'
const MEMBERS_COLLECTION = 'members'

export async function addExpense(uid, id, name, cost, date, category) {
    const userRef = collection(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION)
    setDoc(doc(userRef, id), { uid, id, name, cost, date, category });
}

export async function getExpense(uid) {
    const expenses = collection(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION);
    const querySnapshot = await getDocs(expenses);
    let allExpenses = [];
    for (const documentSnapshot of querySnapshot.docs) {
        const expense = documentSnapshot.data();
        allExpenses.push({
            id: expense.id,
            name: expense.name,
            cost: expense.cost,
            date: expense.date.toDate(),
            category: expense.category
        })
    }
    return allExpenses;
}

export async function deleteExpense(uid, id) {
    deleteDoc(doc(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION, id));
}

export async function editBudget(uid, budget) {
    setDoc(doc(db, USERS_COLLECTION, uid, BUDGET_COLLECTION, uid), { uid, budget });
}

export async function getBudget(uid) {
    const expenses = collection(db, USERS_COLLECTION, uid, BUDGET_COLLECTION);
    const querySnapshot = await getDocs(expenses);
    let budget;
    for (const documentSnapshot of querySnapshot.docs) {
        budget = documentSnapshot.data().budget;
    }
    return budget;
}

//EASYSPLIT


export async function addUserInfo(uid, email, username) {
    setDoc(doc(db, USERS_COLLECTION, uid), { uid, email, username });
}

export async function getUserInfo(uid) {
    const docRef = doc(db, USERS_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();

}


export async function createGroup(uid, groupID, groupName, email) {

    const groupRef = collection(db, ALLGROUPS_COLLECTION)
    setDoc(doc(groupRef, groupID), { ownerUID: uid, groupID, groupName })
    const membersRef = collection(db, ALLGROUPS_COLLECTION, groupID, MEMBERS_COLLECTION)
    setDoc(doc(membersRef, uid), { uid, role: 'owner', email })
    const userRef = collection(db, USERS_COLLECTION, uid, GROUPS_COLLECTION)
    setDoc(doc(userRef, groupID), { groupID, groupName, role: 'owner' })
}

export async function addGroupMember(uid, groupID, groupName, email) {
    const membersRef = collection(db, ALLGROUPS_COLLECTION, groupID, MEMBERS_COLLECTION)
    setDoc(doc(membersRef, uid), { uid, role: 'member', email })
    const userRef = collection(db, USERS_COLLECTION, uid, GROUPS_COLLECTION)
    setDoc(doc(userRef, groupID), { groupID, groupName, role: 'member', email })
}

export async function emailToID(email) {
    const users = query(collection(db, USERS_COLLECTION), where("email", "==", email));
    const querySnapshot = await getDocs(users);
    let uid;

    for (const documentSnapshot of querySnapshot.docs) {

        uid = documentSnapshot.data().uid;
    }
    return uid;
}



export async function getGroups(uid) {
    const groups = collection(db, USERS_COLLECTION, uid, GROUPS_COLLECTION);
    const querySnapshot = await getDocs(groups);
    let allGroups = [];
    for (const documentSnapshot of querySnapshot.docs) {
        const group = documentSnapshot.data();
        allGroups.push({
            groupID: group.groupID,
            groupName: group.groupName,
        })
    }

    return allGroups;
}

export async function getGroupInfo(groupID) {
    const docRef = doc(db, ALLGROUPS_COLLECTION, groupID);

    const docSnap = await getDoc(docRef);
    return docSnap.data();

}

export async function getAllGroupMembers(groupID) {
    const members = collection(db, ALLGROUPS_COLLECTION, groupID, MEMBERS_COLLECTION);
    const querySnapshot = await getDocs(members);

    let allMembers = [];
    for (const documentSnapshot of querySnapshot.docs) {
        const member = documentSnapshot.data();
        allMembers.push({
            uid: member.uid,
            email: member.email,
            role: member.role
        })
    }

    return allMembers;
}

export async function deleteMember(uid, groupID) {
    deleteDoc(doc(db, USERS_COLLECTION, uid, GROUPS_COLLECTION, groupID));
    deleteDoc(doc(db, ALLGROUPS_COLLECTION, groupID, MEMBERS_COLLECTION, uid));
}

/*
export asnyc function deleteGroup(groupID) {
    //get list of uid 
    const members = collection(db, ALLGROUPS_COLLECTION, groupID, MEMBERS_COLLECTION);
    const querySnapshot = await getDocs(members);

    let allMembers = [];
    for (const documentSnapshot of querySnapshot.docs) {
        const member = documentSnapshot.data();
        allMembers.push({
            member.uid,
        })
    for (memberUID in allMembers) {
        deleteDoc(doc(db, USERS_COLLECTION, memberUID, GROUPS_COLLECTION, groupID));}

 //deleting doc will not delete the sub collection
    deleteDoc(doc(db, ALLGROUPS_COLLECTION, groupID));
   
}
*/

/*

export asnyc function addGroupExpense(groupID, uid, id, name, cost, date, deadline, splitData)
    const groupRef = collection(db, ALLGROUPS_COLLECTION, groupID, GROUPEXPENSES_COLLECTION)
    setDoc(doc(groupRef, id), { uid, id, name, cost, date, deadline, splitDate });
    //Do we need subcolletion? Maybe if we doing indivdual management like who paid...
*/
