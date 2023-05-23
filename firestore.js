import { addDoc, collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const EXPENSES_COLLECTION = 'expenses'
const BUDGET_COLLECTION = 'budgets'

export function addExpense(uid, id, name, cost) {
    addDoc(collection(db, EXPENSES_COLLECTION), { uid, id, name, cost });
}  

export async function getExpense(uid) {
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
}

export async function deleteExpense(id) {
    const toDelete = query(collection(db, EXPENSES_COLLECTION), where("id", "==", id));
    const querySnapshot = await getDocs(toDelete);
    let docId;
    for (const documentSnapshot of querySnapshot.docs) {
        docId = documentSnapshot.id;
    }
    deleteDoc(doc(db, EXPENSES_COLLECTION, docId));
}

export async function editBudget(uid, budget) {
    const expenses = query(collection(db, BUDGET_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(expenses);
    let docId;
    for (const documentSnapshot of querySnapshot.docs) {
        docId = documentSnapshot.id;
    }
    if (!docId) {
        addDoc(collection(db, BUDGET_COLLECTION), { uid, budget });
    } else {
        updateDoc(doc(db, BUDGET_COLLECTION, docId), { budget: budget})
    }
}  

export async function getBudget(uid) {
    const expenses = query(collection(db, BUDGET_COLLECTION), where("uid", "==", uid));
    const querySnapshot = await getDocs(expenses);
    let budget;
    for (const documentSnapshot of querySnapshot.docs) {
        budget = documentSnapshot.data().budget;
    }
    return budget;
}  