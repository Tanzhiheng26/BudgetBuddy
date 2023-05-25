import { addDoc, collection, getDocs, getDoc, query, where, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const EXPENSES_COLLECTION = 'expenses'
const BUDGET_COLLECTION = 'budgets'
const USERS_COLLECTION = 'users'

export async function addExpense(uid, id, name, cost) {
    const userRef = collection(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION)
    await setDoc(doc(userRef, id), { uid, id, name, cost });
    /*
    addDoc(collection(db, EXPENSES_COLLECTION), { uid, id, name, cost });
    */
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
        })
    }
    return allExpenses;

    /*
        const expenses = query(collection(db, EXPENSES_COLLECTION), where("uid", "==", uid));
        const querySnapshot = await getDocs(expenses);
        let allExpenses = [];
        for (const documentSnapshot of querySnapshot.docs) {
            const expense = documentSnapshot.data();
            allExpenses.push({
                id: expense.id,
                name: expense.name,
                cost: expense.cost,
            })
        }
        return allExpenses;
    */
}

export async function deleteExpense(uid, id) {
    /*
    const toDelete = query(collection(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION), where("id", "==", id));
    const querySnapshot = await getDocs(toDelete);
    let docId;
    for (const documentSnapshot of querySnapshot.docs) {
        docId = documentSnapshot.id;
    }
    */
    deleteDoc(doc(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION, id));

    /*
    const toDelete = query(collection(db, EXPENSES_COLLECTION), where("id", "==", id));
    const querySnapshot = await getDocs(toDelete);
    let docId;
    for (const documentSnapshot of querySnapshot.docs) {
        docId = documentSnapshot.id;
    }
    deleteDoc(doc(db, EXPENSES_COLLECTION, docId));
    */
}

export async function editBudget(uid, budget) {
    await setDoc(doc(db, USERS_COLLECTION, uid, BUDGET_COLLECTION, uid), { uid, budget });



    /*
    const expenses = query(collection(db, BUDGET_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(expenses);
    let docId;
    for (const documentSnapshot of querySnapshot.docs) {
        docId = documentSnapshot.id;
    }
    await setDoc(doc(db, BUDGET_COLLECTION, uid), { uid, budget });
*/
}

/*
const expenses = query(collection(db, BUDGET_COLLECTION), where("uid", "==", uid));
const querySnapshot = await getDocs(expenses);
let docId;
for (const documentSnapshot of querySnapshot.docs) {
    docId = documentSnapshot.id;
}
if (!docId) {
    addDoc(collection(db, BUDGET_COLLECTION), { uid, budget });
} else {
    updateDoc(doc(db, BUDGET_COLLECTION, docId), { budget: budget })
}
*/


export async function getBudget(uid) {
    const expenses = collection(db, USERS_COLLECTION, uid, BUDGET_COLLECTION);
    const querySnapshot = await getDocs(expenses);
    let budget;
    for (const documentSnapshot of querySnapshot.docs) {
        budget = documentSnapshot.data().budget;
    }
    return budget;


    /*
    const expenses = query(collection(db, BUDGET_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(expenses);
    let budget;
    for (const documentSnapshot of querySnapshot.docs) {
        budget = documentSnapshot.data().budget;
    }
    return budget;
    */
}  