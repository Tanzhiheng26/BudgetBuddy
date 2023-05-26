import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const EXPENSES_COLLECTION = 'expenses'
const BUDGET_COLLECTION = 'budgets'
const USERS_COLLECTION = 'users'

export async function addExpense(uid, id, name, cost, date) {
    const userRef = collection(db, USERS_COLLECTION, uid, EXPENSES_COLLECTION)
    setDoc(doc(userRef, id), { uid, id, name, cost, date });
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
            date: expense.date,
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