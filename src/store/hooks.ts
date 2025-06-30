import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store.js'; // import du type RootState
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store.js';

// Création du hook useAppSelector avec le type RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ✅ useAppDispatch avec typage de AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
