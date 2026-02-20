import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('nexus_local.db');
  return db;
};

export const executeQuery = async (query: string, params: any[] = []) => {
  const database = await initDB();
  return await database.runAsync(query, params);
};

export const fetchAll = async (query: string, params: any[] = []) => {
  const database = await initDB();
  return await database.getAllAsync(query, params);
};

export const fetchOne = async (query: string, params: any[] = []) => {
  const database = await initDB();
  return await database.getFirstAsync(query, params);
};
