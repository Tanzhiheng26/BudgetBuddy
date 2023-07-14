import { StyleSheet } from 'react-native'
import React, { createContext, useReducer, useEffect } from 'react'
import { getBudget, getExpense } from '../firestore'
import { auth } from '../firebase'

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense.id !== action.payload)
            }
        case 'GET_DATA':
            return {
                budget: action.budget ? action.budget : 0,
                expenses: action.expenses,
            }
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            }
        default:
            return state;
    }
}

export const AppContext = createContext();

const initialState = {
    budget: 0,
    expenses: [],
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(() => {
        async function fetchData() {
            try {
                const expenses = await getExpense(auth.currentUser.uid);
                const budget = await getBudget(auth.currentUser.uid);
                dispatch({ type: 'GET_DATA', expenses: expenses, budget: budget });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [auth.currentUser]);

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                dispatch,
            }}>
            {children}
        </AppContext.Provider>
    )
}

const styles = StyleSheet.create({})